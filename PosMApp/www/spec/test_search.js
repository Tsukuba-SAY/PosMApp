describe("検索機能（searchByTitle）の単体テスト", function() {
	beforeEach(function() {
		console.log("beforeEach");
		init();
	});

	it("「の」で検索すると全件ヒットする", function() {

		var expectFlag = new Array(10+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= 10; i++) {
				expectFlag[i] = "s";
			}
		});

		runs(function() {
			searchByTitle("の");
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
		});
	});

	it("「Hadoop」で検索すると7番のポスターがヒットする", function() {
		var expectFlag = new Array(10+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= 10; i++) {
				expectFlag[i] = "d";
			}
			expectFlag[7] = "s";
		});

		runs(function() {
			searchByTitle("Hadoop");
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("「ado」で検索すると7番のポスターがヒットする", function() {
		var expectFlag = new Array(10+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= 10; i++) {
				expectFlag[i] = "d";
			}
			expectFlag[7] = "s";
		});

		runs(function() {
			searchByTitle("ado");
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("「hadoop」で検索すると7番のポスターがヒットする", function() {
		var expectFlag = new Array(10+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= 10; i++) {
				expectFlag[i] = "d";
			}
			expectFlag[7] = "s";
		});

		runs(function() {
			searchByTitle("hadoop");
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("「$」で検索すると何もヒットしない", function() {
		var expectFlag = new Array(10+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= 10; i++) {
				expectFlag[i] = "d";
			}
		});

		runs(function() {
			searchByTitle("$");
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("半角スペースで検索すると何もヒットしない", function() {
		var expectFlag = new Array(10+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= 10; i++) {
				expectFlag[i] = "d";
			}
		});

		runs(function() {
			searchByTitle("$");
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});
});