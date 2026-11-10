/* ============================================================
   reviews.js — Google の口コミの欄（日本語ページ・英語ページ共通）
   ------------------------------------------------------------
   ・中身は別の仕組み（Google Apps Script「悠愉樹庵HP 口コミ取り込み」）が
     12時間ごとに取り込み、Web アプリの URL で JSON を返す。
     URL は各ページの <section data-reviews-src="..."> に書く。
   ・欄が画面に近づいてから読む（地図の遅延読み込みと同じ考え方）。
   ・読めない・25日より古い・中身が空のときは、平均と一覧を出さず、
     「Google で口コミを見る」のリンクだけを残す（HTML に最初から書いてある）。
   ・文字はすべて textContent で入れる（HTML として解釈しない）。
   ・Tailwind のクラス名と同じ変数名を使わない（使うと本番の CSS に混ざる）。
   ============================================================ */
(function () {
  'use strict';

  var EXPIRE_DAYS = 25;
  var TIMEOUT_MS = 10000;

  var TEXTS = {
    ja: {
      summary: function (avg, count) { return 'Google の口コミ　平均 ' + avg + '（' + count + '件）'; },
      starsLabel: function (n) { return '星' + n + 'つ'; },
      more: '続きを読む',
      less: '閉じる',
      date: function (y, m, d) { return y + '年' + m + '月' + d + '日'; }
    },
    en: {
      summary: function (avg, count) { return 'Google reviews: ' + avg + ' average (' + count + ' reviews)'; },
      starsLabel: function (n) { return n + ' out of 5 stars'; },
      more: 'Read more',
      less: 'Show less',
      date: function (y, m, d) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[m - 1] + ' ' + d + ', ' + y;
      }
    }
  };

  function init() {
    var section = document.querySelector('[data-reviews]');
    if (!section) return;
    var src = section.getAttribute('data-reviews-src');
    var lang = section.getAttribute('data-reviews-lang') === 'en' ? 'en' : 'ja';
    if (!src) return;

    var started = false;
    function start() {
      if (started) return;
      started = true;
      load(src, function (feed) { render(section, feed, lang); });
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            io.disconnect();
            start();
          }
        });
      }, { rootMargin: '800px 0px' });
      io.observe(section);
    } else {
      start();
    }
  }

  function load(src, done) {
    if (!window.fetch) return;
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, TIMEOUT_MS) : null;
    fetch(src, { credentials: 'omit', signal: ctrl ? ctrl.signal : undefined })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (feed) { if (timer) clearTimeout(timer); done(feed); })
      .catch(function () { if (timer) clearTimeout(timer); });
  }

  function isUsable(feed) {
    if (!feed || feed.ok !== true || !feed.fetchedAt) return false;
    var t = new Date(feed.fetchedAt).getTime();
    if (isNaN(t)) return false;
    return (Date.now() - t) < EXPIRE_DAYS * 86400000;
  }

  function render(section, feed, lang) {
    if (!isUsable(feed)) return;
    var tx = TEXTS[lang];

    var summaryEl = section.querySelector('[data-reviews-summary]');
    var s = feed.summary || {};
    var avg = Number(s.average);
    var count = Number(s.count);
    if (summaryEl && isFinite(avg) && avg >= 1 && avg <= 5 && count >= 1 && Math.floor(count) === count) {
      summaryEl.textContent = tx.summary(avg.toFixed(1), count);
      summaryEl.classList.remove('hidden');
    }

    var listEl = section.querySelector('[data-reviews-list]');
    var items = Array.isArray(feed[lang]) ? feed[lang] : [];
    if (!listEl || items.length === 0) return;

    items.slice(0, 5).forEach(function (item) {
      var stars = Number(item && item.stars);
      var body = item && typeof item.text === 'string' ? item.text : '';
      if (!(stars >= 1 && stars <= 5) || !body) return;
      listEl.appendChild(buildCard(stars, body, item.date, tx));
    });

    if (listEl.children.length > 0) {
      listEl.classList.remove('hidden');
      Array.prototype.forEach.call(listEl.querySelectorAll('[data-review-text]'), addMoreButton);
    }
  }

  function buildCard(stars, body, date, tx) {
    var li = document.createElement('li');
    li.className = 'bg-white rounded shadow p-4 text-left';

    var starEl = document.createElement('p');
    starEl.className = 'text-yellow-600 text-lg leading-none mb-2';
    starEl.setAttribute('role', 'img');
    starEl.setAttribute('aria-label', tx.starsLabel(stars));
    starEl.textContent = '★★★★★'.slice(0, stars) + '☆☆☆☆☆'.slice(0, 5 - stars);
    li.appendChild(starEl);

    var textEl = document.createElement('p');
    textEl.className = 'text-gray-800 leading-relaxed whitespace-pre-line break-words line-clamp-5';
    textEl.setAttribute('data-review-text', '');
    textEl.textContent = body;
    li.appendChild(textEl);

    var dateText = formatDate(date, tx);
    if (dateText) {
      var dateEl = document.createElement('p');
      dateEl.className = 'text-xs text-gray-500 mt-2';
      dateEl.textContent = dateText;
      li.appendChild(dateEl);
    }

    li.setAttribute('data-more-label', tx.more);
    li.setAttribute('data-less-label', tx.less);
    return li;
  }

  /* 5行で切れている本文にだけ「続きを読む」を付ける */
  function addMoreButton(textEl) {
    if (textEl.scrollHeight <= textEl.clientHeight + 1) return;
    var card = textEl.parentNode;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'text-sm text-blue-700 underline mt-1';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = card.getAttribute('data-more-label');
    btn.addEventListener('click', function () {
      var opened = btn.getAttribute('aria-expanded') === 'true';
      textEl.classList.toggle('line-clamp-5', opened);
      btn.setAttribute('aria-expanded', String(!opened));
      btn.textContent = card.getAttribute(opened ? 'data-more-label' : 'data-less-label');
    });
    textEl.parentNode.insertBefore(btn, textEl.nextSibling);
  }

  function formatDate(value, tx) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ''));
    if (!m) return '';
    return tx.date(Number(m[1]), Number(m[2]), Number(m[3]));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
