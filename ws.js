// http 待ち受け
var connect = require('connect');

connect.createServer(
  // 実行ディレクトリ
  connect.static(__dirname)
).listen(80);


// websocket 待ち受け
var ws = require("websocket.io");

// 8888番ポートでクライアントからの接続待ち
var server = ws.listen(8888,
  function () {
    console.log("ws start");
  }
);


// クライアントからの接続イベントを処理
server.on("connection", function(socket) {

  //  クライアントからのメッセージ受信イベントを処理
  socket.on("message", function(data) {
  
    console.log("message " + data);

    // 全クライアントへメッセージを送信する
    server.clients.forEach(function(client) {
      client.send(data);
    });
  
  });


});
