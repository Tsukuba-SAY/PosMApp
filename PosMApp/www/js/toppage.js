$(function() {
	setDetails();

	// 詳細情報画面を表示する
	$("#detailinfobutton").on("touchstart", function(e) {
		setDetails();
		window.location.href = "#detailPage";
	});
	
	// ポスターマップ画面に遷移
	$("#goToMap").on("touchstart", function() {
		window.location.href = "#posterMapPage";
	});

	// リスト画面に遷移
	$("#goToList").on("touchstart", function() {
		showposterlist();
		window.location.href = "#posterlist";
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