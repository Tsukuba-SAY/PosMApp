 // ポスターの一覧を表示する
$.fn.showBookmarkList = function() {
	var posters = new Array();
	posters["id"] = new Array();
	posters["sessionid"] = new Array();
	posters["title"] = new Array();
	posters["author"] = new Array();
	
	var bookmarks = localStorage.getItem("bookmarks");
	if (bookmarks === null || bookmarks === "") {
		bookmarks = "";
	}
	var bookmarkArr = bookmarks.split(",");
	var str = "";
	str += '<table border="1" rules="rows" >';
	
	for(var i=0; i<=bookmarkArr.length; i++){
		for (var j=0; j<=poster.length-4; j++){
			if(bookmarkArr[i]==poster[j].id){
				authors = getAuthors(i+1).split(",").join(", ")
				posters["id"].push(poster[j].id.toString());
				posters["sessionid"].push(poster[j].sessionid);
				posters["title"].push(poster[j].title);
				posters["author"].push(getAuthors(j+1));
				str += "<tr id='trId"+poster[j].id.toString()+"'><td><div>ポスターID: " + poster[j].sessionid + "<img class='bookmarklistToMapBtn' id='bookmarklistToMap" +poster[j].id.toString()+ "' src='img/logo_posmapp.png' style='zoom: 5%;'></img>&nbsp;&nbsp;<img class='deletebookmarkBtn' id='deletebookmark"+poster[j].id+"' src='img/bookmark.png' style='zoom: 22%;'></img><br>";
				str += "<strong>" + poster[j].title + "</strong><br>";
				str += "著者: " + authors + "<br></td>";
				str += "<td><div><td><img class='bookmarklistToDetailBtn' id='bookmarklistToDetail"+poster[j].id.toString()+"' src='img/detailinfo.png' style='zoom: 3%;'></img></td></div></td></tr>";
			}
		}

	}
	
	str += '</table>'

	$(this).html(str);

	$(".bookmarklistToMapBtn").bookmarklistToMapPage();
	$(".bookmarklistToDetailBtn").bookmarklistToDetailPage();
	$(".deletebookmarkBtn").deletebookmark();
	return posters;
};


//ポスターリスト画面の各「詳細情報」ボタンをクリックする時
$.fn.bookmarklistToDetailPage = function() {
	$(this).on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(20));
		console.log(posterid);
		sessionStorage.setItem("previousPage", "posterListPage");
		listToDetail(posterid);
	});
};

//ポスターリスト画面の各「これどこ？」ボタンをクリックする時
$.fn.bookmarklistToMapPage = function() {
	$(this).on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(17));
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".bookmarkListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").addClass("ui-btn-active ui-state-persist");
		listToMap(posterid);
	});
};

$.fn.deletebookmark= function(){
	$(this).on("touchstart", function(e) {
		flag = localStorage.getItem("flag");
		if(flag == "test"){
			// ポスターのIDを取得する
				var posterid = Number(e.target.id.substring(14));
				var bookmarkIcon = document.getElementById("bookmarkbutton");
				removebookmark(posterid);
		}else{
			var r = confirm("ブックマークを削除してよろしいですか？");
			if (r == true){
	  			// ポスターのIDを取得する
				var posterid = Number(e.target.id.substring(14));
				var bookmarkIcon = document.getElementById("bookmarkbutton");
				removebookmark(posterid);
				var tr = document.getElementById("trId"+posterid);
				tr.parentNode.removeChild(tr);
	 		}
		}
		
	});
};

function removebookmark(posterid){
	if (posterid < 1 || posterid > ptotal || posterid === null) {
		throw new Exception();
	}

	// posteridに該当するポスターがブックマークリストに存在しているか確認用
	// -1だと無し、-1以外だと発見したポスターのインデックス
	var location = -1;

	var bookmarkArr = getBookmarks();
	for (var i = 0; i < bookmarkArr.length; i++) {
		//該当ポスターがブックマークリストに存在しているかどうか確認する
		if (posterid === parseInt(bookmarkArr[i])) {
			location = i;
			break;
		}
	}
	console.log("location:" + location);
	var starstatus;
	bookmarkArr.splice(location, 1);
	var bookmarkIcon = $("#bookmarkbutton");
	$("#bookmarkbutton").attr("src","img/unbookmark.png");
	$("#listbookmark" + posterid).attr("src","img/unbookmark.png");
	starstatus = "none";
	saveLog("unbookmark", {posterid:posterid, page:window.location.hash});
	if (bookmarkIcon !== null) {
			var p = poster[posterid-1];
			switch (p.star) {
				case 1:
				starelem = document.getElementById("starTopNo" + posterid);
				break;
				case 2:
				starelem = document.getElementById("starRightNo" + posterid);
				break;
				case 3:
				starelem = document.getElementById("starBottomNo" + posterid);
				break;
				case 4:
				starelem = document.getElementById("starLeftNo" + posterid);
				default:
				console.log("Error");
			}
			starelem.childNodes[0].style.display = starstatus;
	}

	bookmarks = bookmarkArr.join(",");
	localStorage.setItem("bookmarks", bookmarks);
	return bookmarks;
}