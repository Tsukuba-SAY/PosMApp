describe("変数の確認", function() {
	it("posterdata.jsでposterが宣言されている", function() {
		
		expect(poster.length).toEqual(14);
	});
});

describe("ポスターの詳細情報を表示する", function() {
	initDB();
	beforeEach(function() {
		init();	
		test = true;
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

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		runs(function() {
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


		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		runs(function() {
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

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

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

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag;

			expect(function() {
				var nextFlag = touchPoster(posterid);
				 
			}).toThrow();
		});

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

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag;

			expect(function() {
				var nextFlag = touchPoster(posterid);
				 
			}).toThrow();
		});

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

		runs(function() {
			var nextFlag = touchPoster(2);
			pflag[2] = nextFlag;
		});

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag;

			expect(function() {
				var nextFlag = touchPoster(posterid);
				 
			}).toThrow();
		});

		runs(function() {
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

		runs(function() {
			var nextFlag = touchPoster(2);
			pflag[2] = nextFlag;
		});

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag;

			expect(function() {
				var nextFlag = touchPoster(posterid);
				 
			}).toThrow();
		});

		runs(function() {
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

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		runs(function() {
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

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		runs(function() {
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

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		runs(function() {
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

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

		runs(function() {
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

		runs(function() {
			expect(pflag).toEqual(beforeFlag);
			var nextFlag = touchPoster(posterid);
			pflag[posterid] = nextFlag;
		});

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

describe("タイトルでキーワード検索をする", function() {
	initDB();
	beforeEach(function() {
		init();
	});

	it("「システム」で検索すると1,6,10,11,12,13番のポスターがヒットする", function() {

		var expectFlag = new Array(ptotal+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= ptotal; i++) {
				if (i == 1 ||i == 6 || i == 10 || i == 11 || i == 12 || i == 13) {
					expectFlag[i] = "s";
				} else {
					expectFlag[i] = "d";
				}
			}
			
		});

		runs(function() {
			searchByTitle("システム");
		});

		waits(100);
		
		runs(function() {
			expect(pflag).toEqual(expectFlag);
		});
	});

	it("「ポスター」で検索すると10番のポスターがヒットする", function() {
		var expectFlag = new Array(ptotal+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= ptotal; i++) {
				expectFlag[i] = "d";
			}
			expectFlag[10] = "s";
		});

		runs(function() {
			searchByTitle("ポスター");
		});

		waits(100);
		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("「スター」で検索すると10番のポスターがヒットする", function() {
		var expectFlag = new Array(ptotal+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= ptotal; i++) {
				expectFlag[i] = "d";
			}
			expectFlag[10] = "s";
		});

		runs(function() {
			searchByTitle("スター");
		});

		waits(100);
		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("「Twitter」で検索すると3番のポスターがヒットする", function() {
		var expectFlag = new Array(ptotal+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= ptotal; i++) {
				expectFlag[i] = "d";
			}
			expectFlag[3] = "s";
		});

		runs(function() {
			searchByTitle("Twitter");
		});

		waits(100);
		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("「twitter」で検索すると3番のポスターがヒットする", function() {
		var expectFlag = new Array(ptotal+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= ptotal; i++) {
				expectFlag[i] = "d";
			}
			expectFlag[3] = "s";
		});

		runs(function() {
			searchByTitle("twitter");
		});

		waits(100);
		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("「$」で検索すると何もヒットしない", function() {
		var expectFlag = new Array(ptotal+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= ptotal; i++) {
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
		var expectFlag = new Array(ptotal+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= ptotal; i++) {
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
		var expectFlag = new Array(ptotal+1);

		runs(function() {
			expectFlag[0] = null;
			for (var i = 1; i <= ptotal; i++) {
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

	it("1番を選択した状態で「ポスター」で検索すると10番がヒットする", function() {
		var expectFlag = new Array(ptotal+1);

		runs(function() {
			pflag[1] = "t";

			expectFlag[0] = null;
			for (var i = 1; i <= ptotal; i++) {
				expectFlag[i] = "d";
			}
			expectFlag[1] = "t";
			expectFlag[10] = "s";
		});

		runs(function() {
			searchByTitle("ポスター");
		});

		waits(100);
		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("10番を選択した状態で「ポスター」で検索すると10番がヒットする", function() {
		var expectFlag = new Array(ptotal+1);

		runs(function() {
			pflag[10] = "t";

			expectFlag[0] = null;
			for (var i = 1; i <= ptotal; i++) {
				expectFlag[i] = "d";
			}
			expectFlag[10] = "e";
		});

		runs(function() {
			searchByTitle("ポスター");
		});

		waits(100);
		runs(function() {
			expect(pflag).toEqual(expectFlag);
		})
	});

	it("何も選択してない状態で、1024文字を入れて検索すると例外が発生し、ポスターの状況は変化しない", function() {
		var expectFlag = new Array(ptotal+1);

		runs(function() {
			var str = "";
			for (var i = 0; i < 1024; i++) {
				str += "a";
			}

			expectFlag[0] = null;
			for (var i = 1; i <= ptotal; i++) {
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

describe("テスト用のファンクションのテスト", function() {
	it("getAuthors,getKeywordsファンクションのテスト", function() {
		expect(getAuthors(1)).toEqual("浦井 智之,小池 泰輔,小宮山 哲俊,原 清貴");
		expect(getKeywords(1)).toEqual("スタンダードコース");
	});
});

describe("ラベルの表示切り替え機能", function() {
	beforeEach(function() {
		init();	
		test = true;
	});
	it("「ID」ボタンを押すとラベルがIDに切り替わる", function() {
		var labels = changeLabel("id");
		var testlabel = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14"];
		expect(labels).toEqual(testlabel);

	});
	it("「セッションID」ボタンを押すとラベルがセッションIDに切り替わる", function() {
		var labels = changeLabel("sessionid");
		var testlabel = ["S01","S02","S03","S04","S05","S06","S07","S08","S09","SIT01","SIT02","SIT03","SIT04","SIT05"];

	});
	it("「タイトル」ボタンを押すとラベルがタイトルに切り替わる", function() {
		var labels = changeLabel("title");
		var testlabel = ["防災・避難...","画像リプラ...","ハッシュタ...","ワインマッ...","コロコロジ...","中古教科書...","地図を用い...","予定や天候...","iBeac...","600人規...","テニススク...","施設内での...","スマートフ...","小規模グル..."];
	});
	it("「チーム名」ボタンを押すとラベルがチーム名に切り替わる", function() {
		var labels = changeLabel("authorname");
		var testlabel = ["OU-LA...","_:(*'...","チームNo...","Primt...","コロジャー","りばて","ef","おちゃねこ","Rabbi...","S.A.Y...","TOMs","TKS","SAG-A...","BooK-..."];

	});
	it("「大学名」ボタンを押すとラベルが大学名に切り替わる", function() {
		var labels = changeLabel("authorbelongs");
		var testlabel = ["千葉大学","筑波大学","筑波大学","筑波大学","筑波大学,...","東京理科大...","愛媛大学","お茶の水女...","茨城大学","筑波大学","筑波大学","筑波大学","筑波大学","筑波大学"];

	});
});

describe("ブックマーク機能", function() {
	beforeEach(function() {
		init();	
		test = true;
	});
	it("何もブックマークされていない状態で、1番の星をタップすると、1番のポスターがブックマークされる", function() {
		
	});
	it("何もブックマークされていない状態で、すべての星をタップすると、すべてのポスターがブックマークされる", function() {

	});
	it("1番のポスターがブックマークされている状態で、1番の星をタップすると、何もブックされていない状態になる", function() {

	});
	it("1番のポスターがブックマークされている状態で、2番の星をタップすると、1,2番のポスターがブックマークされた状態になる", function() {

	});
	it("0番の星をタップすると、例外が発生する", function() {

	});
	it("ポスター数+1番の星をタップすると、例外が発生する", function() {

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