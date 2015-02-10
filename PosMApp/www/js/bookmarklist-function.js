 // ブックマークした発表の一覧を表示する
$.fn.showBookmarkList = function() {
	var presens = [];
	presens["posterid"] = [];
	presens["presenid"] = [];
	presens["title"] = [];
	presens["author"] = [];
	
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
		
		var bookmarkArrlength = bookmarkArr.length;
		var presenlength = presen.length;
		for(var i = 0; i <= bookmarkArrlength; i++){
			for (var j = 0; j < presenlength; j++){
				var p = presen[j];
				if (bookmarkArr[i] === p.presenid) {
					var posterid = getPosterid(p.presenid);
					// authors = getAuthors(p.presenid).split(",").join(", ");
					authorname = getAuthorname(p.presenid);
					presens["posterid"].push(posterid !== -1 ? posterid : null);
					presens["presenid"].push(p.presenid);
					presens["title"].push(p.title);
					presens["author"].push(getAuthors(p.presenid));

					str += "<tr id='bookmarkedpresen" + p.presenid + "'><td><div> 	" + p.presenid;

					// ポスター発表があるときのみマップへ遷移するボタンを表示
					if (posterid !== -1) {
						str += "<img class='bookmarklistToMapBtn' id='bookmarklistToMap" +posterid+ "' src='img/logo_posmapp.png' style='zoom: 8%;'></img>";
					}

					str += "&nbsp;&nbsp;<img class='bookmarklistbookmarkbutton' id='bookmarklistbookmark"+p.presenid+"' src='img/bookmark.png' style='zoom: 22%;'></img><br>";
					str += "<span class='bookmarklistTitle'><strong><small>" + p.title + "</small></strong></span><br>";
					str += "<div class='authors-on-list'><span class='bookmarklistAuthors'>" + authorname + ", 他</span></div></td>";
					str += "<td><div><td><img class='bookmarklistToDetailBtn' id='bookmarklistToDetail"+p.presenid+"' src='img/detailinfo.png' style='zoom: 3%;'> </img></div>";
				}
			}
		}
		
		str += '</table>'
	}

	$(this).html(str);

	$(".bookmarklistToMapBtn").bookmarklistToMapPage();
	$(".bookmarklistToDetailBtn").bookmarklistToDetailPage();
	$(".bookmarklistbookmarkbutton").deletebookmark();
	$(".bookmarklistTitle").bookmarkjumpToDetailPage();
	$(".bookmarklistAuthors").bookmarkjumpToDetailPage();

	return presens;
};

$.fn.bookmarkjumpToDetailPage = function() {
	$(this).on("click", function(e) {
		// ポスターのIDを取得する
		var presenid = $(e.target)
						.parents()
						.filter(function() {return this.tagName === "TR"})
						.get(0)
						.id
						.substring("bookmarkedpresen".length);
		sessionStorage.setItem("previousPage", "presenListPage");
		sessionStorage.setItem("listClick", "bookmarklist");
		listToDetail(presenid);
	});
};

//ポスターリスト画面の各「詳細情報」ボタンをクリックする時
$.fn.bookmarklistToDetailPage = function() {
	$(this).on("click", function(e) {
		// ポスターのIDを取得する
		var presenid = e.target.id.substring(20);
		sessionStorage.setItem("previousPage", "presenListPage");
		sessionStorage.setItem("listClick", "bookmarklist");
		listToDetail(presenid);
	});
};

//ポスターリスト画面の各「これどこ？」ボタンをクリックする時
$.fn.bookmarklistToMapPage = function() {
	$(this).on("click", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(17));
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".venuePageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").addClass("ui-btn-active ui-state-persist");
		listToMap(posterid);
	});
};

$.fn.deletebookmark = function(){
	$(this).on("click", function(e) {
		var r = confirm("ブックマークを削除してよろしいですか？");
		if (r === true){
			// ポスターのIDを取得する
			var presenid = e.target.id.substring(20);
			console.log(presenid)
			var bookmarkIcon = document.getElementById("bookmarkbutton");

			removebookmark(presenid);

			var tr = document.getElementById("bookmarkedpresen"+presenid);
			var list = document.getElementById("bookmarkList");
			tr.parentNode.removeChild(tr);

			if (getBookmarks().length === 0) {
				var str = "<div id='emptyBookmarklist'>ブックマークされていません。</div>";
				list.innerHTML = str;
			}
		}
	});
};

function removebookmark(presenid){

	var bookmarkArr = getBookmarks();
	var location = bookmarkArr.indexOf(presenid);
	bookmarkArr.splice(location, 1);

	var bookmarkIcon = $("#bookmarkbutton");
	$("#bookmarkbutton").attr("src","img/unbookmark.png");
	$("#listbookmark" + presenid).attr("src","img/unbookmark.png");
	saveLog("unbookmark", {presenid:presenid, page:window.location.hash});

	var posterid = getPosterid(presenid);
	if (posterid !== -1) {
		var starelem;
		var starstatus = "none";
		var starpos = [null, "Top", "Right", "Bottom", "Left"];
		if (bookmarkIcon !== null) {
			var posterid = getPosterid(presenid);
			var p = poster[posterid-1];
			starelem = document.getElementById("star" + starpos[p.star] + "No" + posterid);
			starelem.style.display = starstatus;
		}
	}

	bookmarks = bookmarkArr.join(",");
	localStorage.setItem("bookmarks", bookmarks);

	return bookmarks;
}
