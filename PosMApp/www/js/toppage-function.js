// 詳細情報画面の戻るボタンをおした時の挙動
$.fn.backToPreviousPage = function() {
	$(this).on("touchstart", function(e) {
		var prev = sessionStorage.getItem("previousPage");
		if (prev === null || prev === undefined) {
			prev = "posterMapPage";
		}
		changePage("#" + prev);
		// window.location.href = "#" + prev;
		// window.history.back();
	});
};

// ポスターマップ画面に遷移
$.fn.goToMapPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#posterMapPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".bookmarkListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").addClass("ui-btn-active ui-state-persist");
		$(".infromationButton").removeClass("ui-btn-active ui-state-persist");
	});	
};

// リスト画面に遷移
$.fn.goToListPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#posterListPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".bookmarkListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").addClass("ui-btn-active ui-state-persist");
		$(".infromationButton").removeClass("ui-btn-active ui-state-persist");
	});	
};

// 会議情報画面に遷移
$.fn.goToInformationPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#informationPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".infromationButton").addClass("ui-btn-active ui-state-persist");
	});	
};

//ブックマークリスト画面に遷移
$.fn.goToBookmarkListPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#bookmarkListPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".bookmarkListPageButton").addClass("ui-btn-active ui-state-persist");
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
		$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".infromationButton").removeClass("ui-btn-active ui-state-persist");
	});
};

function setDetails() {
	$("#detail-posterid").html(sessionStorage.getItem("posterid"));
	$("#detail-sessionid").html(sessionStorage.getItem("sessionid"));
	$("#detail-title").html(sessionStorage.getItem("title"));
	var authors = sessionStorage.getItem("authors");
	authors = (authors !== null && authors !== "")
		? authors
		: "NO DATA";
	$("#detail-authors").html(authors);
	$("#detail-authorbelongs").html(sessionStorage.getItem("authorbelongs"));
	$("#detail-authorname").html(sessionStorage.getItem("authorname"));
	var keywords = sessionStorage.getItem("keywords");
	keywords = keywords !== null && keywords !== "" 
		? keywords
		: "NO DATA";
	$("#detail-keywords").html(keywords);
	$("#detail-abstract").html(sessionStorage.getItem("abstract"));
}

function changePage(pagename) {
	saveLog("show_page", {page:pagename});
	window.location.href = pagename;
	return pagename;
}