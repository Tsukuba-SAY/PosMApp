// ポスターの状態を表すフラグ
// TODO: パターンを導入したい
// d：デフォルト（青）
// t：強調表示（赤）
// s：検索ヒット（緑）
// e：検索中の強調表示（赤）
var pflag; 

// テスト用フラグ
// テスト時、Jasmineからのみtrueにする
var test = false;

// アイコンのラベルを何文字目まで表示するか
var labelmax = 5;

// Local DB (WebSQL DB) を開く
// 現在未使用
// var db = openDatabase("PosMAppDB", "", "PosMAppDB", 1000);

// ポスターの総件数
var ptotal;


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

		var nextFlag = touchPoster(posterid);

		pflag[posterid] = nextFlag;
		showPosterIcons();
	});
};

// 基本情報画面を閉じる
$.fn.closeBasicInfo = function() {
	$(this).on("touchstart", function(e) {
		changeBasicInfoPanel(false);
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
		changeLabel(id.substr(id.indexOf("-") + 1));
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
	var str = "";

	for (var i = 1; i <= poster.length; i++) {
		str += "<div class='postericonframe' id='iconNo" + i + "''>\n";
		str += "	<div class='postericon horizontal'>\n";
		str += "		<img id='icon" + i + "' src='img/dpic.png' " + "width='100%' height='100%'></img>\n";
		str += "		<div class='iconindexhor' id='font" + i + "'>" + poster[i-1].sessionid + "</div>\n";
		str += "	</div>\n";
		str += "	<div id='starTopNo" + i +"' class='star-top'><img src='img/bookmark.png' style='width:15px;height:15px;display:none;'></img></div>\n";
		str += "    <div id='starRightNo" + i + "' class='star-right'><img src='img/bookmark.png' style='width:15px;height:15px;display:none;'></img></div>\n";
		str += "	<div id='starBottomNo" + i + "' class='star-bottom'><img src='img/bookmark.png' style='width:15px;height:15px;display:none;'></img></div>\n";
		str += "	<div id='starLeftNo" + i + "' class='star-left'><img src='img/bookmark.png' style='width:15px;height:15px;display:none;'></img></div>\n";
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
		var str = poster[i - 1][column].toString();
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
	var imageSrc;
	for (var i = 1; i <= ptotal; i++) {
		switch (pflag[i]) {
			case "d":
				imageSrc = "img/dpic.png";
				break;
			case "t":
				imageSrc = "img/tpic.png";
				break;
			case "s":
				imageSrc = "img/spic.png";
				break;
			case "e":
				imageSrc = "img/epic.png";
				break;
		}
		document.getElementById("icon" + i).src = imageSrc;
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

	if (sessionStorage.getItem("searching") == "true") {
		if (pflag[posterid] == "d") {
			unselectPoster();
			selectPoster(posterid);
			return "t";
		} else if (pflag[posterid] == "t") {
			changeBasicInfoPanel(false);
			unselectPoster();
			return "d";
		} else if (pflag[posterid] == "s") {
			unselectPoster();
			selectPoster(posterid);
			return "e";
		} else if (pflag[posterid] == "e") {
			changeBasicInfoPanel(false);
			unselectPoster();
			return "s";
		}
	} else {
		if (pflag[posterid] == "d") {
			unselectPoster();
			selectPoster(posterid);
			return "t";
		} else if (pflag[posterid] == "t") {
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
		+ "<br />チーム名： "
		+ sessionStorage.getItem("authorname")
		+ "<br />所属： "
		+ sessionStorage.getItem("authorbelongs");

	var bookmarkIcon = document.getElementById("bookmarkbutton");
	var bookmarks = localStorage.getItem("bookmarks");
	if (bookmarks == null || bookmarks == "") {
		bookmarks = "";
	}
	var bookmarkArr = bookmarks.split(",");
	var foundBookmark = false;
	console.log(sessionStorage.getItem("posterid"));
	for (var i = 0; i < bookmarkArr.length; i++) {
		if (parseInt(sessionStorage.getItem("posterid")) == parseInt(bookmarkArr[i])) {
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
	if (title == null || title.trim() == "") {
		return pflag;
	}

	if (title.length >= 1024) {
		throw new Exception();
	}

	var posterids = new Array();
	var ltitle = title.toLowerCase();

	poster.forEach(function(aPoster) {
		if (aPoster.title.toLowerCase().indexOf(ltitle) != -1) {
			posterids.push(aPoster.id);
		}
	});

	emphasisSearchedPosters(posterids);

	if (posterids.length == 0) {
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
		if (pflag[i] != "t" && pflag[i] != "e") {
			pflag[i] = "d";
		}
	}

	// ヒットしたポスターを強調表示する
	posterids.forEach(function(id) {
		// すでに選択されていれば、検索ヒット中の強調表示にする
		if (pflag[id] == "t") {
			pflag[id] = "e";
		// 検索ヒット中の強調表示になっていない限り、検索ヒットにする
		} else if (pflag[id] != "e") {
			pflag[id] = "s";
		}
	});
	
	showPosterIcons();
	
}


// ポスターを選択する
function selectPoster(posterid) {

	for (var i = 0; i < ptotal; i++) {
		var p = poster[i];
		if (p.id == posterid) {
			sessionStorage.setItem("posterid", posterid);
			sessionStorage.setItem("sessionid", p.sessionid);
			sessionStorage.setItem("title", p.title);
			sessionStorage.setItem("abstract", p.abstract);
			sessionStorage.setItem("authorname", p.authorname);
			sessionStorage.setItem("authorbelongs", p.authorbelongs);
			sessionStorage.setItem("bookmark", p.bookmark);
			sessionStorage.setItem("star", p.star);
		}
	}

	var authors = new Array();
	for (var i = 0; i < author.length; i++) {
		var a = author[i];
		if (a.posterid == posterid) {
			authors.push(a.name);
		}
	}
	sessionStorage.setItem("authors", authors);

	var keywords = new Array();
	for (var i = 0; i < keyword.length; i++) {
		var k = keyword[i];
		if (k.posterid == posterid) {
			keywords.push(k.keyword);
		}
	}
	sessionStorage.setItem("keywords", keywords);

	changeBasicInfoPanel(true);

}


// 強調表示を解除する
function unselectPoster() {
	for (var i = 1; i <= ptotal; i++) {
		if (pflag[i] == "t") { 
			pflag[i] = "d"; 
		} else if (pflag[i] == "e") {
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
			// 該当する星要素を表示する
			starelem.childNodes[0].style.display = "block";
		}

	}
}


// ブックマークスターをタッチする（状態のスイッチ）
function touchBookmark(posterid, bookmarkIcon){
	if (posterid < 1 || posterid > ptotal || posterid == null) {
		throw new Exception();
	}

	// posteridに該当するポスターがブックマークリストに存在しているか確認用
	// -1だと無し、-1以外だと発見したポスターのインデックス
	var location = -1;

	var bookmarkArr = getBookmarks();
	for (var i = 0; i < bookmarkArr.length; i++) {
		//該当ポスターがブックマークリストに存在しているかどうか確認する
		if (posterid == bookmarkArr[i]) {
			location = i;
			break;
		}
	}

	var starstatus;
	if (location != -1) {
		// ない場合
		// 存在しているIDを削除する
		bookmarkArr.splice(location, 1);
		if (bookmarkIcon != null) {
			bookmarkIcon.src = "img/unbookmark.png";
		}
		starstatus = "none";
	} else {
		// ある場合
		bookmarkArr.push(posterid);
		bookmarkArr.sort(function(a,b){
    		return (parseInt(a) < parseInt(b)) ? -1 : 1;
    	});
		if (bookmarkIcon != null) {
			bookmarkIcon.src = "img/bookmark.png";
		}
		starstatus = "block";
	}

	if (bookmarkIcon != null) {
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


// ブックマークされたポスターIDを数値の配列で取得する
function getBookmarks() {
	var bookmarks = localStorage.getItem("bookmarks");
	// 空文字列だった場合は何もブックマークされていないので空配列
	var bookmarkArr = (bookmarks != "" && bookmarks != null) ? bookmarks.split(",") : [];
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
	if (bar.value.trim() != "" && bar.value != null) {
		
		// 検索し、強調表示する
		console.log("search");
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
			if (pflag[i] == "e") {
				pflag[i] = "t";
			} else if (pflag[i] == "s") {
				pflag[i] = "d";
			}
		}

		document.getElementById("searchResult").innerHTML = "";
	}

	showPosterIcons();
	bar.blur();
}

// 名前変えたい
function windowManager () {
	var STATIC_WIDTH =  600;
	var scale = window.innerWidth / STATIC_WIDTH;

	// var $mapMain = $('#mapMain');
	// $mapMain.css("zoom", scale);

    var reqAnimationFrame = (function () {
        return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    //$(element).hammer(options).bind("pan", myPanHandler);

    var el = $("#mapMain")[0];

    // var START_X = Math.round((window.innerWidth - el.offsetWidth) / 2);
    // var START_Y = Math.round((window.innerHeight - el.offsetHeight) / 2);
    var START_X = 0;
    var START_Y = 0;

    var ticking = false;
    var transform;
    var timer;

    var mc = new Hammer.Manager($("#mapFrame")[0]);

    mc.add(new Hammer.Pan());
    // mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
    // mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
    // mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith(mc.get('rotate'));
    mc.add(new Hammer.Pinch());
    mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
    // mc.add(new Hammer.Tap());

    mc.on("panstart panmove", onPan);
    // mc.on("rotatestart rotatemove", onRotate);
    mc.on("pinchstart pinchmove", onPinch);
    // mc.on("swipe", onSwipe);
    // mc.on("tap", onTap);
    mc.on("doubletap", onDoubleTap);

    el.className = 'animate';
    transform = {
        translate: { x: START_X, y: START_Y },
        scale: window.innerWidth / STATIC_WIDTH
    };
    updateElementTransform();

    // function resetElement() {
    //     el.className = 'animate';
    //     transform = {
    //         translate: { x: START_X, y: START_Y },
    //         scale: window.innerWidth / STATIC_WIDTH
    //     };
    // }

    function updateElementTransform() {
        var value = [
        	'translate(' + transform.translate.x + 'px, ' + transform.translate.y + 'px)',
        	'scale(' + transform.scale + ', ' + transform.scale + ')'
        ];

        value = value.join(" ");
        //el.textContent = value;
        el.style.webkitTransform = value;
        el.style.mozTransform = value;
        el.style.transform = value;
        ticking = false;
    }

    function requestElementUpdate() {
    	reqAnimationFrame(updateElementTransform);
    }
    
    function onPan(ev) {
    	console.log("pan");
        el.className = '';
        transform.translate = {
            x: ev.deltaX ,
            y: ev.deltaY
        };

      	requestElementUpdate();
    }

    var initScale = 1;
    function onPinch(ev) {
    	console.log("pinch");
        if(ev.type == 'pinchstart') {
            initScale = transform.scale || 1;
        }

        el.className = '';
        transform.scale = initScale * ev.scale;

        requestElementUpdate();
    }

    // var initAngle = 0;
    // function onRotate(ev) {
    // 	console.log("rotate");
    //     // if(ev.type == 'rotatestart') {
    //     //     initAngle = transform.angle || 0;
    //     // }

    //     // el.className = '';
    //     // transform.rz = 1;
    //     // transform.angle = initAngle + ev.rotation;
    //     // requestElementUpdate();
    // }

    // function onSwipe(ev) {
    // 	console.log("swipe");
    //     // var angle = 50;
    //     // transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
    //     // transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
    //     // transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

    //     // clearTimeout(timer);
    //     // timer = setTimeout(function () {
    //     //     resetElement();
    //     // }, 300);
    //     // requestElementUpdate();
    // }

    // function onTap(ev) {
    // 	console.log("tap");
    //     // transform.rx = 1;
    //     // transform.angle = 25;

    //     // clearTimeout(timer);
    //     // timer = setTimeout(function () {
    //     //     resetElement();
    //     // }, 200);
    //     // requestElementUpdate();
    // }

    function onDoubleTap(ev) {
    	console.log("double tap");
        transform.translate = {
            x: START_X,
            y: START_Y
        };
        transform.scale = window.innerWidth / STATIC_WIDTH;

        requestElementUpdate();
    }


}