//HTMLが呼ばれた時の初期化処理
$(init);

function init() {
	initPosterMap();

	// 現在はWebSQLは使用していない
	// initDB();

	// ポスターアイコンの作成
	// JSONから直接呼び出す感じで
	// とりあえずデフォルトはセッションID
	setPosterIcons();

	// ポスターアイコンを表示
	// TODO:showじゃなくて別の単語に変えたい
	showPosterIcons();

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
	$("#basicinfo").css("width", window.innerWidth - 80);
	$("#basicinfo").css("max-width", window.innerWidth - 80);


	// ラベルを変更する
	$(".changelabel").changeLabel();
	$("#changelabel").css("zoom", window.innerWidth/1200);

	// ブックマークスターのタッチイベント
	$("#bookmarkbutton").touchBookmark();

	windowManager();


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
}