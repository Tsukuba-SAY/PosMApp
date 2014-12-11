// ポスターの状態を表すフラグ
// TODO: パターンを導入したい
// d：デフォルト（青）
// t：強調表示（赤）
// s：検索ヒット（緑）
// e：検索中の強調表示（赤）
var pflag; 

// アイコンのラベルを何文字目まで表示するか
var labelmax = 7;

// Local DB (WebSQL DB) を開く
// 現在未使用
// var db = openDatabase("PosMAppDB", "", "PosMAppDB", 1000);

// ポスターの総件数
var ptotal;

var STATIC_WIDTH =  216;



// グローバル変数の初期化処理
function initPosterMap() {

	// ポスターの件数をセットする
	ptotal = poster.length;

	// pflagを初期化
	// ポスター件数+1なのはpflagの添字をポスター番号と対応させるため。pflag[0]はnullとしている
	pflag = new Array(ptotal + 1);
	pflag[0] = null;
	for (var i = 1; i <= ptotal; i++) {
		pflag[i] = "d";
	}
}

// 詳細情報画面を表示する
$.fn.goToDetailPage = function(ev) {
	$(this).on(ev, function(e) {
		sessionStorage.setItem("previousPage", "posterMapPage");
		setDetails();
		changePage("#detailPage");
	});
};

// 各ポスターアイコンのタッチイベント
$.fn.touchPoster = function() {
	$(this).on("touchstart", function(e) {
		// ポスターのIDを取得する
		var posterid = Number(e.target.id.substring(4));
		saveLog("poster_tap", {posterid:posterid});

		var nextFlag = touchPoster(posterid);

		pflag[posterid] = nextFlag;
		showPosterIcons();
	});
};

// 基本情報画面を閉じる
$.fn.closeBasicInfo = function() {
	$(this).on("touchstart", function(e) {
		changeBasicInfoPanel(false);
		saveLog("basicinfo_tap", {posterid:sessionStorage.getItem("posterid")});
		unselectPoster();
		showPosterIcons();
		//resetAllIcons();
	});	
};

// ラベルを変更する
$.fn.changeLabel = function() {
	$(this).on("touchstart", function(e) {
		// 押されたボタンのidを取得する
		var id = $(this).attr("id");
		// idの"-"より後がposterテーブルの属性と対応しているので、それを渡す
		var target = id.substr(id.indexOf("-") + 1);
		saveLog("change_label", {label:target});
		changeLabel(target);
	});
};

// ブックマークスターのタッチイベント
$.fn.touchBookmark = function() {
	$(this).on("touchstart", function(e) {
		var posterid = parseInt(sessionStorage.getItem("posterid"));
		var bookmarkIcon = document.getElementById("bookmarkbutton");
		touchBookmark(posterid, bookmarkIcon);
	});	
};

// ポスターアイコンをセットする
function setPosterIcons() {
	var INIT_SCALE = window.innerWidth / STATIC_WIDTH;
	var starAngle = [null, "top:-15px;left:30%;", "right:-15px;top:30%;", "bottom:-15px;left:30%;", "left:-15px;top:30%;"];
	var starpos = [null, "Top", "Right", "Bottom", "Left"];

	var str = "";
	var angle;
	var pos;
	var iconWidth;
	var iconHeight;
	
	var ptotal = poster.length;
	for (var i = 1; i <= ptotal; i++) {
		iconWidth = position[position_map[i-1]].width*INIT_SCALE;
		iconHeight = position[position_map[i-1]].height*INIT_SCALE;

		angle = starAngle[poster[i-1].star];

		str += "<div class='postericonframe' id='iconNo" + i + "' style='left:"+(position[position_map[i-1]].x*INIT_SCALE)+"px;top:"+(position[position_map[i-1]].y*INIT_SCALE)+"px;width:" + iconWidth + "px;height:" + iconHeight + "px;'>\n";
		str += "	<div class='postericon horizontal' style='width:" + iconWidth + "px;height:" + iconHeight + "px;'>\n";
		str += "		<div class='dpic' id='icon" + i +"' style='width:" + iconWidth + "px;height:" + iconHeight + "px;'></div>\n";
		str += "		<div class='" + position[position_map[i-1]].direction + "' id='font" + i + "'>" + poster[i-1].sessionid + "</div>\n";
		str += "	</div>\n";

		pos = starpos[poster[i-1].star];

		str += "	<div id='star" + pos + "No" + i +"' class='star' style='"+angle+" display:none;'><img class='bookmarkstar' src='img/bookmark.png'></img></div>\n";
		str += "</div>\n";
	}
	document.getElementById("posters").innerHTML = str;
}

