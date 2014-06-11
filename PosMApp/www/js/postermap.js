$(function() {
	$(".postericon").on('touchstart', function(e) {
		var icon = document.getElementById("iconNo" + e.target.id.substring(4));
		getBasicInfo(icon);
	});

	$("#basicinfo").on('touchstart', function(e) {
		showDetailInfoPage();
	});

	$("#closebutton").on('touchstart', function(e) {
		resetIcons();
	});
});

// LocalDBを開く
var db = openDatabase("PosMAppDB", "", "PosMAppDB", 1000);

function showDetailInfoPage() {
	window.location.href = "detail.html";
}

function changeBasicInfoPanel(flag) {
	var basicinfopanel = document.getElementById("basicinfopanel");
	if (flag) {
		basicinfopanel.style.display = "inline";
	} else {
		basicinfopanel.style.display = "none";
	}

	var basicinfo = document.getElementById("basicinfo");

	basicinfo.innerHTML = "No. " 
		+ sessionStorage.getItem("posterid")
		+ " ["
		+ sessionStorage.getItem("sessionid")
		+ "]<br />"
		+ sessionStorage.getItem("title")
		+ "<br />発表者： "
		+ sessionStorage.getItem("authorname")
		+ "<br />所属： "
		+ sessionStorage.getItem("authorbelongs");
}

function init() {
	if (sessionStorage.getItem("posterid") != null) {
		changeBasicInfoPanel(true);
		var iconid = "icon" + sessionStorage.getItem("posterid");
		document.getElementById(iconid).src = "img/tpic.png";
	}

	initDB();
}

function getBasicInfo(icon) {
	// iconのimgタグを取得する
	var image = icon.getElementsByTagName("img")[0];

	// 強調表示されているかどうかで場合分け
	// 画像ファイルの名前で判断している
	if (image.src.indexOf("dpic") != -1) {

		// 基本情報を取得する
		var posterid = Number(image.id.substring(4));
		db.transaction(
			function(tr) {						
				// ポスターの情報を取得する
				tr.executeSql("SELECT * FROM poster WHERE id = ?", [posterid], function(transaction, returnSet){
					if (returnSet.rows.length > 0) {
						var row = returnSet.rows.item(0);

						// (furuya)
						// rowの中に選択したポスターのIDに対応するDB内の基本情報が入っている
						// row.(属性名)で各属性が取り出せる (例:row.titleで発表名)
						console.log(row.title);

						// Session Storageに保存
						sessionStorage.setItem("posterid", posterid);
						sessionStorage.setItem("sessionid", row.sessionid);
						sessionStorage.setItem("title", row.title);
						sessionStorage.setItem("abstract", row.abstract);
						sessionStorage.setItem("authorname", row.authorname);
						sessionStorage.setItem("authorbelongs", row.authorbelongs);
					}

				}, function(){});

				// ポスターの発表者一覧を取得する
				tr.executeSql("SELECT * FROM author WHERE posterid = ?", [posterid], function(tr, rs) {
					// 発表者を保存するArray
					var authors = new Array();

					for (var i = 0; i < rs.rows.length; i++) {
						var row = rs.rows.item(i);
						authors.push(row.name);
					}
					console.log(authors);

					// Session Storageに保存
					sessionStorage.setItem("authors", authors);
				}, function(){});

				//　ポスターのキーワード一覧を取得する
				tr.executeSql("SELECT * FROM keyword WHERE posterid = ?", [posterid], function(tr, rs){
					// キーワードを保存するArray
					var keywords = new Array();

					for (var i = 0; i < rs.rows.length; i++) {
						var row = rs.rows.item(i);
						keywords.push(row.keyword);
					}
					console.log(keywords);

					// Session Storageに保存
					sessionStorage.setItem("keywords", keywords);
				}, function(){});
			},
			function(err) {},
			function() {
				changeBasicInfoPanel(true);
			}
		);

		resetIcons();
		image.src = "img/tpic.png";


	} else {
		image.src = "img/dpic.png";
		changeBasicInfoPanel(false);

	}
}

function resetIcons() {
	for (var i = 1; i <= 10; i++) {
		var image = document.getElementById("icon" + i);
		image.src = "img/dpic.png";
		changeBasicInfoPanel(false);
	}
}