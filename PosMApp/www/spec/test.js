describe("変数の確認", function() {
	it("posterdata.jsでposterが宣言されている", function() {
		expect(poster).toBeDefined();
	});
	it("icon-position.jsでpositionが宣言されている", function() {
		expect(position).toBeDefined();
	});
	it("posterdata.jsでauthorが宣言されている", function() {
		expect(author).toBeDefined();
	});
	it("posterdata.jsでkeywordが宣言されている", function() {
		expect(keyword).toBeDefined();
	});
	it("labelmaxが宣言されている", function() {
		expect(labelmax).toBeDefined();
	});

	// posterとpositionの要素数が合わないとindexの不整合が起こって
	// Javascriptが止まるので画面遷移すら動かなくなる
	it("posterとpositionの要素数が等しい", function() {
		expect(poster.length).toEqual(position.length);
	});

});

describe("テスト用のファンクションのテスト", function() {
	it("getAuthorsのテスト", function() {
		expectArr = new Array();
		author.forEach(function(a) {
			if (a.posterid === 1) {
				expectArr.push(a.name);
			}
		});
		expect(getAuthors(1)).toEqual(expectArr.join(","));
	});
	it("getKeywordsのテスト", function() {
		expectArr = new Array();
		keyword.forEach(function(k) {
			if(k.posterid === 1) {
				expectArr.push(k.keyword);
			}
		});
		expect(getKeywords(1)).toEqual(expectArr.join(","));
	});
	it("ellipsisWordsのテスト", function() {
		str1 = "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせすん";
		expect(ellipsisWords(str1)).toEqual("いろはにほへと...");
		str2 = "あ";
		expect(ellipsisWords(str2)).toEqual("あ");
		str3 = "We Love Posters!";
		expect(ellipsisWords(str3)).toEqual("We Love...");
		str4 = "600人規模のポスター展示会";
		expect(ellipsisWords(str4)).toEqual("600人規模の...");
	});
});

describe("トップページ", function() {
	beforeEach(function() {
		loadFixtures("fixture-toppage.html");
		$("#goToMap").goToMapPage("click");
		$("#goToList").goToListPage("click");
		$("#goToInformation").goToInformationPage("click");
		$("#goToBookmarkList").goToBookmarkListPage("click");
	});
	it("トップページからポスターマップ画面に遷移できる", function() {
		$("#goToMap").click();
		expect(window.location.hash).toEqual("#posterMapPage");
	});
	it("トップページからポスターリスト画面に遷移できる", function() {
		$("#goToList").click();
		expect(window.location.hash).toEqual("#posterListPage");
	});
	it("トップページからポスターリスト画面に遷移できる", function() {
		$("#goToInformation").click();
		expect(window.location.hash).toEqual("#informationPage");
	});
	it("トップページからブックマークリスト画面に遷移できる", function() {
		$("#goToBookmarkList").click();
		expect(window.location.hash).toEqual("#bookmarkListPage");
	});
});

describe("タブバー", function() {
	beforeEach(function() {
		loadFixtures("fixture-tabbar.html");
		$(".topPageButton").goToTopPage("click");
		$(".posterMapPageButton").goToMapPage("click");
		$(".posterListPageButton").goToListPage("click");
	});
	it("「トップ」ボタンを押すとトップページに遷移する", function() {
		$(".topPageButton").click();
		expect(window.location.hash).toEqual("#topPage");
	});
	it("「マップ」ボタンを押すとポスターマップ画面に遷移する", function() {
		$(".posterMapPageButton").click();
		expect(window.location.hash).toEqual("#posterMapPage");
	});
	it("「リスト」ボタンを押すとポスターマップ画面に遷移する", function() {
		$(".posterListPageButton").click();
		expect(window.location.hash).toEqual("#posterListPage");
	});
});

