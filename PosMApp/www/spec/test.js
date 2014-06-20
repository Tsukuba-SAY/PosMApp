describe("ポスターの詳細情報を表示する", function() {
	beforeEach(function() {
		var pflag;
		var ptotal=10;
		var db = openDatabase("PosMAppDB", "", "PosMAppDB", 1000);

		init();
		}			
	});
	describe("touchPosterの単体テスト", function() {
		it("デフォルトの状態で1番目のポスターをタップすると1番目の情報が取得できる", function() {
			var Table=new Array(11);
			runs(function(){
				pflag[1]=selectPoster(1);
				expect(pflag[1]).toEqual("t");
				for (var i = 2; i < pflag.length; i++) {
					expected(pflag[i]).toEqual("d");
				}
			});
		});
	});
});