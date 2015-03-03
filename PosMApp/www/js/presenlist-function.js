// 発表の一覧を表示する
$.fn.showPresenList = function() {
	if (presen !== null) {
		var presens = [];
		presens["posterid"] = [];
		presens["presenid"] = [];
		presens["title"] = [];
		presens["author"] = [];
		var sessionKind = ["A","B","C","D","E","F","G","P"];
		//存在していないセッション番号
		var notExistSessionNum = ["A7","P5","P6","B7","P7","P8","P9","X1","X2","X3","X4","X5","X6","X7","X8","X9"];
		var existflag = false;

		//テスト用変数
		var testSessionNum = [];
		//ブックマークされた発表IDを取得する
		var bookmarkIcon = document.getElementById("bookmarkbutton");
		var bookmarkArr = getBookmarks();
		var str = "";
		str += '<table border="1" rules="rows" width="100%">';
		//セッション番号はF8まで、8回ループする
		for(var sessionNum = 1; sessionNum < 9; sessionNum++){
			//ABCDのループ
			for(var presenNum = 0; presenNum < sessionKind.length; presenNum++){
				var sessionId = sessionKind[presenNum] + sessionNum;
				//セッションの生成
				//セッションが存在しているかどうかを確認する

				existflag = $.inArray(sessionId, notExistSessionNum) >= 0 ? true : false;

				if(!existflag){
					str += "<tr id='session"+sessionId+"'><th class='sessionTH' colspan='3'><font class='sessionTitle'>" + sessionId + ":<strong>"; 
					//sessionのタイトルとchairpersonを探す
					for(var sessionArrNum = 0 ; sessionArrNum < session.length ; sessionArrNum++){
						if(sessionId == session[sessionArrNum].sessionid){
							str += session[sessionArrNum].title + "</strong></font><br>";
							str += "<font class='sessionPerson'>座長:" + session[sessionArrNum].chairpersonname + "("+ session[sessionArrNum].chairpersonbelongs +")</font><br>";
						}
					}
					str += "<font class='sessionPerson'>コメンテータ:";
					//コメンテーターを探す
					for(var commentatorNum = 0; commentatorNum < commentator.length ; commentatorNum++){
						if(commentator[commentatorNum].sessionid === sessionId){
							str += commentator[commentatorNum].name + "(" + commentator[commentatorNum].belongs + ") ";
						}
					}
					str += "</font></th></tr>";
					testSessionNum.push(sessionId);
				}

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
						str += "<tr id='presen" + p.presenid + "'><td><div> 	" + p.presenid;
						// ポスター発表があるときのみマップへ遷移するボタンを表示
						if (posterid !== -1) {
							str += "<img class='listToMapBtn' id='listToMap" +posterid+ "' src='img/logo_posmapp.png' style='zoom: 8%;'></img>";
						}
						//ブックマークされたかどうか判断する
						var foundBookmarkIndex = $.inArray(p.presenid, bookmarkArr);

						if (foundBookmarkIndex >= 0) {
							str += "<img class='listbookmarkbutton' id='listbookmark"+p.presenid+"' src='img/bookmark.png' style='zoom: 22%;'></img><br>";
						} else {
							str += "<img class='listbookmarkbutton' id='listbookmark"+p.presenid+"' src='img/unbookmark.png' style='zoom: 22%;'></img><br>";
						}
						str += "<span class='listTitle'><strong>" + p.title + "</strong></span><br>";
						str += "<div class='authors-on-list'><span class='listAuthors'>" + authors + "</span></div></td>";
						str += "<td><div><td><img class='listToDetailBtn' id='listToDetail"+p.presenid+"' src='img/detailinfo.png' style='zoom: 3%;'> </img></div>";
					}
				});
			}
		}

		str += '</table>'

		$(this).html(str);
		$(".listToMapBtn").jumpToMapPage();
		$(".listToDetailBtn").jumpToDetailPage();
		$(".listbookmarkbutton").listchangebookmark();
		$(".listTitle").jumpToDetailPage();
		$(".listAuthors").jumpToDetailPage();

		sessionStorage.setItem("testSessionNum",testSessionNum);

		return presens;
	}
	return presens;
};

