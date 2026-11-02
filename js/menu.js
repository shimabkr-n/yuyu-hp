/* menu.js — 日本語ページのお品書きとスライド（データは js/menu-data.js）*/

const container = document.getElementById('menu-container');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

const renderMenu = (category = 'all') => {
  container.innerHTML = '';
  menuData.filter(item => category === 'all' || item.category === category)
    .forEach(item => {
      // item.desc内の改行コード \n を <br> タグに置換します。
      const formattedDesc = item.desc.replace(/\n/g, '<br>');

      container.innerHTML += `
        <div class="bg-white shadow rounded-lg overflow-hidden flex flex-col lg:flex-row relative w-full">
          ${item.badge ? `<div class="badge">${item.badge}</div>` : ''}
          <img src="${item.image}" alt="${item.name}" class="w-full lg:w-[53%] h-auto object-contain cursor-pointer" onclick="openModal('${item.image}')">
          <div class="p-4 flex flex-col justify-between flex-1 min-w-0">
            <div>
              <h3 class="text-xl font-bold text-red-700 mb-2">${item.name}</h3>
              <p class="text-sm text-gray-600 mb-2 text-left">${formattedDesc}</p>
              ${renderAllergenBadges(item.allergens, 'ja', item.allergensAsk)}
            </div>
            <!-- [Phase4] BUG-06: toLocaleString() 除去（priceは既にカンマ付き文字列） -->
            <div class="mt-4 text-right font-semibold text-gray-800">${item.price}円（税込）</div>
          </div>
        </div>
      `;
    });
};

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('bg-red-300'));
    btn.classList.add('bg-red-300');
    renderMenu(btn.dataset.category);
  });
});

renderMenu();

function openModal(src) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) return;
  modal.classList.add('show');
  modalImg.src = src;
  modalImg.style.transform = "scale(1.5)";
  // [Phase4] BUG-07: フォーカスを閉じるボタンに移動し、背面スクロールを禁止
  modalClose.focus();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  modalImg.style.transform = "scale(1)";
  // [Phase4] BUG-07: 背面スクロールを復帰
  document.body.style.overflow = '';
}

modalClose.onclick = closeModal;

window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
};

// [Phase3] ESC キーでモーダルを閉じる
// [Phase4] BUG-07: Tab キーのフォーカストラップ追加
document.addEventListener('keydown', function(e) {
  if (!modal.classList.contains('show')) return;

  if (e.key === 'Escape') {
    closeModal();
    return;
  }

  // フォーカストラップ: Tab で閉じるボタンにフォーカスを留める
  if (e.key === 'Tab') {
    e.preventDefault();
    modalClose.focus();
  }
});

// 外観スライド
const exteriorImages = [
    "images/gaikan1.jpg",
    "images/gaikan2.jpg",
    "images/gaikan3.jpg",
    "images/gaikan4.jpg",
    "images/gaikan5.jpg"
];
// [Phase2修正] SEO-04: スライド切替時に alt テキストも連動更新
const exteriorAlts = [
    "悠愉樹庵の外観 - 中城村の古民家沖縄そば店",
    "悠愉樹庵の外観 - 緑に囲まれたアプローチ",
    "悠愉樹庵の外観 - 店舗正面",
    "悠愉樹庵の外観 - 駐車場と敷地",
    "悠愉樹庵の外観 - 自然豊かな店舗周辺"
];
let currentExterior = 0;
const exteriorSlide = document.getElementById("exteriorSlide");

function updateExteriorSlide() {
  exteriorSlide.src = exteriorImages[currentExterior];
  exteriorSlide.alt = exteriorAlts[currentExterior];
}

function nextExteriorSlide() {
  currentExterior = (currentExterior + 1) % exteriorImages.length;
  updateExteriorSlide();
}

// [Phase1修正] BUG-02: prevExteriorSlide() を追加（←ボタン用）
function prevExteriorSlide() {
  currentExterior = (currentExterior - 1 + exteriorImages.length) % exteriorImages.length;
  updateExteriorSlide();
}

setInterval(nextExteriorSlide, 3000);

// 内観スライド
const interiorImages = [
  "images/naikan1.jpg",
  "images/naikan2.jpg",
  "images/naikan3.jpg",
  "images/naikan4.jpg"
];
// [Phase2修正] SEO-04: スライド切替時に alt テキストも連動更新
const interiorAlts = [
  "悠愉樹庵の店内 - 落ち着いた雰囲気の客席",
  "悠愉樹庵の店内 - 座敷席",
  "悠愉樹庵の店内 - 掘りごたつ席",
  "悠愉樹庵の店内 - テーブル席"
];
let currentInterior = 0;
const interiorSlide = document.getElementById("interiorSlide");

function updateInteriorSlide() {
  interiorSlide.src = interiorImages[currentInterior];
  interiorSlide.alt = interiorAlts[currentInterior];
}

function nextInteriorSlide() {
  currentInterior = (currentInterior + 1) % interiorImages.length;
  updateInteriorSlide();
}

// [Phase1修正] BUG-02: prevInteriorSlide() を追加（←ボタン用）
function prevInteriorSlide() {
  currentInterior = (currentInterior - 1 + interiorImages.length) % interiorImages.length;
  updateInteriorSlide();
}

setInterval(nextInteriorSlide, 3000);
