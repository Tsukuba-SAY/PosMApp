 // ブックマークした発表の一覧を表示する
$.fn.showBookmarkList = function() {
	var posters = [];
	posters["id"] = [];
	posters["sessionid"] = [];
	posters["title"] = [];
	posters["author"] = [];
	
	var bookmarks = localStorage.getItem("bookmarks");
	if (bookmarks === null || bookmarks === "") {
		bookmarks = "";
	}

	var str = "";
	if (bookmarks === "") {
		str += "<div id='emptyBookmarklist'>ブックマークされていません。</div>";
	} else {

		var bookmarkArr = bookmarks.split(",");
		str += '<table border="1" rules="rows" width="100%">';
		
		for(var i=0; i<=bookmarkArr.length; i++){
			for (var j=0; j<poster.length; j++){
				if(parseInt(bookmarkArr[i]) === parseInt(poster[j].id)){
					authors = getAuthors(j+1).split(",").join(", ")
					posters["id"].push(poster[j].id.toString());
					posters["sessionid"].push(poster[j].sessionid);
					posters["title"].push(poster[j].title);
					posters["author"].push(getAuthors(j+1));
					str += "<tr id='trId"+poster[j].id.toString()+"'><td><div>ポスターID: " + poster[j].sessionid + "<img class='bookmarklistToMapBtn' id='bookmarklistToMap" +poster[j].id.toString()+ "' src='img/logo_posmapp.png' style='zoom: 8%;'></img>&nbsp;&nbsp;<img class='deletebookmarkBtn' id='deletebookmark"+poster[j].id+"' src='img/bookmark.png' style='zoom: 22%;'></img><br>";
					str += "<strong>" + poster[j].title + "</strong><br>";
					str += "メンバー: " + authors + "<br></td>";
					str += "<td><div><td><img class='bookmarklistToDetailBtn' id='bookmarklistToDetail"+poster[j].id.toString()+"' src='img/detailinfo.png' style='zoom: 3%;'></img></td></div></td></tr>";
				}
			}
		}
		
		str += '</table>'
	}

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
		sessionStorage.setItem("previousPage", "bookmarkListPage");
		listToDetail(posterid);
	});
};

//ポスターリスト画面の各「これどこ？」ボタンをクリックする時
$.fn.bookmarklistToMapPage = function() {
	$(this).on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(17));
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".bookmarkListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").addClass("ui-btn-active ui-state-persist");
		listToMap(posterid);
		// searchByTitle(sessionStorage.getItem("searchWord"));
		searchAll(sessionStorage.getItem("searchWord"));
	});
};

$.fn.deletebookmark = function(){
	$(this).on("touchstart", function(e) {
		var r = confirm("ブックマークを削除してよろしいですか？");
		if (r === true){
			// ポスターのIDを取得する
			var posterid = Number(e.target.id.substring(14));
			console.log(posterid);
			var bookmarkIcon = document.getElementById("bookmarkbutton");

			removebookmark(posterid);

			var tr = document.getElementById("trId"+posterid);
			var list = document.getElementById("bookmarkList");
			tr.parentNode.removeChild(tr);

			if (getBookmarks().length === 0) {
				var str = "<div id='emptyBookmarklist'>ブックマークされていません。</div>";
				list.innerHTML = str;
			}
		}
	});
};

function removebookmark(posterid){
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
	bookmarkArr.splice(location, 1);
	var bookmarkIcon = $("#bookmarkbutton");
	$("#bookmarkbutton").attr("src","img/unbookmark.png");
	$("#listbookmark" + posterid).attr("src","img/unbookmark.png");
	saveLog("unbookmark", {posterid:posterid, page:window.location.hash});
	var starelem;
	var starstatus = "none";
	var starpos = [null, "Top", "Right", "Bottom", "Left"];

	if (bookmarkIcon !== null) {
		var p = poster[posterid-1];
		starelem = document.getElementById("star" + starpos[p.star] + "No" + posterid);
		starelem.style.display = starstatus;
	}

	bookmarks = bookmarkArr.join(",");
	localStorage.setItem("bookmarks", bookmarks);
	return bookmarks;
}
