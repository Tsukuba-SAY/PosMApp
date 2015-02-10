$.fn.createTabbar = function() {
	$(this).append($(
		'<div data-role="footer" data-position="fixed" data-tap-toggle="false"class="nav-tabicon" style="position:fixed; buttom:0px">\
			<div data-role="navbar" height="100%" class="nav-tabicon" data-grid="d">\
				<ul>\
					<li><a class="topPageButton" id="totoppage" data-icon="toppage">トップ</a></li>\
					<li><a class="informationPageButton" id="information" data-icon="informationgray">TimeTable</a></li>\
					<li><a class="venuePageButton"  id="venue"  data-icon="venue" >会場図</a></li>\
					<li><a class="presenListPageButton" id="list" data-icon="list">発表一覧</a></li>\
					<li><a class="posterMapPageButton" id="map" data-icon="map">ポスター</a></li>\
				</ul>\
			</div>\
		</div>'
	));
}

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

function changePage(pagename) {
	saveLog("show_page", {page:pagename});
	resetZoom();
	$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
	$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
	$(".venuePageButton").removeClass("ui-btn-active ui-state-persist");
	$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
	$(".informationPageButton").removeClass("ui-btn-active ui-state-persist");
	$("." + pagename.substring(1) + "Button").addClass("ui-btn-active ui-state-persist");
	// showBookmarkList();
	window.location.href = pagename;
	return pagename;
}