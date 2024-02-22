// グローバルに展開
phina.globalize();
/*
 * メインシーン
 */
var unicodeUnescape = function(str) {
	var result = '', strs = str.match(/\\u.{4}/ig);

	if (!strs) return '';

	for (var i = 0, len = strs.length; i < len; i++) {
		result += String.fromCharCode(strs[i].replace('\\u', '0x'));
	}

	return result;
};

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

    //名前背景の四角
    this.shape = Shape().addChildTo(this);
    this.shape.setPosition(200, 300);
    this.shape.setSize(180, 60);
    this.shape.backgroundColor = '#999';

    //フラグ初期化
    this.label1_move = false;
    //ブロックがタッチできるように
    this.shape.setInteractive(true);
    //ブロックがタッチされたら動かす
    this.shape.onpointstart = function() {
      self.label1_move = true;
      alert("タッチ");
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
    
    if(this.label1_move){
      this.label2.y -= 5;
      this.label3.y -= 5;
      //alert('1');
    }
    if(this.label3.y < 100){
      this.label3.remove();
      this.label2.remove();
    }
  },
});

/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成

  var app = GameApp({
    startLabel: 'main', // MainScene から開始
  });

  //app.enableStats();

  // 実行
  app.run();
});