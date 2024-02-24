// グローバルに展開
phina.globalize();

var ASSETS = {
  image: {
    desk: "img/desk1.png",

    ok1:"img/OK/babyWear.png",
    ok2:"img/OK/kimono.png",
    ok3:"img/OK/touki.png",
    ok4:"img/OK/desk.png",
    ok5:"img/OK/bag1.png",
    ok6:"img/OK/bag2.png",
    ok7:"img/OK/shoes2.png",
    ok8:"img/OK/shoes1.png",
    ok9:"img/OK/wear1.png",
    ok10:"img/OK/wear2.png",
    ok11:"img/OK/wear3.png",
    ok12:"img/OK/wear4.png",
    ok13:"img/OK/childWear.png",
    ok14:"img/OK/belt.png",

    ng1:"img/NG/ski.png",
    ng2:"img/NG/racket.png",
    ng3:"img/NG/tent.png",
    ng4:"img/NG/chair.png",
    ng5:"img/NG/phone.png",
    ng6:"img/NG/watch.png",
    ng7:"img/NG/ring.png",
    ng8:"img/NG/game.png",
    ng9:"img/NG/card.png",
    ng10:"img/NG/camera.png",
    ng11:"img/NG/tab.png",
    ng12:"img/NG/toy.png",
    ng13:"img/NG/cd.png",
    ng14:"img/NG/book.png",
  },
};
var makeTime = -2000;
var nowTime = 0;
var desk;
var score = 0;


phina.define("OK", {
  // Spriteクラスを継承
  superClass: 'Sprite',
  // コンストラクタ
  init: function() {
    // 親クラス初期化
    objRand = Math.randint(1, 14);
    this.superInit('ok'+ objRand);
    this.setSize(75,75);
  },
  update: function(){
    this.y += 5;
    if(this.hitTestElement(desk)){
      score += 100;
      this.remove();
    }
  }
});

var unicodeUnescape = function(str) {
	var result = '', strs = str.match(/\\u.{4}/ig);

	if (!strs) return '';

	for (var i = 0, len = strs.length; i < len; i++) {
		result += String.fromCharCode(strs[i].replace('\\u', '0x'));
	}

	return result;
};
/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',

  // 初期化
  init: function() {
    // super init
    this.superInit();
    var self = this;

    // 背景色
    this.backgroundColor = '#e0ffce';
    let url = new URL(window.location.href);
    let params = url.searchParams;

    //スコア
    this.scoreLabel = Label("score:" + score).addChildTo(this);
    this.scoreLabel.setPosition(500, 50);
    this.scoreLabel.fontSize = 48;
    this.scoreLabel.strokeWidth = 2;
    this.scoreLabel.stroke = '#fff';
    this.scoreLabel.fill = '#000';  // 塗りつぶし色
    this.scoreLabel.remove();

    //名前背景の四角
    this.shape = Shape().addChildTo(this);
    this.shape.setPosition(200, 300);
    this.shape.setSize(180, 60);
    this.shape.backgroundColor = '#999';

    //机
    this.desk = Sprite('desk').addChildTo(this);
    this.desk.setPosition(200,240);
    this.desk.setSize(200,60);
    this.desk.remove();

    //フラグ初期化
    this.label1_move = false;
    //ブロックがタッチできるように
    this.shape.setInteractive(true);
    //ブロックがタッチされたら動かす
    this.shape.onpointstart = function() {
      self.label1_move = true;
      self.desk.addChildTo(self);
      self.scoreLabel.addChildTo(self);
      // alert("タッチ");
    };

    //名前
    this.label1 = Label(unicodeUnescape(params.get('name'))).addChildTo(this);
    this.label1.setPosition(200, 300);
    this.label1.fontSize = 48;
    // label1.backgroundColor = '#999999'
    this.label1.strokeWidth = 2;
    this.label1.stroke = '#000';
    this.label1.fill = '#0f0';  // 塗りつぶし色

    //本文
    this.label2 = Label(unicodeUnescape(params.get('txt'))).addChildTo(this);
    this.label2.x = this.gridX.center(); // x 軸
    this.label2.y = this.gridY.center(); // y 軸
    this.label2.fontSize = 34;
    this.label2.fill = '#000';  // 塗りつぶし色

    //自分の名前
    this.label3 = Label('前田悠翔').addChildTo(this);
    this.label3.setPosition(500, 700);
    this.label3.fontSize = 40;
    this.label3.fill = '#000';  // 塗りつぶし色
  
  },
  
  //フレーム更新
  update: function(app) {
    var p = app.pointer;
    pointX = p.x;
    if(this.label1_move){
      this.shape.x = pointX;
      this.label1.x = pointX;
      this.desk.x = pointX;
    }
    if(this.label1_move && this.label1.y < 800){
      this.label1.y += 5;
      this.label2.y += 5;
      this.label3.y += 5;
      this.shape.y += 5;
      this.desk.y += 5;
      //alert('1');
    }
    if(this.label3.y > 1000){
      this.label3.remove();
      this.label2.remove();
    }

    if(this.label1.y >= 800){
      desk = this.desk;
      nowTime += app.deltaTime;
      this.scoreLabel.text = "score:" + score;
      //alert(self.desk.x);
      if(nowTime - makeTime >= 1000){
        this.addOk();
        makeTime = nowTime;
      }
    }
    
  },

  addOk: function(){
    var makeX = Math.randint(0,this.gridX.width);
    var ok = OK().addChildTo(this);
    ok.x = makeX;
  },
});

/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成

  var app = GameApp({
    startLabel: 'main', // MainScene から開始
    assets:ASSETS,
  });

  //app.enableStats();

  // 実行
  app.run();
});