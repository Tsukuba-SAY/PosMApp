//　ポスターデータのダウンロード
function downloadPoster(pageName){
	//loading画像の表示
	$(".downloading").css("display", "inline");
	if(!pageName){
		pageName = "#topPage";
	}
	//ダイアログの表示順番のため
	//初期起動の時直接呼び出す
	if(localStorage.getItem("accept_collect_log") === null){
		ajaxdownload(pageName);
	}else{
		setTimeout("ajaxdownload('"+pageName+"')",300);
	}
	
}

function ajaxdownload(pageName){
	if(!localStorage.getItem("downloadSuccess")){
		$.ajax({
		   		url: "http://posmapp.tk/api/data.php",
				type: "POST",
				dataType: "json",
				async: false,
				data: "",
				timeout: 10000, // タイムアウトにするまでの時間は要検討
				success: function(data) {
					console.log("Download Success");

					// データを格納
					poster 			= data.poster;
					author 			= data.author;
					keyword 		= data.keyword;
					presen 			= data.presen;
					presents 		= data.presents;
					session 		= data.session;
					commontator 	= data.commentator;
					position_map 	= data.position_map;
					position 		= data.position;
					taparea 		= data.taparea;
					STATIC_WIDTH 	= data.STATIC_WIDTH;
					STATIC_HEIGHT 	= data.STATIC_HEIGHT;

					// ポスターマップの大きさに関するデータを計算して格納 in data.js
					setMapSize();

					// 成功フラグを立てる
					localStorage.setItem("downloadSuccess","true");
					// $("#downloading").css("display", "none");
					$("#reDownloadDIV").css("display", "none");
					$("#reDownloadDIVList").css("display", "none");
					$("#reDownloadDIVMap").css("display", "none");

					// 再描画
					init();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.error("Download Error");
					// console.error("send error");
					// console.error("XMLHttpRequest: " + XMLHttpRequest);
					// console.error("textStatus: " + textStatus);
					console.error("errorThrown: " + errorThrown);
					$("#posters").html("");
					localStorage.setItem("pageName",pageName);
					localStorage.setItem("downloadResult","downloadResult");
					window.location.href = pageName;
					window.location.href = "#downloadFailDialog";
					setTimeout("$('.downloading').css('display', 'none')",3000);
					setTimeout("$('.downloadMsg').html('読み込みに失敗しました')",3000);
				},
				complete: function(data) {
					// alert("complete");
					console.log("Download Complete");
					initUserData();
				}
		});
	}
}

//「ダウンロード失敗」ダイアログの「cancel」をクリックする時呼び出す
$.fn.cancelDownload = function() {
	$(this).on("touchstart", function(e){
		window.location.href = localStorage.getItem("pageName");
		// loading画像を表示しない
		$("#downloading").css("display", "none");
		$(".downloadMsg").html("読み込みに失敗しました");
		initUserData();
	});
};

//「ダウンロード失敗」ダイアログの「再ダウンロード」をクリックする時呼び出す
$.fn.reDownload = function() {
	$(this).on("touchstart", function(e){
		$(".downloading").css("display", "inline");
		$(".downloadMsg").html("データ読み込み中");
		downloadPoster(localStorage.getItem("pageName"));
	});
};

//「データ読み込み中」divをクリックする時呼び出す
$.fn.reDownloadFun = function() {
	$(this).on("touchstart", function(e){
		var pageName = "#" + window.location.href.split("#")[1];
		$(".downloadMsg").html("データ読み込み中");
		downloadPoster(pageName);
	});
};
