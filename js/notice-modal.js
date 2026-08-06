/* ============================================================
   notice-modal.js — お知らせモーダル（日本語ページ・英語ページ共通）
   ============================================================
   ・お知らせの中身は js/notice.js に書きます。
     このファイルは仕組み側なので、普段は触りません。
   ・表示期間の判定はすべて「日本時間（JST／UTC+9）」で行います。
     閲覧者の端末のタイムゾーン設定には影響されません。
   ・読み込み順： notice.js（同期） → notice-modal.js（defer）
   ============================================================ */

/* ----------------------------------------------------------
   1. 表示期間の判定
      画面に触らない純粋な処理だけを集めてあります。
      scripts/validate-notice.js から node でも読み込んで使います。
   ---------------------------------------------------------- */
var NoticePeriod = (function() {

  // 'YYYY-MM-DD' または 'YYYY-MM-DD HH:mm'
  var PATTERN = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?$/;

  // 「書いていない」とみなす値（未指定・null・空文字・空白のみ）
  function isOmitted(value) {
    if (value === undefined || value === null) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    return false;
  }

  // よくある書き間違いに、具体的な直し方を添える。
  // 上から順に見るので、当てはまりの狭いものを先に置くこと。
  function hintFor(text) {
    if (/[年月日時分]/.test(text)) {
      return ' 漢字は使えません。例: \'2026-08-09 09:00\'';
    }
    if (/\d{1,2}:\d{2}:\d{2}/.test(text)) {
      return ' 秒は書けません。例: \'2026-08-09 09:00\'';
    }
    if (/^\d{4}\/\d{1,2}\/\d{1,2}/.test(text)) {
      return ' 区切りは / ではなく - です。例: \'2026-08-09\'';
    }
    // 月または日が1桁のときだけ（2桁なら (?!\d) で外れる）
    if (/^\d{4}-(?:\d(?!\d)|\d{2}-\d(?!\d))/.test(text)) {
      return ' 月と日は必ず2桁にしてください。例: \'2026-8-9\' → \'2026-08-09\'';
    }
    return '';
  }

  /* 日本時間の日時文字列を、epoch ミリ秒に変換する。
     戻り値 { ok:true, ms:数値 } または { ok:false, reason:'理由' }

     new Date('2026-08-09T09:00+09:00') のような文字列パースは使いません。
     ブラウザによって解釈が違い、失敗しても NaN になるだけで原因が分からず、
     古い iPhone でだけ告知が消える、という事故になり得るためです。
     Date.UTC() の計算だけで組み立てれば、どの端末でも必ず同じ結果になります。
     （日本にサマータイムは無いので +9 の固定でよい） */
  function parseJst(value) {
    if (typeof value !== 'string') {
      return { ok: false, reason: '文字列ではありません（値: ' + String(value) + '）。前後を \' \' で囲ってください。' };
    }

    var text = value.trim();
    var m = PATTERN.exec(text);
    if (!m) {
      return { ok: false, reason: '書式が違います（値: \'' + value + '\'）。\'YYYY-MM-DD\' か \'YYYY-MM-DD HH:mm\' で書いてください。' + hintFor(text) };
    }

    var y  = Number(m[1]);
    var mo = Number(m[2]);
    var d  = Number(m[3]);
    var hh = (m[4] === undefined) ? 0 : Number(m[4]);
    var mi = (m[5] === undefined) ? 0 : Number(m[5]);

    if (mo < 1 || mo > 12) return { ok: false, reason: '月が 1〜12 の範囲外です（値: \'' + value + '\'）' };
    if (d  < 1 || d  > 31) return { ok: false, reason: '日が 1〜31 の範囲外です（値: \'' + value + '\'）' };
    if (hh > 23)           return { ok: false, reason: '時が 0〜23 の範囲外です（値: \'' + value + '\'）' };
    if (mi > 59)           return { ok: false, reason: '分が 0〜59 の範囲外です（値: \'' + value + '\'）' };

    // 実在しない日付（2026-02-30 など）を弾く。
    // UTCの0時で組み立てて読み戻し、繰り上がっていたら不正と判断する。
    var probe = new Date(Date.UTC(y, mo - 1, d));
    if (probe.getUTCFullYear() !== y || probe.getUTCMonth() !== mo - 1 || probe.getUTCDate() !== d) {
      return { ok: false, reason: 'その日付は存在しません（値: \'' + value + '\'）' };
    }

    // 日本時間から9時間引くと世界標準時になる。
    // hh - 9 が負の数でも Date.UTC が前日へ繰り下げてくれるので、場合分けは不要。
    return { ok: true, ms: Date.UTC(y, mo - 1, d, hh - 9, mi) };
  }

  /* お知らせ1件を、いま表示してよいか判定する。
     戻り値 { isVisible:真偽, errors:[...], startMs, endMs }
     ※ ここでは画面にも console にも出しません（呼び出し側の役目） */
  function evaluate(notice, nowMs) {
    var errors = [];
    var startMs = -Infinity;
    var endMs = Infinity;
    var r;

    if (!isOmitted(notice.startAt)) {
      r = parseJst(notice.startAt);
      if (r.ok) { startMs = r.ms; } else { errors.push('startAt … ' + r.reason); }
    }
    if (!isOmitted(notice.endAt)) {
      r = parseJst(notice.endAt);
      if (r.ok) { endMs = r.ms; } else { errors.push('endAt … ' + r.reason); }
    }
    if (errors.length === 0 && startMs >= endMs) {
      errors.push('startAt が endAt と同じか、それより後になっています（表示される期間がありません）');
    }

    // 書き方に誤りがあるときは、念のため表示しない
    if (errors.length > 0) {
      return { isVisible: false, errors: errors, startMs: startMs, endMs: endMs };
    }

    // startAt <= いま < endAt（endAt に書いた時刻ちょうどには、もう表示しない）
    return {
      isVisible: (nowMs >= startMs && nowMs < endMs),
      errors: [],
      startMs: startMs,
      endMs: endMs
    };
  }

  /* いま表示すべきお知らせだけを取り出す。
     書き方に誤りがあるものは、理由を console に出したうえで除外する。 */
  function filter(notices, nowMs) {
    var hasConsole = (typeof console !== 'undefined' && console && console.error);

    if (notices === undefined || notices === null) return [];
    if (!Array.isArray(notices)) {
      if (hasConsole) {
        console.error('[お知らせ] noticeData.notices が配列ではありません。js/notice.js を確認してください。');
      }
      return [];
    }

    var shown = [];
    for (var i = 0; i < notices.length; i++) {
      var n = notices[i];

      // 中身が無い場所は飛ばす。
      // notices: [ , {…} ] のようにカンマが1つ多いと、ここに空きができる。
      if (!n || typeof n !== 'object') {
        if (hasConsole) {
          console.error('[お知らせ] notices[' + i + '] が空です。カンマが1つ多くないか js/notice.js を確認してください。');
        }
        continue;
      }

      var result = evaluate(n, nowMs);

      if (result.errors.length > 0 && hasConsole) {
        for (var j = 0; j < result.errors.length; j++) {
          console.error(
            '[お知らせ] notices[' + i + '] 「' + (n.title || '(タイトル未設定)') + '」 の ' +
            result.errors[j] + ' → この告知は表示しません。'
          );
        }
      }
      if (result.isVisible) shown.push(n);
    }
    return shown;
  }

  /* epoch ミリ秒を日本時間の文字列にする（動作確認・検証スクリプト用） */
  function formatJst(ms) {
    if (ms === Infinity || ms === -Infinity || typeof ms !== 'number') return String(ms);
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    var d = new Date(ms + 9 * 60 * 60 * 1000);
    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) +
           ' ' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ' (JST)';
  }

  return {
    isOmitted: isOmitted,
    parseJst: parseJst,
    evaluate: evaluate,
    filter: filter,
    formatJst: formatJst
  };
})();

