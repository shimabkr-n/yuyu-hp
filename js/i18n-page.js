/* ============================================================
   i18n-page.js — 英語・繁体字・韓国語ページの動き
   ・お品書きの絞り込み（内容は HTML に書いてあるので、切り替えるだけ）
   ・画像の拡大（パソコンのみ）
   ・電話タップと地図タップの計測
   ============================================================ */
(function () {
  'use strict';

  /* お品書きの絞り込み */
  var buttons = document.querySelectorAll('.i18n-filter-btn');
  var cards = document.querySelectorAll('.i18n-card');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var category = btn.getAttribute('data-category');
      buttons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('bg-red-300', active);
        b.classList.toggle('bg-gray-300', !active);
        b.setAttribute('aria-pressed', String(active));
      });
      cards.forEach(function (card) {
        var show = category === 'all' || card.getAttribute('data-category') === category;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* 画像の拡大（スマホでは開かない：日本語ページと同じ） */
  var modal = document.getElementById('i18nImageModal');
  var modalImg = document.getElementById('i18nModalImage');
  var modalClose = document.getElementById('i18nModalClose');

  function openModal(src) {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;
    modal.classList.add('show');
    modalImg.src = src;
    modalImg.style.transform = 'scale(1.5)';
    modalClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    modalImg.style.transform = 'scale(1)';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.i18n-card img[data-full]').forEach(function (img) {
    img.addEventListener('click', function () {
      openModal(img.getAttribute('data-full'));
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('show')) return;
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      modalClose.focus();
    }
  });

  /* 計測（閲覧の計測ができない環境でも、画面は普通に動く） */
  function track(name) {
    if (typeof gtag === 'function') gtag('event', name);
  }
  document.querySelectorAll('a[data-track="tel"]').forEach(function (el) {
    el.addEventListener('click', function () { track('phone_tap'); });
  });
  document.querySelectorAll('a[data-track="map"]').forEach(function (el) {
    el.addEventListener('click', function () { track('map_open'); });
  });
})();
