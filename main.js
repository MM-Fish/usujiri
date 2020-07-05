// 変数宣言その他，ホームページ開いた直後に実行
// ボタン
const mediaElem1 = document.getElementById('media1');
const mediaElem2 = document.getElementById('media2');
const playBtn1 = document.getElementById('btn_play1');
const playBtn2 = document.getElementById('btn_play2');
const pauseBtn1 = document.getElementById('btn_pause1');
const pauseBtn2 = document.getElementById('btn_pause2');
// game用変数
var catch_records1 = [];
var catch_records2 = [];
var ap_record1 = [];
var ap_record2 = [];
var counts1 = 0;
var counts2 = 0;
// 魚種
var ap_fish1 = [
  {
    "species" : "エゾメバル", "size_out1": "10", "size_out2": "6", "size_in": "60", "pic": "gazou/mazo.png", "time": "5000","size_mean": "15","size_sd": "3"
  }
]
var ap_fish2 = [
  {
    "species" : "エゾメバル", "size_out1": "10", "size_out2": "6", "size_in": "60", "pic": "gazou/mazo.png", "time": "5000","size_mean": "15","size_sd": "3"
  },
  {
    "species" : "オニカジカ", "size_out1": "10", "size_out2": "4", "size_in": "75", "pic": "gazou/oni.png", "time": "4000","size_mean": "20","size_sd": "2.5"
  },
  {
    "species" : "イソバテング", "size_out1": "10", "size_out2": "4", "size_in": "80", "pic": "gazou/iso.png", "time": "4000","size_mean": "20","size_sd": "2.5"
  },
  {
    "species" : "ゴッコ", "size_out1": "10", "size_out2": "4", "size_in": "75", "pic": "gazou/gok.png", "time": "4000","size_mean": "27.5","size_sd": "6.125"
  },
  {
    "species" : "アイナメ", "size_out1": "15", "size_out2": "6", "size_in": "75", "pic": "gazou/aina.png", "time": "3000","size_mean": "35","size_sd": "10"
  },
  {
    "species" : "シワイカナゴ", "size_out1": "6", "size_out2": "4", "size_in": "75", "pic": "gazou/ikana.png", "time": "3000","size_mean": "8.5", "size_sd": "0.75"
  },
  {
    "species" : "ヒラメ", "size_out1": "20", "size_out2": "6", "size_in": "90", "pic": "gazou/hira.png", "time": "3000","size_mean": "45","size_sd": "10"
  },
  {
    "species" : "ダンゴウオ", "size_out1": "3", "size_out2": "3", "size_in": "80", "pic": "gazou/favi.png", "time": "3000","size_mean": "4", "size_sd": "0.5"
  },
  {
    "species" : "ミズダコ", "size_out1": "25", "size_out2": "6", "size_in": "95", "pic": "gazou/mizu.png", "time": "4000", "size_mean": "15","size_sd": "5"
  },
  {
    "species" : "スズメダイ", "size_out1": "3", "size_out2": "3", "size_in": "90", "pic": "gazou/suzu.png", "time": "2000","size_mean": "6.5", "size_sd": "1.75"
  }
]
// グラフ初期値
var hist_range = 36
var x0 = 5
const chartElem1 = document.getElementById('chart1')
const chartElem2 = document.getElementById('chart2')
chartElems = [chartElem1, chartElem2]
// 空のグラフ作成
var hist_data = new Array(hist_range).fill(0);
make_hist_chart(hist_data, hist_range, x0, chartElem1);
make_bar(catch_records1, ap_fish2, chartElem2);

// クリック等のイベントで実行
// ページ移行
// index→area1
var to_area1 = document.getElementById('to_area1');
to_area1.addEventListener('click',function(){
  move_page('index', 'area1')
});

// index→area2
var to_area2 = document.getElementById('to_area2');
to_area2.addEventListener('click',function(){
  move_page('index', 'area2')
});

// area1→index
var to_index1 = document.getElementById('to_index1');
to_index1.addEventListener('click',function(){
  move_page('area1', 'index')
});