/* ----------------------------------------------------------
   2. お知らせモーダル本体
      （js/app.js から移設。英語ページのインライン実装も統合）
   ---------------------------------------------------------- */
function initNoticeModal() {
  if (window.__YUJU_NOTICE_INIT__) return;   // 二重に初期化しないための目印
  window.__YUJU_NOTICE_INIT__ = true;

  if (typeof noticeData === 'undefined') return;

  // 表示期間内のお知らせだけに絞り込む（期間外・書き方の誤りはここで除外される）
  var notices = NoticePeriod.filter(noticeData.notices, Date.now());
  if (notices.length === 0) return;   // 0件ならモーダルを開かない

  var modal = document.getElementById('noticeModal');
  if (!modal) return;

  var titleEl = document.getElementById('noticeModalTitle');
  var bodyEl = document.getElementById('noticeModalBody');
  var isEn = document.documentElement.lang === 'en';

  // お知らせ内容を組み立て
  var html = '';
  notices.forEach(function(n) {
    // title や body の書き忘れがあっても、
    // 他のお知らせまで道連れにしないよう空文字で受ける
    var title = (isEn ? (n.titleEn || n.title) : n.title) || '';
    var body = ((isEn ? (n.bodyEn || n.body) : n.body) || '').replace(/\n/g, '<br>');
    html += '<div class="mb-4 last:mb-0">';
    html += '<h3 class="font-bold text-red-700 text-base mb-2">' + title + '</h3>';
    html += '<p class="text-sm text-gray-700 leading-relaxed">' + body + '</p>';
    html += '</div>';
  });

  titleEl.textContent = isEn ? 'Notice' : 'お知らせ';
  bodyEl.innerHTML = html;

  // モーダルを表示
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // 閉じる処理
  function closeNotice() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  document.getElementById('noticeClose').addEventListener('click', closeNotice);
  document.getElementById('noticeCloseBtn').addEventListener('click', closeNotice);
  document.getElementById('noticeOverlay').addEventListener('click', closeNotice);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeNotice();
    }
  });
}

/* ----------------------------------------------------------
   3. 初期化（両ページ共通。HTML側からの呼び出しは不要）
   ---------------------------------------------------------- */
(function() {
  // 検証スクリプト（node）から読み込まれた場合は、何もしない
  if (typeof document === 'undefined') return;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNoticeModal, { once: true });
  } else {
    initNoticeModal();
  }
})();
