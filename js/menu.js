
const menuData = [
    {
      name: "悠愉（ゆうゆ）そば",
      image: "images/yuyu-soba.jpg",
      desc: "厳選された沖縄県産豚肉を丁寧に煮込んだ軟骨ソーキと三枚肉、かまぼこを贅沢にのせた、当店イチオシの沖縄そばです。\nじっくりと時間をかけて仕上げた透明感のあるスープは、あっさりしながらも深いコクがあり、中城村の風土が育んだ伝統の味をぜひご賞味ください。",
      price: "1,200",
      category: "soba",
      badge: "NEW"
    },
    {
      name: "軟骨ソーキそば",
      image: "images/nankotsu-soba.jpg",
      desc: "とろけるような柔らかさに煮込んだ自家製軟骨ソーキが絶妙な一杯です。\n特製あっさりスープと絡み合い、口の中でとろける食感が特徴です。\n余すことなく食べられる程に柔らかく煮込んだ特大ボリュームの軟骨ソーキを乗せた、当店ならではの一杯をぜひご賞味ください。",
      price: "1,250",
      category: "soba"
    },
    {
      name: "テビチそば",
      image: "images/tebichi-soba.jpg",
      desc: "ひとつひとつ丁寧に処理した、ぷるぷるのテビチ（豚足）を贅沢に使った一杯です。\n時間をかけて丁寧に煮込んだテビチは、余分な脂が落ちてコラーゲンたっぷり。スープと共に口の中でとろける食感が楽しめます。\n沖縄郷土料理の代表格でもあるテビチは、美容と健康にも良いとされ、数量限定でのご提供となります。",
      price: "1,200",
      category: "soba",
      badge: "数量限定"
    },
    {
      name: "三枚肉そば",
      image: "images/sanmai-soba.jpg",
      desc: "厳選された沖縄県産豚肉を丁寧に煮込んだ三枚肉とかまぼこをのせた王道の沖縄そばです。\nじっくりと時間をかけて仕上げたあっさりしながらも深いコクのスープと三枚肉の旨味が溶け込んだ一杯をぜひご賞味ください。",
      price: "900",
      category: "soba"
    }, 
    {
      name: "お子様そば",
      image: "images/okosama-soba.JPG",
      desc: "小さなお子様も安心して楽しめる、ミニサイズの三枚肉そばとじゅーしーのセットです。\nミニジュースとミニゼリー付きです。\n※ 小学生までご注文可能です。",
      price: "550",
      category: "soba"
    },
    {
      name: "テビチ定食",
      image: "images/tebichi-tei.JPG",
      desc: "お箸で切れる程トロトロの柔らかさに煮込んだテビチ（豚足）に、大根と昆布、豆腐などを加え、優しい味わいに仕上げました。\nプルプルのテビチと野菜も楽しめるバランスの良いボリューム満点の定食です。",
      price: "1,600",
      category: "set"
    },
    {
      name: "軟骨ソーキ定食",
      image: "images/nankotsu-tei.JPG",
      desc: "余すことなく食べられる程に柔らかく煮込んだ特大ボリュームの軟骨ソーキに、大根と昆布、豆腐などを加え、優しい味わいに仕上げました。\nスタミナと滋養を兼ね備えたボリューム満点の定食です。",
      price: "1,600",
      category: "set"
    },
    {
      name: "イナムドゥチ定食",
      image: "images/inamu-tei.JPG",
      desc: "「イナムドゥチ」は豚肉、こんにゃく、しいたけ、かまぼこなどを入れて味噌で煮込んだ、沖縄ではお祝いの席によく出される、ちょっと特別な一品です。\n自家製のイナムドゥチは、心と体に染み渡るような優しい味わいが特徴です。\nジューシーと小鉢が付き、沖縄の家庭料理の温かさを感じられるセットです",
      price: "1,600",
      category: "set"
    },
    {
      name: "ゆし豆腐定食",
      image: "images/yushi-tei.JPG",
      desc: "たっぷりのニラと自家製味噌で仕上げた、優しい味わいのゆし豆腐です。\nふわふわとした食感のゆし豆腐は、消化にも優しく、健康的な一品です。\n沖縄のソウルフードであるジューシーと季節の小鉢が付き、バランスの取れた定食です。沖縄県産大豆の旨味が詰まった、心と体に染み渡る味わいです。",
      price: "1,000",
      category: "set"
    },
    {
      name: "へちま定食",
      image: "images/hechima-tei.JPG",
      desc: "沖縄の島野菜、へちま（なーべーらー）が主役の一品です。\nたっぷりのへちまを自家製味噌でシンプルに優しく丁寧に煮込んだ、沖縄の家庭料理の代表格です。\n落とし玉子で仕上げたまろやかなスープは最後まで飲み干せる美味しさです。",
      price: "1,200",
      category: "set"
    },
    {
      name: "豆腐チャンプルー",
      image: "images/tofu-chan.JPG",
      desc: "たんぱく質豊富な島豆腐と県産の彩り野菜とともに炒め合わせた沖縄の家庭料理です。\n素材の持ち味を大切に、シンプルながら奥深い味わいに仕上げました。\n島豆腐と旬の彩り野菜が織りなす、心あたたまるひと皿です。",
      price: "1,000",
      category: "chanple"
    },
    {
      name: "ゴーヤーチャンプルー定食",
      image: "images/goya-chan.JPG",
      desc: "ゴーヤーは沖縄の夏を象徴する食材です。\nビタミンC豊富なゴーヤーとたんぱく質豊富な島豆腐、ポークの旨みが絶妙に調和した栄養バランス抜群のチャンプルーです。\n食べごたえがありながら体にやさしい、健康志向なひと皿です。",
      price: "1,000",
      category: "chanple"
    },
    {
      name: "フーチャンプルー",
      image: "images/fu-chan.JPG",
      desc: "沖縄県産の車麩を出汁でふっくら戻し、県産の彩り野菜と一緒に炒めた沖縄の家庭料理です。\nやさしい味わいと出汁の香りが広がる、どこかほっとする一品です。",
      price: "1,000",
      category: "chanple"
    },
    {
      name: "Aセット",
      image: "images/A-set.jpg",
      desc: "お得な付け合せセットです。\n 白米、じゅーしー、玄米のいずれかと、ジーマミ豆腐（中）、もずく酢をお付けしたセットになります。\n※付け合せセットのみのご注文はできません。",
      price: "300",
      category: "topping"
    },
    {
      name: "Bセット",
      image: "images/B-set.jpg",
      desc: "お得な付け合せセットです。\n 白米、じゅーしー、玄米のいずれかと、もずく天ぷら、ジーマミ豆腐（中）、もずく酢をお付けしたセットになります。\n※付け合せセットのみのご注文はできません。",
      price: "400",
      category: "topping"
    },
    {
      name: "Cセット",
      image: "images/C-set.jpg",
      desc: "お得な付け合せセットです。\n 白米、じゅーしー、玄米のいずれかと、いりちゃー、もずく天ぷら、ジーマミ豆腐（中）、もずく酢をお付けしたセットになります。\n※付け合せセットのみのご注文はできません。",
      price: "500",
      category: "topping"
    },
    {
      name: "じゅーしー",
      image: "images/jyushi-tanpin.jpeg",
      desc: "しょうがをたっぷり使ったフーチバー（よもぎ）じゅーしー。\nよもぎの爽やかな香りと生姜のアクセントが食欲をそそる、沖縄の炊き込みご飯です。\n沖縄そばとの相性も抜群で、セットで召し上がっていただくのがおすすめです。\n単品よりお得な付け合せもございます。（Aセット、Bセット、Cセット）",
      price: "250",
      category: "just"
    },
    {
      name: "白米",
      image: "images/hakumai-tan.png",
      desc: "国産米をふっくら炊き上げました。\n おかずの味を引き立てるやさしい甘みと香りの白米です。",
      price: "200",
      category: "just"
    },
    {
      name: "玄米",
      image: "images/genmai-tan.JPG",
      desc: "黒豆入り玄米ごはんをふっくら炊き上げました。\n やさしい香りと豊かな風味が、どこか懐かしい味わいを感じさせます。",
      price: "250",
      category: "just"
    },
    {
      name: "ジーマミ豆腐",
      image: "images/jimami-tan.JPG",
      desc: "自家製のジーマミ豆腐（ピーナッツ豆腐）は、もちもちとした食感と濃厚なピーナッツの風味が特徴です。\n甘辛い特製タレと合わせることで、口の中でとろけるような絶妙なハーモニーを奏でます。\n沖縄の伝統的なおやつとしても親しまれています。",
      price: "300",
      category: "just"
    },
    {
      name: "テビチ（豚足）",
      image: "images/tebichi-tan.JPG",
      desc: "ひとつひとつ丁寧に下処理を施したテビチ（豚足）を、数時間かけてじっくり煮込みました。\n見た目よりあっさりしていて、ぷるぷる食感の中にコラーゲンがたっぷり含まれ、美容と健康にも嬉しい一皿です。",
      price: "400",
      category: "just"
    },
    {
      name: "軟骨ソーキ",
      image: "images/nankotsu-tan.JPG",
      desc: "沖縄県産の軟骨ソーキを丁寧に下処理し、余分な脂を落としてからじっくり煮込みました。\nお箸で持ち上げるのが難しいほど、とろとろに仕上げた当店自慢の一品です。",
      price: "400",
      category: "just"
    },
    {
      name: "もずく天ぷら",
      image: "images/mozuku-tan.JPG",
      desc: "沖縄産の新鮮なもずくに、ポーク／大葉／玉ねぎを合わせてカラっと揚げた天ぷらです。\n創業者こだわりの味を受け継ぐ、悠愉樹庵（ゆうゆじゅあん）の新メニューです。",
      price: "60",
      category: "just",
      badge: "NEW"
    },
    {
      name: "イリチャー",
      image: "images/mozuku-tan.JPG",
      desc: "切り干し大根／昆布／こんにゃく／椎茸／三枚肉をじっくり炒め煮にした沖縄の家庭料理です。\n鰹と豚だしの旨みが染みた、しっとり優しい味わいです。",
      price: "400",
      category: "just"
    },
    {
      name: "チーズケーキ",
      image: "images/cake.JPG",
      desc: "しっとりとした食感と、やさしい甘さが広がる悠愉樹庵（ゆうゆじゅあん）の自家製チーズケーキです。\n紅芋と里芋（ターム）を季節ごとに使い分け、旬の美味しさを大切にしています。\n ※写真は「紅芋チーズケーキ」になります。",
      price: "400",
      category: "sweet"
    },
    {
      name: "ケーキセット",
      image: "images/cake_coffee.JPG",
      desc: "悠愉樹庵（ゆうゆじゅあん）の自家製チーズケーキと厳選した豆で丁寧に淹れたこだわりのコーヒー、または紅茶のセットになります。\n食後のひとときをゆったりとお過ごしください。\n ※写真は「紅芋チーズケーキ」になります。",
      price: "700",
      category: "sweet"
    },
    {
      name: "ホットぜんざい",
      image: "images/hotzenzai.png",
      desc: "自然由来の甘みがうれしい、沖縄産黒糖のホットぜんざいです。\nミネラル豊富な沖縄県産黒糖のコクと白玉のもちもち食感が重なる、心にも体にもやさしい甘味です。",
      price: "500",
      category: "sweet"
    },
    {
      name: "黒糖ぜんざい",
      image: "images/ice-zenzai2.png",
      desc: " 沖縄産黒糖で仕上げたホットぜんざいを、ひんやり冷やしてかき氷にトッピングしました。\n優しい甘みと涼やかな口どけが楽しめます。\n宇治抹茶の無料トッピングもございます。\n ※練乳のトッピングもプラス¥50で可能です。",
      price: "500",
      category: "sweet"
    },
    {
      name: "黒糖ぜんざい",
      image: "images/ice-zenzai2.png",
      desc: " 沖縄産黒糖で仕上げたホットぜんざいを、ひんやり冷やしてかき氷にトッピングしました。\n優しい甘みと涼やかな口どけが楽しめます。\n宇治抹茶の無料トッピングもございます。\n ※練乳のトッピングもプラス¥50で可能です。",
      price: "500",
      category: "sweet"
    },
    {
      name: "かき氷",
      image: "images/ice-ichigo.png",
      desc: " 夏の定番、ひんやり甘いかき氷です。いちご／メロン／ぶどう／ブルーハワイ／宇治抹茶の5種類からお選びいただけます。\n※練乳のトッピングもプラス¥50で可能です。",
      price: "250",
      category: "sweet"
    }
    /*
    {
      name: "【仮】タコライス",
      image: "images/takorice.jpeg",
      desc: "ごはんの上にスパイシーなタコスミート、シャキシャキのレタス、フレッシュなトマト、チーズをのせた沖縄発祥の人気料理です。\nボリューム満点で子どもから大人まで気取らず楽しめる大満足の一品です。",
      price: "準備中",
      category: "just",
      badge: "NEW"
    },
    
    {
      name: "ケーキセット",
      image: "images/cofee-set.jpg",
      desc: "甘さ控えめで、食後におすすめの手作りデザートです。\n厳選した豆で丁寧に淹れたこだわりのコーヒーと素材の甘味を活かした悠愉樹庵チーズケーキで、食後のひとときをゆったりとお過ごしください。\n　「紅芋」と「里芋」を季節ごとに使い分け、旬の美味しさを大切にしています。
      price: "準備中",
      category: "sweet"
    }
    */
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
        <div class="bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row relative w-full md:w-[620px]">
          ${item.badge ? `<div class="badge">${item.badge}</div>` : ''}
          <img src="${item.image}" alt="${item.name}" class="w-full md:w-[53%] h-auto object-cover cursor-pointer" onclick="openModal('${item.image}')">
          <div class="p-4 flex flex-col justify-between w-auto md:w-[400px]">
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
