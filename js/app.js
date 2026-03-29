/* ============================================================
   app.js — 悠愉樹庵 公式サイト
   [Phase3修正] CODE-03: index.html 内のインラインスクリプトを統合
   [Phase3修正] PERF-04: Maps iframe の IntersectionObserver 遅延読み込み
   ============================================================ */

/* ----------------------------------------------------------
   1. モバイルナビゲーション
   ---------------------------------------------------------- */
function toggleMenu() {
  var nav = document.getElementById('navMobile');
  var btn = document.getElementById('menuToggle');

  nav.classList.toggle('hidden');
  var isOpen = !nav.classList.contains('hidden');
  btn.setAttribute('aria-expanded', String(isOpen));

  if (isOpen) {
    document.addEventListener('click', closeMenuOnOutsideClick);
  } else {
    document.removeEventListener('click', closeMenuOnOutsideClick);
  }
}

function closeMenuOnOutsideClick(event) {
  var nav = document.getElementById('navMobile');
  var btn = document.getElementById('menuToggle');
  var button = event.target.closest('button');
  var insideNav = event.target.closest('#navMobile');
  if (!insideNav && !button) {
    nav.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', closeMenuOnOutsideClick);
  }
}

function closeMobileMenu() {
  var nav = document.getElementById('navMobile');
  var btn = document.getElementById('menuToggle');
  nav.classList.add('hidden');
  btn.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', closeMenuOnOutsideClick);
}

/* ----------------------------------------------------------
   2. セクション見出し開閉（アコーディオン）
   ---------------------------------------------------------- */
function initSectionToggle() {
  document.querySelectorAll('section').forEach(function(section) {
    var h2 = section.querySelector('h2');
    if (!h2) return;

    h2.classList.add('cursor-pointer');
    var body = Array.from(section.children).find(function(el) { return el !== h2; });
    if (!body) return;

    if (!body.id) {
      body.id = (section.id || 'sec') + '-panel';
    }

    h2.setAttribute('role', 'button');
    h2.setAttribute('aria-controls', body.id);
    h2.setAttribute('aria-expanded', String(!body.classList.contains('hidden')));
    h2.setAttribute('tabindex', '0');

    var toggle = function() {
      var isHidden = body.classList.toggle('hidden');
      h2.setAttribute('aria-expanded', String(!isHidden));
    };

    h2.addEventListener('click', toggle);
    h2.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}

/* ----------------------------------------------------------
   3. ヒーロースライダー
   ---------------------------------------------------------- */
function initHeroSlider() {
  if (window.__YUJU_HERO_INIT__) return;
  window.__YUJU_HERO_INIT__ = true;

  var heroImages = document.querySelectorAll('#heroSlider img');
  if (!heroImages.length) return;

  var currentHero = 0;

  heroImages.forEach(function(img, i) {
    img.classList.toggle('opacity-100', i === 0);
    img.classList.toggle('opacity-0', i !== 0);
    img.classList.toggle('scale-105', i === 0);
  });

  window.setInterval(function() {
    heroImages[currentHero].classList.remove('opacity-100', 'scale-105');
    heroImages[currentHero].classList.add('opacity-0');

    currentHero = (currentHero + 1) % heroImages.length;

    heroImages[currentHero].classList.remove('opacity-0');
    heroImages[currentHero].classList.add('opacity-100', 'scale-105');
  }, 5000);
}

/* ----------------------------------------------------------
   4. セクション閲覧 conversion トラッキング（IntersectionObserver）
   [Phase2修正] BUG-03 のロジックをそのまま統合
   ---------------------------------------------------------- */
function initConversionTracking() {
  var conversionMap = {
    'menu':     'AW-17680654611/gviTCLDTnMwbEJPC5e5B',
    'concept':  'AW-17680654611/AsS3CLPTnMwbEJPC5e5B',
    'interior': 'AW-17680654611/WI9wCKfTnMwbEJPC5e5B',
    'exterior': 'AW-17680654611/FUZhCKrTnMwbEJPC5e5B',
    'info':     'AW-17680654611/9-tvCMuJq8wbEJPC5e5B',
    'access':   'AW-17680654611/nybzCK3TnMwbEJPC5e5B'
  };

  var fired = {};

  if ('IntersectionObserver' in window && typeof gtag === 'function') {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !fired[entry.target.id]) {
          fired[entry.target.id] = true;
          gtag('event', 'conversion', {
            'send_to': conversionMap[entry.target.id]
          });
        }
      });
    }, { threshold: 0.5 });

    Object.keys(conversionMap).forEach(function(id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
}

/* ----------------------------------------------------------
   5. Maps iframe 遅延読み込み
   [Phase3修正] PERF-04: 画面内に入った時のみ iframe src を設定
   ---------------------------------------------------------- */
function initLazyMaps() {
  var mapFrames = document.querySelectorAll('iframe[data-src]');
  if (!mapFrames.length) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var iframe = entry.target;
          iframe.src = iframe.getAttribute('data-src');
          iframe.removeAttribute('data-src');
          // プレースホルダーを削除
          var placeholder = iframe.parentElement.querySelector('.map-placeholder');
          if (placeholder) placeholder.remove();
          obs.unobserve(iframe);
        }
      });
    }, { rootMargin: '200px' }); // 画面に入る200px手前で読み込み開始

    mapFrames.forEach(function(iframe) {
      observer.observe(iframe);
    });
  } else {
    // IntersectionObserver 非対応ブラウザ用フォールバック
    mapFrames.forEach(function(iframe) {
      iframe.src = iframe.getAttribute('data-src');
      iframe.removeAttribute('data-src');
    });
  }
}

/* ----------------------------------------------------------
   6. 初期化
   ---------------------------------------------------------- */
(function() {
  function init() {
    initSectionToggle();
    initHeroSlider();
    initConversionTracking();
    initLazyMaps();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
