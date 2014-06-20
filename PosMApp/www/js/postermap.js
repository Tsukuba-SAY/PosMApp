// ポスターの状態を表すフラグ
// d：デフォルト（青）
// t：強調表示（赤）
// s：検索ヒット（緑）
// e：検索中の強調表示（赤）
var pflag;

var test;

// LocalDBを開く
var db = openDatabase("PosMAppDB", "", "PosMAppDB", 1000);

// ポスターの総件数
var ptotal;

function init() {
	// ポスターの件数をセットする
	// 現在はハードコーディングで10件、要訂正
	//setPosterTotal();
	ptotal = 10;

	test = false;

	// pflagを初期化
	pflag = new Array(ptotal + 1);
	pflag[0] = null;
	for (var i = 1; i <= ptotal; i++) {
		pflag[i] = "d";
	}
}

$(function() {
	init();

	// 基本情報が選択されていたらそのポスターを強調表示
	if (sessionStorage.getItem("posterid") != null) {
		changeBasicInfoPanel(true);
		pflag[sessionStorage.getItem("posterid")] = "t";
	}

	// 検索中状態だったら検索にヒットしたポスターを強調表示
	if (sessionStorage.getItem("searching") == "true") {
		document.getElementById("search-title").value = sessionStorage.getItem("searchWord");
		searchByTitle(sessionStorage.getItem("searchWord"));
	}

	// DBの初期化
	initDB();

	// ポスターアイコンを表示
	showPosterIcons();

	// 各ポスターアイコンのタッチイベント
	$(".postericon").on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(4));

		// var icon = document.getElementById("iconNo" + e.target.id.substring(4));
		// // iconのimgタグを取得する
		// var image = icon.getElementsByTagName("img")[0];
		// var iconName = image.src.substring(image.src.indexOf("img/")+4, image.src.indexOf("img/")+8);

		// var posterid = Number(image.id.substring(4));



		var nextFlag = touchPoster(posterid);
		pflag[posterid] = nextFlag;

		showPosterIcons();
	});

	// 詳細情報画面を表示する
	$("#basicinfo").on("touchstart", function(e) {
		window.location.href = "detail.html";
	});

	// 基本情報画面の閉じるボタンを押す
	$("#closebutton").on("touchstart", function(e) {
		changeBasicInfoPanel(false);
		unselectPoster();
		showPosterIcons();
		//resetAllIcons();
	});

	// タイトルで検索
	$("#search-title").bind("change", function(e, ui) {
		if (e.target.value.trim() != "" && e.target.value != null) {
			
			// 検索し、強調表示する
			searchByTitle(e.target.value);

			// if (posterids.length == 0) {
			// 	document.getElementById("searchResult").innerHTML = "見つかりませんでした";
			// } else {
			// 	document.getElementById("searchResult").innerHTML = posterids.length + "件見つかりました";
			// }

			// 検索中フラグを立てる
			sessionStorage.setItem("searching", "true");
			sessionStorage.setItem("searchWord", e.target.value);

			// ポスターのフラグを検索中状態に変更する
			for (var i = 1; i <= ptotal; i++) {
				if (pflag[i] == "t") {
					pflag[i] = "e";
				}
			}

		} else {
			// 検索中フラグを折る
			sessionStorage.removeItem("searching");
			sessionStorage.removeItem("searchWord");

			for (var i = 1; i <= ptotal; i++) {
				if (pflag[i] == "e") {
					pflag[i] = "t";
				} else if (pflag[i] == "s") {
					pflag[i] = "d";
				}
			}

			document.getElementById("searchResult").innerHTML = "";
		}


		showPosterIcons();
		this.blur();
	});
});

// 現在のフラグを元にポスターのアイコンを表示する
function showPosterIcons() {
	var imageSrc;
	for (var i = 1; i <= ptotal; i++) {
		switch (pflag[i]) {
			case "d":
				imageSrc = "img/dpic.png";
				break;
			case "t":
				imageSrc = "img/tpic.png";
				break;
			case "s":
				imageSrc = "img/spic.png";
				break;
			case "e":
				imageSrc = "img/epic.png";
				break;
			default:
				break;
		}
		document.getElementById("icon" + i).src = imageSrc;
	}

	console.log(pflag);
}

// ポスターをタッチ
// return : タッチしたポスターの次の状態
function touchPoster(posterid) {
	if (posterid < 1 || posterid > ptotal) {
		throw new Exception();
	}

	if (sessionStorage.getItem("searching") == "true") {
		if (pflag[posterid] == "d") {
			unselectPoster();
			selectPoster(posterid);
			return "t";
		} else if (pflag[posterid] == "t") {
			changeBasicInfoPanel(false);
			unselectPoster();
			return "d";
		} else if (pflag[posterid] == "s") {
			unselectPoster();
			selectPoster(posterid);
			return "e";
		} else if (pflag[posterid] == "e") {
			changeBasicInfoPanel(false);
			unselectPoster();
			return "s";
		}
	} else {
		if (pflag[posterid] == "d") {
			unselectPoster();
			selectPoster(posterid);
			return "t";
		} else if (pflag[posterid] == "t") {
			changeBasicInfoPanel(false);
			unselectPoster();
			return "d";
		} 
	}
}