describe("ポスターマップ", function() {
	beforeEach(function() {
		loadFixtures("fixture-postermap.html");
		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();

		$("#basicinfopanel").closeBasicInfo();

		sessionStorage.removeItem("searching");

		initPosterMap();	
	});

	it("基本情報に関して、開いた状態でタップすると閉じる", function() {
		$("#basicinfopanel").trigger("touchstart");
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(sessionStorage.getItem("sessionid")).toBeNull();
		expect(sessionStorage.getItem("title")).toBeNull();
		expect(sessionStorage.getItem("abstract")).toBeNull();
		expect(sessionStorage.getItem("authorname")).toBeNull();
		expect(sessionStorage.getItem("authorbelongs")).toBeNull();
		expect(sessionStorage.getItem("authors")).toBeNull();
		expect(sessionStorage.getItem("keywords")).toBeNull();
	});
	it("デフォルトの状態で1番目のポスターをタップすると1番目の情報が取得できる", function() {
		
		//var poster.length=poster.length;
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = 1;

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[1] = "t";

		expect(pflag).toEqual(beforeFlag);

		$("#icon" + posterid).touchPoster();
		$("#icon" + posterid).trigger("touchstart");

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toEqual(poster[0].id.toString());
		expect(sessionStorage.getItem("sessionid")).toEqual(poster[0].sessionid);
		expect(sessionStorage.getItem("title")).toEqual(poster[0].title);
		expect(sessionStorage.getItem("abstract")).toEqual(poster[0].abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(poster[0].authorname);
		expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[0].authorbelongs);
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(1));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(1));
	});

	it("1番を選択中に2番を選択すると、2番の情報が取得できる", function() {
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = 2;

		pflag[1] = "t";

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[1] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "t";

		expect(pflag).toEqual(beforeFlag);

		$("#icon" + posterid).touchPoster();
		$("#icon" + posterid).trigger("touchstart");

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toEqual(poster[1].id.toString());
		expect(sessionStorage.getItem("sessionid")).toEqual(poster[1].sessionid);
		expect(sessionStorage.getItem("title")).toEqual(poster[1].title);
		expect(sessionStorage.getItem("abstract")).toEqual(poster[1].abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(poster[1].authorname);
		expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[1].authorbelongs);
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(2));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(2));
	});

	it("2番を選択中に2番を選択する最初の状態に戻る", function() {
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = 2;

		pflag[2] = "t";

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		
		expect(pflag).toEqual(beforeFlag);

		$("#icon" + posterid).touchPoster();
		$("#icon" + posterid).trigger("touchstart");

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(sessionStorage.getItem("sessionid")).toBeNull();
		expect(sessionStorage.getItem("title")).toBeNull();
		expect(sessionStorage.getItem("abstract")).toBeNull();
		expect(sessionStorage.getItem("authorname")).toBeNull();
		expect(sessionStorage.getItem("authorbelongs")).toBeNull();
		expect(sessionStorage.getItem("authors")).toBeNull();
		expect(sessionStorage.getItem("keywords")).toBeNull();
	});

	it("デフォルトの状態でポスターの数＋１のポスターをタップすると例外を発生する", function() {
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = poster.length+1;

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		
		expect(pflag).toEqual(beforeFlag);

		expect(function() {
			var $postericon = $("<div>");
			$postericon.attr("id", "icon" + posterid);
			$postericon.touchPoster();
			$postericon.trigger("touchstart");
		}).toThrow();

  		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(sessionStorage.getItem("sessionid")).toBeNull();
		expect(sessionStorage.getItem("title")).toBeNull();
		expect(sessionStorage.getItem("abstract")).toBeNull();
		expect(sessionStorage.getItem("authorname")).toBeNull();
		expect(sessionStorage.getItem("authorbelongs")).toBeNull();
		expect(sessionStorage.getItem("authors")).toBeNull();
		expect(sessionStorage.getItem("keywords")).toBeNull();
	});

	it("デフォルトの状態で0番目をタップすると例外を発生する", function() {
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = 0;

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}

		expect(pflag).toEqual(beforeFlag);

		expect(function() {
			var $postericon = $("<div>");
			$postericon.attr("id", "icon" + posterid);
			$postericon.touchPoster();
			$postericon.trigger("touchstart");
		}).toThrow();

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(sessionStorage.getItem("sessionid")).toBeNull();
		expect(sessionStorage.getItem("title")).toBeNull();
		expect(sessionStorage.getItem("abstract")).toBeNull();
		expect(sessionStorage.getItem("authorname")).toBeNull();
		expect(sessionStorage.getItem("authorbelongs")).toBeNull();
		expect(sessionStorage.getItem("authors")).toBeNull();
		expect(sessionStorage.getItem("keywords")).toBeNull();
	});

	it("2番がタップされている状態でポスターの数＋１のポスターをタップすると例外を発生する", function() {
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = poster.length+1;

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "t";

		var $postericon1 = $("<div>");
		$postericon1.attr("id", "icon" + 2);
		$postericon1.touchPoster();
		$postericon1.trigger("touchstart");

		expect(pflag).toEqual(beforeFlag);

		expect(function() {
			var $postericon2 = $("<div>");
			$postericon2.attr("id", "icon" + posterid);
			$postericon2.touchPoster();
			$postericon2.trigger("touchstart");
		}).toThrow();

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toEqual(poster[1].id.toString());
		expect(sessionStorage.getItem("sessionid")).toEqual(poster[1].sessionid);
		expect(sessionStorage.getItem("title")).toEqual(poster[1].title);
		expect(sessionStorage.getItem("abstract")).toEqual(poster[1].abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(poster[1].authorname);
		expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[1].authorbelongs);
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(2));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(2));
	});

	it("2番がタップされている状態で0番目をタップすると例外を発生する", function() {
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = 0;

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "t";

		var $postericon1 = $("<div>");
		$postericon1.attr("id", "icon" + 2);
		$postericon1.touchPoster();
		$postericon1.trigger("touchstart");

		expect(pflag).toEqual(beforeFlag);

		expect(function() {
			var $postericon2 = $("<div>");
			$postericon2.attr("id", "icon" + posterid);
			$postericon2.touchPoster();
			$postericon2.trigger("touchstart");
		}).toThrow();

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toEqual(poster[1].id.toString());
		expect(sessionStorage.getItem("sessionid")).toEqual(poster[1].sessionid);
		expect(sessionStorage.getItem("title")).toEqual(poster[1].title);
		expect(sessionStorage.getItem("abstract")).toEqual(poster[1].abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(poster[1].authorname);
		expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[1].authorbelongs);
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(2));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(2));
	});

	it("2,3,4番目が検索にヒットしている状態で1番目のポスターをタップすると1番目の情報が取得できる", function() {
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = 1;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "s";
		beforeFlag[3] = "s";
		beforeFlag[4] = "s";
		pflag[2] = "s";
		pflag[3] = "s";
		pflag[4] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[1] = "t";
		expectFlag[2] = "s";
		expectFlag[3] = "s";
		expectFlag[4] = "s";

		expect(pflag).toEqual(beforeFlag);

		$("#icon" + posterid).touchPoster();
		$("#icon" + posterid).trigger("touchstart");

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toEqual(poster[0].id.toString());
		expect(sessionStorage.getItem("sessionid")).toEqual(poster[0].sessionid);
		expect(sessionStorage.getItem("title")).toEqual(poster[0].title);
		expect(sessionStorage.getItem("abstract")).toEqual(poster[0].abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(poster[0].authorname);
		expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[0].authorbelongs);
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(1));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(1));

		sessionStorage.setItem("searching", "false");
	});

	it("2,3,4番目が検索にヒットしている状態かつ1番をタップしている状態でで2番目のポスターをタップすると2番目の情報が取得できる", function() {
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = 2;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[1] = "t";
		beforeFlag[2] = "s";
		beforeFlag[3] = "s";
		beforeFlag[4] = "s";
		pflag[1] = "t";
		pflag[2] = "s";
		pflag[3] = "s";
		pflag[4] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "e";
		expectFlag[3] = "s";
		expectFlag[4] = "s";

		expect(pflag).toEqual(beforeFlag);

		$("#icon" + posterid).touchPoster();
		$("#icon" + posterid).trigger("touchstart");

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toEqual(poster[1].id.toString());
		expect(sessionStorage.getItem("sessionid")).toEqual(poster[1].sessionid);
		expect(sessionStorage.getItem("title")).toEqual(poster[1].title);
		expect(sessionStorage.getItem("abstract")).toEqual(poster[1].abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(poster[1].authorname);
		expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[1].authorbelongs);
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(2));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(2));

		sessionStorage.setItem("searching", "false");
	});

	it("2,3,4番目が検索にヒットしている状態かつ2番をタップしている状態で2番目のポスターをタップすると2,3,4番目が検索にヒットしている状態に戻る", function() {
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = 2;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "e";
		beforeFlag[3] = "s";
		beforeFlag[4] = "s";
		pflag[2] = "e";
		pflag[3] = "s";
		pflag[4] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "s";
		expectFlag[3] = "s";
		expectFlag[4] = "s";

		expect(pflag).toEqual(beforeFlag);

		$("#icon" + posterid).touchPoster();
		$("#icon" + posterid).trigger("touchstart");

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(sessionStorage.getItem("sessionid")).toBeNull();
		expect(sessionStorage.getItem("title")).toBeNull();
		expect(sessionStorage.getItem("abstract")).toBeNull();
		expect(sessionStorage.getItem("authorname")).toBeNull();
		expect(sessionStorage.getItem("authorbelongs")).toBeNull();
		expect(sessionStorage.getItem("authors")).toBeNull();
		expect(sessionStorage.getItem("keywords")).toBeNull();

		sessionStorage.setItem("searching", "false");
	});

	it("2,3,4番目が検索にヒットしている状態かつ2番をタップしている状態で3番目のポスターをタップすると3番目の情報が取得できる", function() {
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = 3;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "e";
		beforeFlag[3] = "s";
		beforeFlag[4] = "s";
		pflag[2] = "e";
		pflag[3] = "s";
		pflag[4] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "s";
		expectFlag[3] = "e";
		expectFlag[4] = "s";

		expect(pflag).toEqual(beforeFlag);

		$("#icon" + posterid).touchPoster();
		$("#icon" + posterid).trigger("touchstart");

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toEqual(poster[2].id.toString());
		expect(sessionStorage.getItem("sessionid")).toEqual(poster[2].sessionid);
		expect(sessionStorage.getItem("title")).toEqual(poster[2].title);
		expect(sessionStorage.getItem("abstract")).toEqual(poster[2].abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(poster[2].authorname);
		expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[2].authorbelongs);
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(3));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(3));
		sessionStorage.setItem("searching", "false");
	});

	it("2,3,4番目が検索にヒットしている状態かつ3番をタップしている状態で7番目のポスターをタップすると7番目の情報が取得できる", function() {
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = 7;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "s";
		beforeFlag[3] = "e";
		beforeFlag[4] = "s";
		pflag[2] = "s";
		pflag[3] = "e";
		pflag[4] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "s";
		expectFlag[3] = "s";
		expectFlag[4] = "s";
		expectFlag[7] = "t";

		expect(pflag).toEqual(beforeFlag);

		$("#icon" + posterid).touchPoster();
		$("#icon" + posterid).trigger("touchstart");

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toEqual(poster[6].id.toString());
		expect(sessionStorage.getItem("sessionid")).toEqual(poster[6].sessionid);
		expect(sessionStorage.getItem("title")).toEqual(poster[6].title);
		expect(sessionStorage.getItem("abstract")).toEqual(poster[6].abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(poster[6].authorname);
		expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[6].authorbelongs);
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(7));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(7));
		sessionStorage.setItem("searching", "false");
	});

	it("2,3,4番目が検索にヒットしている状態かつ7番をタップしている状態でで7番目のポスターをタップすると2,3,4番目が検索にヒットしている状態に戻る", function() {
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = 7;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "s";
		beforeFlag[3] = "s";
		beforeFlag[4] = "s";
		beforeFlag[7] = "t";
		pflag[2] = "s";
		pflag[3] = "s";
		pflag[4] = "s";
		pflag[7] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "s";
		expectFlag[3] = "s";
		expectFlag[4] = "s";

		expect(pflag).toEqual(beforeFlag);
		
		$("#icon" + posterid).touchPoster();
		$("#icon" + posterid).trigger("touchstart");

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(sessionStorage.getItem("sessionid")).toBeNull();
		expect(sessionStorage.getItem("title")).toBeNull();
		expect(sessionStorage.getItem("abstract")).toBeNull();
		expect(sessionStorage.getItem("authorname")).toBeNull();
		expect(sessionStorage.getItem("authorbelongs")).toBeNull();
		expect(sessionStorage.getItem("authors")).toBeNull();
		expect(sessionStorage.getItem("keywords")).toBeNull();

		sessionStorage.setItem("searching", "false");
	});
});

