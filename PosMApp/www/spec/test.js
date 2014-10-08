describe("変数の確認", function() {
	it("posterdata.jsでposterが宣言されている", function() {
		
		expect(poster.length).toEqual(14);
	});
});

describe("ポスターの詳細情報を表示する", function() {
	beforeEach(function() {
		var pflag;
		var ptotal=poster.length;
		test = true;
	});

	it("デフォルトの状態で1番目のポスターをタップすると1番目の情報が取得できる", function() {
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
			expect(sessionStorage.getItem("posterid")).toEqual(poster[0].id);
			expect(sessionStorage.getItem("sessionid")).toEqual(poster[0].sessionid);
			expect(sessionStorage.getItem("title")).toEqual(poster[0].title);
			expect(sessionStorage.getItem("abstract")).toEqual(poster[0].abstract);
			expect(sessionStorage.getItem("authorname")).toEqual(poster[0].authorname);
			expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[0].authorbelongs);
			expect(sessionStorage.getItem("authors")).toEqual(poster[0].authors);
			expect(sessionStorage.getItem("keywords")).toEqual(poster[0].keywords);
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
			expect(sessionStorage.getItem("posterid")).toEqual(poster[1].id);
			expect(sessionStorage.getItem("sessionid")).toEqual(poster[1].sessionid);
			expect(sessionStorage.getItem("title")).toEqual(poster[1].title);
			expect(sessionStorage.getItem("abstract")).toEqual(poster[1].abstract);
			expect(sessionStorage.getItem("authorname")).toEqual(poster[1].authorname);
			expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[1].authorbelongs);
			expect(sessionStorage.getItem("authors")).toEqual(poster[1].authors);
			expect(sessionStorage.getItem("keywords")).toEqual(poster[1].keywords);
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
			expect(sessionStorage.getItem("posterid")).toEqual(poster[1].id);
			expect(sessionStorage.getItem("sessionid")).toEqual(poster[1].sessionid);
			expect(sessionStorage.getItem("title")).toEqual(poster[1].title);
			expect(sessionStorage.getItem("abstract")).toEqual(poster[1].abstract);
			expect(sessionStorage.getItem("authorname")).toEqual(poster[1].authorname);
			expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[1].authorbelongs);
			expect(sessionStorage.getItem("authors")).toEqual(poster[1].authors);
			expect(sessionStorage.getItem("keywords")).toEqual(poster[1].keywords);
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
			expect(sessionStorage.getItem("posterid")).toEqual(poster[1].id);
			expect(sessionStorage.getItem("sessionid")).toEqual(poster[1].sessionid);
			expect(sessionStorage.getItem("title")).toEqual(poster[1].title);
			expect(sessionStorage.getItem("abstract")).toEqual(poster[1].abstract);
			expect(sessionStorage.getItem("authorname")).toEqual(poster[1].authorname);
			expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[1].authorbelongs);
			expect(sessionStorage.getItem("authors")).toEqual(poster[1].authors);
			expect(sessionStorage.getItem("keywords")).toEqual(poster[1].keywords);
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
			expect(sessionStorage.getItem("posterid")).toEqual(poster[0].id);
			expect(sessionStorage.getItem("sessionid")).toEqual(poster[0].sessionid);
			expect(sessionStorage.getItem("title")).toEqual(poster[0].title);
			expect(sessionStorage.getItem("abstract")).toEqual(poster[0].abstract);
			expect(sessionStorage.getItem("authorname")).toEqual(poster[0].authorname);
			expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[0].authorbelongs);
			expect(sessionStorage.getItem("authors")).toEqual(poster[0].authors);
			expect(sessionStorage.getItem("keywords")).toEqual(poster[0].keywords);

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
			expect(sessionStorage.getItem("posterid")).toEqual(poster[1].id);
			expect(sessionStorage.getItem("sessionid")).toEqual(poster[1].sessionid);
			expect(sessionStorage.getItem("title")).toEqual(poster[1].title);
			expect(sessionStorage.getItem("abstract")).toEqual(poster[1].abstract);
			expect(sessionStorage.getItem("authorname")).toEqual(poster[1].authorname);
			expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[1].authorbelongs);
			expect(sessionStorage.getItem("authors")).toEqual(poster[1].authors);
			expect(sessionStorage.getItem("keywords")).toEqual(poster[1].keywords);

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
			expect(sessionStorage.getItem("posterid")).toEqual(poster[2].id);
			expect(sessionStorage.getItem("sessionid")).toEqual(poster[2].sessionid);
			expect(sessionStorage.getItem("title")).toEqual(poster[2].title);
			expect(sessionStorage.getItem("abstract")).toEqual(poster[2].abstract);
			expect(sessionStorage.getItem("authorname")).toEqual(poster[2].authorname);
			expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[2].authorbelongs);
			expect(sessionStorage.getItem("authors")).toEqual(poster[2].authors);
			expect(sessionStorage.getItem("keywords")).toEqual(poster[2].keywords);
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
			expect(sessionStorage.getItem("posterid")).toEqual(poster[6].id);
			expect(sessionStorage.getItem("sessionid")).toEqual(poster[6].sessionid);
			expect(sessionStorage.getItem("title")).toEqual(poster[6].title);
			expect(sessionStorage.getItem("abstract")).toEqual(poster[6].abstract);
			expect(sessionStorage.getItem("authorname")).toEqual(poster[6].authorname);
			expect(sessionStorage.getItem("authorbelongs")).toEqual(poster[6].authorbelongs);
			expect(sessionStorage.getItem("authors")).toEqual(poster[6].authors);
			expect(sessionStorage.getItem("keywords")).toEqual(poster[6].keywords);
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
	beforeEach(function() {
		console.log("beforeEach");
		init();
	});

	it("「システム」で検索すると1,6,10,11,12,13番のポスターがヒットする", function() {

		var expectFlag = new Array(ptotal+1);

		runs(function() {
			expectFlag[0] = null;
			expectFlag[1] = "s";
			expectFlag[6] = "s";
			expectFlag[10] = "s";
			expectFlag[11] = "s";
			expectFlag[12] = "s";
			expectFlag[13] = "s";
			
		});

		runs(function() {
			searchByTitle("システム");
		});

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