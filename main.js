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


// game用JS
const mediaElem = document.getElementById('media');
const playBtn = document.getElementById('btn_play');
const pauseBtn = document.getElementById('btn_pause');
const tryBtn = document.getElementById('btn_try');

// 毎秒実行する関数
mediaElem.addEventListener('timeupdate',function(){
  var playTimeBox = document.getElementById('sec');
  var playTime = mediaElem.duration - mediaElem.currentTime;
  var playTimeDisplay = Math.round(playTime);
  playTimeBox.innerHTML = playTimeDisplay;
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
      document.getElementById('your_records').appendChild(li);
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

// try btn
var catch_records = [];
tryBtn.addEventListener('click', function(){
  if (tryBtn.classList.contains("btn1") & playBtn.classList.contains("btn2")) {
    getfish1(catch_records);
    change_btn(tryBtn);
    setTimeout(function(){
      change_btn(tryBtn);
    }, 1000)
  }
});


// 関数
function getfish1(catch_records){
  var random_number = Math.floor( Math.random() * 101 );
  if (random_number <= 50){
    getfish(catch_records, 'エゾメバル', 15, 5)
  }
  if (random_number <= 20){
    var ncatch = Math.floor( Math.random() * 6 );
    for(i=0;i<ncatch;i++){
      getfish(catch_records, 'エゾメバル', 15, 5)
    }
  }
  if(random_number >= 97){
    getfish(catch_records, 'アイナメ', 25, 5)
  }
}

function getfish(catch_records, species_name, size_mean, size_sd) {
  // 種類
  var species = species_name
  
  // サイズ
  var r = rnorm()
  var mean = size_mean
  var sd = size_sd
  var size = mean + r * sd
 
  // 要素作成
  var div_getfish1 = document.createElement('div');
  div_getfish1.className = "getfish1"

  // 画像
  var fishgazou = document.createElement('img');
  fishgazou.className = 'fishgazou';
  fishgazou.src = "movie/mebaru.png";
  div_getfish1.appendChild(fishgazou);
  
  // テキスト
  var fishtext = document.createElement('span');
  fishtext.textContent=`Get! ${species}(${Math.floor(size)}cm)`;
  div_getfish1.appendChild(fishtext);

  // リスト取得と要素追加
  var div_getfish = document.getElementById('getfish')
  div_getfish.appendChild(div_getfish1);

  // 1秒後に消える
  setTimeout(function(){
    div_getfish.textContent = null;
  }, 1000)

  // 記録として配列に格納
  catch_records.push({species: species, size: Math.floor(size)});
  var num = document.getElementById('num');
  num.innerHTML = catch_records.length;
}

function change_btn(btn_id){
  btn_id.classList.toggle("btn1")
  btn_id.classList.toggle("btn2")
}

// 標準正規乱数
function rnorm(){
  return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}
