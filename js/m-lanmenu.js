// ======= 言語状態 =======
const getLang = () => (localStorage.getItem('lang') || 'ja');

// ======= メニューの元データ（例） =======
// 実データに置き換えてください。image パスはサイトの構成に合わせて調整。
const MENU_ITEMS = [
  {
    id: 'soki-soba',
    category: 'soba',
    name: { ja: '【仮】ソーキそば', en: 'Soki Soba', zh: '排骨荞麦面' },
    desc: { ja: '自家製ダレの軟骨ソーキ。澄んだスープと好相性。', en: 'Soft-bone pork ribs in house sauce.', zh: '自家特制酱汁软骨排，汤底清澈相得益彰。' },
    price: "",
    image: 'images/menu/soki.jpg'
  },
  {
    id: 'sanmai',
    category: 'soba',
    name: { ja: '【仮】三枚肉そば', en: 'Pork Belly Soba', zh: '三层肉荞麦面' },
    desc: { ja: '甘辛タレで煮込んだ県産豚の三枚肉。', en: 'Local pork belly braised in sweet soy sauce.', zh: '以甜咸酱汁炖煮的本地猪三层肉。' },
    price: "準備中",
    image: 'images/menu/sanmai.jpg'
  },
  {
    id: 'yushi-tofu',
    category: 'set',
    name: { ja: '【仮】ゆし豆腐セット', en: 'Yushi Tofu Set', zh: '鲜凝豆腐套餐' },
    desc: { ja: 'ふわっとやさしい島豆腐の風味。', en: 'Light, fluffy island tofu.', zh: '轻柔细腻的岛豆腐风味。' },
    price: "準備中",
    image: 'images/menu/yushi.jpg'
  },
  {
    id: 'taco-rice',
    category: 'just',
    name: { ja: '【仮】タコライス', en: 'Taco Rice', zh: '塔可饭' },
    desc: { ja: '沖縄の定番ソウルフード。', en: 'An Okinawan classic.', zh: '冲绳经典灵魂美食。' },
    price: "準備中",
    image: 'images/menu/taco.jpg'
  },
  {
    id: 'brown-sugar-pudding',
    category: 'sweet',
    name: { ja: '【仮】黒糖プリン', en: 'Brown Sugar Pudding', zh: '黑糖布丁' },
    desc: { ja: '黒糖のコクが広がる自家製デザート。', en: 'Homemade dessert with deep brown sugar flavor.', zh: '黑糖醇厚香气的自制甜点。' },
    price: "準備中",
    image: 'images/menu/pudding.jpg'
  }
];

// ======= 描画関数 =======
function renderMenu(items) {
  const lang = getLang();
  const container = document.getElementById('menu-container');
  if (!container) return;
  container.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow overflow-hidden text-left';

    const img = document.createElement('img');
    img.src = item.image; img.alt = ''; img.width = 800; img.height = 450;
    img.className = 'w-full h-48 object-cover';

    const body = document.createElement('div');
    body.className = 'p-4 space-y-1';

    const title = document.createElement('h3');
    title.className = 'text-lg font-semibold';
    title.textContent = (item.name[lang] || item.name.ja);

    const desc = document.createElement('p');
    desc.className = 'text-sm text-gray-600';
    desc.textContent = (item.desc?.[lang] || item.desc?.ja || '');

    const price = document.createElement('p');
    price.className = 'text-right font-bold';
    price.textContent = `¥${item.price.toLocaleString('ja-JP')}`;

    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(price);

    card.appendChild(img);
    card.appendChild(body);

    container.appendChild(card);
  });
}

// ======= フィルタ =======
function bindFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      const items = (cat === 'all') ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === cat);
      renderMenu(items);
      // active 表示
      buttons.forEach(b => b.classList.remove('bg-red-500','text-white'));
      btn.classList.add('bg-red-500','text-white');
    });
  });
}

// ======= 初期化 =======
(function initMenu(){
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderMenu(MENU_ITEMS);
      bindFilters();
    }, { once: true });
  } else {
    renderMenu(MENU_ITEMS);
    bindFilters();
  }

  // 言語が切り替わったら再描画（シンプルに storage を監視）
  window.addEventListener('storage', (e)=>{
    if (e.key === 'lang') renderMenu(MENU_ITEMS);
  });

  // 同一タブ内の切替にも対応（言語ボタンは index.html 内で applyI18n を実行）
  document.querySelectorAll('[data-lang]').forEach(btn=>{
    btn.addEventListener('click', ()=> renderMenu(MENU_ITEMS));
  });
})();
