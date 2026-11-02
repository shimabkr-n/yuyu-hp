#!/usr/bin/env node
/* ============================================================
   build-i18n.js — 英語・繁体字・韓国語ページを作る
   ============================================================
   使い方:  npm run build:i18n

   入力:  scripts/i18n/strings.js（文言） ／ js/menu-data.js（お品書き）
   出力:  en/index.html ／ zh-hant/index.html ／ ko/index.html

   出力した HTML を直接直さないでください（次の実行で消えます）。
   ============================================================ */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const strings = require('./i18n/strings.js');

const SITE = 'https://jyuan.jp';
const PHONE_E164 = '+81988952280';
const PHONE_INTL = '+81-98-895-2280';
const MAPS_URL = 'https://maps.app.goo.gl/viwUGsYm7mVw3dFz6';
const BUS_URL = 'https://toyo-bus.com/time_table/';
const JA_ADDRESS = '〒901-2405 沖縄県中城村屋宜824-1';

const LANGUAGES = [
  { hreflang: 'ja', path: '/', label: '日本語' },
  { hreflang: 'en', path: '/en/', label: 'English' },
  { hreflang: 'zh-Hant', path: '/zh-hant/', label: '繁體中文' },
  { hreflang: 'ko', path: '/ko/', label: '한국어' },
];

/* 表の並び順 */
const FILTER_ORDER = ['all', 'soba', 'topping', 'chanple', 'set', 'just', 'sweet'];
const SECTION_ORDER = ['soba', 'set', 'chanple', 'topping', 'just', 'sweet'];

function loadMenu() {
  const code = fs.readFileSync(path.join(ROOT, 'js/menu-data.js'), 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code + '\n;globalThis.__menu = menuData; globalThis.__labels = ALLERGEN_LABELS;', sandbox);
  return { menu: sandbox.__menu, labels: sandbox.__labels };
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* 言語ごとの項目名を選ぶ */
function pick(item, key) {
  const name = { en: item.nameEn, 'zh-hant': item.nameZh, ko: item.nameKo }[key];
  const desc = { en: item.descEn, 'zh-hant': item.descZh, ko: item.descKo }[key];
  if (!name || !desc) throw new Error('訳がありません: ' + item.name + ' (' + key + ')');
  return { name, desc };
}

function allergenLabel(labels, key, allergen) {
  const field = { en: 'en', 'zh-hant': 'zh', ko: 'ko' }[key];
  const entry = labels[allergen];
  if (!entry || !entry[field]) throw new Error('アレルゲンの訳がありません: ' + allergen);
  return entry[field];
}

function renderAllergens(item, key, t, labels) {
  if (!item.allergens || item.allergens.length === 0) {
    return `<div class="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-600 text-left">${esc(t.menu.none)}</div>`;
  }
  const chips = item.allergens
    .map((a) => `<span class="inline-block bg-red-100 text-red-800 px-2 py-0.5 rounded mr-1 mb-1">${esc(allergenLabel(labels, key, a))}</span>`)
    .join('');
  return `<div class="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-700 text-left"><span class="font-bold mr-1">${esc(t.menu.contains)}</span>${chips}</div>`;
}

function renderCard(item, key, t, labels) {
  const { name, desc } = pick(item, key);
  const src = '/' + item.image;
  return `      <article class="i18n-card bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row relative w-full" data-category="${esc(item.category)}">
        ${item.badge ? `<div class="badge">${esc(item.badge)}</div>` : ''}
        <img src="${esc(src)}" alt="${esc(name)}" class="w-full md:w-1/2 h-auto object-cover cursor-pointer" loading="lazy" data-full="${esc(src)}">
        <div class="p-4 flex flex-col justify-between md:w-1/2 text-left">
          <div>
            <h3 class="text-xl font-bold text-red-700 mb-1">${esc(name)}</h3>
            <p class="text-xs text-gray-600 mb-2" lang="ja">${esc(item.name)}</p>
            <p class="text-sm text-gray-700 mb-2">${esc(desc)}</p>
            ${renderAllergens(item, key, t, labels)}
          </div>
          <div class="mt-4 text-right font-semibold text-gray-800">&yen;${esc(item.price)}</div>
        </div>
      </article>`;
}

function jsonLd(key, t, menu) {
  const sections = SECTION_ORDER.map((category) => ({
    '@type': 'MenuSection',
    name: t.jsonSections[category],
    hasMenuItem: menu
      .filter((item) => item.category === category)
      .map((item) => {
        const { name, desc } = pick(item, key);
        return {
          '@type': 'MenuItem',
          name,
          description: desc,
          offers: { '@type': 'Offer', price: item.price.replace(/,/g, ''), priceCurrency: 'JPY' },
        };
      }),
  }));

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: t.jsonName,
    alternateName: ['悠愉樹庵', '悠愉樹庵（ゆうゆじゅあん）', 'Yuyu-Juan'].filter((n) => n !== t.jsonName),
    image: [`${SITE}/ogp.jpg`, `${SITE}/images/yuyu-soba.jpg`, `${SITE}/images/exterior1.jpg`],
    address: Object.assign({ '@type': 'PostalAddress', addressCountry: 'JP', postalCode: '901-2405' }, t.jsonAddress),
    geo: { '@type': 'GeoCoordinates', latitude: 26.268, longitude: 127.7945 },
    telephone: PHONE_INTL,
    url: SITE + t.path,
    servesCuisine: t.jsonCuisine,
    priceRange: '¥900-¥1,600',
    acceptsReservations: true,
    paymentAccepted: 'Cash',
    currenciesAccepted: 'JPY',
    hasMap: MAPS_URL,
    hasMenu: { '@type': 'Menu', url: `${SITE}${t.path}#menu`, hasMenuSection: sections },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:00',
      closes: '15:00',
    }],
    sameAs: [
      MAPS_URL,
      'https://www.instagram.com/yuyu_jyuan/',
      'https://tabelog.com/okinawa/A4704/A470405/47005254/',
      'https://www.tripadvisor.com/Restaurant_Review-g1120818-d6071227-Reviews-Okinawa_Soba_Local_Dishes_Restautant_Yuyujyuan-Nakagusuku_son_Nakagami_gun_Okina.html',
    ],
  };
  return JSON.stringify(data, null, 2).replace(/<\//g, '<\\/');
}

