// ポスターの状態を表すフラグ
// d：デフォルト（青）
// t：強調表示（赤）
// s：検索ヒット（緑）
// e：検索中の強調表示（赤）
var pflag; 

// テスト用フラグ
// Jasmineからのみtrueにする
var test = false;

// アイコンのラベル何文字まで表示するか
// デフォルトは5文字
var labelmax = 5;

// LocalDBを開く
var db = openDatabase("PosMAppDB", "", "PosMAppDB", 1000);

// ポスターの総件数
var ptotal;

//HTMLが呼ばれた時の初期化処理
$(function() {
	// ポスターの件数をセットする
	ptotal = poster.length;

	// pflagを初期化
	// pflagの添字をポスター番号と対応させるため pflag[0]=nullとしている
	pflag = new Array(ptotal + 1);
	pflag[0] = null;
	for (var i = 1; i <= ptotal; i++) {
		pflag[i] = "d";
	}

	// 基本情報が選択されていたらそのポスターを強調表示
	if (sessionStorage.getItem("posterid") != null) {
		changeBasicInfoPanel(true);
		pflag[sessionStorage.getItem("posterid")] = "t";
	}

	// 検索中状態だったら検索にヒットしたポスターを強調表示
	// FIXME:もう一度検索しているので読み込み時遅くなる
	if (sessionStorage.getItem("searching") == "true") {
		document.getElementById("search-title").value = sessionStorage.getItem("searchWord");
		searchByTitle(sessionStorage.getItem("searchWord"));
	}

	// LocalDBの初期化
	initDB();

	// ポスターアイコンの作成
	// JSONから直接呼び出す感じで
	// とりあえずデフォルトはセッションID
	// TODO:直書きからDOMをいじくる形にする
	var str = "";
	for (var i = 1; i <= poster.length; i++) {
		str += "<div class=\"postericon horizontal\" id=\"iconNo" + i + "\">\n";
		str += "	<img id=\"icon" + i + "\" src=\"img/dpic.png\" "
				+ "width=\"100%\" height=\"100%\"></img>\n";
		str += "	<div class=\"iconindexhor\" id=\"font" + i + "\">"
				+ poster[i-1].sessionid + "</div>\n";
		str += "</div>\n";
	}
	document.getElementById("posters").innerHTML = str;

	// もしラベルが変更されていたらそれに変更
	if (sessionStorage.getItem("label") != null) {
		changeLabel(sessionStorage.getItem("label"));
	}

	// 各ポスターアイコンのタッチイベント
	$(".postericon").on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(4));
		var nextFlag = touchPoster(posterid);

		pflag[posterid] = nextFlag;
		showPosterIcons();
	});

	// タイトルで検索
	$("#search-title").bind("change", function(e, ui) {
		if (e.target.value.trim() != "" && e.target.value != null) {
			
			// 検索し、強調表示する
			searchByTitle(e.target.value);

			// 検索中フラグを立てる
			sessionStorage.setItem("searching", "true");
			sessionStorage.setItem("searchWord", e.target.value);

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

	// 詳細情報画面を表示する
	$("#detailinfobutton").on("touchstart", function(e) {
		window.location.href = "detail.html";
	});

	//bookmarkイベント
	$("#bookmarkbutton").on("touchstart", function(e) {
		changeBookMark();
	});

	// 基本情報画面の閉じるボタンを押す
	$("#basicinfo").on("touchstart", function(e) {
		console.log("hogehoge");
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

			// 検索中フラグを立てる
			sessionStorage.setItem("searching", "true");
			sessionStorage.setItem("searchWord", e.target.value);

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

	// ダイアログのボタンを押したときの挙動 : ID
	$("#label-id").on("touchstart", function() {
		changeLabel("id");
	});

	// ダイアログのボタンを押したときの挙動 : セッションID
	$("#label-sessionid").on("touchstart", function() {
		changeLabel("sessionid");
	});

	// ダイアログのボタンを押したときの挙動 : タイトル
	$("#label-title").on("touchstart", function() {
		changeLabel("title");
	});

	// ダイアログのボタンを押したときの挙動 : 代表者名
	$("#label-authorname").on("touchstart", function() {
		changeLabel("authorname");
	});

	// ダイアログのボタンを押したときの挙動 : 団体名
	$("#label-authorbelongs").on("touchstart", function() {
		changeLabel("authorbelongs");
	});

	// ポスターアイコンを表示
	// TODO:showじゃなくて別の単語に変えたい
	showPosterIcons();

});

// ラベルを変更する
function changeLabel(column) {
	sessionStorage.setItem("label", column);

	for (var i = 1; i <= ptotal; i++) {
		var str = poster[i-1][column];
		if (str.length > labelmax) {
			str = str.substring(0, labelmax) + "...";
		}
		document.getElementById("font" + i)
		.innerHTML = str;
	}
}

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
//TODO:パターンを導入しようか・・・
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
			removeAllPosterInfo();
		}

		var basicinfo = document.getElementById("basicinfo");

		basicinfo.innerHTML = 
			// "No. " 
			// + sessionStorage.getItem("posterid")+
			 " ["
			+ sessionStorage.getItem("sessionid")
			+ "]<br />"
			+ sessionStorage.getItem("title")
			+ "<br />チーム名： "
			+ sessionStorage.getItem("authorname")
			+ "<br />所属： "
			+ sessionStorage.getItem("authorbelongs");

			var bookmarkIcon = document.getElementById("bookmarkbutton");

			if(sessionStorage.getItem("bookmark") == 0){
				bookmarkIcon.src = "img/unbookmark.png";
			}else{
				bookmarkIcon.src = "img/bookmark.png";
			}
	} else {
		if (!flag) {
			removeAllPosterInfo();
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

	//すべて小文字にした検索キーワードと
	//すべて小文字にした
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

			//注意:ここでreturnしてもこのdb.transactionの返り値にはならない
			//TODO:トランザクションの非同期実行のために
			//     ここでHTMLを書いているけどなんか解決法がありそう
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
	});

	showPosterIcons();
}

