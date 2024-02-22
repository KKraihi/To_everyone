// phina.jsの初期化
phina.globalize();


phina.define('MainScene', {
    superClass: 'DisplayScene',

    // 初期化
    init: function () {
        this.superInit();

        var self = this;

        // ブロックを作成
        this.block = RectangleShape({
            width: 100,
            height: 100,
            fill: 'blue',
        }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

        // ブロックが動いているかどうかのフラグ
        this.isMoving = false;

        // タッチイベントの設定
        this.block.setInteractive(true);
        this.block.on('pointstart', function () {
            // ブロックがタッチされたら動かす
            if (!self.isMoving) {
                self.isMoving = true;
            }
        });
    },

    // 毎フレームごとの更新
    update: function (app) {
        // ブロックを動かす
        if (this.isMoving) {
            this.block.x += 2; // 移動速度を設定

            // 画面外に出たら停止する
            if (this.block.right > this.gridX.width) {
                this.isMoving = false;
            }
        }
    },
});

phina.main(function() {
    // アプリケーションを生成
  
    var app = GameApp({
      startLabel: 'main', // MainScene から開始
    });
  
    //app.enableStats();
  
    // 実行
    app.run();
  });