// 基本情報パネルを変更する
function changeBasicInfoPanel(flag) {
	if (!test) {

		var basicinfopanel = document.getElementById("basicinfopanel");
		if (flag) {
			basicinfopanel.style.display = "inline";
		} else {
			basicinfopanel.style.display = "none";
			sessionStorage.removeItem("posterid");
			sessionStorage.removeItem("sessionid");
			sessionStorage.removeItem("title");
			sessionStorage.removeItem("abstract");
			sessionStorage.removeItem("authorname");
			sessionStorage.removeItem("authorbelongs");
			sessionStorage.removeItem("authors");
			sessionStorage.removeItem("keywords");
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
	} else {
		if (!flag) {
			sessionStorage.removeItem("posterid");
			sessionStorage.removeItem("sessionid");
			sessionStorage.removeItem("title");
			sessionStorage.removeItem("abstract");
			sessionStorage.removeItem("authorname");
			sessionStorage.removeItem("authorbelongs");
			sessionStorage.removeItem("authors");
			sessionStorage.removeItem("keywords");
		}
	}
}

// タイトルで検索
function searchByTitle(title) {
	if (title == null || title.trim() == "") {
		return pflag;
	}

	if (title.length >= 1024) {
		throw new Exception();
	}

	var posterids = new Array();
	var ltitle = title.toLowerCase();

	db.transaction(
		function(tr) {
			tr.executeSql("SELECT id, LOWER(title) AS ltitle FROM poster WHERE ltitle LIKE ?", ["%"+ltitle+"%"], 
			function(tr, rs) {
				for (var i = 0; i < rs.rows.length; i++) {
					console.log(rs.rows.item(i).id);
					posterids.push(rs.rows.item(i).id);
				}
			}, function(){});
		},
		function(err) {
		},
		function() {
			emphasisSearchedPosters(posterids);

			if (posterids.length == 0) {
				document.getElementById("searchResult").innerHTML = "見つかりませんでした";
			} else {
				document.getElementById("searchResult").innerHTML = posterids.length + "件見つかりました";
			}
		}
	);

	return pflag;
}

// 検索されたポスターを強調表示する
function emphasisSearchedPosters(posterids) {

	// 前回の検索結果をリセットする
	for (var i = 1; i <= ptotal; i++) {
		if (pflag[i] != "t" && pflag[i] != "e") {
			pflag[i] = "d";
		}
	}

	// ヒットしたポスターを強調表示する
	posterids.forEach(function(id) {
		// すでに選択されていれば、検索ヒット中の強調表示にする
		if (pflag[id] == "t") {
			pflag[id] = "e";
		// 検索ヒット中の強調表示になっていない限り、検索ヒットにする
		} else if (pflag[id] != "e") {
			pflag[id] = "s";
		}
	})

	showPosterIcons();
}

// ポスターを選択する
function selectPoster(posterid) {

	// ポスターの状態で判断
	if (pflag[posterid] == "d" || pflag[posterid] == "s") {

		// 基本情報を取得する
		//var posterid = Number(image.id.substring(4));
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
				// 基本情報パネルを表示
				changeBasicInfoPanel(true);
			}
		);

	} else {
		// Session Storageに保存されている基本情報をクリア
		sessionStorage.removeItem("posterid");
		sessionStorage.removeItem("sessionid");
		sessionStorage.removeItem("title");
		sessionStorage.removeItem("abstract");
		sessionStorage.removeItem("authorname");
		sessionStorage.removeItem("authorbelongs");
		sessionStorage.removeItem("authors");
		sessionStorage.removeItem("keyword");

		if (sessionStorage.getItem("searching") == "true") {
			pflag[posterid] = "s";
			//searchByTitle(sessionStorage.getItem("searchWord"));
		}

		changeBasicInfoPanel(false);
	}
}

// 強調表示を解除する
function unselectPoster() {
	for (var i = 1; i <= ptotal; i++) {
		if (pflag[i] == "t") { 
			pflag[i] = "d"; 
		} else if (pflag[i] == "e") {
			pflag[i] = "s";
		}
	}
}

// すべてのアイコンをデフォルトに戻す
function resetAllIcons() {
	for (var i = 1; i <= ptotal; i++) {
		pflag[i] = "d";
	}
	showPosterIcons();
}

// ポスターの数を取得する
function setPosterTotal(){
	db.transaction(
		function(tr) {
			tr.executeSql("SELECT count(*) AS total FROM poster", [], function(tr, rs) {
				ptotal = rs.rows.item(0).total;
				sessionStorage.setItem("posterTotal", ptotal);
			}, function(){});
		},
		function(err) {},
		function() {}
	);
}

function touchPosterTest(posterid) {

}