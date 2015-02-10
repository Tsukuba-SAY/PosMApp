describe("変数の確認", function() {
	beforeEach(function() {
		resetDelta();
	});
	it("labelmaxが宣言されている", function() {
		deleteLog();
		expect(labelmax).toBeDefined();
	});
});

describe("テスト用のファンクションのテスト", function() {
	beforeEach(function() {
		resetDelta();
		// ajaxdownload("#topPage");
	});
	it("getAuthorsのテスト", function() {
		expectArr = new Array();
		author.forEach(function(a) {
			if (a.posterid === 1) {
				expectArr.push(a.name);
			}
		});
		expect(getAuthors(1)).toEqual(expectArr.join(", "));
	});
	it("getKeywordsのテスト", function() {
		expectArr = new Array();
		keyword.forEach(function(k) {
			if(k.posterid === 1) {
				expectArr.push(k.keyword);
			}
		});
		expect(getKeywords(1)).toEqual(expectArr.join(", "));
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
		resetDelta();

		loadFixtures("fixture-toppage.html");
		$("#goToInformation").goToInformationPage("click");
		$("#goToMap").goToMapPage("click");
		$("#goToList").goToListPage("click");
		$("#goToVenue").goToVenuePage("click");
	});
	it("トップページからポスターマップ画面に遷移できる", function() {
		$("#goToMap").click();
		expect(window.location.hash).toEqual("#posterMapPage");
	});
	it("トップページから発表リスト画面に遷移できる", function() {
		$("#goToList").click();
		expect(window.location.hash).toEqual("#presenListPage");
	});
	it("トップページからタイムテーブルに遷移できる", function() {
		$("#goToInformation").click();
		expect(window.location.hash).toEqual("#informationPage");
	});
	it("トップページから会場マップ図に遷移できる", function() {
		$("#goToVenue").click();
		expect(window.location.hash).toEqual("#venuePage");
	});
});

describe("タブバー", function() {
	beforeEach(function() {
		resetDelta();

		loadFixtures("fixture-tabbar.html");
		$(".topPageButton").goToTopPage("click");
		$(".posterMapPageButton").goToMapPage("click");
		$(".presenListPageButton").goToListPage("click");
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
		$(".presenListPageButton").click();
		expect(window.location.hash).toEqual("#presenListPage");
	});
});

