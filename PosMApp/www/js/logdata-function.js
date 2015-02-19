$.fn.acceptCollectLog = function() {
	$(this).on("click", function(e) {
		console.log("collect log accept");

		var uid = createUID();
		localStorage.setItem("uid", uid);

		// 現在時刻を最終送信日時とする
		var date = new Date();
		localStorage.setItem("log_last_sent", date.getTime().toString());

		localStorage.setItem("accept_collect_log", true);
		window.location.href = "#selectUserCategoryDialog";
	});
};

$.fn.denyCollectLog = function() {
	$(this).on("click", function(e){
		console.log("collect log deny");

		localStorage.setItem("accept_collect_log", false);
		if(localStorage.getItem("downloadResult")){
			window.location.href = "#downloadFailDialog";
		}else{
			window.location.href = "#topPage";
		}
	});
};

// ユーザのカテゴリ分け
// 1.学生（受講者), 2.学生（見学者), 3.教員, 4.社会人・その他 
$.fn.selectUserCategory = function() {
	$(this).on("click", function(e) {
		var id = e.target.id;
		var category = id.substring(id.indexOf("-")+1);

		localStorage.setItem("category", category);
		if(localStorage.getItem("downloadResult")){
			window.location.href = "#downloadFailDialog";
		}else{
			window.location.href = "#topPage";
		}
		
	});
}

// 初期設定用
function initUserData() {
	// ログ収集許諾フラグだけを折られた時でもUIDをリセットするのは仕様
	if (localStorage.getItem("uid") === null ||
		localStorage.getItem("accept_collect_log") === null) {
		// デフォルト
		var category = 1;
		localStorage.setItem("category", category);

		window.location.href = "#checkCollectLogDialog";
	}
}

// UIDを新規に生成する
// 現在のUNIX時刻をMD5にかけたものとする(2014/11/27)
function createUID() {
	// var uid = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
	var date = new Date();
	var uid = md5(date.getTime().toString());
	return uid;
}

// ログを保存
// action : 動作の名前（文字列）, attribute : 動作（JSONオブジェクト）
function saveLog(action, attribute) {
	if (Boolean.valueOf(localStorage.getItem("accept_collect_log"))) {
		var date = new Date();
		var uid = localStorage.getItem("uid");
		var category = localStorage.getItem("category");
		var json = {};

		json["uid"] = uid;
		json["category"] = category;
		json["action"] = action;
		json["attribute"] = attribute;
		json["timestamp"] = date.getTime();

		if (uid !== null) {
			// json["uid"] = uid;
			localStorage.setItem(uid + "_" + date.getTime(), JSON.stringify(json));
		}

		var delta = date.getTime().toString() - localStorage.getItem("log_last_sent");
		var threshold = 5 * 60 * 1000;
		console.log("time delta(sec): " + (delta/1000));
		if (delta > threshold) {
			console.log("send log");
			sendLog();
		}
	}
}

// ログデータを送信
function sendLog() {
    var senddata = loadLog();
    var date = new Date();
    $.ajax({
   		url: "http://posmapp.tk/php/savelog.php",
		type: "POST",
		dataType: "json",
		data: senddata,
		timeout: 10000, // タイムアウトにするまでの時間は要検討
		success: function(data) {
			console.log("send success");
			deleteLog();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.error("send error");
			console.error("XMLHttpRequest: " + XMLHttpRequest);
			console.error("textStatus: " + textStatus);
			console.error("errorThrown: " + errorThrown);
		},
		complete: function(data) {
			console.log("send complete");
			localStorage.setItem("log_last_sent", date.getTime().toString());
		}
	});
}

// 自分のログの一覧を取得
// json : 自分のログのJSONオブジェクトを複数所持したjson（配列だけ）
function loadLog() {
	var json = {};
	var arr = [];
	var uid = localStorage.getItem("uid");

	json["uid"] = uid;

	for (var i = 0; i < localStorage.length; i++) {
		var k = localStorage.key(i);
		if (k.indexOf(uid) !== -1) {
			arr.push(JSON.parse(localStorage.getItem(k)));
		}
	}
	json["logdata"] = arr;
	console.log(JSON.stringify(json));

	return json;
}

// 自分のログを全削除
function deleteLog() {
	var uid = localStorage.getItem("uid");
	var delKey = [];

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

// 
function resetDelta() {
	var date = new Date();
	localStorage.setItem("log_last_sent", date.getTime().toString());
}