// ページ移行
var to_area1 = document.getElementById('to_area1');
to_area1.addEventListener('click',function(){
  var index = document.getElementById('index')
  index.style.display = "none";
  var area1 = document.getElementById('area1')
  area1.style.display = "block";
});

// var to_area2 = document.getElementById('to_area2');
// to_area2.addEventListener('click',function(){
//   var index = document.getElementById('index')
//   index.style.display = "none";
//   var area2 = document.getElementById('area2')
//   area2.style.display = "block";
// });

// ホームに戻る
var to_index = document.getElementById('to_index');
to_index.addEventListener('click',function(){
  var area1 = document.getElementById('area1')
  area1.style.display = "none";
  var index = document.getElementById('index')
  index.style.display = "block";
});

// ヒストグラム作成関数


// game用JS
const mediaElem = document.getElementById('media');
const playBtn = document.getElementById('btn_play');
const pauseBtn = document.getElementById('btn_pause');
const tryBtn = document.getElementById('btn_try');
const hist_records = document.getElementById('hist_records')


// 毎秒実行する関数
var catch_records = [];
var appear_fish = [];
var counts = 0;
mediaElem.addEventListener('timeupdate',function(){
  counts++
  var playTimeBox = document.getElementById('sec');
  var playTime = mediaElem.duration - mediaElem.currentTime;
  var playTimeDisplay = Math.round(playTime);
  playTimeBox.innerHTML = playTimeDisplay;
  var appearance = Math.floor( Math.random() * 101 );
  if(appearance <= 20){
    appearfish(catch_records, counts, ap_species, appear_fish);
  }

  // 終了したときの関数
  if(mediaElem.duration == mediaElem.currentTime){
    mediaElem.pause()
    var element = document.getElementById('game_finish');
    element.style.display = "block"
    species = []
    size = []
    tyouka = []
    for (i=0; i < catch_records.length; i++){
      size.push(catch_records[i].size);
      species.push(catch_records[i].species);
      var li = document.createElement('li');
      li.textContent=`${i+1}.${catch_records[i].species} (${catch_records[i].size}cm)`;
      document.getElementById('li_records').appendChild(li);
      var total = catch_records.length;
      var gyosyu = species.filter((elem, index, self) => self.indexOf(elem) === index);
      var ngyosyu = gyosyu.length
      var max_size = Math.max.apply(null, size);
      var index = size.indexOf(max_size);
      var max_gyosyu = species[index];
      var text = '合計: ' + total + '尾<br>魚種数: ' + ngyosyu + `種 (${gyosyu})` + '<br>最大サイズ: ' + max_size + `cm (${max_gyosyu})`
      document.getElementById('tyouka').innerHTML = text;  
    };
  };
});


// 関数
// 魚出現関数(x,y,species)と引数を3つにして，魚種ごとに各値（出現時間，サイズ等）を変える
// 魚種
var ap_species = [
  {
    "species" : "ミズダコ", "size_out1": "25", "size_out2": "6", "size_in": "98", "pic": "gazou/mizu.png", "time": "2000"
  },
  {
    "species" : "アイナメ", "size_out1": "20", "size_out2": "6", "size_in": "90", "pic": "gazou/aina.png", "time": "3000"
  },
  {
    "species" : "ヒラメ", "size_out1": "15", "size_out2": "6", "size_in": "75", "pic": "gazou/hira.png", "time": "4000"
  },
  {
    "species" : "マゾイ", "size_out1": "10", "size_out2": "6", "size_in": "60", "pic": "gazou/mazo.png", "time": "5000"
  },
  {
    "species" : "オニカジカ", "size_out1": "6", "size_out2": "4", "size_in": "70", "pic": "gazou/oni.png", "time": "4000"
  },
  {
    "species" : "ゴッコ", "size_out1": "6", "size_out2": "4", "size_in": "70", "pic": "gazou/gok.png", "time": "4000"
  },
  {
    "species" : "イソバテング", "size_out1": "6", "size_out2": "4", "size_in": "80", "pic": "gazou/iso.png", "time": "3000"
  },
  {
    "species" : "シワイカナゴ", "size_out1": "6", "size_out2": "4", "size_in": "80", "pic": "gazou/ikana.png", "time": "3000"
  },
  {
    "species" : "スズメダイ", "size_out1": "3", "size_out2": "3", "size_in": "90", "pic": "gazou/suzu.png", "time": "2000"
  },
  {
    "species" : "ダンゴウオ", "size_out1": "3", "size_out2": "3", "size_in": "90", "pic": "gazou/favi.png", "time": "2000"
  }
]