describe("ポスターマップ", function() {
	beforeEach(function() {
		resetDelta();
		// ajaxdownload("#topPage");
		loadFixtures("fixture-postermap.html");
		initPosterMap();
		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();

		$("#basicinfopanel").closeBasicInfo();

		sessionStorage.removeItem("searching");
		removeAllPosterInfo();	
	});

	it("基本情報に関して、開いた状態でタップすると閉じる", function() {
		$("#basicinfopanel").trigger("click");
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(sessionStorage.getItem("presenid")).toBeNull();
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
		$("#icon" + posterid).trigger("click");

		expect(pflag).toEqual(expectFlag);

		var p;
		presen.forEach(function(obj) {
			if (obj.presenid === poster[posterid-1].presenid) {
				p = obj;
			}
		});
		expect(sessionStorage.getItem("posterid")).toEqual(poster[posterid-1].posterid.toString());
		expect(sessionStorage.getItem("presenid")).toEqual(p.presenid);
		expect(sessionStorage.getItem("title")).toEqual(p.title);
		expect(sessionStorage.getItem("abstract")).toEqual(p.abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(getAuthorname(p.presenid));
		expect(sessionStorage.getItem("authorbelongs")).toEqual(getAuthorbelongs(p.presenid));
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(p.presenid));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(p.presenid));
	});

	it("デフォルトの状態で50番目のポスターをタップすると97番目の情報が取得できる", function() {
		
		//var poster.length=poster.length;
		var beforeFlag = new Array(poster.length+1);
		var expectFlag = new Array(poster.length+1);
		var posterid = 50;

		beforeFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			beforeFlag[i] = "d";
		}

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[50] = "t";

		expect(pflag).toEqual(beforeFlag);

		$("#icon" + posterid).touchPoster();
		$("#icon" + posterid).trigger("click");

		expect(pflag).toEqual(expectFlag);

		var p;
		presen.forEach(function(obj) {
			if (obj.presenid === poster[posterid-1].presenid) {
				p = obj;
			}
		});
		expect(sessionStorage.getItem("posterid")).toEqual(poster[posterid-1].posterid.toString());
		expect(sessionStorage.getItem("presenid")).toEqual(p.presenid);
		expect(sessionStorage.getItem("title")).toEqual(p.title);
		expect(sessionStorage.getItem("abstract")).toEqual(p.abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(getAuthorname(p.presenid));
		expect(sessionStorage.getItem("authorbelongs")).toEqual(getAuthorbelongs(p.presenid));
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(p.presenid));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(p.presenid));
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
		$("#icon" + posterid).trigger("click");

		expect(pflag).toEqual(expectFlag);

		var p;
		presen.forEach(function(obj) {
			if (obj.presenid === poster[posterid-1].presenid) {
				p = obj;
			}
		});
		expect(sessionStorage.getItem("posterid")).toEqual(poster[posterid-1].posterid.toString());
		expect(sessionStorage.getItem("presenid")).toEqual(p.presenid);
		expect(sessionStorage.getItem("title")).toEqual(p.title);
		expect(sessionStorage.getItem("abstract")).toEqual(p.abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(getAuthorname(p.presenid));
		expect(sessionStorage.getItem("authorbelongs")).toEqual(getAuthorbelongs(p.presenid));
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(p.presenid));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(p.presenid));
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
		$("#icon" + posterid).trigger("click");

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(sessionStorage.getItem("presenid")).toBeNull();
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
			$postericon.trigger("click");
		}).toThrow();

  		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(sessionStorage.getItem("presenid")).toBeNull();
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
			$postericon.trigger("click");
		}).toThrow();

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(sessionStorage.getItem("presenid")).toBeNull();
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
		$postericon1.trigger("click");

		expect(pflag).toEqual(beforeFlag);

		expect(function() {
			var $postericon2 = $("<div>");
			$postericon2.attr("id", "icon" + posterid);
			$postericon2.touchPoster();
			$postericon2.trigger("click");
		}).toThrow();

		expect(pflag).toEqual(expectFlag);

		posterid = 2;
		var p;
		presen.forEach(function(obj) {
			if (obj.presenid === poster[posterid-1].presenid) {
				p = obj;
			}
		});
		expect(sessionStorage.getItem("posterid")).toEqual(poster[posterid-1].posterid.toString());
		expect(sessionStorage.getItem("presenid")).toEqual(p.presenid);
		expect(sessionStorage.getItem("title")).toEqual(p.title);
		expect(sessionStorage.getItem("abstract")).toEqual(p.abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(getAuthorname(p.presenid));
		expect(sessionStorage.getItem("authorbelongs")).toEqual(getAuthorbelongs(p.presenid));
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(p.presenid));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(p.presenid));
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
		$postericon1.trigger("click");

		expect(pflag).toEqual(beforeFlag);

		expect(function() {
			var $postericon2 = $("<div>");
			$postericon2.attr("id", "icon" + posterid);
			$postericon2.touchPoster();
			$postericon2.trigger("click");
		}).toThrow();

		expect(pflag).toEqual(expectFlag);

		posterid = 2;
		var p;
		presen.forEach(function(obj) {
			if (obj.presenid === poster[posterid-1].presenid) {
				p = obj;
			}
		});
		expect(sessionStorage.getItem("posterid")).toEqual(poster[posterid-1].posterid.toString());
		expect(sessionStorage.getItem("presenid")).toEqual(p.presenid);
		expect(sessionStorage.getItem("title")).toEqual(p.title);
		expect(sessionStorage.getItem("abstract")).toEqual(p.abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(getAuthorname(p.presenid));
		expect(sessionStorage.getItem("authorbelongs")).toEqual(getAuthorbelongs(p.presenid));
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(p.presenid));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(p.presenid));
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
		$("#icon" + posterid).trigger("click");

		expect(pflag).toEqual(expectFlag);

		var p;
		presen.forEach(function(obj) {
			if (obj.presenid === poster[posterid-1].presenid) {
				p = obj;
			}
		});
		expect(sessionStorage.getItem("posterid")).toEqual(poster[posterid-1].posterid.toString());
		expect(sessionStorage.getItem("presenid")).toEqual(p.presenid);
		expect(sessionStorage.getItem("title")).toEqual(p.title);
		expect(sessionStorage.getItem("abstract")).toEqual(p.abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(getAuthorname(p.presenid));
		expect(sessionStorage.getItem("authorbelongs")).toEqual(getAuthorbelongs(p.presenid));
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(p.presenid));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(p.presenid));

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
		$("#icon" + posterid).trigger("click");

		expect(pflag).toEqual(expectFlag);

		var p;
		presen.forEach(function(obj) {
			if (obj.presenid === poster[posterid-1].presenid) {
				p = obj;
			}
		});
		expect(sessionStorage.getItem("posterid")).toEqual(poster[posterid-1].posterid.toString());
		expect(sessionStorage.getItem("presenid")).toEqual(p.presenid);
		expect(sessionStorage.getItem("title")).toEqual(p.title);
		expect(sessionStorage.getItem("abstract")).toEqual(p.abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(getAuthorname(p.presenid));
		expect(sessionStorage.getItem("authorbelongs")).toEqual(getAuthorbelongs(p.presenid));
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(p.presenid));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(p.presenid));

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
		$("#icon" + posterid).trigger("click");

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(sessionStorage.getItem("presenid")).toBeNull();
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
		$("#icon" + posterid).trigger("click");

		expect(pflag).toEqual(expectFlag);
		var p;
		presen.forEach(function(obj) {
			if (obj.presenid === poster[posterid-1].presenid) {
				p = obj;
			}
		});
		expect(sessionStorage.getItem("posterid")).toEqual(poster[posterid-1].posterid.toString());
		expect(sessionStorage.getItem("presenid")).toEqual(p.presenid);
		expect(sessionStorage.getItem("title")).toEqual(p.title);
		expect(sessionStorage.getItem("abstract")).toEqual(p.abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(getAuthorname(p.presenid));
		expect(sessionStorage.getItem("authorbelongs")).toEqual(getAuthorbelongs(p.presenid));
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(p.presenid));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(p.presenid));
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
		$("#icon" + posterid).trigger("click");

		expect(pflag).toEqual(expectFlag);
		var p;
		presen.forEach(function(obj) {
			if (obj.presenid === poster[posterid-1].presenid) {
				p = obj;
			}
		});
		expect(sessionStorage.getItem("posterid")).toEqual(poster[posterid-1].posterid.toString());
		expect(sessionStorage.getItem("presenid")).toEqual(p.presenid);
		expect(sessionStorage.getItem("title")).toEqual(p.title);
		expect(sessionStorage.getItem("abstract")).toEqual(p.abstract);
		expect(sessionStorage.getItem("authorname")).toEqual(getAuthorname(p.presenid));
		expect(sessionStorage.getItem("authorbelongs")).toEqual(getAuthorbelongs(p.presenid));
		expect(sessionStorage.getItem("authors")).toEqual(getAuthors(p.presenid));
		expect(sessionStorage.getItem("keywords")).toEqual(getKeywords(p.presenid));
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
		$("#icon" + posterid).trigger("click");

		expect(pflag).toEqual(expectFlag);
		expect(sessionStorage.getItem("posterid")).toBeNull();
		expect(sessionStorage.getItem("presenid")).toBeNull();
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
		resetDelta();

		loadFixtures("fixture-postermap.html", "fixture-detail.html");
		setPosterIcons();
		showPosterIcons();
		$("#detailinfobutton").goToDetailPage("click");
		$("#detailBackButton").backToPreviousPage();

		sessionStorage.removeItem("previousPage");
	});
	it("マップ画面から1番のポスターの詳細情報画面を表示し、戻るボタンを押すとマップ画面に戻る", function() {
		$("#icon1").touchPoster();
		$("#icon1").trigger("click");
		$("#detailinfobutton").trigger("click");
		expect(window.location.hash).toEqual("#detailPage");

		$("#detailBackButton").trigger("click");
		expect(window.location.hash).toEqual("#posterMapPage");
	});
	it("マップ画面を経由せず直接詳細情報画面を表示して戻るボタンを押すとマップ画面に戻る", function() {
		$("#detailBackButton").trigger("click");
		expect(window.location.hash).toEqual("#posterMapPage");
	});
});