// area2→index
var to_index2 = document.getElementById('to_index2');
to_index2.addEventListener('click',function(){
  move_page('area2', 'index')
});

// 関数
function move_page(a, b){
  var a = document.getElementById(a);
  a.style.display = 'none'
  var b = document.getElementById(b);
  b.style.display = 'block'
}


// game用JS
// 毎秒実行
mediaElem1.addEventListener('timeupdate',function(){
  counts1++;
  game_main(mediaElem1, catch_records1, hist_range, x0, counts1, ap_fish1, ap_record1, 1);
});

mediaElem2.addEventListener('timeupdate',function(){
  counts2++;
  game_main(mediaElem2, catch_records2, hist_range, x0, counts2, ap_fish2, ap_record2, 2);
});


// 関数
// ゲームのメイン関数（魚の出現，記録）
function game_main(mediaElem, catch_records, hist_range, x0, counts, ap_fish, ap_record, game_id){
  var playTimeBox = document.getElementById(`sec${game_id}`);
  var playTime = mediaElem.duration - mediaElem.currentTime;
  var playTimeDisplay = Math.round(playTime);
  playTimeBox.innerHTML = playTimeDisplay;
  var appearance = Math.floor( Math.random() * 101 );
  if(appearance <= 40){
    appearfish(catch_records, counts, ap_fish, ap_record, game_id);
  }
  // 終了したときの関数
  if(mediaElem.duration == mediaElem.currentTime){
    mediaElem.pause()
    var game_finish = document.getElementById(`game_finish${game_id}`);
    game_finish.style.display = "block";
    species = [];
    size = [];
    game_list_id = game_id - 1;
    if (game_id == 1) {
      make_hist(catch_records, hist_range, x0, chartElems[game_list_id]);      
    }else if(game_id == 2){
      // make_hist(catch_records, hist_range, x0, chartElems[game_list_id]);
      make_bar(catch_records, ap_fish, chartElems[game_list_id]);
    }
    for (i=0; i < catch_records.length; i++){
      size.push(catch_records[i].size);
      species.push(catch_records[i].species);
      var li = document.createElement('li');
      li.textContent=`${i+1}.${catch_records[i].species} (${catch_records[i].size}cm)`;
      document.getElementById(`li_records${game_id}`).appendChild(li);
      var total = catch_records.length;
      var gyosyu = species.filter((elem, index, self) => self.indexOf(elem) === index);
      var ngyosyu = gyosyu.length
      var max_size = Math.max.apply(null, size);
      var index = size.indexOf(max_size);
      var max_gyosyu = species[index];
      var text = '合計: ' + total + '尾<br>魚種数: ' + ngyosyu + `種 (${gyosyu})` + '<br>最大サイズ: ' + max_size + `cm (${max_gyosyu})`
      document.getElementById(`tyouka${game_id}`).innerHTML = text;  
    };
  };
}

// ヒストグラム作成関数(釣果，x軸幅，x軸最小値，グラフ入力要素)
function make_hist(catch_records, hist_range, x0, histElem){
  // 参照渡し
  var gayas = catch_records.filter(v => v.species === "エゾメバル");
  //値渡し
  gayas = JSON.stringify(gayas);
  gayas = JSON.parse(gayas);
  // 切り捨て
  gayas_size = gayas.map(v => Math.floor(v.size));
  // ヒストグラムデータ作成
  var hist_data_1 = new Array(hist_range).fill(0);
  gayas_size.map(v => hist_data_1[v]++);
  make_hist_chart(hist_data_1, hist_range, x0, histElem);
}

// ヒストグラム作成関数(階級データ，x軸幅，x軸最小値，グラフ入力要素)
function make_hist_chart(hist_data_1, hist_range, x0, histElem){
  var hist_data_2 = {
    labels: [...Array(hist_range).keys()].map(v => v += x0),
    datasets: [{
    label:"エゾメバル",
    backgroundColor: "#5d94e7",
    borderWidth: `${3}vw`,
    data: hist_data_1
    }]
  }
  // ヒストグラム作成
  new Chart(histElem, {
    type: 'bar',
    data: hist_data_2,
    options: {
      title: {
        display: true,
        text: 'エゾメバル体長別釣果'
      },
      scales: {
        yAxes: [{
          ticks: {
            suggestedMax: 20,
            suggestedMin: 0,
            stepSize: 1
          }
        }]
      }
    }
  });
}


