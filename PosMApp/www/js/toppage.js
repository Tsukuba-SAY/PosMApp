$(function() {
	setDetails();
	showposterlist();

	$(".listToMapBtn").jumpToMapPage();
	$(".listToDetailBtn").jumpToDetailPage();

	$("#detailBackButton").backToPreviousPage();

	$("#goToMap").goToMapPage("touchstart");
	$("#goToList").goToListPage("touchstart");

	$(".topPageButton").goToTopPage("click");

	// ポスターマップ画面ボタン
	$(".posterMapPageButton").goToMapPage("click");

	$(".posterListPageButton").goToListPage("click");
});