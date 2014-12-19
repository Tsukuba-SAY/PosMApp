// 発表の一覧を表示する
$.fn.showPresenList = function() {
	var presens = [];
	presens["posterid"] = [];
	presens["presenid"] = [];
	presens["title"] = [];
	presens["author"] = [];
	//ブックマークされたポスターIDを取得する
	var bookmarkIcon = document.getElementById("bookmarkbutton");
	var bookmarks = localStorage.getItem("bookmarks");
	if (bookmarks === null || bookmarks === "") {
		bookmarks = "";
	}
	var bookmarkArr = bookmarks.split(",");
	var str = "";
	str += '<table border="1" rules="rows" width="100%">';
	
	presen.forEach(function(p) {
		var posterid = getPosterid(p.presenid);
		authors = getAuthors(p.presenid).split(",").join(", ");
		presens["posterid"].push(posterid !== -1 ? posterid : null);
		presens["presenid"].push(p.presenid);
		presens["title"].push(p.title);
		presens["author"].push(getAuthors(p.presenid));
		str += "<tr><td><div>発表ID: " + p.presenid;

		// ポスター発表があるときのみマップへ遷移するボタンを表示
		if (posterid !== -1) {
			str += "<img class='listToMapBtn' id='listToMap" +poster[i].posterid.toString()+ "' src='img/logo_posmapp.png' style='zoom: 8%;'></img>";
		}

		//ブックマークされたかどうか判断する
		var foundBookmark = false;
		for (var j = 0; j < bookmarkArr.length; j++) {
			if (parseInt(posterid) === parseInt(bookmarkArr[j])) {
				foundBookmark = true;
				break;
			}
		}
		if (foundBookmark) {
			str += "&nbsp;&nbsp;<img class='listbookmarkbutton' id='listbookmark"+posterid+"' src='img/bookmark.png' style='zoom: 22%;'></img><br>";
		} else {
			str += "&nbsp;&nbsp;<img class='listbookmarkbutton' id='listbookmark"+posterid+"' src='img/unbookmark.png' style='zoom: 22%;'></img><br>";
		}

		str += "<strong>" + p.title + "</strong><br>";
		str += "メンバー: " + authors + "<br></td>";
		str += "<td><div><td><img class='listToDetailBtn' id='listToDetail"+posterid+"' src='img/detailinfo.png' style='zoom: 3%;'> </img></div>";
	});
	str += '</table>'

	$(this).html(str);

	return presens;
};

//ポスターリスト画面の各「詳細情報」ボタンをクリックする時
$.fn.jumpToDetailPage = function() {
	$(this).on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(12));
		console.log(posterid);
		sessionStorage.setItem("previousPage", "presenListPage");
		listToDetail(posterid);
	});
};

//ポスターリスト画面の各「これどこ？」ボタンをクリックする時
$.fn.jumpToMapPage = function() {
	$(this).on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(9));
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".presenListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").addClass("ui-btn-active ui-state-persist");
		listToMap(posterid);
	});
};

//ポスターリストから詳細情報画面に遷移する
function listToDetail(posterid){
	if (posterid < 1 || posterid > poster.length || posterid === null || posterid === undefined) {
		throw new Exception();
	}

	//sessionStorageの中に存在している情報の削除
	removeAllPosterInfo();

	//選択中ポスターの情報をsessionStorageに保存する
	for (var i = 0; i < ptotal; i++) {
		var p = poster[i];
		if (p.id === posterid) {
			sessionStorage.setItem("posterid", posterid);
			sessionStorage.setItem("presenid", p.presenid);
			sessionStorage.setItem("title", p.title);
			sessionStorage.setItem("abstract", p.abstract);
			sessionStorage.setItem("authorname", p.authorname);
			sessionStorage.setItem("authors", getAuthors(i+1));
			sessionStorage.setItem("keywords", getKeywords(i+1));
			sessionStorage.setItem("authorbelongs", p.authorbelongs);
		}
	}

	//画面遷移ファクションを呼び出す
	setDetails();
	changePage("#detailPage");
}

//ポスターリストからマップ画面に遷移する
function listToMap(posterid){
	if (posterid < 1 || posterid > poster.length || posterid === null || posterid === undefined) {
		throw new Exception();
	}
	//sessionStorageの中に存在している情報の削除
	removeAllPosterInfo();

	changePage("#posterMapPage");
	resetAllIcons();
	var nextFlag = touchPoster(posterid);
	pflag[posterid] = nextFlag;
	showPosterIcons();
	// searchByTitle(sessionStorage.getItem("searchWord"));
	searchAll(sessionStorage.getItem("searchWord"));
}

//ポスターリストからブックマークアイコンをクリックする
$.fn.listchangebookmark = function() {
	$(this).on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(12));
		var bookmarkIcon = document.getElementById("bookmarkbutton");
		touchBookmark(posterid, bookmarkIcon);
	});
};

// 発表IDからポスターIDを取得するfunction
// return ある場合posterid、ない場合-1
function getPosterid(presenid) {
	poster.forEach(function(p) {
		if (p.presenid === presenid) {
			return p.posterid;
		}
	});
	return -1;
}