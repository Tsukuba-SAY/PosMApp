// 発表の一覧を表示する
$.fn.showPresenList = function() {
	if (presen !== null) {
		var presens = [];
		presens["posterid"] = [];
		presens["presenid"] = [];
		presens["title"] = [];
		presens["author"] = [];
		var sessionKind = ["A","B","C","D","E","F","P","X"];
		//存在していないセッション番号
		var notExitSessionNum = ["A3","A6","A7","P4","P5","P6","P7","P8","P9","X1","X2","X4","X5","X6","X7","X8","X9",];
		var existflag = false;

		//テスト用変数
		var testSessionNum = [];
		//ブックマークされた発表IDを取得する
		var bookmarkIcon = document.getElementById("bookmarkbutton");
		var bookmarks = localStorage.getItem("bookmarks");
		if (bookmarks === null || bookmarks === "") {
			bookmarks = "";
		}
		var bookmarkArr = bookmarks.split(",");
		var str = "";
		str += '<table border="1" rules="rows" width="100%">';
		//セッション番号はF9まで、9回ループする
		for(var sessionNum = 1; sessionNum < 10;sessionNum ++ ){
			//ABCDのループ
			for(var presenNum = 0; presenNum < sessionKind.length ; presenNum ++){
				var sessionId = sessionKind[presenNum] + sessionNum;
				//セッションの生成
				//セッションが存在しているかどうかを確認する
				notExitSessionNum.forEach(function(p){
					if (p == sessionId) {
						existflag = true;
					}
				});
				if(!existflag){
					str += "<tr><th colspan='3'>" + sessionId + ":<strong>"; 
					//sessionのタイトルとchairpersonを探す
					for(var sessionArrNum = 0 ; sessionArrNum < session.length ; sessionArrNum++){
						if(sessionId == session[sessionArrNum].sessionid){
							str += session[sessionArrNum].title + "</strong><br>";
							str += "座長:" + session[sessionArrNum].chairpersonname + "<br>";
						}
					}
					str += "コメンテータ:";
					//コメンテーターを探す
					for(var commontatorNum = 0; commontatorNum < commentator.length ; commontatorNum++){
						if(commentator[commontatorNum].sessionid === sessionId){
							str += commentator[commontatorNum].name + "(" + commentator[commontatorNum].belongs + ") ";
						}
					}
					str += "</th></tr>";
					testSessionNum.push(sessionId);
				}

				existflag = false;
				
				//該当セッション下のプレゼンを表示する
				presen.forEach(function(p){
					//存在すれば、表示する
					if(p.presenid.indexOf(sessionId) >= 0){
						var posterid = getPosterid(p.presenid);
						authors = getAuthors(p.presenid).split(",").join(", ");
						presens["posterid"].push(posterid !== -1 ? posterid : null);
						presens["presenid"].push(p.presenid);
						presens["title"].push(p.title);
						presens["author"].push(getAuthors(p.presenid));
						str += "<tr id='presen" + p.presenid + "'><td><div>発表ID: " + p.presenid;
						// ポスター発表があるときのみマップへ遷移するボタンを表示
						if (posterid !== -1) {
							str += "<img class='listToMapBtn' id='listToMap" +posterid+ "' src='img/logo_posmapp.png' style='zoom: 8%;'></img>";
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
							str += "&nbsp;&nbsp;<img class='listbookmarkbutton' id='listbookmark"+p.presenid+"' src='img/bookmark.png' style='zoom: 22%;'></img><br>";
						} else {
							str += "&nbsp;&nbsp;<img class='listbookmarkbutton' id='listbookmark"+p.presenid+"' src='img/unbookmark.png' style='zoom: 22%;'></img><br>";
						}
						str += "<strong>" + p.title + "</strong><br>";
						str += "メンバー: " + authors + "<br></td>";
						str += "<td><div><td><img class='listToDetailBtn' id='listToDetail"+p.presenid+"' src='img/detailinfo.png' style='zoom: 3%;'> </img></div>";
					}
				});
			}
		}

		str += '</table>'

		$(this).html(str);

		sessionStorage.setItem("testSessionNum",testSessionNum);

		return presens;
	}
	return presens;
};

//ポスターリスト画面の各「詳細情報」ボタンをクリックする時
$.fn.jumpToDetailPage = function() {
	$(this).on("touchstart", function(e) {
		// ポスターのIDを取得する
		var presenid = e.target.id.substring(12);
		sessionStorage.setItem("previousPage", "presenListPage");
		listToDetail(presenid);
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
function listToDetail(presenid){

	// if (posterid < 1 || posterid > poster.length || posterid === null || posterid === undefined) {
	// 	throw new Exception();
	// }
	if (presenid === null || presenid === undefined) {
		throw new Exception();
	}

	//sessionStorageの中に存在している情報の削除
	removeAllPosterInfo();

	//選択中の発表の情報をsessionStorageに保存する
	presen.forEach(function(p) {
		if (p.presenid === presenid) {
			sessionStorage.setItem("posterid", getPosterid(presenid));
			sessionStorage.setItem("presenid", presenid);
			sessionStorage.setItem("title", p.title);
			sessionStorage.setItem("abstract", p.abstract);
			sessionStorage.setItem("authorname", getAuthorname(presenid));
			sessionStorage.setItem("authors", getAuthors(presenid));
			sessionStorage.setItem("keywords", getKeywords(presenid));
			sessionStorage.setItem("authorbelongs", getAuthorbelongs(presenid));
		}
	});

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
		var presenid = e.target.id.substring(12);
		var bookmarkIcon = document.getElementById("bookmarkbutton");
		touchBookmark(presenid, bookmarkIcon);
	});
};

// 指定したpresenidのところまでジャンプする
function scrollToPresen(presenid) {
	changePage("#presenListPage");
	var target = $("#presen" + presenid);
	var position = target.offset().top;
	var speed = 400;
	$('body,html').animate({scrollTop:position}, speed, 'swing');
}