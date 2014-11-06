describe("変数の確認", function() {
	it("posterdata.jsでposterが宣言されている", function() {
		expect(poster).toBeDefined();
	});
	it("posterの数が14である", function() {
		expect(poster.length).toEqual(14);
	});
});

describe("トップページ", function() {
	beforeEach(function() {
		loadFixtures("fixture-toppage.html");
		$("#goToMap").goToMapPage("click");
		$("#goToList").goToListPage("click");
	});
	it("トップページからポスターマップ画面に遷移できる", function() {
		$("#goToMap").click();
		expect(window.location.hash).toEqual("#posterMapPage");
	});
	it("トップページからポスターリスト画面に遷移できる", function() {
		$("#goToList").click();
		expect(window.location.hash).toEqual("#posterListPage");
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
		showPosterIcons();

		$("#basicinfopanel").closeBasicInfo();

		initPosterMap();	
		test = true;
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
		
		//var ptotal=poster.length;
		test = true;
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = 1;

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			beforeFlag[i] = "d";
		}

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = 2;

		pflag[1] = "t";

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[1] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = 2;

		pflag[2] = "t";

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = ptotal+1;

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			beforeFlag[i] = "d";
		}

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = 0;

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			beforeFlag[i] = "d";
		}

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = ptotal+1;

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = 0;

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = 1;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "s";
		beforeFlag[3] = "s";
		beforeFlag[4] = "s";
		pflag[2] = "s";
		pflag[3] = "s";
		pflag[4] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = 2;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		for (var i = 1; i <= ptotal; i++) {
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
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = 2;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "e";
		beforeFlag[3] = "s";
		beforeFlag[4] = "s";
		pflag[2] = "e";
		pflag[3] = "s";
		pflag[4] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = 3;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "e";
		beforeFlag[3] = "s";
		beforeFlag[4] = "s";
		pflag[2] = "e";
		pflag[3] = "s";
		pflag[4] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = 7;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "s";
		beforeFlag[3] = "e";
		beforeFlag[4] = "s";
		pflag[2] = "s";
		pflag[3] = "e";
		pflag[4] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		var beforeFlag = new Array(ptotal+1);
		var expectFlag = new Array(ptotal+1);
		var posterid = 7;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
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
		for (var i = 1; i <= ptotal; i++) {
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
		showPosterIcons();

		initPosterMap();
	});

	it("「システム」で検索すると1,6,10,11,12,13番のポスターがヒットする", function() {

		var expectFlag = new Array(ptotal+1);

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			if (i == 1 || i == 6 || i == 10 || i == 11 || i == 12 || i == 13) {
				expectFlag[i] = "s";
			} else {
				expectFlag[i] = "d";
			}
		}
		
		$("#search-bar-title").val("システム");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「ポスター」で検索すると10番のポスターがヒットする", function() {
		var expectFlag = new Array(ptotal+1);

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[10] = "s";

		$("#search-bar-title").val("ポスター");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「スター」で検索すると10番のポスターがヒットする", function() {
		var expectFlag = new Array(ptotal+1);

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[10] = "s";

		$("#search-bar-title").val("スター");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「Twitter」で検索すると3番のポスターがヒットする", function() {
		var expectFlag = new Array(ptotal+1);

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[3] = "s";

		$("#search-bar-title").val("Twitter");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「twitter」で検索すると3番のポスターがヒットする", function() {
		var expectFlag = new Array(ptotal+1);

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[3] = "s";

		$("#search-bar-title").val("twitter");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「$」で検索すると何もヒットしない", function() {
		var expectFlag = new Array(ptotal+1);

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			expectFlag[i] = "d";
		}

		$("#search-bar-title").val("$");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("半角スペースで検索すると何もヒットしない", function() {
		var expectFlag = new Array(ptotal+1);

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			expectFlag[i] = "d";
		}

		$("#search-bar-title").val(" ");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("nullを入れると何もヒットしない", function() {
		var expectFlag = new Array(ptotal+1);

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			expectFlag[i] = "d";
		}

		$("#search-bar-title").val(null);
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("1番を選択した状態で「ポスター」で検索すると10番がヒットする", function() {
		var expectFlag = new Array(ptotal+1);

		pflag[1] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[1] = "t";
		expectFlag[10] = "s";

		$("#search-bar-title").val("ポスター");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("10番を選択した状態で「ポスター」で検索すると10番がヒットする", function() {
		var expectFlag = new Array(ptotal+1);

		pflag[10] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[10] = "e";

		$("#search-bar-title").val("ポスター");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("何も選択してない状態で、1024文字を入れて検索すると例外が発生し、ポスターの状況は変化しない", function() {
		var expectFlag = new Array(ptotal+1);

		var str = "";
		for (var i = 0; i < 1024; i++) {
			str += "a";
		}

		expectFlag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			expectFlag[i] = "d";
		}

		expect(function() {
			searchByTitle(str);
			//wait(100);
		}).toThrow();
		expect(pflag).toEqual(expectFlag);
	});
});

describe("テスト用のファンクションのテスト", function() {
	it("getAuthorsのテスト", function() {
		expect(getAuthors(1)).toEqual("浦井 智之,小池 泰輔,小宮山 哲俊,原 清貴");
	});
	it("getKeywordsのテスト", function() {
		expect(getKeywords(1)).toEqual("スタンダードコース");
	});
});

describe("ラベルの表示切り替え機能", function() {
	beforeEach(function() {
		loadFixtures("fixture-postermap.html");
		$("#label-id").changeLabel();
		$("#label-sessionid").changeLabel();
		$("#label-title").changeLabel();
		$("#label-authorname").changeLabel();
		$("#label-authorbelongs").changeLabel();

		initPosterMap();	
		test = true;
	});
	it("「ID」ボタンを押すとラベルがIDに切り替わる", function() {
		var labels = changeLabel("id");
		var testlabel = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14"];
		$("#label-id").trigger("touchstart");
		expect(labels).toEqual(testlabel);
	});
	it("「セッションID」ボタンを押すとラベルがセッションIDに切り替わる", function() {
		var labels = changeLabel("sessionid");
		var testlabel = ["S01","S02","S03","S04","S05","S06","S07","S08","S09","SIT01","SIT02","SIT03","SIT04","SIT05"];
		$("#label-sessionid").trigger("touchstart");
		expect(labels).toEqual(testlabel);
	});
	it("「タイトル」ボタンを押すとラベルがタイトルに切り替わる", function() {
		var labels = changeLabel("title");
		var testlabel = ["防災・避難...","画像リプラ...","ハッシュタ...","ワインマッ...","コロコロジ...","中古教科書...","地図を用い...","予定や天候...","iBeac...","600人規...","テニススク...","施設内での...","スマートフ...","小規模グル..."];
		$("#label-title").trigger("touchstart");
		expect(labels).toEqual(testlabel);	
	});
	it("「チーム名」ボタンを押すとラベルがチーム名に切り替わる", function() {
		var labels = changeLabel("authorname");
		var testlabel = ["OU-LA...","_:(*'...","チームNo...","Primt...","コロジャー","りばて","ef","おちゃねこ","Rabbi...","S.A.Y...","TOMs","TKS","SAG-A...","Book-..."];
		$("#label-authorname").trigger("touchstart");
		expect(labels).toEqual(testlabel);
	});
	it("「大学名」ボタンを押すとラベルが大学名に切り替わる", function() {
		var labels = changeLabel("authorbelongs");
		var testlabel = ["千葉大学","筑波大学","筑波大学","筑波大学","筑波大学,...","東京理科大...","愛媛大学","お茶の水女...","茨城大学","筑波大学","筑波大学","筑波大学","筑波大学","筑波大学"];
		$("#label-authorbelongs").trigger("touchstart");
		expect(labels).toEqual(testlabel);
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
		test = true;
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
		for (var i = 1; i <= ptotal; i++) {
			sessionStorage.setItem("posterid", i);
			$("#bookmarkbutton").trigger("touchstart");
		}
		var expectBookmarks = "1,2,3,4,5,6,7,8,9,10,11,12,13,14";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("1番のポスターがブックマークされている状態で、1番の星をタップすると、何もブックされていない状態になる", function() {
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
	it("0番の星をタップすると、例外が発生する", function() {
		expect(function() {
			sessionStorage.setItem("posterid", 0);
			$("#bookmarkbutton").trigger("touchstart");
		}).toThrow();
	});
	it("ポスター数+1番の星をタップすると、例外が発生する", function() {
		expect(function() {
			sessionStorage.setItem("posterid", ptotal + 1);
			$("#bookmarkbutton").trigger("touchstart");
		}).toThrow();
	});
	it("ポスター数にnullを指定すると、例外が発生する", function() {
		expect(function() {
			$("#bookmarkbutton").trigger("touchstart");
		}).toThrow();
	});
});

describe("ポスターリスト", function() {
	beforeEach(function() {
		initPosterMap();	
		test = true;

		removeAllPosterInfo();
	});

	it("正しい順番（ID順）でポスターの一覧が表示されている", function() {
		$testdiv = $("<div>");
		var posters = $testdiv.showPosterList();
		var expectIds = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14"];
		expect(expectIds).toEqual(posters["id"]);
	});

	poster.forEach(function(p) {
		it(p["id"].toString() + "番のポスターの詳細情報ボタンを押すと、" 
			+ p["id"].toString() + "番のポスターの詳細情報が表示される", function() {
			expect(sessionStorage.getItem("posterid")).toBeNull();


			listToDetail(p["id"]);
			expect(sessionStorage.getItem("posterid")).toEqual(p["id"].toString());
		});
	});
	it("0番のポスターの詳細情報ボタンを押すと例外が発生する", function() {
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(function() {
			listToDetail(0);
		}).toThrow();
	});
	it("ポスターの総数+1番のポスターの詳細情報ボタンを押すと例外が発生する", function() {
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(function() {
			listToDetail(poster.length + 1);
		}).toThrow();
	});

	poster.forEach(function(p) {
		it(p["id"].toString() + "番のポスターのマップボタンを押すと、" 
			+ p["id"].toString() + "番のポスターがマップ上で強調表示される", function() {
			expect(sessionStorage.getItem("posterid")).toBeNull();
			listToMap(p["id"]);
			expect(sessionStorage.getItem("posterid")).toEqual(p["id"].toString());
		});
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

function getAuthors(posterid){

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