function renderPage(key, t, menu, labels) {
  const hreflangLinks = LANGUAGES
    .map((l) => `  <link rel="alternate" hreflang="${l.hreflang}" href="${SITE}${l.path}">`)
    .concat(`  <link rel="alternate" hreflang="x-default" href="${SITE}/en/">`)
    .join('\n');

  const langSwitch = LANGUAGES.map((l) => {
    const current = l.path === t.path;
    return `<a href="${l.path}" hreflang="${l.hreflang}" lang="${l.hreflang}" class="${current ? 'font-bold text-red-700' : 'text-gray-700 underline'}"${current ? ' aria-current="page"' : ''}>${l.label}</a>`;
  }).join('\n          ');

  const factRows = t.facts.rows
    .map(([label, value]) => `        <div class="bg-white rounded shadow p-3 text-center"><dt class="text-xs text-gray-600">${esc(label)}</dt><dd class="text-base font-bold text-gray-800">${esc(value)}</dd></div>`)
    .join('\n');

  const filterButtons = FILTER_ORDER
    .map((f) => `      <button type="button" class="i18n-filter-btn ${f === 'all' ? 'bg-red-300' : 'bg-gray-300'} px-4 py-2 rounded" data-category="${f}"${f === 'all' ? ' aria-pressed="true"' : ' aria-pressed="false"'}>${esc(t.menu.filters[f])}</button>`)
    .join('\n');

  const cards = menu.map((item) => renderCard(item, key, t, labels)).join('\n');

  const faqItems = t.faq.items
    .map(([q, a]) => `      <div>\n        <h3 class="font-bold text-lg mb-1">${esc(q)}</h3>\n        <p class="leading-relaxed">${esc(a)}</p>\n      </div>`)
    .join('\n');

  const aboutParagraphs = t.about.paragraphs.map((p) => `      <p>${esc(p)}</p>`).join('\n');
  const carItems = t.access.car.map((c) => `          <li>${esc(c)}</li>`).join('\n');
  const busItems = t.access.bus.map((b) => `          <li>${esc(b)}</li>`).join('\n');

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7155.391648000203!2d127.78891810706097!3d26.271533781037977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34e56d4c215e6a23%3A0x75f0d8bc425ab4b3!2z5oKg5oSJ5qi55bq1!5e0!3m2!1s${t.mapLang}!2sjp!4v1751432270780!5m2!1s${t.mapLang}!2sjp`;

  const fontLinks = t.loadSawarabi
    ? `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sawarabi+Mincho&display=swap" rel="stylesheet">`
    : '';

  return `<!DOCTYPE html>
<!-- このファイルは scripts/build-i18n.js が作ります。直接直さないでください。 -->
<html lang="${t.htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${esc(t.title)}</title>
  <meta name="description" content="${esc(t.description)}">
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${esc(t.brand)}" />
  <meta property="og:locale" content="${t.ogLocale}" />
  <meta property="og:title" content="${esc(t.ogTitle)}" />
  <meta property="og:description" content="${esc(t.ogDescription)}" />
  <meta property="og:image" content="${SITE}/ogp.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="${SITE}${t.path}" />
  <meta name="twitter:card" content="summary_large_image" />

  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

  <link rel="canonical" href="${SITE}${t.path}">
${hreflangLinks}

  <link rel="preload" as="image" href="/images/exterior1.jpg" fetchpriority="high">
  <link rel="stylesheet" href="/css/style.css">
${fontLinks}

  <script type="application/ld+json">
${jsonLd(key, t, menu)}
  </script>

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-B07XFP4Y65"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-B07XFP4Y65');
  </script>
</head>

<body class="bg-gray-100 text-gray-800 min-h-screen" style="font-family: ${esc(t.fontStack).replace(/&quot;/g, "'")}; background-image: url('/images/bingata-strong.webp'); background-repeat: repeat; background-position: center; background-size: 100% auto;">

<header class="bg-white bg-opacity-90 shadow fixed w-full z-50">
  <div class="max-w-5xl mx-auto px-4 py-2 flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
    <h1 class="text-xl md:text-2xl font-bold text-red-700">${esc(t.brand)} <span class="text-sm font-normal text-gray-600">${esc(t.brandSub)}</span></h1>
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
      <nav class="hidden md:flex gap-4" aria-label="${esc(t.nav.menu)}">
        <a href="#visit" class="hover:text-red-600">${esc(t.nav.visit)}</a>
        <a href="#menu" class="hover:text-red-600">${esc(t.nav.menu)}</a>
        <a href="#access" class="hover:text-red-600">${esc(t.nav.access)}</a>
      </nav>
      <nav class="flex gap-3 text-xs" aria-label="${esc(t.nav.languageLabel)}">
          ${langSwitch}
      </nav>
    </div>
  </div>
</header>

<section class="relative h-[60vh] flex items-center justify-center text-white text-center pt-16">
  <img src="/images/exterior1.jpg" alt="${esc(t.hero.imageAlt)}" width="1323" height="992" fetchpriority="high" class="absolute inset-0 w-full h-full object-cover" />
  <div class="bg-black bg-opacity-40 absolute inset-0"></div>
  <div class="z-10 px-4">
    <h2 class="text-3xl md:text-5xl font-semibold mb-4">${esc(t.hero.title)}</h2>
    <p class="text-lg md:text-xl">${esc(t.hero.lead)}</p>
    <p class="text-sm mt-2">${esc(t.hero.sub)}</p>
  </div>
</section>

<section id="visit" class="bg-gray-100/95 py-8 px-4">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4 text-center">${esc(t.facts.heading)}</h2>
    <dl class="grid grid-cols-2 md:grid-cols-5 gap-3">
${factRows}
    </dl>
  </div>
</section>

<section id="menu" class="bg-blue-50/90 py-16 px-4 text-center">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-4">${esc(t.menu.heading)}</h2>
    <p class="text-center text-sm text-gray-700 mb-6">${esc(t.menu.note)}</p>
    <div class="flex flex-wrap justify-center mb-6 gap-2">
${filterButtons}
    </div>
    <div class="max-w-3xl mx-auto mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded text-left text-sm text-gray-800">
      <p class="font-bold mb-1">${esc(t.menu.allergenTitle)}</p>
      <p class="mb-1">${esc(t.menu.allergenBody)}</p>
      <p class="mb-1"><strong>${esc(t.menu.allergenWarn)}</strong></p>
    </div>
    <div id="i18n-menu" class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
${cards}
    </div>
  </div>
</section>

<section id="faq" class="bg-white/95 py-12 px-4">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-6">${esc(t.faq.heading)}</h2>
    <div class="space-y-5">
${faqItems}
    </div>
  </div>
</section>

<section id="about" class="bg-gray-700/95 text-white py-12 px-4">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-6">${esc(t.about.heading)}</h2>
    <div class="space-y-4 text-lg leading-relaxed">
${aboutParagraphs}
    </div>
  </div>
</section>

<section id="access" class="bg-blue-50/90 py-12 px-4">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-6 text-center">${esc(t.access.heading)}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-3">
        <p><strong>${esc(t.access.addressLabel)}:</strong> ${esc(t.access.address)}</p>
        <p><strong>${esc(t.access.addressJaLabel)}:</strong> <span lang="ja">${esc(JA_ADDRESS)}</span></p>
        <p><strong>${esc(t.access.phoneLabel)}:</strong> <a href="tel:${PHONE_E164}" class="underline text-red-700" data-track="tel">${PHONE_INTL}</a> <span class="text-sm">(${esc(t.access.phoneDomesticNote)})</span></p>
        <p>${esc(t.access.mapsNote)}</p>
        <div>
          <h3 class="font-bold mt-4 mb-1">${esc(t.access.carHeading)}</h3>
          <ul class="list-disc pl-5 space-y-1">
${carItems}
          </ul>
        </div>
        <div>
          <h3 class="font-bold mt-4 mb-1">${esc(t.access.busHeading)}</h3>
          <ul class="list-disc pl-5 space-y-1">
${busItems}
          </ul>
          <p class="mt-2"><a href="${BUS_URL}" target="_blank" rel="noopener" class="underline text-red-700">${esc(t.access.busLinkText)}</a></p>
        </div>
        <p class="text-sm text-gray-700">${esc(t.access.timesNote)}</p>
      </div>
      <div>
        <iframe title="${esc(t.access.mapTitle)}"
          src="${mapSrc}"
          class="w-full h-72 md:h-96 rounded shadow"
          style="border:0;" allowfullscreen loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </div>
</section>

<div id="noticeModal" class="hidden fixed inset-0 z-[10000] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="${esc(t.notice.label)}">
  <div class="absolute inset-0 bg-black bg-opacity-30" id="noticeOverlay"></div>
  <div class="relative bg-white rounded-lg shadow-xl mx-4 max-w-lg w-full max-h-[80vh] overflow-y-auto z-10">
    <div class="text-white px-6 py-3 rounded-t-lg flex justify-between items-center" style="background-color: #f295f5;">
      <h2 class="text-lg font-bold" id="noticeModalTitle">${esc(t.notice.label)}</h2>
      <button id="noticeClose" class="text-white text-2xl leading-none hover:opacity-70" aria-label="${esc(t.notice.closeAria)}">&times;</button>
    </div>
    <div class="px-6 py-5" id="noticeModalBody"></div>
    <div class="px-6 pb-5 text-center">
      <button id="noticeCloseBtn" class="text-white px-8 py-2 rounded text-sm font-bold hover:opacity-90" style="background-color: #f295f5;">${esc(t.notice.close)}</button>
    </div>
  </div>
</div>

<div id="i18nImageModal" class="modal" role="dialog" aria-modal="true" aria-label="${esc(t.imageModal.label)}">
  <span class="close" id="i18nModalClose" tabindex="0" role="button" aria-label="${esc(t.imageModal.closeAria)}">&times;</span>
  <img class="modal-content cursor-pointer" id="i18nModalImage" alt="${esc(t.imageModal.alt)}">
</div>

<div class="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t shadow-lg">
  <div class="flex">
    <a href="tel:${PHONE_E164}" data-track="tel" class="flex-1 flex items-center justify-center gap-1 py-3 text-sm font-bold text-white bg-red-700 hover:bg-red-800">${esc(t.cta.call)}</a>
    <a href="${MAPS_URL}" data-track="map" target="_blank" rel="noopener" class="flex-1 flex items-center justify-center gap-1 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700">${esc(t.cta.map)}</a>
  </div>
</div>

<footer class="bg-gray-800/95 text-white py-8 text-sm mb-14 md:mb-0">
  <div class="max-w-4xl mx-auto px-4 space-y-4">
    <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
      <div>
        <p class="font-bold text-base mb-1">${esc(t.brand)} ${esc(t.brandSub)}</p>
        <p>${esc(t.addressShort)}</p>
        <p>TEL: <a href="tel:${PHONE_E164}" class="underline hover:text-red-400" data-track="tel">${PHONE_INTL}</a></p>
      </div>
      <div>
        <p><strong>${esc(t.footer.hours)}:</strong> 11:00 - 15:00</p>
        <p><strong>${esc(t.footer.closed)}:</strong> ${esc(t.footer.closedValue)}</p>
        <p><strong>${esc(t.footer.payment)}:</strong> ${esc(t.footer.paymentValue)}</p>
        <p><strong>${esc(t.footer.parking)}:</strong> ${esc(t.footer.parkingValue)}</p>
      </div>
    </div>
    <p class="text-center text-gray-300 pt-2 border-t border-gray-600">&copy; ${esc(t.brand)}. ${esc(t.footer.rights)}</p>
  </div>
</footer>

<script src="/js/notice.js"></script>
<script src="/js/notice-modal.js" defer></script>
<script src="/js/i18n-page.js" defer></script>

</body>
</html>
`;
}

