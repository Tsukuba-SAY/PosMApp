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