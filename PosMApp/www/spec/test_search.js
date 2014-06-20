describe("タイトルでキーワード検索をする", function() {
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
			searchByTitle(" ");
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("nullを入れると何もヒットしない", function() {
		var expectFlag = new Array(10+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= 10; i++) {
				expectFlag[i] = "d";
			}
		});

		runs(function() {
			searchByTitle(null);
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("1番を選択した状態で「hadoop」で検索すると7番がヒットする", function() {
		var expectFlag = new Array(10+1);

		runs(function() {
			pflag[1] = "t";

			expectFlag[0] = null;
			for (var i = 1; i <= 10; i++) {
				expectFlag[i] = "d";
			}
			expectFlag[1] = "t";
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

	it("7番を選択した状態で「hadoop」で検索すると7番がヒットする", function() {
		var expectFlag = new Array(10+1);

		runs(function() {
			pflag[7] = "t";

			expectFlag[0] = null;
			for (var i = 1; i <= 10; i++) {
				expectFlag[i] = "d";
			}
			expectFlag[7] = "e";
		});

		runs(function() {
			searchByTitle("hadoop");
		});

		waits(100);

		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("何も選択してない状態で、1024文字を入れて検索すると例外が発生し、ポスターの状況は変化しない", function() {
		var expectFlag = new Array(10+1);

		runs(function() {
			var str = "";
			for (var i = 0; i < 1024; i++) {
				str += "a";
			}

			expectFlag[0] = null;
			for (var i = 1; i <= 10; i++) {
				expectFlag[i] = "d";
			}
		});

		runs(function() {
			expect(function() {
				searchByTitle(str);
				wait(100);
			}).toThrow();
			expect(pflag).toEqual(expectFlag);
		})
	});
});