function make_bar(catch_records, ap_fish, barElem){
  var catch_species = catch_records.map(v => v.species);
  var ap_species = ap_fish.map(v => v.species);
  bar_data = [];
  color_bar = ["rgb(0, 20, 90)", "rgb(0, 40, 130)", "rgb(0, 60, 170)", "rgb(0, 90, 200)", "rgb(40, 120, 200)", "rgb(60, 140, 220)", "rgb(100, 170, 240)", "rgb(140, 200, 240)", "rgb(160, 230, 255)", "rgb(90, 220, 255)", "rgb(50, 200, 255)","rgb(10, 220, 255)"]
  for (var id=0; id < ap_species.length; id++) {
    var species_num = [];
    // 繰り返す
    var species_nums = [];
    species_num = catch_species.filter(v => v === ap_species[id]).length;
    species_nums.push(species_num);

    var species_data = {};
    species_data.label = ap_species[id];
    species_data.borderWidth = 1;
    species_data.backgroundColor = color_bar[id]
    species_data.borderColor = color_bar[id]
    species_data.data = species_nums;
    bar_data[id] = species_data;
  };
  make_bar_chart(bar_data, barElem);
}

// 積み立て棒グラフ作成関数(データ，)
function make_bar_chart(bar_data, barElem){
  new Chart(barElem, {
    type: 'bar',
    data: {
      labels: ["砂地"],
      datasets: bar_data,
    },
    options: {
      title: {
        display: true,
        text: '地点別釣果'
      },
      scales: {
        xAxes: [{
          stacked: true,
          categoryPercentage:0.4
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            suggestedMax: 10,
            suggestedMin: 0,
            stepSize: 1
          }
        },
      ]
      }
    }
  });
}


// 魚出現関数
function appearfish(catch_records, counts, ap_fish, ap_record, game_id){
  // 魚種選択
  var id = Math.floor( Math.random() * ap_fish.length );
  // div取得（基準位置）
  var div_apfish = document.getElementById(`div_apfish${game_id}`);
  // 個体作成div
  var div_apfish_ind = document.createElement('div');
  div_apfish_ind.id = `ind${counts}`;
  fishclass = "div_apfish_ind";
  div_apfish_ind.className = fishclass;
  size_out1 = ap_fish[id].size_out1;
  size_out2 = ap_fish[id].size_out2;
  size_apfish = parseInt(size_out1) + parseInt(size_out2);  //魚の全領域サイズ
  div_apfish_ind.style.width = `${size_apfish}%`;
  div_apfish_ind.style.paddingTop = `${size_apfish}%`;
  div_apfish.appendChild(div_apfish_ind);
  // 外枠div
  var div_apfish_out = document.createElement('div');
  fishclass = "circle div_apfish_out";
  div_apfish_out.className = fishclass;
  div_apfish_out.onclick=function(e){
    catch_fish(e.target.parentNode, catch_records, ap_fish, ap_record, game_id);
  };
  div_apfish_ind.appendChild(div_apfish_out);
  // 内枠サイズdiv
  var div_apfish_in1 = document.createElement('div');
  fishclass = "div_apfish_in1";
  div_apfish_in1.className = fishclass;
  var in1_width = ap_fish[id].size_in;  //全領域のうち，逃げる領域サイズ
  var in1_position = (100 - in1_width) / 2;
  div_apfish_in1.style.width = `${in1_width}%`;
  div_apfish_in1.style.left = `${in1_position}%`;
  div_apfish_in1.style.top = `${in1_position}%`;
  div_apfish_out.appendChild(div_apfish_in1);
  // 内枠div
  var div_apfish_in2 = document.createElement('div');
  fishclass = "circle div_apfish_in2";
  div_apfish_in2.className = fishclass;
  div_apfish_in2.onclick=function(e){
    avoid_fish(e.target.closest(".div_apfish_ind"));
  };
  div_apfish_in1.appendChild(div_apfish_in2);
  // 画像div
  var div_apfishimg = document.createElement('div');
  fishclass = "div_apfishimg";
  div_apfishimg.className = fishclass;
  div_apfish_in2.appendChild(div_apfishimg);
  // 画像
  var apfishimg = document.createElement('img');
  apfishimg.src = ap_fish[id].pic;
  fishclass = `apfishimg`
  apfishimg.className = fishclass
  div_apfishimg.appendChild(apfishimg);
  // 要素追加，位置指定
  var x = `${-Math.floor( Math.random() * (9000 / size_apfish - 2 * size_apfish + 5)) - 5}%`;  // 魚のx座標
  var y = `${-Math.floor( Math.random() * (5000 / size_apfish - 2 * size_apfish + 5)) - 5}%`;  // 魚のy座標
  div_apfish_out.style.left = x;
  div_apfish_out.style.top = y;
  // 出現した魚のリスト作成
  ap_record.push({id: `ind${counts}`, species: ap_fish[id].species});
  // 数秒後に消える
  setTimeout(function(){
    div_apfish_ind.remove();
  }, ap_fish[id].time)
}

