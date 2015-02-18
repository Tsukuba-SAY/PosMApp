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

// グローバル変数の初期化処理
function initPosterMap() {

	if(poster !== null){
		// ポスターの件数をセットする
		var ptotal = poster.length;

		// pflagを初期化
		// ポスター件数+1なのはpflagの添字をポスター番号と対応させるため。pflag[0]はnullとしている
		pflag = new Array(ptotal + 1);
		pflag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			pflag[i] = "d";
		}
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
	$(this).on("click", function(e) {
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
	$(this).on("click", function(e) {
		changeBasicInfoPanel(false);
		saveLog("basicinfo_tap", {posterid:sessionStorage.getItem("posterid")});
		unselectPoster();
		showPosterIcons();
		//resetAllIcons();
	});	
};

// ラベルを変更する
$.fn.changeLabel = function() {
	$(this).on("click", function(e) {
		// 押されたボタンのidを取得する
		var id = $(this).attr("id");
		// idの"-"より後がposterテーブルの属性と対応しているので、それを渡す
		var target = id.substr(id.indexOf("-") + 1);
		saveLog("change_label", {label:target});
		changeLabel(target);
		closePanel($("#menuPanel"));
	});
};

// ブックマークスターのタッチイベント
$.fn.touchBookmark = function() {
	$(this).on("click", function(e) {
		var presenid = sessionStorage.getItem("presenid");
		var bookmarkIcon = document.getElementById("bookmarkbutton");
		touchBookmark(presenid, bookmarkIcon);
	});	
};

// ブックマークスターを大きくする
$.fn.sizeUpBookmarkStar = function() {
	$(this).css("width", 15);
	$(this).css("height", 15);
};

// ブックマークスターを小さくする
$.fn.sizeDownBookmarkStar = function() {
	$(this).css("width", 5);
	$(this).css("height", 5);
};

// ポスターアイコンをセットする
function setPosterIcons() {
	if(poster !== null && position_map != null && position != null){
		var starAngle = [null, "top:-5px;", "right:-5px;", "bottom:-5px;", "left:-5px;"];
		var starpos = [null, "Top", "Right", "Bottom", "Left"];

		var str = "";
		var angle;
		var pos;
		var iconWidth;
		var iconHeight;
		ptotal = poster.length;

		// 2日目のポスター開始位置
		// 完全にDEIM2015仕様決め打ち
		var offset = 99;

		// 1日目のポスター
		for (var i = 1; i <= offset; i++) {
			console.log(position_map[i-1]);
			iconWidth = position[position_map[i-1]].width * INIT_SCALE;
			iconHeight = position[position_map[i-1]].height * INIT_SCALE;

			angle = starAngle[poster[i-1].star];
			pos = starpos[poster[i-1].star];

			str +=
				"<div class='postericonframe day1' id='iconNo" + i + "' style='left:"+(position[position_map[i-1]].x*INIT_SCALE)+"px;top:"+(position[position_map[i-1]].y*INIT_SCALE)+"px;width:" + iconWidth + "px;height:" + iconHeight + "px;'>\
					<div class='postericon' style='width:" + iconWidth + "px;height:" + iconHeight + "px;'>\
						<div class='dpic' id='icon" + i +"' style='width:" + iconWidth + "px;height:" + iconHeight + "px; display: table-cell; vertical-align: middle; text-align: center;'>\
							<div class='posterfont' id='font" + i + "'>" + poster[i-1].presenid + "</div>\
						</div>\
					</div>\
					<img id='star" + pos + "No" + i +"' class='star bookmarkstar' style='"+angle+" display:none;' src='img/bookmark.png'></img>\
				</div>\n";
		}
		// 2日目のポスター
		console.log(ptotal);
		for (var i = offset + 1; i <= ptotal; i++) {
			// console.log(i);
			iconWidth = position[position_map[i-offset-1]].width * INIT_SCALE;
			iconHeight = position[position_map[i-offset-1]].height * INIT_SCALE;

			angle = starAngle[poster[i-1].star];
			pos = starpos[poster[i-1].star];

			str += 
				"<div class='postericonframe day2' id='iconNo" + i + "' style='left:"+(position[position_map[i-offset-1]].x*INIT_SCALE)+"px;top:"+(position[position_map[i-offset-1]].y*INIT_SCALE)+"px;width:" + iconWidth + "px;height:" + iconHeight + "px;'>\
					<div class='postericon' style='width:" + iconWidth + "px;height:" + iconHeight + "px;'>\
						<div class='dpic' id='icon" + i +"' style='width:" + iconWidth + "px;height:" + iconHeight + "px; display: table-cell; vertical-align: middle; text-align: center;'>\
							<div class='posterfont' id='font" + i + "'>" + poster[i-1].presenid + "</div>\
						</div>\
					</div>\
					<img id='star" + pos + "No" + i +"' class='star bookmarkstar' style='"+angle+" display:none;' src='img/bookmark.png'></img>\
				</div>\n";
		}
	}
	document.getElementById("posters").innerHTML = str;
	if (sessionStorage.getItem("currentPosterMapDate") === "1") {
		$(".day1").show();
		$(".day2").hide();
	} else {
		$(".day1").hide();
		$(".day2").show();
	}
	showBookmarkStars();
}

function showBookmarkStars() {
	var ptotal = poster.length;
	for (var i = 1; i <= ptotal; i++) {
		var starpos = [null, "Top", "Right", "Bottom", "Left"];
		var pos = starpos[poster[i-1].star];
		var star = document.getElementById("star" + pos + "No" + i);
		var bookmarkArr = getBookmarks();
		var location = bookmarkArr.indexOf(poster[i-1].presenid);
		if (location !== -1) {
			star.style.display = "block";
		} else {
			star.style.display = "none";
		}
	}
}

// ラベルを変更する
function changeLabel(column) {
	if(presen !== null){
		// Session Storageに対応する属性の値をセットする
		sessionStorage.setItem("label", column);

		// ラベルの一覧（テスト用）
		var labels = new Array(ptotal);

		// 各ポスターに対してラベルを変更する
		for (var i = 1; i <= ptotal; i++) {
			var str;
			if (column === "authorname") {
				str = getAuthorname(poster[i-1].presenid);
			} else if (column === "authorbelongs") {
				str = getAuthorbelongs(poster[i-1].presenid);
			} else {
				var p;
				presen.forEach(function(obj) {
					if (obj.presenid === poster[i-1].presenid) {
						p = obj;
					}
				});
				str = p[column].toString();
			}

			// 長さがlabelmax文字以上になっていたら短縮する
			if (str.length > labelmax) {
				str = str.substring(0, labelmax) + "...";
			}
			
			// テスト中ならばラベルの一覧に追加していく
			setLabel(i, str);
			// labels[i - 1] = str;
		}
		return labels;
	} 
}


// 指定されたラベルをHTMLにセットする
function setLabel(id, str) {
	document.getElementById("font" + id).innerHTML = str;
}

// ラベルのサイズを決める
function setLabelSize() {
	// 1em分のpxを取得
	var empx = $('#emScale').height();
	// 文字数
	var count = 4;

	//error handling
	if (poster != null && position_map != null && position != null) {
		ptotal = poster.length;

		// 2日目のポスター開始位置
		// 完全にDEIM2015仕様決め打ち
		var offset = 99;

		for (var i = 1; i <= offset; i++) {
			iconWidth = position[position_map[i-1]].width*INIT_SCALE;
			iconHeight = position[position_map[i-1]].height*INIT_SCALE;
			iconDirection = position[position_map[i-1]].direction;
			if (iconDirection === "longways") {
				var scale = iconHeight / (4 * empx);
				var rotate = "90deg";
				$("#font" + i)
					.css("transform", "rotateZ(" + rotate + ") scale(" + scale + ")")
					.css("top", "calc(-50% + " + (empx*scale) + "px)")
					.css("left", "calc(-50% + " + (empx*scale) + "px)");
			} else {
				var scale = iconWidth / (4 * empx);
				$("#font" + i)
					.css("transform", "scale(" + scale + ")")
					.css("top", "calc(-50% + " + (empx*scale) + "px)")
					.css("left", "calc(-50% + " + (empx*scale) + "px)");
			}
		}

		for (var i = offset + 1; i <= ptotal; i++) {
			iconWidth = position[position_map[i-offset-1]].width*INIT_SCALE;
			iconHeight = position[position_map[i-offset-1]].height*INIT_SCALE;
			iconDirection = position[position_map[i-offset-1]].direction;
			if (iconDirection === "longways") {
				var scale = iconHeight / (4 * empx);
				var rotate = "90deg";
				$("#font" + i)
					.css("transform", "rotateZ(" + rotate + ") scale(" + scale + ")")
					.css("top", "calc(-50% + " + (empx*scale) + "px)")
					.css("left", "calc(-50% + " + (empx*scale) + "px)");
			} else {
				var scale = iconWidth / (4 * empx);
				$("#font" + i)
					.css("transform", "scale(" + scale + ")")
					.css("top", "calc(-50% + " + (empx*scale) + "px)")
					.css("left", "calc(-50% + " + (empx*scale) + "px)");
			}
		}
	};

}


// 現在のフラグを元にポスターのアイコンを表示する
function showPosterIcons() {
	var pic;
	var ptotal = poster.length;
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
		+ sessionStorage.getItem("presenid")
		+ "]<br />"
		+ "<div id='basicInfoTitleContainer'><span id='basicInfoTitle'>"
		+ sessionStorage.getItem("title")
		+ "</span></div>"
		+ sessionStorage.getItem("authorname")

	var bookmarkIcon = document.getElementById("bookmarkbutton");
	var bookmarks = localStorage.getItem("bookmarks");
	if (bookmarks === null || bookmarks === "") {
		bookmarks = "";
	}
	var bookmarkArr = bookmarks.split(",");
	var presenid = sessionStorage.getItem("presenid");
	// console.log(sessionStorage.getItem("presenid"));
	// for (var i = 0; i < bookmarkArr.length; i++) {
	// 	if (parseInt(sessionStorage.getItem("posterid")) === parseInt(bookmarkArr[i])) {
	// 		foundBookmark = true;
	// 		break;
	// 	}
	// }

	if (bookmarkArr.indexOf(presenid) !== -1) {
		bookmarkIcon.src = "img/bookmark.png";
	} else {
		bookmarkIcon.src = "img/unbookmark.png";
	}
}

// 検索されたポスターを強調表示する
function emphasisSearchedPosters(posterids) {

	// 前回の検索結果をリセットする
	for (var i = 1; i <= ptotal; i++) {
		if (pflag[i] !== "t" && pflag[i] !== "e") {
			pflag[i] = "d";
		}
		
		//前回強調表示かつタッチされたポスターの状態が普通のタッチ状態に戻る
		//#75「前回のsearch結果をタッチしている状態キーワード変更してまた検索するフラグがおかしい」バグの修正
		if(pflag[i] === "e"){
			pflag[i] = "t";
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

	// posterに含まれているidが必ず連番になっていなければならない
	var presenid = poster[posterid-1].presenid;
	var presenlength = presen.length;
	for (var i = 0; i < presenlength; i++) {
		var p = presen[i];
		if (p.presenid === presenid) {
			sessionStorage.setItem("posterid", posterid);
			sessionStorage.setItem("presenid", p.presenid);
			sessionStorage.setItem("title", p.title);
			sessionStorage.setItem("abstract", p.abstract);

			sessionStorage.setItem("authorname", getAuthorname(p.presenid));

			sessionStorage.setItem("authorbelongs", getAuthorbelongs(p.presenid));

			sessionStorage.setItem("bookmark", p.bookmark);
			sessionStorage.setItem("star", poster[posterid-1].star);
			sessionStorage.setItem("authors", getAuthors(presenid));
			sessionStorage.setItem("keywords", getKeywords(presenid));
			break;
		}
	}

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
	sessionStorage.removeItem("presenid");
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
		var presenid = bookmarkArr[i];
		if (presenid !== undefined && presenid !== null) {
			var posterid = getPosterid(presenid);
			if (posterid !== -1) {
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
}


// ブックマークスターをタッチする（状態のスイッチ）
function touchBookmark(presenid, bookmarkIcon){
	// if (posterid < 1 || posterid > ptotal || posterid === null) {
	// 	throw new Exception();
	// }

	// var presenid = poster[posterid-1].presenid;
	var bookmarkArr = getBookmarks();
	// posteridに該当するポスターがブックマークリストに存在しているか確認用
	var location = bookmarkArr.indexOf(presenid);

	var starstatus;
	if (location !== -1) {
		// ある場合
		// 存在しているIDを削除する
		bookmarkArr.splice(location, 1);
		if (bookmarkIcon !== null) {
			bookmarkIcon.src = "img/unbookmark.png";
			$("#listbookmark" + presenid).attr("src","img/unbookmark.png");
		}
		starstatus = "none";
		saveLog("unbookmark", {presenid:presenid, page:window.location.hash});
	} else {
		// ない場合
		bookmarkArr.push(presenid);
		bookmarkArr.sort();
		if (bookmarkIcon !== null) {
			bookmarkIcon.src = "img/bookmark.png";
			$("#listbookmark" + presenid).attr("src","img/bookmark.png");
		}
		starstatus = "block";
		saveLog("bookmark", {presenid:presenid, page:window.location.hash});
	}

	var starpos = [null, "Top", "Right", "Bottom", "Left"];
	if (bookmarkIcon !== null) {
		var posterid = getPosterid(presenid);
		var p = poster[posterid-1];
		starelem = document.getElementById("star" + starpos[p.star] + "No" + posterid);
		starelem.style.display = starstatus;
	}

	bookmarks = bookmarkArr.join(",");
	localStorage.setItem("bookmarks", bookmarks);

	$("#bookmarkList").showBookmarkList();

	return bookmarks;
}


// ブックマークされた発表IDを配列で取得する
function getBookmarks() {
	var bookmarks = localStorage.getItem("bookmarks");
	// 空文字列だった場合は何もブックマークされていないので空配列
	var bookmarkArr = (bookmarks !== "" && bookmarks !== null) ? bookmarks.split(",") : [];
	bookmarkArr.sort();

	return bookmarkArr;
}


// 検索バーが変更されたとき
// TODO: jQueryを使うとbindされない原因をつきとめてjQueryに戻す
function searchChanged(bar) {
	if (bar.value.trim() !== "" && bar.value !== null) {
		
		// 検索し、強調表示する
		console.log("search");
		saveLog("search", {keyword:bar.value});
		// searchByTitle(bar.value);
		searchAll(bar.value);

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

// 全検索
function searchAll(word) {

	if (word.length >= 1024) {
		throw new Exception();
	}

	var posterids = [];
	var lword = word.toLowerCase();

	presen.forEach(function(p) {
		if (p.presenid.toLowerCase().indexOf(lword) !== -1
			|| p.title.toLowerCase().indexOf(lword) !== -1
			|| p.abstract.toLowerCase().indexOf(lword) !== -1) {
			posterids.push(getPosterid(p.presenid));
		}
	});
	author.forEach(function(a) {
		if(a.name.toLowerCase().indexOf(lword) !== -1
			|| a.belongs.toLowerCase().indexOf(lword) !== -1) {
			posterids.push(getPosterid(a.presenid));
		}
	});
	keyword.forEach(function(k) {
		if(k.keyword.toLowerCase().indexOf(lword) !== -1) {
			posterids.push(getPosterid(k.presenid));
		}
	});
	// ポスターがあるやつ以外を削除、重複を削除
	posterids = posterids.filter(function(posterid, i, self) {
		return posterid != -1;
	}).filter(function(posterid, i, self) {
		return self.indexOf(posterid) === i;
	});
	posterids.sort();
	console.log("HIT : " + posterids);
	posterids.forEach(function(p) {
		effectPosterIcon(p);
	});

	emphasisSearchedPosters(posterids);

	document.getElementById("searchResult").innerHTML = 
		'<span id="searchResultText" class="ui-li-count" style="right:initial">'+posterids.length + "件</span>";

	return pflag;
}

// 詳細情報をsessionStorageにセット
function setDetails() {
	$("#detail-posterid").html(sessionStorage.getItem("posterid"));
	$("#detail-presenid").html(sessionStorage.getItem("presenid"));
	$("#detail-title").html(sessionStorage.getItem("title"));
	var authors = sessionStorage.getItem("authors");
	authors = (authors !== null && authors !== "")
		? authors
		: "NO DATA";
	$("#detail-authors").html(authors);
	$("#detail-authorbelongs").html(sessionStorage.getItem("authorbelongs"));
	$("#detail-authorname").html(sessionStorage.getItem("authorname"));
	var keywords = sessionStorage.getItem("keywords");
	keywords = keywords !== null && keywords !== "" 
		? keywords
		: "NO DATA";
	$("#detail-keywords").html(keywords);
	$("#detail-abstract").html(sessionStorage.getItem("abstract"));
}

// マップの日付を切り替えるボタンをセット
function setChangePosterMapDate() {
	$("#prevDayButton").on("click", function(e) {
		changePosterMapDate(1);
	});
	$("#nextDayButton").on("click", function(e) {
		changePosterMapDate(2);
	});
}

// マップの日付を切り替える
function changePosterMapDate(date) {
	$("#mapImg").attr("src", "img/postermap_" + date + ".png");
	if (date === 1) {
		sessionStorage.setItem("currentPosterMapDate", "1");
		$("#prevDayButton").hide();
		$("#nextDayButton").show();

	} else {
		sessionStorage.setItem("currentPosterMapDate", "2");
		$("#prevDayButton").show();
		$("#nextDayButton").hide();
	}
	setPosterIcons();
	showPosterIcons();
	setLabelSize();
	if (sessionStorage.getItem("label") !== null) {
        changeLabel(sessionStorage.getItem("label"));
    }
	$(".postericon").touchPoster();
	$(".mapArea").show();
    $("#resetScaleButtonFrame").hide();
    $(".posterfont").hide();
    $(".bookmarkstar").sizeUpBookmarkStar();
}

// 代表者名を取得
// 代表者名（所属）の形式に変更
function getAuthorname(presenid) {
	return author.filter(function(a) {
		return a.presenid === presenid && a.first === 1;
	}).map(function(a) {
		return a.name+" ("+a.belongs+")";
	})[0];
}

// 所属一覧を取得
function getAuthorbelongs(presenid) {
	return author.filter(function(a) {
		return a.presenid === presenid;
	}).map(function(a) {
		return a.belongs;
	}).filter(function(a, i, self) {
   		return self.indexOf(a) === i;
	}).join(", ");
}

// 発表者を取得
function getAuthors(presenid) {
	return author.filter(function(a) {
		return a.presenid === presenid;
	}).map(function(a) {
		return a.name+" ("+a.belongs+")";
	}).join(", ");
}

// キーワードを取得
function getKeywords(presenid) {
	return keyword.filter(function(k) {
		return k.presenid === presenid;
	}).map(function(k) {
		return k.keyword;
	}).join(", ");
}

// 発表IDからポスターIDを取得するfunction
// return ある場合posterid、ない場合-1
function getPosterid(presenid) {
	var posterid = -1;
	var posterlength = poster.length
	for (var i = 0; i < posterlength; i++) {
		if (poster[i].presenid === presenid) {
			posterid = poster[i].posterid;
			break;
		}
	}
	return posterid;
}