describe("キーワード検索（タイトル）", function() {
	beforeEach(function() {
		resetDelta();

		loadFixtures("fixture-postermap.html");
		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();

		initPosterMap();
	});

	it("「フィルタリング」で検索すると10,18,25番のポスターがヒットする", function() {

		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		expectArr = [10,18,25];

		for (var i = 1; i <= poster.length; i++) {
			if ($.inArray(i, expectArr) !== -1) {
				expectFlag[i] = "s";
			} else {
				expectFlag[i] = "d";
			}
		}
		
		$("#search-bar-title").val("フィルタリング");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「佐藤」で検索すると13,141,16,37,50,70,93番のポスターがヒットする", function() {

		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		expectArr = [13,141,16,37,50,70,93];

		for (var i = 1; i <= poster.length; i++) {
			if ($.inArray(i, expectArr) !== -1) {
				expectFlag[i] = "s";
			} else {
				expectFlag[i] = "d";
			}
		}
		
		$("#search-bar-title").val("佐藤");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「ダミーポスター」で検索すると81,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232番のポスターがヒットする", function() {

		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		expectArr = [81,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232];

		for (var i = 1; i <= poster.length; i++) {
			if ($.inArray(i, expectArr) !== -1) {
				expectFlag[i] = "s";
			} else {
				expectFlag[i] = "d";
			}
		}
		
		$("#search-bar-title").val("ダミーポスター");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「YAGO」で検索すると1番のポスターがヒットする", function() {
		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[1] = "s";

		$("#search-bar-title").val("YAGO");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「Twitter」で検索すると117,118,119,137,138,139,14,140,147,148,149,150,157,159,16,160,161,173,18,19,20,203,21,22,23,24,27,37,38,53,82,83番のポスターがヒットする", function() {
		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		expectArr = [117,118,119,137,138,139,14,140,147,148,149,150,157,159,16,160,161,173,18,19,20,203,21,22,23,24,27,37,38,53,82,83];
		for (var i = 1; i <= poster.length; i++) {
			if ($.inArray(i, expectArr) !== -1) {
				expectFlag[i] = "s";
			} else {
				expectFlag[i] = "d";
			}
		}

		$("#search-bar-title").val("Twitter");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「twitter」で検索すると117,118,119,137,138,139,14,140,147,148,149,150,157,159,16,160,161,173,18,19,20,203,21,22,23,24,27,37,38,53,82,83番のポスターがヒットする", function() {
		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		expectArr = [117,118,119,137,138,139,14,140,147,148,149,150,157,159,16,160,161,173,18,19,20,203,21,22,23,24,27,37,38,53,82,83];
		for (var i = 1; i <= poster.length; i++) {
			if ($.inArray(i, expectArr) !== -1) {
				expectFlag[i] = "s";
			} else {
				expectFlag[i] = "d";
			}
		}

		$("#search-bar-title").val("twitter");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("「TWITTER」で検索すると117,118,119,137,138,139,14,140,147,148,149,150,157,159,16,160,161,173,18,19,20,203,21,22,23,24,27,37,38,53,82,83番のポスターがヒットする", function() {
		var expectFlag = new Array(poster.length+1);

		expectFlag[0] = null;
		expectArr = [117,118,119,137,138,139,14,140,147,148,149,150,157,159,16,160,161,173,18,19,20,203,21,22,23,24,27,37,38,53,82,83];
		for (var i = 1; i <= poster.length; i++) {
			if ($.inArray(i, expectArr) !== -1) {
				expectFlag[i] = "s";
			} else {
				expectFlag[i] = "d";
			}
		}

		$("#search-bar-title").val("TWITTER");
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

	it("1番を選択した状態で「Twitter」で検索すると117,118,119,137,138,139,14,140,147,148,149,150,157,159,16,160,161,173,18,19,20,203,21,22,23,24,27,37,38,53,82,83番がヒットする", function() {
		var expectFlag = new Array(poster.length+1);

		pflag[1] = "t";

		expectFlag[0] = null;
		expectArr = [117,118,119,137,138,139,14,140,147,148,149,150,157,159,16,160,161,173,18,19,20,203,21,22,23,24,27,37,38,53,82,83];
		for (var i = 1; i <= poster.length; i++) {
			if ($.inArray(i, expectArr) !== -1) {
				expectFlag[i] = "s";
			} else {
				expectFlag[i] = "d";
			}
		}
		expectFlag[1] = "t";

		$("#search-bar-title").val("Twitter");
		$("#search-bar-title").trigger("change");

		expect(pflag).toEqual(expectFlag);
	});

	it("1番を選択した状態で「YAGO」で検索すると1番がヒットする", function() {
		var expectFlag = new Array(poster.length+1);

		pflag[1] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= poster.length; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[1] = "e";

		$("#search-bar-title").val("YAGO");
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
			searchAll(str);
			//wait(100);
		}).toThrow();
		expect(pflag).toEqual(expectFlag);
	});
});

describe("ラベルの表示切り替え機能", function() {
	beforeEach(function() {
		resetDelta();

		loadFixtures("fixture-postermap.html");
		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();
		$("#label-id").changeLabel();
		$("#label-presenid").changeLabel();
		$("#label-title").changeLabel();
		$("#label-authorname").changeLabel();
		$("#label-authorbelongs").changeLabel();

		initPosterMap();	
	});
	// it("「発表番号」ボタンを押すとラベルが発表IDに切り替わる", function() {
	// 	$("#label-presenid").trigger("click");
	// 	var labels = new Array();
	// 	for (var i = 1; i <= poster.length; i++) {
	// 		labels.push($("#font" + i).html());
	// 	}

	// 	var expectLabels = new Array();
	// 	for (var i = 1; i <= poster.length; i++) {
	// 		expectLabels.push(ellipsisWords(poster[i - 1].presenid.toString()));
	// 	}

	// 	expect(labels.toString()).toEqual(expectLabels.toString());


	// });
	it("「タイトル」ボタンを押すとラベルがタイトルに切り替わる", function() {
		$("#label-title").trigger("click");
		var labels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			labels.push($("#font" + i).html());
		}

		var expectLabels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			var p;
			presen.forEach(function(obj) {
				if (obj.presenid === poster[i-1].presenid) {
					p = obj;
				}
			});
			expectLabels.push(ellipsisWords(p.title.toString()));
		}
		expect(labels).toEqual(expectLabels);
	});
	it("「代表者名」ボタンを押すとラベルが代表者名に切り替わる", function() {
		$("#label-authorname").trigger("click");
		var labels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			labels.push($("#font" + i).html());
		}

		var expectLabels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			expectLabels.push(ellipsisWords(getAuthorname(poster[i-1].presenid)));
		}
		expect(labels).toEqual(expectLabels);
	});
	it("「所属」ボタンを押すとラベルが所属に切り替わる", function() {
		$("#label-authorbelongs").trigger("click");
		var labels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			labels.push($("#font" + i).html());
		}

		var expectLabels = new Array();
		for (var i = 1; i <= poster.length; i++) {
			expectLabels.push(ellipsisWords(getAuthorbelongs(poster[i-1].presenid)));
		}
		expect(labels).toEqual(expectLabels);
	});
});

