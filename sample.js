// phina.js をグローバル領域に展開
phina.globalize();

// MainScene クラスを定義
phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit();
    // 背景色を指定
    this.backgroundColor = '#222';

    // 星を表示
    for (let i=0; i<32; ++i) {
      let star = StarShape().addChildTo(this);
      star.x = Math.randint(0, this.width);
      star.y = Math.randint(0, this.height);
      star.rotation = Math.randint(0, 360);

      star.stroke = 'transparent';

      star.update = function() {
        this.rotation+=4;
      };
    }
  },
});

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'main', // メインシーンから開始する
  });
  // アプリケーション実行
  app.run();
});