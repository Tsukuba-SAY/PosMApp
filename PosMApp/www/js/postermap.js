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
	init();

	initDB();

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

	// もしLocal Storageにbookmarksがなければ追加
	if (localStorage.getItem("bookmarks") == null) {
		localStorage.setItem("bookmarks", "");
	}

	// ポスターアイコンの作成
	// JSONから直接呼び出す感じで
	// とりあえずデフォルトはセッションID
	// TODO:直書きからDOMをいじくる形にする
	var str = "";

	for (var i = 1; i <= poster.length; i++) {
		str += "<div class='postericonframe' id='iconNo" + i + "''>\n";
		str += "	<div class='postericon horizontal'>\n";
		str += "		<img id='icon" + i + "' src='img/dpic.png' " + "width='100%' height='100%'></img>\n";
		str += "		<div class='iconindexhor' id='font" + i + "'>" + poster[i-1].sessionid + "</div>\n";
		str += "	</div>\n";
		str += "	<div id='starTopNo" + i +"' class='star-top'><img src='img/bookmark.png' style='width:15px;height:15px;display:none;'></img></div>\n";
		str += "    <div id='starRightNo" + i + "' class='star-right'><img src='img/bookmark.png' style='width:15px;height:15px;display:none;'></img></div>\n";
		str += "	<div id='starBottomNo" + i + "' class='star-bottom'><img src='img/bookmark.png' style='width:15px;height:15px;display:none;'></img></div>\n";
		str += "	<div id='starLeftNo" + i + "' class='star-left'><img src='img/bookmark.png' style='width:15px;height:15px;display:none;'></img></div>\n";
		str += "</div>\n";
	}
	document.getElementById("posters").innerHTML = str;

	// もしラベルが変更されていたらそれに変更
	if (sessionStorage.getItem("label") != null) {
		changeLabel(sessionStorage.getItem("label"));
	}

	// ブックマークがLocal Storageに保存されていればマップ上に星をつける
	// カンマ区切りでポスターIDが保存されているのでそれを区切った配列を生成する
	var bookmarkArr = localStorage.getItem("bookmarks").split(",");
	for (var i = 0; i < bookmarkArr.length; i++) {
		var posterid = parseInt(bookmarkArr[i]);
		if (!isNaN(posterid)) {
			var p = poster[posterid-1];
			// ポスターのstar属性によって配置する位置を決定する
			// 1が上で時計回り
			switch (p.star) {
				case 1:
				starelem = document.getElementById("starTopNo" + posterid);
				break;
				case 2:
				starelem = document.getElementById("starRightNo" + posterid);
				break;
				case 3:
				starelem = document.getElementById("starBottomNo" + posterid);
				break;
				case 4:
				starelem = document.getElementById("starLeftNo" + posterid);
				default:
				console.log("Error");
			}
			// 該当する星要素を表示する
			starelem.childNodes[0].style.display = "block";
		}

	}

	// 各ポスターアイコンのタッチイベント
	$(".postericon").on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(4));

		var nextFlag = touchPoster(posterid);

		pflag[posterid] = nextFlag;
		showPosterIcons();
	});

	// 詳細情報画面を表示する
	$("#detailinfobutton").on("touchstart", function(e) {
		window.location.href = "detail.html";
	});

	// 基本情報画面の閉じるボタンを押す
	$("#basicinfo").on("touchstart", function(e) {
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

			// 各ポスターに対して検索中状態から未検索状態へフラグを変化させる
			for (var i = 1; i <= ptotal; i++) {
				// 検索中強調表示ならばただの強調表示に、ヒット状態なら元に戻す
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

	// ラベルを変更する
	$(".changelabel").on("touchstart", function(e) {
		// 押されたボタンのidを取得する
		var id = $(this).attr("id");
		// idの"-"より後がposterテーブルの属性と対応しているので、それを渡す
		changeLabel(id.substr(id.indexOf("-") + 1));
	})

	// ブックマークを追加・削除する
	$("#bookmarkbutton").on("touchstart", function(e) {
		changeBookmark();
	});

	// ポスターアイコンを表示
	// TODO:showじゃなくて別の単語に変えたい
	showPosterIcons();
});

function init() {

	// ポスターの件数をセットする
	ptotal = poster.length;

	// pflagを初期化
	// pflagの添字をポスター番号と対応させるため pflag[0]=nullとしている
	pflag = new Array(ptotal + 1);
	pflag[0] = null;
	for (var i = 1; i <= ptotal; i++) {
		pflag[i] = "d";
	}

	

}

// ラベルを変更する
function changeLabel(column) {
	// Session Storageに対応する属性の値をセットする
	sessionStorage.setItem("label", column);

	// 各ポスターに対してラベルを変更する
	for (var i = 1; i <= ptotal; i++) {
		var str = poster[i - 1][column];
		// 長さがlabelmax文字以上になっていたら短縮する
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
// TODO: パターンを導入しようか・・・
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
		var bookmarkArr = localStorage.getItem("bookmarks").split(",");
		var foundBookmark = false;
		console.log(sessionStorage.getItem("posterid"));
		for (var i = 0; i < bookmarkArr.length; i++) {
			if (parseInt(sessionStorage.getItem("posterid")) == parseInt(bookmarkArr[i])) {
				foundBookmark = true;
				break;
			}
		}
		if (foundBookmark) {
			bookmarkIcon.src = "img/bookmark.png";
		} else {
			bookmarkIcon.src = "img/unbookmark.png";
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
	sessionStorage.removeItem("keywords");
}

// BookMark状態を変更する
// DB更新後にアイコンをスイッチする
function changeBookmark(){
	// bookmarkされたポスターIDを保存する
	var bookmarks;
	var bookmarkIcon = document.getElementById("bookmarkbutton");
	var posterid = sessionStorage.getItem("posterid");
	var location = -1;

	bookmarks = localStorage.getItem("bookmarks");
	var bookmarkArr = bookmarks.split(",");
	for (var i = 0; i < bookmarkArr.length; i++) {
		//該当ポスターがブックマークリストに存在しているかどうか確認する
		if (parseInt(posterid) == parseInt(bookmarkArr[i])) {
			location = i;
			break;
		}
	}

	var starstatus;

	if (location != -1) {
		// ない場合
		// 存在しているIDを削除する
		bookmarkArr.splice(location, 1);
		bookmarkIcon.src = "img/unbookmark.png";
		starstatus = "none";
	} else {
		// ある場合
		bookmarkArr.push(posterid);
		bookmarkIcon.src = "img/bookmark.png";
		starstatus = "block";
	}

	var p = poster[posterid-1];
	switch (p.star) {
		case 1:
		starelem = document.getElementById("starTopNo" + posterid);
		break;
		case 2:
		starelem = document.getElementById("starRightNo" + posterid);
		break;
		case 3:
		starelem = document.getElementById("starBottomNo" + posterid);
		break;
		case 4:
		starelem = document.getElementById("starLeftNo" + posterid);
		default:
		console.log("Error");
	}
	starelem.childNodes[0].style.display = starstatus;

	bookmarks = bookmarkArr.join(",");
	localStorage.setItem("bookmarks",bookmarks);
	
}

function touchPosterTest(posterid) {

}