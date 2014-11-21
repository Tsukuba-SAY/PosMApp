var date = new Date();

// ログを保存
// json : データのJSONオブジェクト
function saveLog(json) {
	var uid = localStorage.getItem("uid");
	if (uid !== null) {
		json["uid"] = uid;
		localStorage.setItem(uid + "_" + date.getTime(), JSON.stringify(json));
	}
}

function loadLog() {
	var jsons = new Array();
	var uid = localStorage.getItem("uid");

	for (var i = 0; i < localStorage.length; i++) {
		var k = localStorage.key(i);
		if (k.indexOf(uid) !== -1) {
			json.push(localStorage.getItem(k));
		}
	}

	return jsons;
}

function sendLog(json) {

}