
const menuData = [
    {
      name: "悠愉そば",
      image: "images/yuyu-soba.jpg",
      desc: "軟骨ソーキ・三枚肉・かまぼこをのせた贅沢そば。",
      price: 1100,
      category: "soba",
      badge: "NEW"
    },
    {
      name: "軟骨ソーキそば",
      image: "images/nankotsu-t1.jpg",
      desc: "とろけるソーキとあっさり出汁の一杯。",
      price: 950,
      category: "soba"
    },
    {
      name: "てびちそば",
      image: "images/tebichi-soba.jpg",
      desc: "ぷるぷる豚足",
      price: 980,
      category: "soba",
      badge: "数量限定"
    },
    {
      name: "悠愉御膳",
      image: "images/soba-set.jpg",
      desc: "軟骨そーき＋ジューシー＋小鉢",
      price: 1500,
      category: "set"
    },
    {
      name: "チャンプルー定食",
      image: "images/goya-set.jpg",
      desc: "自家製てびち＋小鉢",
      price: 1500,
      category: "set"
    },
    {
      name: "ゆし豆腐定食",
      image: "images/yushi-set.jpg",
      desc: "ゆし豆腐＋ジューシー＋小鉢",
      price: 1350,
      category: "set"
    },
    {
      name: "軟骨ソーキ定食",
      image: "images/nankotsu-top.jpg",
      desc: "軟骨ソーキ＋ジューシー＋小鉢",
      price: 1450,
      category: "set"
    },
    {
      name: "イナムドゥチセット",
      image: "images/inamu-set.jpg",
      desc: "自家製イナムドゥチ＋小鉢",
      price: 1350,
      category: "set"
    },
    {
      name: "コーヒー＆ケーキ",
      image: "images/cofee-set.jpg",
      desc: "甘さ控えめ。食後におすすめのデザート。",
      price: 500,
      category: "sweet"
    },
    {
      name: "コーヒーアイス",
      image: "images/jamoka.png",
      desc: "甘さ控えめ。食後におすすめのデザート。",
      price: 300,
      category: "sweet"
    }
];


const container = document.getElementById('menu-container');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

const renderMenu = (category = 'all') => {
  container.innerHTML = '';
  menuData.filter(item => category === 'all' || item.category === category)
    .forEach(item => {
      container.innerHTML += `
        <div class="bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row relative">
          ${item.badge ? `<div class="badge">${item.badge}</div>` : ''}
          <img src="${item.image}" alt="${item.name}" class="w-full md:w-1/3 object-cover cursor-pointer" onclick="openModal('${item.image}')">
          <div class="p-4 flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-bold text-red-700 mb-2">${item.name}</h3>
              <p class="text-sm text-gray-600 mb-2">${item.desc}</p>
            </div>
            <div class="mt-4 text-right font-semibold text-gray-800">${item.price.toLocaleString()}円（税込）</div>
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
  modal.style.display = "block";
  modalImg.src = src;
  modalImg.style.transform = "scale(1.5)";
}

modalClose.onclick = function () {
  modal.style.display = "none";
  modalImg.style.transform = "scale(1)";
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    modalImg.style.transform = "scale(1)";
  }
};

// 外観スライド
const exteriorImages = [
  "images/gaikan1.jpg",
  "images/gaikan2.jpg",
  "images/gaikan3.jpg"
];
let currentExterior = 0;
const exteriorSlide = document.getElementById("exteriorSlide");

function nextExteriorSlide() {
  currentExterior = (currentExterior + 1) % exteriorImages.length;
  exteriorSlide.src = exteriorImages[currentExterior];
}

setInterval(nextExteriorSlide, 3000);

// 内観スライド
const interiorImages = [
  "images/naikan1.jpg",
  "images/naikan2.jpg",
  "images/naikan3.jpg",
  "images/naikan4.jpg",
  "images/naikan5.jpg"
];
let currentInterior = 0;
const interiorSlide = document.getElementById("interiorSlide");

function nextInteriorSlide() {
  currentInterior = (currentInterior + 1) % interiorImages.length;
  interiorSlide.src = interiorImages[currentInterior];
}

setInterval(nextInteriorSlide, 3000);
