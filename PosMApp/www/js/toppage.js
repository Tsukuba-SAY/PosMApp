$(function() {
	setDetails();

	// 詳細情報画面を表示する
	$("#detailinfobutton").on("touchstart", function(e) {
		setDetails();
		changePage("#detailPage");
	});
	
	// ポスターマップ画面に遷移
	$("#goToMap").on("touchstart", function() {
		changePage("#posterMapPage");
	});

	// リスト画面に遷移
	$("#goToList").on("touchstart", function() {
		showposterlist();
		changePage("#posterListPage");
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