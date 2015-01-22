// ローディング画面
// TODO: 非同期化
$(window).load(function() {
	$("#loading").hide();
})

// HTMLが呼ばれた時の初期化処理
$(init);

// 初期化順は全体に影響するので、追加変更する場合は注意
function init() {

	// トップページの大きさ調整
	$("#topPageFrame")
		.css("width", window.innerWidth)
		.css("max-width", window.innerWidth);

	// 固有識別IDが設定されていなければ、初期設定する
	$("#acceptCollectLog").acceptCollectLog();
	$("#denyCollectLog").denyCollectLog();
	$(".selectUserCategoryButton").selectUserCategory();
	if (localStorage.getItem("uid") === null) {
		initUserData();
	}

	//　ポスターデータのダウンロード
	//　各mapに関する変数に値を与える
	downloadPoster();

	// データ格納変数に据え置きの初期データを格納する
	initData();

	//ダウンロード失敗ダイアログのボタン
	$("#ReDownload").reDownload();
	$("#CancelDownload").cancelDownload();

	//再ダウンロードdivのイベント
	$(".reDownloadDIVCLS").reDownloadFun();
	//「再読み込み」ボタンを押す
	$(".ReDownloadBtn").reDownloadFun();

	// loading中の画像が表示するかどうかを判断する
	// none:非表示
	if(localStorage.getItem("downloadSuccess")){
		//topPageの「再ダウンロード」ボタンを隠す
		$("#reDownloadDIV").hide();
		//リスト画面とマップ画面のボタンを表示しない
		$(".ReDownloadBtn").hide();
	}

	initPosterMap();

	// 会場の画像を1日目に変更
	setChangePosterMapDate();
	changePosterMapDate(1);

	// 現在はWebSQLは使用していない
	// initDB();

	// ポスターアイコンの作成
	// JSONから直接呼び出す感じで
	// とりあえずデフォルトはセッションID
	setPosterIcons();

	// Hammer on stage
	initHammer();

	$("#resetScaleButtonFrame").css("zoom", window.innerWidth/1200);

	// ポスターアイコンを表示
	// TODO:showじゃなくて別の単語に変えたい
	showPosterIcons();

	// ポスターのラベルのサイズを設定
	setLabelSize();

	// // 基本情報が選択されていたらそのポスターを強調表示
	// if (sessionStorage.getItem("posterid") !== null) {
	// 	changeBasicInfoPanel(true);
	// 	pflag[sessionStorage.getItem("posterid")] = "t";
	// 	showPosterIcons();
	// }
	removeAllPosterInfo();

	// // 検索中状態だったら検索にヒットしたポスターを強調表示
	// // FIXME:もう一度検索しているので読み込み時遅くなる
	// if (sessionStorage.getItem("searching") === "true") {
	// 	//document.getElementById("search-bar-title").value = sessionStorage.getItem("searchWord");
	// 	$("#search-bar-title").attr("value", sessionStorage.getItem("searchWord"));
	// 	searchAll(sessionStorage.getItem("searchWord"));
	// }
	sessionStorage.removeItem("searching");
	sessionStorage.removeItem("searchWord");

	// もしLocal Storageにbookmarksがなければ追加
	if (localStorage.getItem("bookmarks") === null) {
		localStorage.setItem("bookmarks", "");
	}

	// もしラベルが変更されていたらそれに変更
	if (sessionStorage.getItem("label") !== null) {
		changeLabel(sessionStorage.getItem("label"));
	}

	// マップ上にブックマークスターをつける
	showBookmarkIcons();

	// 詳細情報画面を表示する
	$("#detailinfobutton").goToDetailPage("click");

	// 各ポスターアイコンのタッチイベント
	$(".postericon").touchPoster();

	// 基本情報画面を閉じる
	$("#basicinfo")
		.css("width", window.innerWidth - 80)
		.css("max-width", window.innerWidth - 80)
		.closeBasicInfo();


	// ラベルを変更する
	$(".changelabel").changeLabel();
	$("#changelabel").css("zoom", window.innerWidth/1200);

	// ブックマークスターのタッチイベント
	$("#bookmarkbutton").touchBookmark();


	// ---------- 詳細情報画面 ----------
	setDetails();
	
	// $("#bookmarkList").showBookmarkList();


	// トップページ
	$("#goToMap").goToMapPage("click");
	$("#goToList").goToListPage("click");
	$("#goToInformation").goToInformationPage("click");
	$("#goToVenue").goToVenuePage("click");

	$("#presenList").showPresenList();

	// ポスターリスト画面のボタン
	$(".listToMapBtn").jumpToMapPage();
	$(".listToDetailBtn").jumpToDetailPage();
	$(".listbookmarkbutton").listchangebookmark();

	$("#bookmarkList").showBookmarkList();

	// ブックマークリスト画面のボタン
    $(".bookmarklistToMapBtn").bookmarklistToMapPage();
	$(".bookmarklistToDetailBtn").bookmarklistToDetailPage();
	$(".bookmarklistbookmarkbutton").deletebookmark();

	//リスト切替ボタン
	$("#listChangeBtn").change(function(e) {
    	changeShowList($(this).val());
	});
	changeShowList("presen");


	// 詳細表示画面の戻るボタン
	$("#detailBackButton").backToPreviousPage();

	// タブバー
	$(".topPageButton").goToTopPage("click");
	$(".posterMapPageButton").goToMapPage("click");
	$(".presenListPageButton").goToListPage("click");
	$(".venuePageButton").goToVenuePage("click");	
	$(".informationPageButton").goToInformationPage("click");

	// セッションリストから発表リストに飛ぶ
	$(".jumpToPresen").jumpToPresen();


	$("#changeDate01").changeDate('sessiontable1');
	$("#changeDate02").changeDate('sessiontable2');
	$("#changeDate03").changeDate('sessiontable3');

	// 1日目のセッションを表示しておく

	$("#changeDate01").trigger('click');


	// 星の大きさをリセット
	$(".bookmarkstar").sizeUpBookmarkStar();


	// タブバーの選択表示を変更
	var currentPage = window.location.hash;
	switch (currentPage) {
		case "#posterMapPage":
			$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".venuePageButton").removeClass("ui-btn-active ui-state-persist");
			$(".posterMapPageButton").addClass("ui-btn-active ui-state-persist");
			$(".informationPageButton").removeClass("ui-btn-active ui-state-persist");
			break;
		case "#presenListPage":
			$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".venuePageButton").removeClass("ui-btn-active ui-state-persist");
			$(".presenListPageButton").addClass("ui-btn-active ui-state-persist");
			$(".infromationPageButton").removeClass("ui-btn-active ui-state-persist");
			break;
		case "#informationPage":
			$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".informationPageButton").addClass("ui-btn-active ui-state-persist");
			$(".venuePageButton").removeClass("ui-btn-active ui-state-persist");
			break;
		case "#venuePage":
			$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".venuePageButton").addClass("ui-btn-active ui-state-persist");
			$(".informationPageButton").removeClass("ui-btn-active ui-state-persist");
			break;
		default:
			$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".informationPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".venuePageButton").removeClass("ui-btn-active ui-state-persist");
			break;
	}
}