// ポスターを選択する
function selectPoster(posterid) {

	// ポスターの状態で判断
	if (pflag[posterid] == "d" || pflag[posterid] == "s") {

		for (var i = 0; i < ptotal; i++) {
			var p = poster[i];
			if (p.id == posterid) {
				sessionStorage.setItem("posterid", posterid);
				sessionStorage.setItem("sessionid", p.sessionid);
				sessionStorage.setItem("title", p.title);
				sessionStorage.setItem("abstract", p.abstract);
				sessionStorage.setItem("authorname", p.authorname);
				sessionStorage.setItem("authorbelongs", p.authorbelongs);
				sessionStorage.setItem("bookmark", p.bookmark);
				sessionStorage.setItem("star", p.star);
			}
		}

		var authors = new Array();
		for (var i = 0; i < author.length; i++) {
			var a = author[i];
			if (a.posterid == posterid) {
				authors.push(a.name);
			}
		}
		sessionStorage.setItem("authors", authors);

		var keywords = new Array();
		for (var i = 0; i < keyword.length; i++) {
			var k = keyword[i];
			if (k.posterid == posterid) {
				keywords.push(k.keyword);
			}
		}
		sessionStorage.setItem("keywords", keywords);

		changeBasicInfoPanel(true);

	} else {
		// Session Storageに保存されているポスター情報をクリア
		removeAllPosterInfo();

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

// Session Storageに保存されているポスターの情報を消去する
function removeAllPosterInfo() {
	sessionStorage.removeItem("posterid");
	sessionStorage.removeItem("sessionid");
	sessionStorage.removeItem("title");
	sessionStorage.removeItem("abstract");
	sessionStorage.removeItem("authorname");
	sessionStorage.removeItem("authorbelongs");
	sessionStorage.removeItem("bookmark");
	sessionStorage.removeItem("star");
	sessionStorage.removeItem("authors");
	sessionStorage.removeItem("keyword");
}

//BookMarkから削除する
function deleteBookMark(posterid){
	db.transaction(
		function(tr) {
			tr.executeSql("UPDATE poster SET bookmark = 0 WHERE id = ?", [posterid], function(tr, rs) {
			}, function(){});
		},
		function(err) {},
		function() {}
	);
}

//BookMarkに追加する
function addBookMark(posterid){
	db.transaction(
		function(tr) {
			tr.executeSql("UPDATE poster SET bookmark = 1 WHERE id = ?", [posterid], function(tr, rs) {
			}, function(){});
		},
		function(err) {},
		function() {}
	);
}

//BookMark状態を変更する
//DB更新後にアイコンをスイッチする
function changeBookMark(){
	var bookmarkIcon = document.getElementById("bookmarkbutton");
	if(sessionStorage.getItem("bookmark") == 0){
		addBookMark(sessionStorage.getItem("posterid"));
		sessionStorage.setItem("bookmark", 1);
		bookmarkIcon.src="img/bookmark.png";
	}else{
		deleteBookMark(sessionStorage.getItem("posterid"));
		sessionStorage.setItem("bookmark", 0);
		bookmarkIcon.src="img/unbookmark.png";
	}
}

function touchPosterTest(posterid) {

}