//ポスターリスト画面の各「詳細情報」ボタンをクリックする時
$.fn.jumpToDetailPage = function() {
	$(this).on("click", function(e) {
		// ポスターのIDを取得する
		var presenid = $(e.target)
						.parents()
						.filter(function() {return this.tagName === "TR"})
						.get(0)
						.id
						.substring("presen".length);
		sessionStorage.setItem("previousPage", "presenListPage");
		sessionStorage.setItem("listClick", "presenlist");
		listToDetail(presenid);
	});
};

//ポスターリスト画面の各「これどこ？」ボタンをクリックする時
$.fn.jumpToMapPage = function() {
	$(this).on("click", function(e) {
		// ポスターのIDを取得する
		var presenid = $(e.target)
				.parents()
				.filter(function() {return this.tagName === "TR"})
				.get(0)
				.id
				.substring("presen".length);
		var posterid = getPosterid(presenid);
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

	effectPosterIcon(posterid);

	changePage("#posterMapPage");

	// 指定したポスターが発表される日付へ移動
	var posterlength = poster.length;
	for (var i = 0; i < posterlength; i++) {
		if (poster[i].posterid === posterid) {
			changePosterMapDate(poster[i].date);
			break;
		}
	}

	resetAllIcons();
	var nextFlag = touchPoster(posterid);
	pflag[posterid] = nextFlag;
	showPosterIcons();

	var word = sessionStorage.getItem("searchWord");
	if (word !== "" && word !== null) {
		searchAll(sessionStorage.getItem("searchWord"));
	}
}

//ポスターリストからブックマークアイコンをクリックする
$.fn.listchangebookmark = function() {
	$(this).on("click", function(e) {
		// ポスターのIDを取得する
		var presenid = e.target.id.substring(12);
		var bookmarkIcon = document.getElementById("listbookmark"+presenid);

		var bookmarkArr = getBookmarks();
		// posteridに該当するポスターがブックマークリストに存在しているか確認用
		var location = bookmarkArr.indexOf(presenid);
		if (location !== -1) {
			// ある場合
			// 存在しているIDを削除する
			bookmarkArr.splice(location, 1);
			if (bookmarkIcon !== null) {
				bookmarkIcon.src = "img/unbookmark.png";
				$("#listbookmark" + presenid).attr("src","img/unbookmark.png");
			}
			saveLog("unbookmark", {presenid:presenid, page:window.location.hash});
		} else {
			// ない場合
			bookmarkArr.push(presenid);
			bookmarkArr.sort();
			if (bookmarkIcon !== null) {
				bookmarkIcon.src = "img/bookmark.png";
				$("#listbookmark" + presenid).attr("src","img/bookmark.png");
			}
			saveLog("bookmark", {presenid:presenid, page:window.location.hash});
		}

		bookmarks = bookmarkArr.join(",");
		localStorage.setItem("bookmarks", bookmarks);

		$("#bookmarkList").showBookmarkList();
	});
};

// 指定したpresenidのところまでジャンプする
function scrollToPresen(presenid) {
	changePage("#presenListPage");
	changeShowList("presen");
	var target = $("#presen" + presenid);
	var position = target.offset().top;
	var speed = 400;
	$('body,html').animate({scrollTop:position}, speed, 'swing');
}

//リストの入れ替え
function changeShowList(val){
	if (val == "presenlist") {
		$("#presenList").show();
		$("#bookmarkList").hide();
		$("#listIconAll").addClass("ui-btn-active");
		$("#listIconStar").removeClass("ui-btn-active");
		var pagename = "#presenListPage";
	} else {
		$("#presenList").hide();
		$("#bookmarkList").show();
		$("#listIconAll").removeClass("ui-btn-active");
		$("#listIconStar").addClass("ui-btn-active");
		var pagename = "#bookmarkListPage";
	}
	sessionStorage.setItem("currentListPage", pagename);
	saveLog("show_page", {page:pagename});
}