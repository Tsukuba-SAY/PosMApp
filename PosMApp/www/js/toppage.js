$(function() {
	setDetails();
	showposterlist();

	//ポスターリスト画面の各「これどこ？」ボタンをクリックする時
	$.fn.jumpToMapPage = function() {
		$(this).on("click", function(e) {
			console.log("fire");
			// ポスターのIDを取得する
			var posterid = Number(e.target.id.substring(9));
			listToMap(posterid);
		});
	}
	$("listToMapBtn").jumpToMapPage();

	//ポスターリスト画面の各「詳細情報」ボタンをクリックする時
	$.fn.jumpToDetailPage = function() {
		$(this).on("click", function(e) {
			// ポスターのIDを取得する
			var posterid = Number(e.target.id.substring(9));
			sessionStorage.setItem("previousPage", "posterListPage");
			listToDetail(posterid);
		});
	}
	$("listToDetailBtn").jumpToDetailPage();

	// 詳細情報画面の戻るボタンをおした時の挙動
	$.fn.backToPreviousPage = function() {
		$(this).on("click", function(e) {
			var prev = sessionStorage.getItem("previousPage");
			if (prev == null || prev == undefined) {
				prev = "posterMapPage";
			}
			window.location.href = "#" + prev;
		});
	}
	$("detailBackButton").backToPreviousPage();
	
	// ポスターマップ画面に遷移
	$.fn.goToMapPage = function(ev) {
		$(this).on(ev, function() {
			changePage("#posterMapPage");
			$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".posterMapPageButton").addClass("ui-btn-active ui-state-persist");
		});	
	}
	$("#goToMap").goToMapPage("touchstart");

	// リスト画面に遷移
	$.fn.goToListPage = function(ev) {
		$(this).on(ev, function() {
			changePage("#posterListPage");
			$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".posterListPageButton").addClass("ui-btn-active ui-state-persist");
		});	
	}
	$("#goToList").goToListPage("touchstart");

	// タブのボタン
	// トップページボタン
	$.fn.goToTopPage = function(ev) {
		$(this).on(ev, function() {
			changePage("#topPage");
			$(".topPageButton").addClass("ui-btn-active ui-state-persist");
			$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
			$(".posterMapPageButton").removeClass("ui-btn-active ui-state-persist");
		});
	}
	$(".topPageButton").goToTopPage("click");

	// ポスターマップ画面ボタン
	$(".posterMapPageButton").goToMapPage("click");

	$(".posterListPageButton").goToListPage("click");
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