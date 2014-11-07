// ポスターの一覧を表示する
$.fn.showPosterList = function() {
	var posters = new Array();
	posters["id"] = new Array();
	posters["sessionid"] = new Array();
	posters["title"] = new Array();
	posters["author"] = new Array();

	var str = "";
	str += '<table border="1" rules="rows">';
	//postdataをループする、各ポスターの情報を取り出す
	for (var i = 0; i < poster.length; i++) {
		posters["id"].push(poster[i].id.toString());
		posters["sessionid"].push(poster[i].sessionid);
		posters["title"].push(poster[i].title);
		posters["author"].push(getAuthors(i+1));
		str += "<tr><td><div>ID:" + poster[i].id + "</div>";
		str += "<div>Sessionid:" + poster[i].sessionid + "</div>";
		str += "<div>Title:" + poster[i].title + "</div>";
		str += "<div>Author:" + getAuthors(i+1) + "</div></td>";
		str += "<td><div><img class='listToDetailBtn' id='listToMap"+poster[i].id.toString()+"' src='img/detailinfo.png' style='zoom: 10%;'></img></div>";
		str += "<div><img class='listToMapBtn' id='listToMap" +poster[i].id.toString()+ "' src='img/logo_posmapp.png' style='zoom: 15%;'></img></div>";
		//str += '<table><tr><td><a data-role = "button" class = "listToMapBtn" id = "listToMap' + poster[i].id.toString() + '">これどこ？</a></td><td><a data-role = "button" class = "listToDetailBtn" id = "listToMap' + poster[i].id.toString() + '">詳細情報</a></td></tr></table></td></tr>';
	}
	str += '</table>'

	$(this).html(str);

	return posters;
};

//ポスターリスト画面の各「詳細情報」ボタンをクリックする時
$.fn.jumpToDetailPage = function() {
	$(this).on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(9));
		sessionStorage.setItem("previousPage", "posterListPage");
		listToDetail(posterid);
	});
};

//ポスターリスト画面の各「これどこ？」ボタンをクリックする時
$.fn.jumpToMapPage = function() {
	$(this).on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(9));
		$(".topPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterListPageButton").removeClass("ui-btn-active ui-state-persist");
		$(".posterMapPageButton").addClass("ui-btn-active ui-state-persist");
		listToMap(posterid);
	});
};

//ポスターの発表者を取得する
function getAuthors(posterid){
	var atotal = author.length;
	var authorlist = "";
	for (var i = 0; i < atotal; i++) {
        if (author[i].posterid == posterid){
        	authorlist = authorlist + author[i].name + ",";
        }
	}
	//最後の","を削除する
	authorlist = authorlist.substring(0, authorlist.length - 1);
	return authorlist;
}

//ポスターのキーワードを取得する
function getKeywords(posterid){
	var ktotal = keyword.length;
	var keywordlist = "";
	for (var i = 0; i < ktotal; i++) {
        if (keyword[i].posterid == posterid){
        	keywordlist = keywordlist + keyword[i].keyword + ",";
        }
	}
	keywordlist = keywordlist.substring(0, keywordlist.length - 1);
	return keywordlist;
}

//ポスターリストから詳細情報画面に遷移する
function listToDetail(posterid){
	if (posterid < 1 || posterid > poster.length || posterid == null || posterid == undefined) {
		throw new Exception();
	}

	//sessionStorageの中に存在している情報の削除
	removeAllPosterInfo();

	//選択中ポスターの情報をsessionStorageに保存する
	for (var i = 0; i < ptotal; i++) {
		var p = poster[i];
		if (p.id == posterid) {
			sessionStorage.setItem("posterid", posterid);
			sessionStorage.setItem("sessionid", p.sessionid);
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
	if (posterid < 1 || posterid > poster.length || posterid == null || posterid == undefined) {
		throw new Exception();
	}
	//sessionStorageの中に存在している情報の削除
	removeAllPosterInfo();

	changePage("#posterMapPage");
	resetAllIcons();
	var nextFlag = touchPoster(posterid);
	pflag[posterid] = nextFlag;
	showPosterIcons();
}