// ラベルを変更する
function changeLabel(column) {
	// Session Storageに対応する属性の値をセットする
	sessionStorage.setItem("label", column);

	// ラベルの一覧（テスト用）
	var labels = new Array(ptotal);

	// 各ポスターに対してラベルを変更する
	for (var i = 1; i <= ptotal; i++) {
		var str;
		if (column === "authorname") {
			str = getAuthorname(i);
		} else if (column === "authorbelongs") {
			str = getAuthorbelongs(i);
		} else {
			str = poster[i - 1][column].toString();
		}

		// 長さがlabelmax文字以上になっていたら短縮する
		if (str.length > labelmax) {
			str = str.substring(0, labelmax) + "...";
		}
		
		// テスト中ならばラベルの一覧に追加していく
		setLabel(i, str);
		labels[i - 1] = str;
	}
	return labels;
}


// 指定されたラベルをHTMLにセットする
function setLabel(id, str) {
	document.getElementById("font" + id).innerHTML = str;
}


// 現在のフラグを元にポスターのアイコンを表示する
function showPosterIcons() {
	var pic;
	for (var i = 1; i <= ptotal; i++) {
		switch (pflag[i]) {
			case "d":
				pic = "dpic";
				break;
			case "t":
				pic = "tpic";
				break;
			case "s":
				pic = "spic";
				break;
			case "e":
				pic = "epic";
				break;
		}
    	document.getElementById("icon" + i).className = pic;
	}

	console.log(pflag);
}


// ポスターをタッチ
// return : タッチしたポスターの次の状態
// TODO: パターンを導入しようか・・・
function touchPoster(posterid) {
	if (posterid < 1 || posterid > ptotal) {
		throw new Exception();
	}

	if (sessionStorage.getItem("searching") === "true") {
		if (pflag[posterid] === "d") {
			unselectPoster();
			selectPoster(posterid);
			return "t";
		} else if (pflag[posterid] === "t") {
			changeBasicInfoPanel(false);
			unselectPoster();
			return "d";
		} else if (pflag[posterid] === "s") {
			unselectPoster();
			selectPoster(posterid);
			return "e";
		} else if (pflag[posterid] === "e") {
			changeBasicInfoPanel(false);
			unselectPoster();
			return "s";
		}
	} else {
		if (pflag[posterid] === "d") {
			unselectPoster();
			selectPoster(posterid);
			return "t";
		} else if (pflag[posterid] === "t") {
			changeBasicInfoPanel(false);
			unselectPoster();
			return "d";
		} 
	}
}


// 基本情報パネルを変更する
function changeBasicInfoPanel(flag) {

	var basicinfopanel = document.getElementById("basicinfopanel");
	if (flag) {
		basicinfopanel.style.display = "inline";
	} else {
		basicinfopanel.style.display = "none";
		removeAllPosterInfo();
	}

	var basicinfo = document.getElementById("basicinfo");

	basicinfo.innerHTML = 
		// "No. " 
		// + sessionStorage.getItem("posterid")+
		 " ["
		+ sessionStorage.getItem("sessionid")
		+ "]<br />"
		+ sessionStorage.getItem("title")
		+ "<br />代表者名： "
		+ sessionStorage.getItem("authorname")
		+ "<br />所属： "
		+ sessionStorage.getItem("authorbelongs");

	var bookmarkIcon = document.getElementById("bookmarkbutton");
	var bookmarks = localStorage.getItem("bookmarks");
	if (bookmarks === null || bookmarks === "") {
		bookmarks = "";
	}
	var bookmarkArr = bookmarks.split(",");
	var foundBookmark = false;
	console.log(sessionStorage.getItem("posterid"));
	for (var i = 0; i < bookmarkArr.length; i++) {
		if (parseInt(sessionStorage.getItem("posterid")) === parseInt(bookmarkArr[i])) {
			foundBookmark = true;
			break;
		}
	}
	if (foundBookmark) {
		bookmarkIcon.src = "img/bookmark.png";
	} else {
		bookmarkIcon.src = "img/unbookmark.png";
	}
}


