$(function() {
	setDetails();
	showposterlist();

	// トップページ
	$("#goToMap").goToMapPage("touchstart");
	$("#goToList").goToListPage("touchstart");
	
	// ポスターリスト画面のボタン
	$(".listToMapBtn").jumpToMapPage();
	$(".listToDetailBtn").jumpToDetailPage();

	// 詳細表示画面の戻るボタン
	$("#detailBackButton").backToPreviousPage();

	// タブバー
	$(".topPageButton").goToTopPage("click");
	$(".posterMapPageButton").goToMapPage("click");
	$(".posterListPageButton").goToListPage("click");
});