describe("詳細情報", function() {
	beforeEach(function() {
		loadFixtures("fixture-postermap.html", "fixture-detail.html");
		setPosterIcons();
		showPosterIcons();
		$("#detailinfobutton").goToDetailPage("touchstart");
		$("#detailBackButton").backToPreviousPage();

		sessionStorage.removeItem("previousPage");
	});
	it("マップ画面から1番のポスターの詳細情報画面を表示し、戻るボタンを押すとマップ画面に戻る", function() {
		$("#icon1").touchPoster();
		$("#icon1").trigger("touchstart");
		$("#detailinfobutton").trigger("touchstart");
		expect(window.location.hash).toEqual("#detailPage");

		$("#detailBackButton").trigger("touchstart");
		expect(window.location.hash).toEqual("#posterMapPage");
	});
	it("マップ画面を経由せず直接詳細情報画面を表示して戻るボタンを押すとマップ画面に戻る", function() {
		$("#detailBackButton").trigger("touchstart");
		expect(window.location.hash).toEqual("#posterMapPage");
	});
});

describe("キーワード検索（タイトル）", function() {
	beforeEach(function() {
		loadFixtures("fixture-postermap.html");
		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();

		initPosterMap();
	});

	it("「用いた」で検索すると2,4,6,7,10,11,17,18,24,30,44番のポスターがヒットする", function() {

		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		expectArr = [2,4,6,7,10,11,17,18,24,30,44];

		for (var i = 1; i <= poster.length; i++) {
			if ($.inArray(i, expectArr) !== -1) {
				expectFlag[i] = "s";
			} else {
				expectFlag[i] = "d";
			}
		}
		
		$("#search-bar-title").val("用いた");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「ニコニコ動画」で検索すると24番のポスターがヒットする", function() {
		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[24] = "s";

		$("#search-bar-title").val("ニコニコ動画");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「ニコニコ」で検索すると10番のポスターがヒットする", function() {
		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[24] = "s";

		$("#search-bar-title").val("ニコニコ");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「Wikipedia」で検索すると17番のポスターがヒットする", function() {
		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[17] = "s";

		$("#search-bar-title").val("Wikipedia");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「wikipedia」で検索すると3番のポスターがヒットする", function() {
		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[17] = "s";

		$("#search-bar-title").val("wikipedia");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「$」で検索すると何もヒットしない", function() {
		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}

		$("#search-bar-title").val("$");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("半角スペースで検索すると何もヒットしない", function() {
		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}

		$("#search-bar-title").val(" ");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("nullを入れると何もヒットしない", function() {
		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}

		$("#search-bar-title").val(null);
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("1番のポスターが検索にヒットしている状態で、検索状態から戻ると、何もヒットしていない状態になる", function() {
		var expectFlag = new Array(poster.length+1);

		pflag[1] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}

		$("#search-bar-title").val(null);
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("1番のポスターが強調表示された状態かつ検索にヒットしている状態で、検索状態から戻ると、1番が強調表示された状態に戻る", function() {
		var expectFlag = new Array(poster.length+1);

		pflag[1] = "e";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[1] = "t";

		$("#search-bar-title").val(null);
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("1番を選択した状態で「ニコニコ動画」で検索すると24番がヒットする", function() {
		var expectFlag = new Array(poster.length+1);

		pflag[1] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[1] = "t";
		expectFlag[24] = "s";

		$("#search-bar-title").val("ニコニコ動画");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("10番を選択した状態で「ニコニコ動画」で検索すると10番がヒットする", function() {
		var expectFlag = new Array(poster.length+1);

		pflag[24] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[24] = "e";

		$("#search-bar-title").val("ニコニコ動画");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("何も選択してない状態で、1024文字を入れて検索すると例外が発生し、ポスターの状況は変化しない", function() {
		var expectFlag = new Array(poster.length+1);

		var str = "";
		for (var i = 0; i < 1024; i++) {
			str += "a";
		}

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}

		expect(function() {
			searchByTitle(str);
			//wait(100);
		}).toThrow();
		expect(pflag).toEqual(expectFlag);
	});
});

describe("ラベルの表示切り替え機能", function() {
	beforeEach(function() {
		loadFixtures("fixture-postermap.html");
		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();
		$("#label-id").changeLabel();
		$("#label-sessionid").changeLabel();
		$("#label-title").changeLabel();
		$("#label-authorname").changeLabel();
		$("#label-authorbelongs").changeLabel();

		initPosterMap();	
	});
	it("「通し番号」ボタンを押すとラベルがIDに切り替わる", function() {
		$("#label-id").trigger("touchstart");
		var labels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			labels.push($("#font" + i).html());
		}

		var expectLabels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			expectLabels.push(ellipsisWords(poster[i - 1].id.toString()));
		}
		expect(labels).toEqual(expectLabels);
	});
	it("「ポスターID」ボタンを押すとラベルがポスターIDに切り替わる", function() {
		$("#label-sessionid").trigger("touchstart");
		var labels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			labels.push($("#font" + i).html());
		}

		var expectLabels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			expectLabels.push(ellipsisWords(poster[i - 1].sessionid.toString()));
		}
		expect(labels).toEqual(expectLabels);
	});
	it("「タイトル」ボタンを押すとラベルがタイトルに切り替わる", function() {
		$("#label-title").trigger("touchstart");
		var labels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			labels.push($("#font" + i).html());
		}

		var expectLabels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			expectLabels.push(ellipsisWords(poster[i - 1].title.toString()));
		}
		expect(labels).toEqual(expectLabels);
	});
	it("「チーム名」ボタンを押すとラベルがチーム名に切り替わる", function() {
		$("#label-authorname").trigger("touchstart");
		var labels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			labels.push($("#font" + i).html());
		}

		var expectLabels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			expectLabels.push(ellipsisWords(poster[i - 1].authorname.toString()));
		}
		expect(labels).toEqual(expectLabels);
	});
	it("「大学名」ボタンを押すとラベルが大学名に切り替わる", function() {
		$("#label-authorbelongs").trigger("touchstart");
		var labels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			labels.push($("#font" + i).html());
		}

		var expectLabels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			expectLabels.push(ellipsisWords(poster[i - 1].authorbelongs.toString()));
		}
		expect(labels).toEqual(expectLabels);
	});
});