// 漁獲関数
function catch_fish(div_apfish_ind, catch_records, ap_fish, ap_record, game_id){
  var id = div_apfish_ind.id;
  var fish = ap_record.find((v) => v.id === id);
  add_records1(catch_records, fish.species, ap_fish, game_id);
  div_apfish_ind.remove();
}

function avoid_fish(div_apfish_ind){
  // 逃げるようなアクション追加
  div_apfish_ind.remove();
  event.stopPropagation();
}

function add_records1(catch_records, species, ap_fish, game_id) {
  // 魚類
  var species = species;
  // サイズ
  var fish = ap_fish.find((v) => v.species === species);
  var mean = parseInt(fish.size_mean);
  var sd = parseInt(fish.size_sd);
  // 配列に追加
  if(species == "エゾメバル" & game_id == 1){
    for (let i = 0; i < 10; i++) {
      var rand = Math.random() * 101;
      if(rand <= 30){
        mean += 10
        add_records2(catch_records, species, mean, sd)
        mean -= 10
      }else{add_records2(catch_records, species, mean, sd)
      };  
    };
  }else{
    add_records2(catch_records, species, mean, sd)
  };
  // 漁獲日数更新
  var num = document.getElementById(`num${game_id}`);
  num.innerHTML = catch_records.length;
}

function add_records2(catch_records, species, mean, sd){
  // サイズ決定
  var size = mean + rnorm() * sd
  // 配列に格納
  catch_records.push({species: species, size: Math.floor(size *100)/100});
}

// 正規乱数作成
function rnorm(){
  return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}


// ボタン
// play btn
playBtn1.addEventListener('click',function(){
  if (playBtn1.classList.contains("btn1")) {
    mediaElem1.play();
    change_btn(playBtn1);
    change_btn(pauseBtn1);
  }
});

// pause btn
pauseBtn1.addEventListener('click',function(){
  if (pauseBtn1.classList.contains("btn1")) {
    mediaElem1.pause();
    change_btn(pauseBtn1);
    change_btn(playBtn1);
  }
});

playBtn2.addEventListener('click',function(){
  if (playBtn2.classList.contains("btn1")) {
    mediaElem2.play();
    change_btn(playBtn2);
    change_btn(pauseBtn2);
  }
});

// pause btn
pauseBtn2.addEventListener('click',function(){
  if (pauseBtn2.classList.contains("btn1")) {
    mediaElem2.pause();
    change_btn(pauseBtn2);
    change_btn(playBtn2);
  }
});

// ボタン用関数
function change_btn(btn_id){
  btn_id.classList.toggle("btn1")
  btn_id.classList.toggle("btn2")
}


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