function appearfish(catch_records, counts, ap_species, appear_fish){
  // 魚種選択
  var id = Math.floor( Math.random() * 10 );

  // div取得（基準位置）
  var div_apfish = document.getElementById('div_apfish');

  var div_apfish_ind = document.createElement('div');
  div_apfish_ind.id = `ind${counts}`;
  fishclass = "div_apfish_ind";
  div_apfish_ind.className = fishclass;
  size_out1 = ap_species[id].size_out1;
  size_out2 = ap_species[id].size_out2;
  size_apfish = parseInt(size_out1) + parseInt(size_out2);  //魚の全領域サイズ
  // console.log(size_apfish);
  div_apfish_ind.style.width = `${size_apfish}%`;
  div_apfish_ind.style.paddingTop = `${size_apfish}%`;
  div_apfish.appendChild(div_apfish_ind);

  // 外枠div
  var div_apfish_out = document.createElement('div');
  fishclass = "btn div_apfish_out";
  div_apfish_out.className = fishclass;
  div_apfish_out.onclick=function(){
    catch_fish(div_apfish_ind, catch_records, appear_fish);
  };
  div_apfish_ind.appendChild(div_apfish_out);

  // 内枠サイズdiv
  var div_apfish_in1 = document.createElement('div');
  fishclass = "div_apfish_in1";
  div_apfish_in1.className = fishclass;
  var in1_width = ap_species[id].size_in;  //全領域のうち，逃げる領域サイズ
  var in1_position = (100 - in1_width) / 2;
  div_apfish_in1.style.width = `${in1_width}%`;
  div_apfish_in1.style.left = `${in1_position}%`;
  div_apfish_in1.style.top = `${in1_position}%`;
  div_apfish_out.appendChild(div_apfish_in1);
  
  // 内枠div
  var div_apfish_in2 = document.createElement('div');
  fishclass = "btn div_apfish_in2";
  div_apfish_in2.className = fishclass;
  div_apfish_in2.onclick=function(){
    avoid_fish(div_apfish_out);
  };
  div_apfish_in1.appendChild(div_apfish_in2);
  
  // 画像div
  var div_apfishimg = document.createElement('div');
  fishclass = "div_apfishimg";
  div_apfishimg.className = fishclass;
  div_apfish_in2.appendChild(div_apfishimg);
  
  // 画像
  var apfishimg = document.createElement('img');
  apfishimg.src = ap_species[id].pic;
  fishclass = `apfishimg`
  apfishimg.className = fishclass
  div_apfishimg.appendChild(apfishimg);
  
  // 要素追加，位置指定
  var x = `${-Math.floor( Math.random() * (9000 / size_apfish - 2 * size_apfish + 5)) - 5}%`;  // 魚のx座標
  var y = `${-Math.floor( Math.random() * (5000 / size_apfish - 2 * size_apfish + 5)) - 5}%`;  // 魚のy座標
  div_apfish_out.style.left = x;
  div_apfish_out.style.top = y;

  // 出現した魚のリスト作成
  appear_fish.push({id: `ind${counts}`, species: ap_species[id].species, size: size_apfish});

  // 数秒後に消える
  setTimeout(function(){
    div_apfish_ind.remove();
  }, ap_species[id].time)
}

// 漁獲関数
function catch_fish(div_apfish_ind, catch_records, appear_fish){
  var id = div_apfish_ind.id;
  var fish = appear_fish.find((v) => v.id === id);
  add_records(catch_records, fish.species, fish.size)
  div_apfish_ind.remove();
}

function avoid_fish(div_apfish_ind){
  // 逃げるようなアクション追加
  div_apfish_ind.remove();
  event.stopPropagation();
}


