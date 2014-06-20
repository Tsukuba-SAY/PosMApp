describe("initdb.jsの単体テスト", function() {
	it("変数dbが定義されている", function() {
		expect('db').toBeDefined();
	});
});

describe("postermap.jsの単体テスト", function() {
	it("変数dbが定義されている", function() {
		expect('db').toBeDefined();
	});
	describe("showDetailInfoPageのテスト", function() {
		beforeEach(function() {
			
		});
		it("", function() {

		});
	});
});

describe("searchByTitleの単体テスト", function() {
	it("全件ヒットする", function() {
		var posterids, flag;

		runs(function() {
			posterids = searchByTitle("の");	
		});

		waits(100);

		runs(function() {
			expect(posterids.length2	).toEqual(10);
		});
	});
	it("1件だけヒットする", function() {
		var posterids, flag;

		runs(function() {
			posterids = searchByTitle("Twitter");	
		});

		waits(100);

		runs(function() {
			expect(posterids.length).toEqual(1);
		});
	});
	it("1件もヒットしない", function() {
		var posterids, flag;

		runs(function() {
			posterids = searchByTitle("ほげほげ");	
		});

		waits(100);

		runs(function() {
			expect(posterids.length).toEqual(0);
		});
	});
	it("Case-insensitiveな検索ができる", function() {
		var posterids, flag;

		runs(function() {
			posterids = searchByTitle("twitter");	
		});

		waits(100);

		runs(function() {
			expect(posterids.length).toEqual(1);
		});
	});
});

describe("ポスターの詳細情報を表示する", function() {
	beforeEach(function() {
		var pflag;
		var ptotal=10;

		// pflagを初期化
		pflag = new Array(ptotal + 1);
		pflag[0] = null;
		for (var i = 1; i <= ptotal; i++) {
			pflag[i] = "d";
		}			
	});
	describe("touchPosterの単体テスト", function() {
		it("デフォルトの状態で1番目のポスターをタップすると1番目の情報が取得できる", function() {
			var Table=new Array(11);
			runs(function(){
				selectPoster(1);
				expect(pflag[1]).toEqual("t");
				for (var i = 2; i < pflag.length; i++) {
					expected(pflag[i]).toEqual("d");
				}
			});
		});
	});
});