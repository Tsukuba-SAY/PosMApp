// 詳細情報画面の戻るボタンをおした時の挙動
$.fn.backToPreviousPage = function() {
	$(this).on("touchstart", function(e) {
		var prev = sessionStorage.getItem("previousPage");
		if (prev == null || prev == undefined) {
			prev = "posterMapPage";
		}
		window.location.href = "#" + prev;
		// window.history.back();
	});
}

// ポスターマップ画面に遷移
$.fn.goToMapPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#posterMapPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").addClass("ui-btn-active ui-state-persist");
	});	
}

// リスト画面に遷移
$.fn.goToListPage = function(ev) {
	$(this).on(ev, function() {
		changePage("#posterListPage");
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").addClass("ui-btn-active ui-state-persist");
	});	
}

// タブのボタン
// トップページボタン
$.fn.goToTopPage = function(ev) {
	var nextPage = "#topPage";
	$(this).on(ev, function() {
		changePage(nextPage);
		$(".topPageButton").addClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
	});
	return nextPage;
}

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