function add_records(catch_records, species_name, size_mean) {
  // 種類
  var species = species_name
  
  // サイズ
  var r = rnorm()
  var mean = size_mean
  var sd = 5
  var size = mean + r * sd
 
  // 記録として配列に格納
  catch_records.push({species: species, size: Math.floor(size)});
  var num = document.getElementById('num');
  num.innerHTML = catch_records.length;
}


// click media
// mediaElem.addEventListener('click',function(){
//     var x = `${event.pageX}px`;
//     var y = `${event.pageY}px`;
//     if (document.getElementsByClassName("appearfish").length > 0) {
//       var fish = document.getElementsByClassName("appearfish");
//       console.log("クリック");
//       for(i=0;i<document.getElementsByClassName("appearfish").length;i++){
//         var xfish = fish[i].getBoundingClientRect().left ;
//         var yfish = fish[i].getBoundingClientRect().top ;
//         console.log("カーソル位置");
//         console.log(event.pageX, event.pageY);
//         console.log("魚位置");
//         console.log(xfish, yfish);
//         var xdis = Math.abs(event.pageX - xfish);
//         var ydis = Math.abs(event.pageY - yfish);
//         console.log("距離");
//         console.log(xdis, ydis);
//       }
//     }
// });


// ボタン
// play btn
playBtn.addEventListener('click',function(){
  if (playBtn.classList.contains("btn1")) {
    mediaElem.play();
    change_btn(playBtn);
    change_btn(pauseBtn);
  }
});

// pause btn
pauseBtn.addEventListener('click',function(){
  if (pauseBtn.classList.contains("btn1")) {
    mediaElem.pause();
    change_btn(pauseBtn);
    change_btn(playBtn);
  }
});

// // try btn
// var catch_records = [];
// tryBtn.addEventListener('click', function(){
//   if (tryBtn.classList.contains("btn1") & playBtn.classList.contains("btn2")) {
//     getfish1(catch_records);
//     change_btn(tryBtn);
//     setTimeout(function(){
//       change_btn(tryBtn);
//     }, 500)
//   }
// });


// // ボタン用関数
// function getfish1(catch_records){
//   var random_number = Math.floor( Math.random() * 101 );
//   if (random_number <= 50){
//     getfish(catch_records, 'エゾメバル', 15, 5)
//   }
//   if (random_number <= 20){
//     var ncatch = Math.floor( Math.random() * 6 );
//     for(i=0;i<ncatch;i++){
//       getfish(catch_records, 'エゾメバル', 15, 5)
//     }
//   }
//   if(random_number >= 97){
//     getfish(catch_records, 'アイナメ', 25, 5)
//   }
// }

// function getfish(catch_records, species_name, size_mean, size_sd) {
//   // 種類
//   var species = species_name
  
//   // サイズ
//   var r = rnorm()
//   var mean = size_mean
//   var sd = size_sd
//   var size = mean + r * sd
 
//   // 要素作成
//   var div_getfish1 = document.createElement('div');
//   div_getfish1.className = "getfish1"

//   // 画像
//   var fishgazou = document.createElement('img');
//   fishgazou.className = 'fishgazou';
//   fishgazou.src = "https://drive.google.com/uc?export=view&id=1eeB_F_NANaBbvmnw5AoWIgmtCMCy4t1G";
//   div_getfish1.appendChild(fishgazou);
  
//   // テキスト
//   var fishtext = document.createElement('span');
//   fishtext.textContent=`Get! ${species}(${Math.floor(size)}cm)`;
//   div_getfish1.appendChild(fishtext);

//   // リスト取得と要素追加
//   var div_getfish = document.getElementById('getfish')
//   div_getfish.appendChild(div_getfish1);

//   // 1秒後に消える
//   setTimeout(function(){
//     div_getfish.textContent = null;
//   }, 500)

//   // 記録として配列に格納
//   catch_records.push({species: species, size: Math.floor(size)});
//   var num = document.getElementById('num');
//   num.innerHTML = catch_records.length;
// }

function change_btn(btn_id){
  btn_id.classList.toggle("btn1")
  btn_id.classList.toggle("btn2")
}

// 標準正規乱数
function rnorm(){
  return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}
