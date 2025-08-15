
const menuData = [
    {
      name: "【仮】悠愉そば",
      image: "images/yuyu-soba.jpg",
      desc: "厳選された沖縄県産豚肉を丁寧に煮込んだ軟骨ソーキと三枚肉、かまぼこを贅沢にのせた、当店のイチオシ沖縄そばです。\nじっくりと時間をかけて仕上げた透明感のあるスープは、あっさりしながらも深いコクがあり、中城村の風土が育んだ伝統の味をぜひご賞味ください。",
      price: "準備中",
      category: "soba",
      badge: "NEW"
    },
    {
      name: "【仮】軟骨ソーキそば",
      image: "images/nankotsu-t1.jpg",
      desc: "とろけるような柔らかさに煮込んだ自家製軟骨ソーキが絶妙な一杯です。\n特製あっさりスープと絡み合い、口の中でとろける食感が特徴です。\n手間暇かけて下処理し、臭みを徹底的に取り除いた軟骨ソーキは、当店ならではの心温まる味わいをお楽しみいただけます。",
      price: "準備中",
      category: "soba"
    },
    {
      name: "【仮】テビチそば",
      image: "images/tebichi-soba.jpg",
      desc: "処理を徹底した、ぷるぷるのテビチ（豚足）を贅沢に使った一杯です。\n時間をかけて丁寧に煮込んだテビチは、余分な脂が落ちてコラーゲンたっぷり。スープと共に口の中でとろける食感が楽しめます。\n沖縄郷土料理の代表格でもあるテビチは、美容と健康にも良いとされ、数量限定でのご提供となります。",
      price: "準備中",
      category: "soba",
      badge: "数量限定"
    },
    {
      name: "【仮】悠愉御膳",
      image: "images/soba-set.jpg",
      desc: "当店のとろける軟骨ソーキをメインに、沖縄の炊き込みご飯「ジューシー」と季節の小鉢、デザートなどが付いた、悠愉樹庵イチオシのセットメニューです。\n沖縄そばと共に、様々な沖縄郷土料理を少しずつお楽しみいただけます。\n沖縄の食文化を存分に味わえる満足度の高い御膳です。",
      price: "準備中",
      category: "set"
    },
    {
      name: "【仮】ゆし豆腐定食",
      image: "images/yushi-set.jpg",
      desc: "たっぷりのニラと自家製味噌で仕上げた、優しい味わいのゆし豆腐です。\nふわふわとした食感のゆし豆腐は、消化にも優しく、健康的な一品です。\n沖縄のソウルフードであるジューシーと季節の小鉢が付き、バランスの取れた定食です。沖縄県産大豆の旨味が詰まった、心と体に染み渡る味わいです。",
      price: "準備中",
      category: "set"
    },
    {
      name: "【仮】イナムドゥチセット",
      image: "images/inamu-set.jpg",
      desc: "「イナムドゥチ」は豚肉、こんにゃく、しいたけ、かまぼこなどを入れて味噌で煮込んだ、沖縄ではお祝いの席によく出される、ちょっと特別な一品です。\n自家製のイナムドゥチは、心と体に染み渡るような優しい味わいが特徴です。\nジューシーと小鉢が付き、沖縄の家庭料理の温かさを感じられるセットです。",
      price: "準備中",
      category: "set"
    },
    {
      name: "【仮】ジーマミ豆腐",
      image: "images/jimamitoufu.png",
      desc: "自家製のジーマミ豆腐（ピーナッツ豆腐）は、もちもちとした食感と濃厚なピーナッツの風味が特徴です。\n甘辛い特製タレと合わせることで、口の中でとろけるような絶妙なハーモニーを奏でます。\n沖縄の伝統的なおやつとしても親しまれています。",
      price: "準備中",
      category: "just"
    },
    {
      name: "【仮】じゅーしー",
      image: "images/jyushii.png",
      desc: "しょうがをたっぷり使ったフーチバー（よもぎ）じゅーしー。\nよもぎの爽やかな香りと生姜のアクセントが食欲をそそる、沖縄の炊き込みご飯です。\n沖縄そばとの相性も抜群で、セットで召し上がっていただくのがおすすめです。",
      price: "準備中",
      category: "just"
    },
    {
      name: "【仮】コーヒー＆ケーキ",
      image: "images/cofee-set.jpg",
      desc: "甘さ控えめで、食後におすすめの手作りデザートです。\n厳選した豆で丁寧に淹れたこだわりのコーヒーと、日替わりのケーキで、食後のひとときをゆったりとお過ごしください。\n自然に囲まれた癒しの空間で、心安らぐ時間を提供します。",
      price: "準備中",
      category: "sweet"
    },
    {
      name: "【仮】自家製アイス",
      image: "images/jamoka.png",
      desc: "甘さ控えめ。食後におすすめの自家製アイスです。\nさっぱりとした味わいで食後の口直しにも最適です。お子様から大人まで幅広い世代のお客様にお楽しみいただけます。",
      price: "準備中",
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
      // item.desc内の改行コード \n を <br> タグに置換します。
      const formattedDesc = item.desc.replace(/\n/g, '<br>');

      container.innerHTML += `
        <div class="bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row relative">
          ${item.badge ? `<div class="badge">${item.badge}</div>` : ''}
          <img src="${item.image}" alt="${item.name}" class="w-full md:w-1/3 object-cover cursor-pointer" onclick="openModal('${item.image}')">
          <div class="p-4 flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-bold text-red-700 mb-2">${item.name}</h3>
              <p class="text-sm text-gray-600 mb-2 text-left">${formattedDesc}</p> </div>
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
