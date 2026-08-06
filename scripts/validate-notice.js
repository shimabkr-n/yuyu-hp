#!/usr/bin/env node
/* ============================================================
   validate-notice.js — js/notice.js の書き方チェック
   ============================================================
   使い方:  npm run validate:notice

   ・追加のインストールは不要です（node だけで動きます）
   ・チェックする内容
       1) js/notice.js が JavaScript として壊れていないか
       2) startAt / endAt の書式・実在しない日付・前後関係
       3) 今この瞬間（日本時間）に、どのお知らせが表示されるか
   ・問題があれば終了コード 1 で終わります。
   ・判定には js/notice-modal.js の中身をそのまま使うので、
     ここでの結果と本番のブラウザでの結果がずれることはありません。
   ============================================================ */

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ROOT = path.join(__dirname, '..');
var FILES = {
  modal:  { abs: path.join(ROOT, 'js', 'notice-modal.js'), label: 'js/notice-modal.js' },
  notice: { abs: path.join(ROOT, 'js', 'notice.js'),       label: 'js/notice.js' }
};

var errors = [];
var warnings = [];
var lines = [];

function say(s) { lines.push(s); }

/* ファイルをそのまま評価する。sandbox を共有するので、
   notice-modal.js の NoticePeriod を notice.js の判定に使える。 */
function load(file, sandbox) {
  var src;
  try {
    src = fs.readFileSync(file.abs, 'utf8');
  } catch (e) {
    errors.push(file.label + ' を読み込めません: ' + e.message);
    return false;
  }
  try {
    vm.runInNewContext(src, sandbox, { filename: file.label });
  } catch (e) {
    errors.push(
      file.label + ' が JavaScript として壊れています。\n' +
      '        ' + e.message + '\n' +
      '        （カンマ、シングルクォート、波かっこ { } の閉じ忘れがよくある原因です）'
    );
    return false;
  }
  return true;
}

function describe(value) {
  if (value === undefined) return '(未指定)';
  if (value === null) return '(null)';
  if (value === '') return '(\'\' 空文字)';
  return '\'' + String(value) + '\'';
}

function main() {
  var sandbox = {};
  var okModal = load(FILES.modal, sandbox);
  var okNotice = load(FILES.notice, sandbox);

  if (!okModal || !sandbox.NoticePeriod) {
    errors.push('js/notice-modal.js から判定の仕組み（NoticePeriod）を読み込めませんでした。');
    return;
  }
  if (!okNotice) return;

  var NP = sandbox.NoticePeriod;
  var data = sandbox.noticeData;
  var nowMs = Date.now();

  say('現在の日本時間: ' + NP.formatJst(nowMs));
  say('');

  if (!data || typeof data !== 'object') {
    errors.push('js/notice.js に noticeData が見つかりません。');
    return;
  }
  if (!Array.isArray(data.notices)) {
    errors.push('noticeData.notices が配列ではありません。[ ] で囲ってください。');
    return;
  }
  if (data.notices.length === 0) {
    say('お知らせは 0 件です（notices: []）。モーダルは表示されません。');
    return;
  }

  var visibleCount = 0;

  // forEach は配列の空き（notices: [ , {…} ] のようにカンマが多いときにできる）を
  // 飛ばしてしまうので、番号で1つずつ見る。
  for (var i = 0; i < data.notices.length; i++) {
    checkOne(data.notices[i], i, data.notices.length);
  }

  function checkOne(n, i, total) {
    var label = '[' + (i + 1) + '/' + total + '] ';

    if (!n || typeof n !== 'object') {
      errors.push('notices[' + i + '] が空です。カンマが1つ多くないか確認してください（値: ' + describe(n) + '）');
      say(label + '(空)');
      say('      → いま 非表示（中身がありません）');
      say('');
      return;
    }

    say(label + '「' + (n.title || '(タイトル未設定)') + '」');
    say('      startAt: ' + describe(n.startAt) + '   endAt: ' + describe(n.endAt));

    // --- 中身の取りこぼしチェック ---
    if (!n.title)   errors.push('notices[' + i + '] に title がありません（モーダルに undefined と表示されます）');
    if (!n.body)    errors.push('notices[' + i + '] に body がありません（モーダルに undefined と表示されます）');
    if (!n.titleEn) warnings.push('notices[' + i + '] に titleEn がありません（英語ページに日本語がそのまま出ます）');
    if (!n.bodyEn)  warnings.push('notices[' + i + '] に bodyEn がありません（英語ページに日本語がそのまま出ます）');
    if (n.startAt === '') warnings.push('notices[' + i + '] の startAt が空文字です。使わないなら行ごと消してください。');
    if (n.endAt === '')   warnings.push('notices[' + i + '] の endAt が空文字です。使わないなら行ごと消してください。');

    // --- 表示期間チェック（本番とまったく同じ関数を使う） ---
    var r = NP.evaluate(n, nowMs);
    if (r.errors.length > 0) {
      r.errors.forEach(function(msg) {
        errors.push('notices[' + i + ']（' + (n.title || 'タイトル未設定') + '） の ' + msg);
      });
      say('      → いま 非表示（書き方に誤りがあります）');
    } else if (r.isVisible) {
      visibleCount++;
      say('      → いま 表示中' +
          (r.endMs === Infinity ? '（終了日時なし。手で消すまで出続けます）'
                                : '（' + NP.formatJst(r.endMs) + ' に消えます）'));
    } else if (nowMs < r.startMs) {
      say('      → いま 非表示（' + NP.formatJst(r.startMs) + ' から表示されます）');
    } else {
      say('      → いま 非表示（' + NP.formatJst(r.endMs) + ' に終了済み）');
    }
    say('');
  }

  if (visibleCount === 0 && errors.length === 0) {
    warnings.push('このまま公開しても、いま表示されるお知らせは 1 件もありません。日付を確認してください。');
  }
}

main();

console.log('=== お知らせ設定チェック ===');
console.log('');
lines.forEach(function(l) { console.log(l); });

if (warnings.length > 0) {
  console.log('--- 注意 ---');
  warnings.forEach(function(w) { console.log('  ! ' + w); });
  console.log('');
}

if (errors.length > 0) {
  console.log('--- エラー ---');
  errors.forEach(function(e) { console.log('  x ' + e); });
  console.log('');
  console.log('エラーが ' + errors.length + ' 件あります。直してから push してください。');
  process.exit(1);
}

console.log('問題は見つかりませんでした。');
process.exit(0);