// タイトルで検索
// SQLをかけたいのでDBにアクセスしてるけどjsonでも同じことはできる
function searchByTitle(title) {

	if (title.length >= 1024) {
		throw new Exception();
	}

	var posterids = [];
	var ltitle = title.toLowerCase();

	poster.forEach(function(aPoster) {
		if (aPoster.title.toLowerCase().indexOf(ltitle) !== -1) {
			posterids.push(aPoster.id);
		}
	});
	console.log("HIT : " + posterids);

	emphasisSearchedPosters(posterids);

	if (posterids.length === 0) {
		document.getElementById("searchResult").innerHTML = "見つかりませんでした";
	} else {
		document.getElementById("searchResult").innerHTML = posterids.length + "件見つかりました";
	}

	return pflag;
}


// 検索されたポスターを強調表示する
function emphasisSearchedPosters(posterids) {

	// 前回の検索結果をリセットする
	for (var i = 1; i <= ptotal; i++) {
		if (pflag[i] !== "t" && pflag[i] !== "e") {
			pflag[i] = "d";
		}
	}

	// ヒットしたポスターを強調表示する
	posterids.forEach(function(id) {
		// すでに選択されていれば、検索ヒット中の強調表示にする
		if (pflag[id] === "t") {
			pflag[id] = "e";
		// 検索ヒット中の強調表示になっていない限り、検索ヒットにする
		} else if (pflag[id] !== "e") {
			pflag[id] = "s";
		}
	});
	
	showPosterIcons();
	
}


// ポスターを選択する
function selectPoster(posterid) {

	for (var i = 0; i < ptotal; i++) {
		var p = poster[i];
		if (p.id === posterid) {
			sessionStorage.setItem("posterid", posterid);
			sessionStorage.setItem("sessionid", p.sessionid);
			sessionStorage.setItem("title", p.title);
			sessionStorage.setItem("abstract", p.abstract);

			sessionStorage.setItem("authorname", getAuthorname(posterid));

			sessionStorage.setItem("authorbelongs", getAuthorbelongs(posterid));

			sessionStorage.setItem("bookmark", p.bookmark);
			sessionStorage.setItem("star", p.star);
		}
	}

	var authors = [];
	for (var i = 0; i < author.length; i++) {
		var a = author[i];
		if (a.posterid === posterid) {
			authors.push(a.name);
		}
	}
	authors = authors.join(", ");
	sessionStorage.setItem("authors", authors);

	var keywords = [];
	for (var i = 0; i < keyword.length; i++) {
		var k = keyword[i];
		if (k.posterid === posterid) {
			keywords.push(k.keyword);
		}
	}
	keywords = keywords.join(",");
	sessionStorage.setItem("keywords", keywords);

	changeBasicInfoPanel(true);

}


// 強調表示を解除する
function unselectPoster() {
	for (var i = 1; i <= ptotal; i++) {
		if (pflag[i] === "t") { 
			pflag[i] = "d"; 
		} else if (pflag[i] === "e") {
			pflag[i] = "s";
		}
	}
}


// すべてのアイコンをデフォルトに戻す
function resetAllIcons() {
	for (var i = 1; i <= ptotal; i++) {
		pflag[i] = "d";
	}
	showPosterIcons();
}


// Session Storageに保存されているポスターの情報を消去する
function removeAllPosterInfo() {
	sessionStorage.removeItem("posterid");
	sessionStorage.removeItem("sessionid");
	sessionStorage.removeItem("title");
	sessionStorage.removeItem("abstract");
	sessionStorage.removeItem("authorname");
	sessionStorage.removeItem("authorbelongs");
	sessionStorage.removeItem("bookmark");
	sessionStorage.removeItem("star");
	sessionStorage.removeItem("authors");
	sessionStorage.removeItem("keywords");
}