/* メニューの分類が絞り込みと検索向けの情報に揃っているかを確かめる。
   新しい分類を足したのに一覧へ足し忘れると、黙って抜け落ちるため。 */
function checkCategories(menu) {
  const known = FILTER_ORDER.filter((f) => f !== 'all');
  menu.forEach((item) => {
    if (!known.includes(item.category) || !SECTION_ORDER.includes(item.category)) {
      throw new Error('知らない分類です: ' + item.category + '（' + item.name + '）。scripts/build-i18n.js の一覧と strings.js に足してください。');
    }
  });
  Object.keys(strings).forEach((key) => {
    known.forEach((c) => {
      if (!strings[key].menu.filters[c] || !strings[key].jsonSections[c]) {
        throw new Error('分類名の訳がありません: ' + c + '（' + key + '）');
      }
    });
  });
}

function main() {
  const checkOnly = process.argv.includes('--check');
  const { menu, labels } = loadMenu();
  checkCategories(menu);
  let stale = 0;
  Object.keys(strings).forEach((key) => {
    const t = strings[key];
    const dir = path.join(ROOT, t.path.replace(/^\//, ''));
    const out = path.join(dir, 'index.html');
    const html = renderPage(key, t, menu, labels);
    const name = path.relative(ROOT, out);
    if (checkOnly) {
      const current = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
      if (current !== html) {
        console.error('古いままです: ' + name);
        stale += 1;
      }
      return;
    }
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(out, html, 'utf8');
    console.log('作成: ' + name);
  });
  if (checkOnly) {
    if (stale > 0) {
      console.error('js/menu-data.js か strings.js の変更が外国語ページに反映されていません。npm run build:i18n を実行してください。');
      process.exit(1);
    }
    console.log('外国語ページは最新です。');
  }
}

main();
