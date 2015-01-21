//　ポスターデータのダウンロード
function downloadPoster(pageName){
	//loading画像の表示
	$(".downloading").css("display", "inline");
	if(!pageName){
		pageName = "#topPage";
	}

	// LocalStorageの整合性が取れていない場合ダウンロードし直す
	if (localStorage.getItem("downloadSuccess") === "true" && !isValidLocalStorage()) {
		console.log("Invalid Local Storage, Redownload");
		localStorage.removeItem("downloadSuccess");
	}
	if (sessionStorage.getItem("clickDiv")) {
		setTimeout("ajaxdownload('"+pageName+"')",500);
	}else{
		ajaxdownload(pageName);
	}
	
}

function ajaxdownload(pageName){
	var flag = localStorage.getItem("downloadSuccess");
	if(flag === "false" || flag === null){
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
					commentator 	= data.commentator;
					position_map 	= data.position_map;
					position 		= data.position;
					taparea 		= data.taparea;
					STATIC_WIDTH 	= data.STATIC_WIDTH;
					STATIC_HEIGHT 	= data.STATIC_HEIGHT;

					localStorage.setItem("poster",JSON.stringify(data.poster));
					localStorage.setItem("author",JSON.stringify(data.author));
					localStorage.setItem("keyword",JSON.stringify(data.keyword));
					localStorage.setItem("presen",JSON.stringify(data.presen));
					localStorage.setItem("presents",JSON.stringify(data.presents));
					localStorage.setItem("session",JSON.stringify(data.session));
					localStorage.setItem("commentator",JSON.stringify(data.commentator));
					localStorage.setItem("position_map",JSON.stringify(data.position_map));
					localStorage.setItem("position",JSON.stringify(data.position));
					localStorage.setItem("taparea",JSON.stringify(data.taparea));
					localStorage.setItem("STATIC_WIDTH",JSON.stringify(data.STATIC_WIDTH));
					localStorage.setItem("STATIC_HEIGHT",JSON.stringify(data.STATIC_HEIGHT));

					// ポスターマップの大きさに関するデータを計算して格納 in data.js
					setMapSize();

					// 成功フラグを立てる
					localStorage.setItem("downloadSuccess","true");
					// $("#downloading").css("display", "none");
					$("#reDownloadDIV").css("display", "none");
					$("#reDownloadDIVList").css("display", "none");
					$("#reDownloadDIVMap").css("display", "none");
					localStorage.removeItem("downloadResult");
					// 再描画
					init();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					localStorage.setItem("pageName",pageName);
					localStorage.setItem("downloadResult","downloadResult");
					setTimeout("$('.reDownloadDIVCLS').html('データを再ダウンロード')",3000);
					setTimeout("$('.ReDownloadBtn').html('データを再ダウンロード')",3000);
					window.location.href = pageName;
					window.location.href = "#downloadFailDialog";
					$("#posters").html("");
				},
				complete: function(data) {
					// alert("complete");
					console.log("Download Complete");
					initUserData();
					sessionStorage.removeItem("clickDiv");
				}
		});
	}
}

// LocalStorageのデータの整合性チェック
function isValidLocalStorage() {
	if (localStorage.getItem("poster") === null) return false;
	if (localStorage.getItem("author") === null) return false;
	if (localStorage.getItem("keyword") === null) return false;
	if (localStorage.getItem("presen") === null) return false;
	if (localStorage.getItem("presents") === null) return false;
	if (localStorage.getItem("session") === null) return false;
	if (localStorage.getItem("commentator") === null) return false;
	if (localStorage.getItem("position_map") === null) return false;
	if (localStorage.getItem("position") === null) return false;
	if (localStorage.getItem("taparea") === null) return false;
	if (localStorage.getItem("STATIC_WIDTH") === null) return false;
	if (localStorage.getItem("STATIC_HEIGHT") === null) return false;
	return true;
}

//「ダウンロード失敗」ダイアログの「cancel」をクリックする時呼び出す
$.fn.cancelDownload = function() {
	$(this).on("click", function(e){
		window.location.href = localStorage.getItem("pageName");
		// loading画像を表示しない
		// $("#downloading").css("display", "none");
		setTimeout("$('.reDownloadDIVCLS').html('データを再ダウンロード')",3000);
		setTimeout("$('.ReDownloadBtn').html('データを再ダウンロード')",3000);
		initUserData();
		$("#posters").html("");
	});
};

//「ダウンロード失敗」ダイアログの「再ダウンロード」をクリックする時呼び出す
$.fn.reDownload = function() {
	$(this).on("click", function(e){
		$(".downloading").css("display", "inline");
		$(".reDownloadDIVCLS").html("<img src='img/loading.gif' style='height:1.0em;vertical-align: middle;'>データ読み込み中");
		$(".ReDownloadBtn").html("<img src='img/loading.gif' style='height:100%;vertical-align: middle;'>データ読み込み中");
		downloadPoster(localStorage.getItem("pageName"));
		$("#posters").html("");
	});
};

//「データ読み込み中」divをクリックする時呼び出す
$.fn.reDownloadFun = function() {
	$(this).on("click", function(e){
		var pageName = "#" + window.location.href.split("#")[1];
		$(".reDownloadDIVCLS").html("<img src='img/loading.gif' style='height:1.0em;vertical-align: middle;'>データ読み込み中");
		$(".ReDownloadBtn").html("<img src='img/loading.gif' style='height:100%;vertical-align: middle;'>データ読み込み中");
		sessionStorage.setItem("clickDiv", "clickDiv");
		downloadPoster(pageName);
	});
};