describe("ブックマーク機能", function() {
	beforeEach(function() {
		loadFixtures("fixture-postermap.html");
		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();

		initPosterMap();
		$("#bookmarkbutton").touchBookmark();	
		localStorage.setItem("bookmarks", "");
	});
	it("何もブックマークされていない状態で、1番の星をタップすると、1番のポスターがブックマークされる", function() {
		sessionStorage.setItem("posterid", 1);
		$("#bookmarkbutton").trigger("touchstart");

		var expectBookmarks = "1";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("何もブックマークされていない状態で、すべての星をタップすると、すべてのポスターがブックマークされる", function() {
		for (var i = 1; i <= poster.length; i++) {
			sessionStorage.setItem("posterid", i);
			$("#bookmarkbutton").trigger("touchstart");
		}
		var bookmarks = localStorage.getItem("bookmarks");

		var expectArr = new Array();
		poster.forEach(function(p) {
			expectArr.push(p.id);
		});

		expect(bookmarks).toEqual(expectArr.join(","));
	});
	it("1番のポスターがブックマークされている状態で、1番の星をタップすると、何もブックマークされていない状態になる", function() {
		localStorage.setItem("bookmarks", "1");
		sessionStorage.setItem("posterid", 1);
		$("#bookmarkbutton").trigger("touchstart");

		var expectBookmarks = "";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("1番のポスターがブックマークされている状態で、2番の星をタップすると、1,2番のポスターがブックマークされた状態になる", function() {
		localStorage.setItem("bookmarks", "1");
		sessionStorage.setItem("posterid", 2);
		$("#bookmarkbutton").trigger("touchstart");

		var expectBookmarks = "1,2";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("何もブックマークされていない状態で、4,5,6番の星をタップすると、4,5,6番のポスターがブックマークされた状態になる", function() {
		sessionStorage.setItem("posterid", 4);
		$("#bookmarkbutton").trigger("touchstart");
		sessionStorage.setItem("posterid", 5);
		$("#bookmarkbutton").trigger("touchstart");
		sessionStorage.setItem("posterid", 6);
		$("#bookmarkbutton").trigger("touchstart");

		var expectBookmarks = "4,5,6";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("4番のポスターがブックマークされている状態で、4,5,6番の星をタップすると、5,6番のポスターがブックマークされた状態になる", function() {
		localStorage.setItem("bookmarks", "4");
		sessionStorage.setItem("posterid", 4);
		$("#bookmarkbutton").trigger("touchstart");
		sessionStorage.setItem("posterid", 5);
		$("#bookmarkbutton").trigger("touchstart");
		sessionStorage.setItem("posterid", 6);
		$("#bookmarkbutton").trigger("touchstart");

		var expectBookmarks = "5,6";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("5,6番のポスターがブックマークされている状態で、4,5,6番の星をタップすると、4番のポスターがブックマークされた状態になる", function() {
		localStorage.setItem("bookmarks", "5,6");
		sessionStorage.setItem("posterid", 4);
		$("#bookmarkbutton").trigger("touchstart");
		sessionStorage.setItem("posterid", 5);
		$("#bookmarkbutton").trigger("touchstart");
		sessionStorage.setItem("posterid", 6);
		$("#bookmarkbutton").trigger("touchstart");

		var expectBookmarks = "4";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("4,5,6番のポスターがブックマークされている状態で、4,5,6番の星をタップすると、何もブックマークされていない状態になる", function() {
		localStorage.setItem("bookmarks", "4,5,6");
		sessionStorage.setItem("posterid", 4);
		$("#bookmarkbutton").trigger("touchstart");
		sessionStorage.setItem("posterid", 5);
		$("#bookmarkbutton").trigger("touchstart");
		sessionStorage.setItem("posterid", 6);
		$("#bookmarkbutton").trigger("touchstart");

		var expectBookmarks = "";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("1番のポスターがブックマークされている状態で、1番のポスターをタップすると、星がブックマークされた状態で表示されている", function() {
		localStorage.setItem("bookmarks", "1");
		$("#icon1").touchPoster();
		$("#icon1").trigger("touchstart");
		expect($("#bookmarkbutton").attr("src")).toEqual("img/bookmark.png");
	});
	it("2番のポスターがブックマークされている状態で、1番のポスターをタップすると、星がブックマークされていない状態で表示されている", function() {
		localStorage.setItem("bookmarks", 2);
		$("#icon1").touchPoster();
		$("#icon1").trigger("touchstart");
		expect($("#bookmarkbutton").attr("src")).toEqual("img/unbookmark.png");
	});
	it("0番の星をタップすると、例外が発生する", function() {
		expect(function() {
			sessionStorage.setItem("posterid", 0);
			$("#bookmarkbutton").trigger("touchstart");
		}).toThrow();
	});
	it("ポスター数+1番の星をタップすると、例外が発生する", function() {
		expect(function() {
			sessionStorage.setItem("posterid", poster.length + 1);
			$("#bookmarkbutton").trigger("touchstart");
		}).toThrow();
	});
	it("ポスター数にnullを指定すると、例外が発生する", function() {
		expect(function() {
			$("#bookmarkbutton").trigger("touchstart");
		}).toThrow();
	});
});

describe("ポスターリストからのブックマーク機能", function() {
	beforeEach(function() {
		loadFixtures("fixture-posterlist.html");
		$("#posterList").showPosterList();
		localStorage.setItem("bookmarks", "");
	});
	it("何もブックマークされていない状態で、リストで、1番の星をタップすると、1番のポスターがブックマークされる", function() {
		$("#listbookmark1").listchangebookmark();
		$("#listbookmark1").trigger("touchstart");
		var expectBookmarks = "1";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("何もブックマークされていない状態で、リストで、すべての星をタップすると、すべてのポスターがブックマークされる", function() {
		for (var i = 1; i <= poster.length; i++) {
			$("#listbookmark"+i).listchangebookmark();
			$("#listbookmark"+i).trigger("touchstart");
		}
		var bookmarks = localStorage.getItem("bookmarks");

		var expectArr = new Array();
		for (var i = 0; i <= poster.length - 5; i++) {
			expectArr.push(poster[i].id);
		};
		expect(bookmarks).toEqual(expectArr.join(","));
	});
	it("1番のポスターがブックマークされている状態で、リストで、1番の星をタップすると、何もブックマークされていない状態になる", function() {
		localStorage.setItem("bookmarks", "1");
		$("#listbookmark1").listchangebookmark();
		$("#listbookmark1").trigger("touchstart");
		var expectBookmarks = "";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("1番のポスターがブックマークされている状態で、リストで、2番の星をタップすると、1,2番のポスターがブックマークされた状態になる", function() {
		localStorage.setItem("bookmarks", "1");
		$("#listbookmark2").listchangebookmark();
		$("#listbookmark2").trigger("touchstart");

		var expectBookmarks = "1,2";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("何もブックマークされていない状態で、リストで、4,5,6番の星をタップすると、4,5,6番のポスターがブックマークされた状態になる", function() {
		$("#listbookmark4").listchangebookmark();
		$("#listbookmark4").trigger("touchstart");
		$("#listbookmark5").listchangebookmark();
		$("#listbookmark5").trigger("touchstart");
		$("#listbookmark6").listchangebookmark();
		$("#listbookmark6").trigger("touchstart");
		var expectBookmarks = "4,5,6";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("4番のポスターがブックマークされている状態で、リストで、4,5,6番の星をタップすると、5,6番のポスターがブックマークされた状態になる", function() {
		localStorage.setItem("bookmarks", "4");
		$("#listbookmark4").listchangebookmark();
		$("#listbookmark4").trigger("touchstart");
		$("#listbookmark5").listchangebookmark();
		$("#listbookmark5").trigger("touchstart");
		$("#listbookmark6").listchangebookmark();
		$("#listbookmark6").trigger("touchstart");

		var expectBookmarks = "5,6";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("5,6番のポスターがブックマークされている状態で、リストで、4,5,6番の星をタップすると、4番のポスターがブックマークされた状態になる", function() {
		localStorage.setItem("bookmarks", "5,6");
		$("#listbookmark4").listchangebookmark();
		$("#listbookmark4").trigger("touchstart");
		$("#listbookmark5").listchangebookmark();
		$("#listbookmark5").trigger("touchstart");
		$("#listbookmark6").listchangebookmark();
		$("#listbookmark6").trigger("touchstart");

		var expectBookmarks = "4";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("4,5,6番のポスターがブックマークされている状態で、リストで、4,5,6番の星をタップすると、何もブックマークされていない状態になる", function() {
		localStorage.setItem("bookmarks", "4,5,6");
		$("#listbookmark4").listchangebookmark();
		$("#listbookmark4").trigger("touchstart");
		$("#listbookmark5").listchangebookmark();
		$("#listbookmark5").trigger("touchstart");
		$("#listbookmark6").listchangebookmark();
		$("#listbookmark6").trigger("touchstart");

		var expectBookmarks = "";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
});

describe("ポスターリスト", function() {
	beforeEach(function() {
		loadFixtures("fixture-posterlist.html","fixture-postermap.html");
		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();

		$("#posterList").showPosterList();
		$(".listToMapBtn").jumpToMapPage();
		$(".listToDetailBtn").jumpToDetailPage();

		initPosterMap();	

		removeAllPosterInfo();
	});

	it("正しい順番（ID順）でポスターの一覧が表示されている", function() {
		var posters = $("#posterList").showPosterList();

		var expectIds = new Array();
		poster.forEach(function(p) {
			//if (p.sessionid.indexOf("Dummy") === -1) {
				expectIds.push(p.id.toString());
			//}
		});

		// 末尾のDummyデータ4つをpopさせて消している
		expectIds.pop();
		expectIds.pop();
		expectIds.pop();
		expectIds.pop();

		expect(expectIds).toEqual(posters["id"]);
	});

	// poster.forEach(function(p) {
	// 	it(p["id"].toString() + "番のポスターの詳細情報ボタンを押すと、" 
	// 		+ p["id"].toString() + "番のポスターの詳細情報が表示される", function() {
	// 		expect(sessionStorage.getItem("posterid")).toBeNull();

	// 		$("#listToDetail"+p["id"]).trigger("touchstart");

	// 		listToDetail(p["id"]);
	// 		expect(sessionStorage.getItem("posterid")).toEqual(p["id"].toString());
	// 	});
	// });
	it("1番のポスターのマップボタンを押すと、マップ画面に遷移し、1番のポスターの基本情報が表示される", function() {
		expect(sessionStorage.getItem("posterid")).toBeNull();

		$("#listToMap1").trigger("touchstart");

		listToMap(1);
		expect(sessionStorage.getItem("posterid")).toEqual("1");
	});
	it("1番のポスターの詳細情報ボタンを押すと、1番のポスターの詳細情報が表示される", function() {
		expect(sessionStorage.getItem("posterid")).toBeNull();

		$("#listToDetail1").trigger("touchstart");

		listToDetail(1);
		expect(sessionStorage.getItem("posterid")).toEqual("1");
	});
	it("0番のポスターのマップボタンを押すと例外が発生する", function() {
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(function() {
			listToMap(0);
		}).toThrow();
	});
	it("0番のポスターの詳細情報ボタンを押すと例外が発生する", function() {
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(function() {
			listToDetail(0);
		}).toThrow();
	});
	it("ポスターの総数+1番のポスターのマップボタンを押すと例外が発生する", function() {
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(function() {
			listToMap(poster.length + 1);
		}).toThrow();
	});
	it("ポスターの総数+1番のポスターの詳細情報ボタンを押すと例外が発生する", function() {
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(function() {
			listToDetail(poster.length + 1);
		}).toThrow();
	});

	// poster.forEach(function(p) {
	// 	it(p["id"].toString() + "番のポスターのマップボタンを押すと、" 
	// 		+ p["id"].toString() + "番のポスターがマップ上で強調表示される", function() {
	// 		expect(sessionStorage.getItem("posterid")).toBeNull();
	// 		listToMap(p["id"]);
	// 		expect(sessionStorage.getItem("posterid")).toEqual(p["id"].toString());
	// 	});
	// });
	it("1番のポスターのマップボタンを押すと、1番のポスターがマップ上で強調表示される", function() {
		expect(sessionStorage.getItem("posterid")).toBeNull();
		listToMap(1);
		expect(sessionStorage.getItem("posterid")).toEqual("1");
	});
	it("0番のポスターのマップボタンを押すと例外が発生する", function() {
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(function() {
			listToMap(0);
		}).toThrow();
	});
	it("ポスターの総数+1番のポスターのマップボタンを押すと例外が発生する", function() {
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(function() {
			listToMap(poster.length + 1);
		}).toThrow();
	});
});

describe("ブックマークリスト", function() {
	beforeEach(function() {
		loadFixtures("fixture-bookmarklist.html","fixture-postermap.html");

		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();
		$("#bookmarkList").showBookmarkList();
		$(".bookmarklistToMapBtn").bookmarklistToMapPage();
		$(".bookmarklistToDetailBtn").bookmarklistToDetailPage();
		localStorage.setItem("bookmarks", "");
		initPosterMap();	
		removeAllPosterInfo();
	});

	it("一番のポスターがブックマークされると、ブックマークで表示される", function() {
		localStorage.setItem("bookmarks", "1");
		var posters = $("#bookmarkList").showBookmarkList();
		var expectIds = new Array();
		expectIds.push("1");
		expect(expectIds).toEqual(posters["id"]);
	});
	it("1,2,3番のポスターがブックマークされると、ブックマークで表示される", function() {
		localStorage.setItem("bookmarks", "1,2,3");
		var posters = $("#bookmarkList").showBookmarkList();
		var expectIds = new Array();
		expectIds.push("1");
		expectIds.push("2");
		expectIds.push("3");
		expect(expectIds).toEqual(posters["id"]);
	});
	it("すべてのポスターがブックマークされると、ブックマークで表示される", function() {
		var str ="";
		for (var i = 0; i <= poster.length - 5; i++) {
			str += i + 1 + ",";
		}
		str = str.substring(0, str.length - 1);
		localStorage.setItem("bookmarks", str);
		var posters = $("#bookmarkList").showBookmarkList();
		var expectIds = new Array();
		for (var i = 0; i <= poster.length - 5; i++) {
			expectIds.push(poster[i].id.toString());
		};
		expect(expectIds).toEqual(posters["id"]);
	});
});

describe("ブックマークリストでブックマークを削除する", function() {
	beforeEach(function() {
		loadFixtures("fixture-bookmarklist.html","fixture-postermap.html");

		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();
		$("#bookmarkList").showBookmarkList();
		$(".bookmarklistToMapBtn").bookmarklistToMapPage();
		$(".bookmarklistToDetailBtn").bookmarklistToDetailPage();
		localStorage.setItem("flag", "test");
		initPosterMap();	
		removeAllPosterInfo();
	});

	 it("一番のポスターがブックマークされ、一番のポスターのブックマークを削除する", function() {
	 	localStorage.setItem("bookmarks", "1");
	 	$("#deletebookmark1").deletebookmark();
	 	$("#deletebookmark1").trigger("touchstart");
	 	var bookmarkArr = getBookmarks();
	 	var expectIds = new Array();
	 	expect(bookmarkArr).toEqual(expectIds);
	 });
});

function getAuthors(posterid) {

	var atotal = author.length;
	var authorlist = "";
	for (var i = 0; i < atotal; i++) {
        if (author[i].posterid == posterid){
        	authorlist = authorlist + author[i].name + ",";
        }
	}
	authorlist = authorlist.substring(0, authorlist.length - 1);
	return authorlist;
}

function getKeywords(posterid) {

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

function ellipsisWords(str) {
	if (str.length > labelmax) {
		str = str.substring(0, labelmax) + "...";
	}
	return str;
}