function showposterlist(){
	var str="";
	var posters = new Array();
	posters["id"] = new Array();
	posters["sessionid"] = new Array();
	posters["title"] = new Array();
	posters["author"] = new Array();

	if (!test) {
		document.getElementById("posterlistTableTab").innerHTML = "";
	}
	//postdataをループする、各ポスターの情報を取り出す
	for (var i = 0; i < poster.length; i++) {
		posters["id"].push(poster[i].id.toString());
		posters["sessionid"].push(poster[i].sessionid);
		posters["title"].push(poster[i].title);
		posters["author"].push(getAuthors(i+1));
		str += "<tr><td><div>ID:" + poster[i].id + "</div>";
		str += "<div>Sessionid:" + poster[i].sessionid + "</div>";
		str += "<div>Title:" + poster[i].title + "</div>";
		str += "<div>Author:" + getAuthors(i+1) + "</div>";
		str += '<table><tr><td><a data-role = "button" class = "listToMapBtn" id = "listToMap' + poster[i].id.toString() + '">これどこ？</a></td><td><a data-role = "button" class = "listToDetailBtn" id = "listToMap' + poster[i].id.toString() + '">詳細情報</a></td></tr></table></td></tr>';
		
	}
	if (!test) {
		//テーブルに配置する
		document.getElementById("posterlistTableTab").innerHTML = str;
	}

	return posters;
}

//ポスターの発表者を獲得する
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

//ポスターのキーワードを獲得する
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

	//画面遷移ファクションを呼び出す、がめんを遷移する
	setDetails();
	changePage("#detailPage");
}

//ポスターリストから地図画面に遷移する
function listToMap(posterid){
	//sessionStorageの中に存在している情報の削除
	removeAllPosterInfo();

	changePage("#posterMapPage");
	resetAllIcons();
	var nextFlag = touchPoster(posterid);
	pflag[posterid] = nextFlag;
	showPosterIcons();
}