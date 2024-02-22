// グローバルに展開
phina.globalize();
/*
 * メインシーン
 */
var label1_move = false;
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

    // 背景色
    this.backgroundColor = '#e0ffce';
    let url = new URL(window.location.href);
    let params = url.searchParams;
    // ラベルを生成
    var shape = Shape().addChildTo(this);
    shape.setPosition(200, 300);
    shape.setSize(180, 60);
    shape.backgroundColor = '#999';
    var label1 = Label(unicodeUnescape(params.get('name'))).addChildTo(this);
    label1.setPosition(200, 300);
    label1.fontSize = 48;
    // label1.backgroundColor = '#999999'
    label1.strokeWidth = 2;
    label1.stroke = '#000';
    label1.fill = '#0f0';  // 塗りつぶし色
    shape.setInteractive(true);
    shape.onpointstart = function() {
      label1_move = true;
    };
    
    var label2 = Label(unicodeUnescape(params.get('txt'))).addChildTo(this);
    label2.x = this.gridX.center(); // x 軸
    label2.y = this.gridY.center(); // y 軸
    label2.fontSize = 34;
    label2.fill = '#000';  // 塗りつぶし色
    label2.update = function() {
      if(label2.y < 100){
        label2.remove();
      }
      if(label1_move){
        label2.y -= 5;
      }
    };

    var label3 = Label('前田悠翔').addChildTo(this);
    label3.setPosition(500, 700);
    label3.fontSize = 40;
    label3.fill = '#000';  // 塗りつぶし色
    label3.update = function() {
      if(label3.y < 100){
        label3.remove();
      }
      if(label1_move){
        label3.y -= 5;
      }
    };
  },

  // update: function() {
  //   // if(label1_move == true){
  //     // 下に移動
  //     label1.vy += 0.98;
  //     label1.y += label1.vy;

  //     // // 地面に着いたら反発する
  //     // if (label1.bottom > FLOOR_HEIGHT) {
  //     //   label1.bottom = FLOOR_HEIGHT;
  //     //   label1.vy *= -1;
  //     // }
  //   // }
  // },
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