// ブックマークスターを表示する
function showBookmarkIcons() {
	// ブックマークがLocal Storageに保存されていればマップ上に星をつける
	// カンマ区切りでポスターIDが保存されているのでそれを区切った配列を生成する
	var bookmarkArr = getBookmarks();
	for (var i = 0; i < bookmarkArr.length; i++) {
		var posterid = bookmarkArr[i];
		if (!isNaN(posterid)) {
			var p = poster[posterid-1];
			// ポスターのstar属性によって配置する位置を決定する
			// 1が上で時計回り
			var starpos = [null, "Top", "Right", "Bottom", "Left"];
			starelem = document.getElementById("star" + starpos[p.star] + "No" + posterid);

			// 該当する星要素を表示する
			starelem.style.display = "block";
		}

	}
}


// ブックマークスターをタッチする（状態のスイッチ）
function touchBookmark(posterid, bookmarkIcon){
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
	var starstatus;
	if (location !== -1) {
		// ある場合
		// 存在しているIDを削除する
		bookmarkArr.splice(location, 1);
		if (bookmarkIcon !== null) {
			bookmarkIcon.src = "img/unbookmark.png";
			$("#listbookmark" + posterid).attr("src","img/unbookmark.png");
		}
		starstatus = "none";
		saveLog("unbookmark", {posterid:posterid, page:window.location.hash});
	} else {
		// ない場合
		bookmarkArr.push(posterid);
		bookmarkArr.sort(function(a,b){
    		return (parseInt(a) < parseInt(b)) ? -1 : 1;
    	});
		if (bookmarkIcon !== null) {
			bookmarkIcon.src = "img/bookmark.png";
			$("#listbookmark" + posterid).attr("src","img/bookmark.png");
		}
		starstatus = "block";
		saveLog("bookmark", {posterid:posterid, page:window.location.hash});
	}

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


// ブックマークされたポスターIDを数値の配列で取得する
function getBookmarks() {
	var bookmarks = localStorage.getItem("bookmarks");
	// 空文字列だった場合は何もブックマークされていないので空配列
	var bookmarkArr = (bookmarks !== "" && bookmarks !== null) ? bookmarks.split(",") : [];
	// 中身をすべて数値にする
	bookmarkArr.filter(function(obj) {
		return parseInt(obj);
	});
	// ソート
	bookmarkArr.sort(function(a,b){
    	return (parseInt(a) < parseInt(b)) ? -1 : 1;
    });

	return bookmarkArr;
}


// 検索バーが変更されたとき
// TODO: jQueryを使うとbindされない原因をつきとめてjQueryに戻す
function searchChanged(bar) {
	if (bar.value.trim() !== "" && bar.value !== null) {
		
		// 検索し、強調表示する
		console.log("search");
		saveLog("search", {keyword:bar.value});
		searchByTitle(bar.value);

		// 検索中フラグを立てる
		sessionStorage.setItem("searching", "true");
		sessionStorage.setItem("searchWord", bar.value);

	} else {
		// 検索中フラグを折る
		sessionStorage.removeItem("searching");
		sessionStorage.removeItem("searchWord");

		// 各ポスターに対して検索中状態から未検索状態へフラグを変化させる
		for (var i = 1; i <= ptotal; i++) {
			// 検索中強調表示ならばただの強調表示に、ヒット状態なら元に戻す
			if (pflag[i] === "e") {
				pflag[i] = "t";
			} else if (pflag[i] === "s") {
				pflag[i] = "d";
			}
		}

		document.getElementById("searchResult").innerHTML = "";
	}

	showPosterIcons();
	bar.blur();
}

// 代表者名を取得
function getAuthorname(posterid) {
	return author.filter(function(a) {
		return a.posterid === posterid && a.first === 1;
	})[0].name;
}

// 所属一覧を取得
function getAuthorbelongs(posterid) {
	return author.filter(function(a) {
		return a.posterid === posterid;
	}).map(function(a) {
		return a.belongs;
	}).filter(function(a, i, self) {
   		return self.indexOf(a) === i;
	}).join(", ");
}

//ポスターの発表者を取得
function getAuthors(posterid) {
	var authors = [];
	for (var i = 0; i < author.length; i++) {
		var a = author[i];
		if (a.posterid === posterid) {
			authors.push(a.name);
		}
	}
	authors = authors.join(", ");
	return authors;
}

//ポスターのキーワードを取得
function getKeywords(posterid) {
	var keywords = [];
	for (var i = 0; i < keyword.length; i++) {
		var k = keyword[i];
		if (k.posterid === posterid) {
			keywords.push(k.keyword);
		}
	}
	keywords = keywords.join(",");
	return keywords;
}