describe("ブックマーク機能", function() {
	beforeEach(function() {
		resetDelta();

		loadFixtures("fixture-postermap.html");
		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();

		initPosterMap();
		$("#bookmarkbutton").touchBookmark();	
		localStorage.setItem("bookmarks", "");
	});
	it("何もブックマークされていない状態で、1番の星をタップすると、1番のポスターがブックマークされる", function() {
		sessionStorage.setItem("presenid", "A1-1");
		$("#bookmarkbutton").trigger("click");

		var expectBookmarks = "A1-1";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("1番のポスターがブックマークされている状態で、1番の星をタップすると、何もブックマークされていない状態になる", function() {
		localStorage.setItem("bookmarks", "A1-1");
		sessionStorage.setItem("presenid", "A1-1");
		$("#bookmarkbutton").trigger("click");

		var expectBookmarks = "";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("1番のポスターがブックマークされている状態で、2番の星をタップすると、1,2番のポスターがブックマークされた状態になる", function() {
		localStorage.setItem("bookmarks", "A1-1");
		sessionStorage.setItem("presenid", "A1-2");
		$("#bookmarkbutton").trigger("click");

		var expectBookmarks = "A1-1,A1-2";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("何もブックマークされていない状態で、4,5,6番の星をタップすると、4,5,6番のポスターがブックマークされた状態になる", function() {
		sessionStorage.setItem("presenid", "A2-2");
		$("#bookmarkbutton").trigger("click");
		sessionStorage.setItem("presenid", "A2-3");
		$("#bookmarkbutton").trigger("click");
		sessionStorage.setItem("presenid", "A2-4");
		$("#bookmarkbutton").trigger("click");

		var expectBookmarks = "A2-2,A2-3,A2-4";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	// it("4番のポスターがブックマークされている状態で、4,5,6番の星をタップすると、5,6番のポスターがブックマークされた状態になる", function() {
	// 	localStorage.setItem("bookmarks", "A2-2");
	// 	sessionStorage.setItem("presenid", "A2-2");
	// 	$("#bookmarkbutton").trigger("click");
	// 	sessionStorage.setItem("presenid", "A2-3");
	// 	$("#bookmarkbutton").trigger("click");
	// 	sessionStorage.setItem("presenid", "A2-4");
	// 	$("#bookmarkbutton").trigger("click");

	// 	var expectBookmarks = "A2-3,A2-4";
	// 	var bookmarks = localStorage.getItem("bookmarks");
	// 	expect(bookmarks).toEqual(expectBookmarks);
	// });
	it("5,6番のポスターがブックマークされている状態で、4,5,6番の星をタップすると、4番のポスターがブックマークされた状態になる", function() {
		localStorage.setItem("bookmarks", "A2-3,A2-4");
		sessionStorage.setItem("presenid", "A2-2");
		$("#bookmarkbutton").trigger("click");
		sessionStorage.setItem("presenid", "A2-3");
		$("#bookmarkbutton").trigger("click");
		sessionStorage.setItem("presenid", "A2-4");
		$("#bookmarkbutton").trigger("click");

		var expectBookmarks = "A2-2";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("4,5,6番のポスターがブックマークされている状態で、4,5,6番の星をタップすると、何もブックマークされていない状態になる", function() {
		localStorage.setItem("bookmarks", "A2-2,A2-3,A2-4");
		sessionStorage.setItem("presenid", "A2-2");
		$("#bookmarkbutton").trigger("click");
		sessionStorage.setItem("presenid", "A2-3");
		$("#bookmarkbutton").trigger("click");
		sessionStorage.setItem("presenid", "A2-4");
		$("#bookmarkbutton").trigger("click");

		var expectBookmarks = "";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("1番のポスターがブックマークされている状態で、1番のポスターをタップすると、星がブックマークされた状態で表示されている", function() {
		localStorage.setItem("bookmarks", "A1-1");
		$("#icon1").touchPoster();
		$("#icon1").trigger("click");
		expect($("#bookmarkbutton").attr("src")).toEqual("img/bookmark.png");
	});
	it("2番のポスターがブックマークされている状態で、1番のポスターをタップすると、星がブックマークされていない状態で表示されている", function() {
		localStorage.setItem("bookmarks", "A1-2");
		$("#icon1").touchPoster();
		$("#icon1").trigger("click");
		expect($("#bookmarkbutton").attr("src")).toEqual("img/unbookmark.png");
	});
	it("0番の星をタップすると、例外が発生する", function() {
		expect(function() {
			sessionStorage.setItem("presenid", 0);
			$("#bookmarkbutton").trigger("click");
		}).toThrow();
	});
	it("ポスター数+1番の星をタップすると、例外が発生する", function() {
		expect(function() {
			sessionStorage.setItem("presenid", poster.length + 1);
			$("#bookmarkbutton").trigger("click");
		}).toThrow();
	});
	it("ポスター数にnullを指定すると、例外が発生する", function() {
		expect(function() {
			$("#bookmarkbutton").trigger("click");
		}).toThrow();
	});
});

describe("発表リストからのブックマーク機能", function() {
	beforeEach(function() {
		resetDelta();

		loadFixtures("fixture-presenlist.html");
		$("#presenList").showPresenList();
		$("#bookmarkList").showBookmarkList();
		localStorage.setItem("bookmarks", "");
	});
	it("何もブックマークされていない状態で、リストで、1番の星をタップすると、1番のポスターがブックマークされる", function() {
		$("#listbookmarkA1-1").trigger("click");
		var expectBookmarks = "A1-1";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("1番のポスターがブックマークされている状態で、リストで、1番の星をタップすると、何もブックマークされていない状態になる", function() {
		localStorage.setItem("bookmarks", "A1-1");
		$("#listbookmarkA1-1").trigger("click");
		var expectBookmarks = "";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("1番のポスターがブックマークされている状態で、リストで、2番の星をタップすると、1,2番のポスターがブックマークされた状態になる", function() {
		localStorage.setItem("bookmarks", "A1-1");
		$("#listbookmarkA1-2").trigger("click");

		var expectBookmarks = "A1-1,A1-2";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("何もブックマークされていない状態で、リストで、4,5,6番の星をタップすると、4,5,6番のポスターがブックマークされた状態になる", function() {
		$("#listbookmarkA2-2").trigger("click");
		$("#listbookmarkA2-3").trigger("click");
		$("#listbookmarkA2-4").trigger("click");
		var expectBookmarks = "A2-2,A2-3,A2-4";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("4番のポスターがブックマークされている状態で、リストで、4,5,6番の星をタップすると、5,6番のポスターがブックマークされた状態になる", function() {
		localStorage.setItem("bookmarks", "A2-2");
		$("#listbookmarkA2-2").trigger("click");
		$("#listbookmarkA2-3").trigger("click");
		$("#listbookmarkA2-4").trigger("click");

		var expectBookmarks = "A2-3,A2-4";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("5,6番のポスターがブックマークされている状態で、リストで、4,5,6番の星をタップすると、4番のポスターがブックマークされた状態になる", function() {
		localStorage.setItem("bookmarks", "A2-3,A2-4");
		$("#listbookmarkA2-2").trigger("click");
		$("#listbookmarkA2-3").trigger("click");
		$("#listbookmarkA2-4").trigger("click");

		var expectBookmarks = "A2-2";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
	it("4,5,6番のポスターがブックマークされている状態で、リストで、4,5,6番の星をタップすると、何もブックマークされていない状態になる", function() {
		localStorage.setItem("bookmarks", "A2-2,A2-3,A2-4");
		$("#listbookmarkA2-2").trigger("click");
		$("#listbookmarkA2-3").trigger("click");
		$("#listbookmarkA2-4").trigger("click");

		var expectBookmarks = "";
		var bookmarks = localStorage.getItem("bookmarks");
		expect(bookmarks).toEqual(expectBookmarks);
	});
});

describe("発表リスト", function() {
	beforeEach(function() {
		resetDelta();

		loadFixtures("fixture-presenlist.html","fixture-postermap.html");
		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();

		$("#presenList").showPresenList();
		$(".listToMapBtn").jumpToMapPage();
		$(".listToDetailBtn").jumpToDetailPage();

		initPosterMap();	

		removeAllPosterInfo();
	});

	it("1番のポスターのマップボタンを押すと、マップ画面に遷移し、1番のポスターの基本情報が表示される", function() {
		expect(sessionStorage.getItem("posterid")).toBeNull();

		$("#listToMap1").trigger("click");

		listToMap(1);
		expect(sessionStorage.getItem("posterid")).toEqual("1");
	});
	it("1番のポスターの詳細情報ボタンを押すと、1番のポスターの詳細情報が表示される", function() {
		expect(sessionStorage.getItem("presenid")).toBeNull();

		$("#listToDetailA1-1").trigger("click");

		listToDetail("A1-1");
		expect(sessionStorage.getItem("presenid")).toEqual("A1-1");
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
	// HACK: 直打ちしないで計算した方がいい
	it("リストでセッションの情報がちゃんと表示されている", function() {
		var sessionNum = "A1,B1,C1,D1,E1,F1,P1,A2,B2,C2,D2,E2,F2,P2,B3,C3,D3,E3,F3,P3,A4,B4,C4,D4,E4,F4,P4,A5,B5,C5,D5,E5,F5,B6,C6,D6,E6,F6,B7,C7,D7,E7,F7,A8,B8,C8,D8,E8,F8,A9,B9,C9,D9,E9,F9";
		expect(sessionStorage.getItem("testSessionNum")).toEqual(sessionNum);
	});
});

describe("ブックマークリスト", function() {
	beforeEach(function() {
		resetDelta();
		
		loadFixtures("fixture-presenlist.html","fixture-postermap.html");

		setPosterIcons();
		showBookmarkIcons();
		showPosterIcons();
		$("#bookmarkList").showBookmarkList();
		$(".bookmarklistToMapBtn").bookmarklistToMapPage();
		$(".bookmarklistToDetailBtn").bookmarklistToDetailPage();
		localStorage.setItem("bookmarks", "");
		initPosterMap();	
		removeAllPosterInfo();

		spyOn(window, 'confirm').andReturn(true);
	});

	it("一番のポスターがブックマークされると、ブックマークで表示される", function() {
		localStorage.setItem("bookmarks", "A1-1");
		var posters = $("#bookmarkList").showBookmarkList();
		var expectIds = new Array();
		expectIds.push("A1-1");
		expect(expectIds).toEqual(posters["presenid"]);
	});
	it("1,2,3番のポスターがブックマークされると、ブックマークで表示される", function() {
		localStorage.setItem("bookmarks", "A1-1,A1-2,A1-4");
		var posters = $("#bookmarkList").showBookmarkList();
		var expectIds = new Array();
		expectIds.push("A1-1");
		expectIds.push("A1-2");
		expectIds.push("A1-4");
		expect(expectIds).toEqual(posters["presenid"]);
	});
	it("1番のポスターがブックマークしてある状態で、1番のポスターのマップボタンを押すと、マップ画面に遷移し、1番のポスターの基本情報が表示される", function() {
		localStorage.setItem("bookmarks", "A1-1");
		$("#bookmarkList").showBookmarkList();
		expect(sessionStorage.getItem("presenid")).toBeNull();

		$("#bookmarklistToMap1").trigger("click");

		listToMap(1);
		expect(sessionStorage.getItem("presenid")).toEqual("A1-1");
	});
	it("1番のポスターがブックマークしてある状態で、1番のポスターの詳細情報ボタンを押すと、1番のポスターの詳細情報が表示される", function() {
		localStorage.setItem("bookmarks", "A1-1");
		$("#bookmarkList").showBookmarkList();
		expect(sessionStorage.getItem("presenid")).toBeNull();

		$("#bookmarklistToDetail1").trigger("click");

		listToDetail("A1-1");
		expect(sessionStorage.getItem("presenid")).toEqual("A1-1");
	});
	it("0番のポスターのマップボタンを押すと例外が発生する", function() {
		expect(sessionStorage.getItem("presenid")).toBeNull();
		expect(function() {
			listToMap(0);
		}).toThrow();
	});
	it("ポスターの総数+1番のポスターのマップボタンを押すと例外が発生する", function() {
		expect(sessionStorage.getItem("presenid")).toBeNull();
		expect(function() {
			listToMap(poster.length + 1);
		}).toThrow();
	});
	it("1番のポスターがブックマークしてある状態で、1番のポスターのマップボタンを押すと、1番のポスターがマップ上で強調表示される", function() {
		localStorage.setItem("bookmarks", "A1-1");
		$("#bookmarkList").showBookmarkList();
		expect(sessionStorage.getItem("presenid")).toBeNull();
		listToMap(1);
		expect(sessionStorage.getItem("presenid")).toEqual("A1-1");
	});
	it("0番のポスターのマップボタンを押すと例外が発生する", function() {
		expect(sessionStorage.getItem("presenid")).toBeNull();
		expect(function() {
			listToMap(0);
		}).toThrow();
	});
	it("ポスターの総数+1番のポスターのマップボタンを押すと例外が発生する", function() {
		expect(sessionStorage.getItem("presenid")).toBeNull();
		expect(function() {
			listToMap(poster.length + 1);
		}).toThrow();
	});
	it("1,2,3番のポスターがブックマークされた状態で、1番のブックマークスターを押すと、1番のポスターのブックマークを削除され、2,3番のポスターが残る", function() {
		localStorage.setItem("bookmarks", "A1-1,A1-2,A1-4");
		$("#bookmarkList").showBookmarkList();
		$("#bookmarklistbookmarkA1-1").trigger("click");
		var bookmarkArr = getBookmarks();
		var expectIds = ["A1-2", "A1-4"];
		expect(bookmarkArr).toEqual(expectIds);
	});
	it("1番のポスターがブックマークされた状態で、1番のブックマークスターを押すと、1番のポスターのブックマークを削除され、ポスターが残らない", function() {
		localStorage.setItem("bookmarks", "A1-1");
		$("#bookmarkList").showBookmarkList();
		$("#bookmarklistbookmarkA1-1").trigger("click");
		var bookmarkArr = getBookmarks();
		var expectIds = [];
		expect(bookmarkArr).toEqual(expectIds);
	});
});

// function getAuthors(posterid) {
// 	var authors = [];
// 	for (var i = 0; i < author.length; i++) {
// 		var a = author[i];
// 		if (a.posterid === posterid) {
// 			authors.push(a.name);
// 		}
// 	}
// 	authors = authors.join(", ");
// 	return authors;
// }

// function getKeywords(posterid) {
// 	var keywords = [];
// 	for (var i = 0; i < keyword.length; i++) {
// 		var k = keyword[i];
// 		if (k.posterid === posterid) {
// 			keywords.push(k.keyword);
// 		}
// 	}
// 	keywords = keywords.join(",");
// 	return keywords;
// }

function ellipsisWords(str) {
	if (str.length > labelmax) {
		str = str.substring(0, labelmax) + "...";
	}
	return str;
}