// バックグラウンドで処理

/*
JSON から文字列の取り出し
var json = '{"name": "赤色","colorName": "red","colorCode": "#ff0000"}';
var parseJSON = jQuery . parseJSON( json );
var name = parseJSON . name;
jQuery( '#sample' ) . text( name );

オブジェクトをJSONへ変換
var obj = new Object();
obj['key1']='value1';
obj['key2']='value2';
obj['key3']='value3';
JSON文字列 = $.stringify(obj);
*/


// WebSocketサーバへ接続
var host = "ws://localhost:8888/";
var socket = new WebSocket(host);

// worker.addEventListener('message'.. の message がイベントを結びつけている
self.addEventListener('message', function(json) {
  // 処理の内容
  
  // WebSocket へのDATA送信
  socket.send(json.data);
}, false);

/*
ready state
CONNECTING = 0;
OPEN = 1;
CLOSING = 2;
CLOSED = 3;

Read the site 'http://www.w3.org/TR/websockets/#the-websocket-interface'
*/

// console.log(socket.readyState);

socket.onerror = function() {
  // console.log("error");
}

// WebSocketサーバ接続イベント
socket.onopen = function(){
  socket.send('Ping');
  // console.log(socket.readyState);
}
// WebScocketサーバ切断イベント
socket.onclose = function(){
  // console.log(socket.readyState);
}

// メッセージ受信イベントを処理
socket.onmessage = function(message){
  // 処理を worker.addEventListener('message'.. で定義された処理へ投げ込む
  self.postMessage(message.data);
}

