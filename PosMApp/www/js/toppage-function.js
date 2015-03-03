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

//会場図画面に遷移
$.fn.goToVenuePage = function(ev) {
	$(this).on(ev, function() {
		changePage("#venuePage");
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

// pagenameのページに遷移
function changePage(pagename) {
	if (pagename === "#presenListPage") {
		var p = sessionStorage.getItem("currentListPage");
		saveLog("show_page", {page:p});
	} else {
		saveLog("show_page", {page:pagename});
	}
	resetZoom();
	changeActiveTab(pagename);
	window.location.href = pagename;
	return pagename;
}

// アクティブなタブバーをpagenameのものに切り替える
function changeActiveTab(pagename) {
	$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
	$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
	$(".venuePageButton").removeClass("ui-btn-active ui-state-persist");
	$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
	$(".informationPageButton").removeClass("ui-btn-active ui-state-persist");
	$("." + pagename.substring(1) + "Button").addClass("ui-btn-active ui-state-persist");
}