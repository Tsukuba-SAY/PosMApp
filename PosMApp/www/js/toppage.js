$(function() {
	setDetails();
	showposterlist();

	//ポスターリスト画面の各「詳細情報」ボタンをクリックする時
	$(".listToDetailBtn").on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(9));
		listToDetail(posterid);
	});

	//ポスターリスト画面の各「これどこ？」ボタンをクリックする時
	$(".listToMapBtn").on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(9));
		listToMap(posterid);
	});

	// 詳細情報画面を表示する
	$("#detailinfobutton").on("touchstart", function(e) {
		setDetails();
		changePage("#detailPage");
	});
	
	// ポスターマップ画面に遷移
	$("#goToMap").on("touchstart", function() {
		changePage("#posterMapPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").addClass("ui-btn-active ui-state-persist");
	});

	// リスト画面に遷移
	$("#goToList").on("touchstart", function() {
		changePage("#posterListPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").addClass("ui-btn-active ui-state-persist");
	});


	// タブのボタン
	// トップページボタン
	$(".topPageButton").on("click", function() {
		changePage("#topPage");
		$(".topPageButton").addClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
	});
	// ポスターマップ画面ボタン
	$(".posterMapPageButton").on("click", function() {

		changePage("#posterMapPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").addClass("ui-btn-active ui-state-persist");
	});
	// リスト画面ボタン
	$(".posterListPageButton").on("click", function() {
		changePage("#posterListPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").addClass("ui-btn-active ui-state-persist");
	});
});

function setDetails() {
	$("#detail-posterid").html(sessionStorage.getItem("posterid"));
	$("#detail-sessionid").html(sessionStorage.getItem("sessionid"));
	$("#detail-title").html(sessionStorage.getItem("title"));
	$("#detail-authors").html(sessionStorage.getItem("authors"));
	$("#detail-authorbelongs").html(sessionStorage.getItem("authorbelongs"));
	$("#detail-authorname").html(sessionStorage.getItem("authorname"));
	$("#detail-keywords").html(sessionStorage.getItem("keywords"));
	$("#detail-abstract").html(sessionStorage.getItem("abstract"));
}

function changePage(pagename) {
	window.location.href = pagename;
	return pagename;
}