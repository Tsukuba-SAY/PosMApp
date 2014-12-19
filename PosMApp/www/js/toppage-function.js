// ポスターマップ画面に遷移
$.fn.goToMapPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#posterMapPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".bookmarkListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").addClass("ui-btn-active ui-state-persist");
		$(".informationPageButton").removeClass("ui-btn-active ui-state-persist");
	});	
};

// リスト画面に遷移
$.fn.goToListPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#presenListPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".bookmarkListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".presenListPageButton").addClass("ui-btn-active ui-state-persist");
		$(".informationPageButton").removeClass("ui-btn-active ui-state-persist");
	});	
};

// 会議情報画面に遷移
$.fn.goToInformationPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#informationPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".informationPageButton").addClass("ui-btn-active ui-state-persist");
		$(".bookmarkListPageButton").removeClass("ui-btn-active ui-state-persist");
	});	
};

//ブックマークリスト画面に遷移
$.fn.goToBookmarkListPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#bookmarkListPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".bookmarkListPageButton").addClass("ui-btn-active ui-state-persist");
		$(".informationPageButton").removeClass("ui-btn-active ui-state-persist");
		$("#bookmarkList").showBookmarkList();

	});	
};

// タブのボタン
// トップページボタン
$.fn.goToTopPage = function(ev) {
	var nextPage = "#topPage";
	$(this).on(ev, function() {
		changePage(nextPage);
		$(".topPageButton").addClass("ui-btn-active ui-state-persist");
		$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".informationPageButton").removeClass("ui-btn-active ui-state-persist");
	});
};

function changePage(pagename) {
	saveLog("show_page", {page:pagename});
	window.location.href = pagename;
	return pagename;
}