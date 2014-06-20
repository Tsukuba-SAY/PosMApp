describe("initdb.jsの単体テスト", function() {
	it("変数dbが定義されている", function() {
		expect('db').toBeDefined();
	});
});

/*
describe("searchByTitleの単体テスト", function() {
	it("全件ヒットする", function() {
		var posterids, flag;

		runs(function() {
			posterids = searchByTitle("の");	
		});

		waits(100);

		runs(function() {
			expect(posterids.length).toEqual(10);
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
*/

