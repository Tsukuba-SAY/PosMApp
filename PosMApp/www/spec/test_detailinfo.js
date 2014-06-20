describe("ポスターの詳細情報を表示する", function() {
	beforeEach(function() {
		var pflag;
		var ptotal=10;
		var db = openDatabase("PosMAppDB", "", "PosMAppDB", 1000);

		init();
		test = true;
	});

	it("デフォルトの状態で1番目のポスターをタップすると1番目の情報が取得できる", function() {
		var beforeFlag = new Array(10+1);
		var expectFlag = new Array(10+1);
		var posterid = 1;

		beforeFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			beforeFlag[i] = "d";
		}

		expectFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[1] = "t";

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
			expect(sessionStorage.getItem("posterid")).toEqual("1");
			expect(sessionStorage.getItem("sessionid")).toEqual("A1-1");
			expect(sessionStorage.getItem("title")).toEqual("YAGOを用いた拡張固有表現抽出における新出語のクラス推定精度の検証");
			expect(sessionStorage.getItem("abstract")).toEqual("概要１");
			expect(sessionStorage.getItem("authorname")).toEqual("真嶋 温佳");
			expect(sessionStorage.getItem("authorbelongs")).toEqual("大阪大学");
			expect(sessionStorage.getItem("authors")).toEqual("真嶋 温佳,白川 真澄,原 隆浩,西尾 章治郎");
			expect(sessionStorage.getItem("keywords")).toEqual("Wikipedia,XML");
		});
	});

	it("1番を選択中に2番を選択すると、2番の情報が取得できる", function() {
		var beforeFlag = new Array(10+1);
		var expectFlag = new Array(10+1);
		var posterid = 2;

		pflag[1] = "t";

		beforeFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[1] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "t";


		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
			expect(sessionStorage.getItem("posterid")).toEqual("2");
			expect(sessionStorage.getItem("sessionid")).toEqual("A1-4");
			expect(sessionStorage.getItem("title")).toEqual("XML部分文書検索技術の Web 文書への適用");
			expect(sessionStorage.getItem("abstract")).toEqual("概要２");
			expect(sessionStorage.getItem("authorname")).toEqual("欅 惇志");
			expect(sessionStorage.getItem("authorbelongs")).toEqual("奈良先端科学技術大学院大学");
			expect(sessionStorage.getItem("authors")).toEqual("欅 惇志,宮崎 純,波多野 賢治,山本 豪志朗,武富 貴史,加藤 博一");
			expect(sessionStorage.getItem("keywords")).toEqual("Wikipedia,XML");
		});
	});

	it("2番を選択中に2番を選択する最初の状態に戻る", function() {
		var beforeFlag = new Array(10+1);
		var expectFlag = new Array(10+1);
		var posterid = 2;

		pflag[2] = "t";

		beforeFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			expectFlag[i] = "d";
		}

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		waits(100);

		runs(function() {
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
	});

	it("デフォルトの状態で11番目をタップすると例外を発生する", function() {
		var beforeFlag = new Array(10+1);
		var expectFlag = new Array(10+1);
		var posterid = 11;

		beforeFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			beforeFlag[i] = "d";
		}

		expectFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			expectFlag[i] = "d";
		}

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag;

			expect(function() {
				var nextFlag = touchPoster(posterid);
				waits(100);
			}).toThrow();
		});

		waits(100);

		runs(function() {

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
	});

	it("デフォルトの状態で0番目をタップすると例外を発生する", function() {
		var beforeFlag = new Array(10+1);
		var expectFlag = new Array(10+1);
		var posterid = 0;

		beforeFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			beforeFlag[i] = "d";
		}

		expectFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			expectFlag[i] = "d";
		}

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag;

			expect(function() {
				var nextFlag = touchPoster(posterid);
				waits(100);
			}).toThrow();
		});

		waits(100);

		runs(function() {

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
	});

	it("2番がタップされている状態で11番目をタップすると例外を発生する", function() {
		var beforeFlag = new Array(10+1);
		var expectFlag = new Array(10+1);
		var posterid = 11;

		beforeFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "t";

		runs(function() {
			var nextFlag = touchPoster(2);
			pflag[2] = nextFlag;
		});

		waits(100);


		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag;

			expect(function() {
				var nextFlag = touchPoster(posterid);
				waits(100);
			}).toThrow();
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
			expect(sessionStorage.getItem("posterid")).toEqual("2");
			expect(sessionStorage.getItem("sessionid")).toEqual("A1-4");
			expect(sessionStorage.getItem("title")).toEqual("XML部分文書検索技術の Web 文書への適用");
			expect(sessionStorage.getItem("abstract")).toEqual("概要２");
			expect(sessionStorage.getItem("authorname")).toEqual("欅 惇志");
			expect(sessionStorage.getItem("authorbelongs")).toEqual("奈良先端科学技術大学院大学");
			expect(sessionStorage.getItem("authors")).toEqual("欅 惇志,宮崎 純,波多野 賢治,山本 豪志朗,武富 貴史,加藤 博一");
			expect(sessionStorage.getItem("keywords")).toEqual("Wikipedia,XML");
		});
	});

	it("2番がタップされている状態で0番目をタップすると例外を発生する", function() {
		var beforeFlag = new Array(10+1);
		var expectFlag = new Array(10+1);
		var posterid = 11;

		beforeFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "t";

		expectFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "t";

		runs(function() {
			var nextFlag = touchPoster(2);
			pflag[2] = nextFlag;
		});

		waits(100);


		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag;

			expect(function() {
				var nextFlag = touchPoster(posterid);
				waits(100);
			}).toThrow();
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
			expect(sessionStorage.getItem("posterid")).toEqual("2");
			expect(sessionStorage.getItem("sessionid")).toEqual("A1-4");
			expect(sessionStorage.getItem("title")).toEqual("XML部分文書検索技術の Web 文書への適用");
			expect(sessionStorage.getItem("abstract")).toEqual("概要２");
			expect(sessionStorage.getItem("authorname")).toEqual("欅 惇志");
			expect(sessionStorage.getItem("authorbelongs")).toEqual("奈良先端科学技術大学院大学");
			expect(sessionStorage.getItem("authors")).toEqual("欅 惇志,宮崎 純,波多野 賢治,山本 豪志朗,武富 貴史,加藤 博一");
			expect(sessionStorage.getItem("keywords")).toEqual("Wikipedia,XML");
		});
	});

	it("2,3,4番目が検索にヒットしている状態で1番目のポスターをタップすると1番目の情報が取得できる", function() {
		var beforeFlag = new Array(10+1);
		var expectFlag = new Array(10+1);
		var posterid = 1;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "s";
		beforeFlag[3] = "s";
		beforeFlag[4] = "s";
		pflag[2] = "s";
		pflag[3] = "s";
		pflag[4] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[1] = "t";
		expectFlag[2] = "s";
		expectFlag[3] = "s";
		expectFlag[4] = "s";

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
			expect(sessionStorage.getItem("posterid")).toEqual("1");
			expect(sessionStorage.getItem("sessionid")).toEqual("A1-1");
			expect(sessionStorage.getItem("title")).toEqual("YAGOを用いた拡張固有表現抽出における新出語のクラス推定精度の検証");
			expect(sessionStorage.getItem("abstract")).toEqual("概要１");
			expect(sessionStorage.getItem("authorname")).toEqual("真嶋 温佳");
			expect(sessionStorage.getItem("authorbelongs")).toEqual("大阪大学");
			expect(sessionStorage.getItem("authors")).toEqual("真嶋 温佳,白川 真澄,原 隆浩,西尾 章治郎");
			expect(sessionStorage.getItem("keywords")).toEqual("Wikipedia,XML");

			sessionStorage.setItem("searching", "false");
		});
	});

	it("2,3,4番目が検索にヒットしている状態かつ1番をタップしている状態でで2番目のポスターをタップすると2番目の情報が取得できる", function() {
		var beforeFlag = new Array(10+1);
		var expectFlag = new Array(10+1);
		var posterid = 2;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
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
		for (var i = 1; i <= 10; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "e";
		expectFlag[3] = "s";
		expectFlag[4] = "s";

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
			expect(sessionStorage.getItem("posterid")).toEqual("2");
			expect(sessionStorage.getItem("sessionid")).toEqual("A1-4");
			expect(sessionStorage.getItem("title")).toEqual("XML部分文書検索技術の Web 文書への適用");
			expect(sessionStorage.getItem("abstract")).toEqual("概要２");
			expect(sessionStorage.getItem("authorname")).toEqual("欅 惇志");
			expect(sessionStorage.getItem("authorbelongs")).toEqual("奈良先端科学技術大学院大学");
			expect(sessionStorage.getItem("authors")).toEqual("欅 惇志,宮崎 純,波多野 賢治,山本 豪志朗,武富 貴史,加藤 博一");
			expect(sessionStorage.getItem("keywords")).toEqual("Wikipedia,XML");

			sessionStorage.setItem("searching", "false");
		});
	});

	it("2,3,4番目が検索にヒットしている状態かつ2番をタップしている状態でで3番目のポスターをタップすると3番目の情報が取得できる", function() {
		var beforeFlag = new Array(10+1);
		var expectFlag = new Array(10+1);
		var posterid = 3;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "e";
		beforeFlag[3] = "s";
		beforeFlag[4] = "s";
		pflag[2] = "e";
		pflag[3] = "s";
		pflag[4] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "s";
		expectFlag[3] = "e";
		expectFlag[4] = "s";

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
			expect(sessionStorage.getItem("posterid")).toEqual("3");
			expect(sessionStorage.getItem("sessionid")).toEqual("B1-1");
			expect(sessionStorage.getItem("title")).toEqual(" 配信型授業のコミュニケーションを支援するコメント共有手法の提案");
			expect(sessionStorage.getItem("abstract")).toEqual("概要３");
			expect(sessionStorage.getItem("authorname")).toEqual("川上 未来");
			expect(sessionStorage.getItem("authorbelongs")).toEqual("筑波大学");
			expect(sessionStorage.getItem("authors")).toEqual("川上 未来,佐藤 哲司");
			expect(sessionStorage.getItem("keywords")).toEqual("SNS");

			sessionStorage.setItem("searching", "false");
		});
	});

	it("2,3,4番目が検索にヒットしている状態かつ3番をタップしている状態でで7番目のポスターをタップすると7番目の情報が取得できる", function() {
		var beforeFlag = new Array(10+1);
		var expectFlag = new Array(10+1);
		var posterid = 7;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			beforeFlag[i] = "d";
		}
		beforeFlag[2] = "s";
		beforeFlag[3] = "e";
		beforeFlag[4] = "s";
		pflag[2] = "s";
		pflag[3] = "e";
		pflag[4] = "s";

		expectFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "s";
		expectFlag[3] = "s";
		expectFlag[4] = "s";
		expectFlag[7] = "t";

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
			expect(sessionStorage.getItem("posterid")).toEqual("7");
			expect(sessionStorage.getItem("sessionid")).toEqual("D1-1");
			expect(sessionStorage.getItem("title")).toEqual("Hadoop Cassandra とCassandraを用いた並列分散処理機構の性能比較");
			expect(sessionStorage.getItem("abstract")).toEqual("概要7");
			expect(sessionStorage.getItem("authorname")).toEqual("菱沼 直子");
			expect(sessionStorage.getItem("authorbelongs")).toEqual("お茶の水女子大学");
			expect(sessionStorage.getItem("authors")).toEqual("菱沼 直子,竹房 あつ子,中田 秀基,小口 正人");
			expect(sessionStorage.getItem("keywords")).toEqual("MapReduce,分散処理");

			sessionStorage.setItem("searching", "false");
		});
	});

	it("2,3,4番目が検索にヒットしている状態かつ7番をタップしている状態でで7番目のポスターをタップすると2,3,4番目が検索にヒットしている状態に戻る", function() {
		var beforeFlag = new Array(10+1);
		var expectFlag = new Array(10+1);
		var posterid = 7;

		sessionStorage.setItem("searching", "true");

		beforeFlag[0] = null;
		for (var i = 1; i <= 10; i++) {
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
		for (var i = 1; i <= 10; i++) {
			expectFlag[i] = "d";
		}
		expectFlag[2] = "s";
		expectFlag[3] = "s";
		expectFlag[4] = "s";

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		waits(100);

		runs(function() {
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
});