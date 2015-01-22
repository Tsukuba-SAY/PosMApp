// 詳細情報画面の戻るボタンをおした時の挙動
$.fn.backToPreviousPage = function() {
	$(this).on("click", function(e) {
		var prev = sessionStorage.getItem("previousPage");
		if (prev === null || prev === undefined) {
			prev = "posterMapPage";
		}
		changePage("#" + prev);
		$("#presenList").html("");
		if (sessionStorage.getItem("listClick") == "presenlist") {
			showPresenList();
		}else{
			showBookmarkList();
		}
		
		// window.location.href = "#" + prev;
		// window.history.back();
	});
};