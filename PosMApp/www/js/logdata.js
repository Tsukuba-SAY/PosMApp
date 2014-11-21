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



	return jsons;
}

function sendLog(json) {

}