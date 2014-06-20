describe("ポスターの詳細情報を表示する", function() {
	beforeEach(function() {
		var pflag;
		var ptotal=10;
		var db = openDatabase("PosMAppDB", "", "PosMAppDB", 1000);

		init();
	});
	it("デフォルトの状態で1番目のポスターをタップすると1番目の情報が取得できる", function() {
		var Table=new Array(11);
		var target=1;
		Table[0]=null;
		Table[target]="t";
		for (var i = 2; i < Table.length; i++) {
			Table[i]="d";
		};
		pflag[target]=touchPoster(target);
		expect(pflag).toEqual(Table);

		runs(function(){
			selectPoster(1);
		});
	});

});