//HTMLが呼ばれた時の初期化処理
$(function() {

	initPosterMap();

	// 現在はWebSQLは使用していない
	// initDB();

	// 基本情報が選択されていたらそのポスターを強調表示
	if (sessionStorage.getItem("posterid") != null) {
		changeBasicInfoPanel(true);
		pflag[sessionStorage.getItem("posterid")] = "t";
	}

	// 検索中状態だったら検索にヒットしたポスターを強調表示
	// FIXME:もう一度検索しているので読み込み時遅くなる
	if (sessionStorage.getItem("searching") == "true") {
		document.getElementById("search-bar-title").value = sessionStorage.getItem("searchWord");
		searchByTitle(sessionStorage.getItem("searchWord"));
	}

	// もしLocal Storageにbookmarksがなければ追加
	if (localStorage.getItem("bookmarks") == null) {
		localStorage.setItem("bookmarks", "");
	}

	// ポスターアイコンの作成
	// JSONから直接呼び出す感じで
	// とりあえずデフォルトはセッションID
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

	// マップ上にブックマークスターをつける
	showBookmarkIcons();

	// 詳細情報画面を表示する
	$("#detailinfobutton").goToDetailPage("touchstart");

	// 各ポスターアイコンのタッチイベント
	$(".postericon").touchPoster();

	// 基本情報画面を閉じる
	$("#basicinfo").closeBasicInfo();

	// ラベルを変更する
	$(".changelabel").changeLabel();

	// ブックマークスターのタッチイベント
	$("#bookmarkbutton").touchBookmark();

	// ポスターアイコンを表示
	// TODO:showじゃなくて別の単語に変えたい
	showPosterIcons();


	// ---------- 詳細情報画面 ----------
	setDetails();
	$("#posterList").showPosterList();

	// トップページ
	$("#goToMap").goToMapPage("touchstart");
	$("#goToList").goToListPage("touchstart");
	
	// ポスターリスト画面のボタン
	$(".listToMapBtn").jumpToMapPage();
	$(".listToDetailBtn").jumpToDetailPage();

	// 詳細表示画面の戻るボタン
	$("#detailBackButton").backToPreviousPage();

	// タブバー
	$(".topPageButton").goToTopPage("touchstart");
	$(".posterMapPageButton").goToMapPage("touchstart");
	$(".posterListPageButton").goToListPage("touchstart");
});