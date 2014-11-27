// UIDを新規に生成する
function createUID() {
	var uid = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
	return uid;
}

// ログを保存
// action : 動作の名前（文字列）, attribute : 動作（JSONオブジェクト）
function saveLog(action, attribute) {
	var date = new Date();
	var uid = localStorage.getItem("uid");
	var json = {};

	json["uid"] = uid;
	json["action"] = action;
	json["attribute"] = attribute;
	json["timestamp"] = date.getTime();

	if (uid !== null) {
		// json["uid"] = uid;
		localStorage.setItem(uid + "_" + date.getTime(), JSON.stringify(json));
	}
}

// ログデータを送信
function sendLog() {
    var senddata = loadLog();
    $.ajax({
   		url: "http://104.236.5.92/PosLog/savelog.php",
		type: "POST",
		dataType: "json",
		data: senddata,
		timeout: 10000,
		success: function(data) {
			console.log("send success");
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("send error");
		}
	});
}

// 自分のログの一覧を取得
// json : 自分のログのJSONオブジェクトを複数所持したjson（配列だけ）
function loadLog() {
	var json = new Array();
	var uid = localStorage.getItem("uid");

	for (var i = 0; i < localStorage.length; i++) {
		var k = localStorage.key(i);
		if (k.indexOf(uid) !== -1) {
			json.push(JSON.parse(localStorage.getItem(k)));
		}
	}
	console.log(JSON.stringify(json));

	return json;
}

// 自分のログを全削除
function deleteLog() {
	var uid = localStorage.getItem("uid");
	var delKey = new Array();

	for (var i = 0; i < localStorage.length; i++) {
		var k = localStorage.key(i);
		if (k.indexOf(uid) !== -1) {
			delKey.push(k);
		}
	}
	delKey.forEach(function(k) {
		localStorage.removeItem(k);
	});
}