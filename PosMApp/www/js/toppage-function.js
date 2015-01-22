// ポスターマップ画面に遷移
$.fn.goToMapPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#posterMapPage");
	});	
};

// リスト画面に遷移
$.fn.goToListPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#presenListPage");
	});	
};

// 会議情報画面に遷移
$.fn.goToInformationPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#informationPage");
		$("#changeDate01").trigger("click");
	});	
};

//ブックマークリスト画面に遷移
$.fn.goToBookmarkListPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#bookmarkListPage");
	});	
};

// タブのボタン
// トップページボタン
$.fn.goToTopPage = function(ev) {
	var nextPage = "#topPage";
	$(this).on(ev, function() {
		changePage(nextPage);
	});
};

function changePage(pagename) {
	saveLog("show_page", {page:pagename});
	resetZoom();
	$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
	$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
	$(".bookmarkListPageButton").removeClass("ui-btn-active ui-state-persist");
	$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
	$(".informationPageButton").removeClass("ui-btn-active ui-state-persist");
	$("." + pagename.substring(1) + "Button").addClass("ui-btn-active ui-state-persist");
	// showBookmarkList();
	window.location.href = pagename;
	return pagename;
}