/**
 * データベースを初期化するためのするためのメソッド。
 * 初期化のため、各テーブルを一度DELETEした後、生成する。
 * テーブル生成後、posterdata.js内にあるjsonオブジェクトからそれぞれ挿入する。
 * @module initDB
 **/
function initDB() {
	var db = openDatabase("PosMAppDB", "", "PosMAppDB", 1000);

	db.transaction(
		function(tr) {
			// テーブルを作成する
			tr.executeSql("DROP TABLE IF EXISTS poster");
			tr.executeSql("DROP TABLE IF EXISTS author");
			tr.executeSql("DROP TABLE IF EXISTS keyword");
			tr.executeSql("CREATE TABLE IF NOT EXISTS poster ( id INTEGER NOT NULL UNIQUE PRIMARY KEY, sessionid TEXT, title TEXT, abstract TEXT, authorname TEXT, authorbelongs TEXT, bookmark INTEGER )");
			tr.executeSql("CREATE TABLE IF NOT EXISTS author ( id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT, posterid INTEGER NOT NULL, name TEXT, belongs TEXT, first INTEGER, FOREIGN KEY (posterid) REFERENCES poster (id) )");
			tr.executeSql("CREATE TABLE IF NOT EXISTS keyword ( id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT, posterid INTEGER NOT NULL, keyword TEXT, FOREIGN KEY (posterid) REFERENCES poster (id) )");
			
			// 仮データを挿入する (poster)
			tr.executeSql("DELETE FROM poster"); //ポスター列の初期化
			// posterdata.js 内のJSON(posterdata)からDBへ挿入
			poster.forEach(function (p) {
				tr.executeSql("INSERT INTO poster VALUES (?, ?, ?, ?, ?, ?, ?)", [
					p[i].id,
					p[i].sessionid,
					p[i].title,
					p[i].abstract,
					p[i].authorname,
					p[i].authorbelongs,
					p[i].bookmark]);
			});

			// 仮データを挿入する (author)
			tr.executeSql("DELETE FROM author"); //author列の初期化
			author.forEach(function(a) {
				tr.executeSql("INSERT INTO author VALUES (NULL, ?, ?, ?, ?)", [
					a[i].posterid,
					a[i].name,
					a[i].belongs,
					a[i].first]);
			});

			// 仮データを挿入する (keyword)
			tr.executeSql("DELETE FROM keyword");
			keyword.forEach(function(k) {
				tr.executeSql("INSERT INTO keyword VALUES (NULL, ?, ?)", [
					k[i].posterid,
					k[i].keyword]);
			});
		},
		function(err){},
		function(){}
	);
}



// 以下は旧バージョン (release 1)
// DBを初期化する
/*
function initDB() {
	db.transaction(
		function(tr) {
			// テーブルを作成する
			tr.executeSql("DROP TABLE IF EXISTS poster");
			tr.executeSql("DROP TABLE IF EXISTS author");
			tr.executeSql("DROP TABLE IF EXISTS keyword");
			tr.executeSql("CREATE TABLE IF NOT EXISTS poster ( id INTEGER NOT NULL UNIQUE PRIMARY KEY, sessionid TEXT, title TEXT, abstract TEXT, authorname TEXT, authorbelongs TEXT )");
			tr.executeSql("CREATE TABLE IF NOT EXISTS author ( id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT, posterid INTEGER NOT NULL, name TEXT, belongs TEXT, first INTEGER, FOREIGN KEY (posterid) REFERENCES poster (id) )");
			tr.executeSql("CREATE TABLE IF NOT EXISTS keyword ( id INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT, posterid INTEGER NOT NULL, keyword TEXT, FOREIGN KEY (posterid) REFERENCES poster (id) )");
			
			// 仮データを挿入する (poster)
			tr.executeSql("DELETE FROM poster"); //ポスター列の初期化
			tr.executeSql("INSERT INTO poster VALUES ( ?, ?, ?, ?, ?, ? )", [1, "A1-1", "YAGOを用いた拡張固有表現抽出における新出語のクラス推定精度の検証", "概要１", "真嶋 温佳", "大阪大学"]);
			tr.executeSql("INSERT INTO poster VALUES ( ?, ?, ?, ?, ?, ? )", [2, "A1-4", "XML部分文書検索技術の Web 文書への適用", "概要２", "欅 惇志", "奈良先端科学技術大学院大学"]);
			tr.executeSql("INSERT INTO poster VALUES ( ?, ?, ?, ?, ?, ? )", [3, "B1-1", " 配信型授業のコミュニケーションを支援するコメント共有手法の提案", "概要３", "川上 未来", "筑波大学"]);
			tr.executeSql("INSERT INTO poster VALUES ( ?, ?, ?, ?, ?, ? )", [4, "B1-3", "円滑な人脈形成のためのSNS投稿に着目した仲介者探索手法", "概要４", "小松 恭子", "KDDI研究所"]);
			tr.executeSql("INSERT INTO poster VALUES ( ?, ?, ?, ?, ?, ? )", [5, "C1-3", "三事象間の因果関係分析のための因果関係ネットワーク構築の一手法", "概要５", "津川 敦朗", "岡山大学"]);
			tr.executeSql("INSERT INTO poster VALUES ( ?, ?, ?, ?, ?, ? )", [6, "C1-4", "テキストデータにおける予定変更情報の獲得および未来に起こり得る派生事象の予測", "概要６", "栗原 俊明", "東京大学"]);
			tr.executeSql("INSERT INTO poster VALUES ( ?, ?, ?, ?, ?, ? )", [7, "D1-1", "Hadoop Cassandra とCassandraを用いた並列分散処理機構の性能比較", "概要7", "菱沼 直子", "お茶の水女子大学"]);
			tr.executeSql("INSERT INTO poster VALUES ( ?, ?, ?, ?, ?, ? )", [8, "D1-2", "分散NMFにおけるAdaptive差分更新手法の適用", "概要８", "牧野 浩之", "NTT"]);
			tr.executeSql("INSERT INTO poster VALUES ( ?, ?, ?, ?, ?, ? )", [9, "E1-5", "Twitterタイムラインの話題の可視化の一手法", "概要９", "松尾 哉太", "岡山大学"]);
			tr.executeSql("INSERT INTO poster VALUES ( ?, ?, ?, ?, ?, ? )", [10, "E1-6", "スポーツ競技戦略決定支援のための移動軌跡のマイニングと可視化システム", "概要１０", "谷 俊廣", "立命館大学"]);

			// 仮データを挿入する (author)
			tr.executeSql("DELETE FROM author"); //author列の初期化
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [1, "真嶋 温佳", "大阪大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [1, "白川 真澄", "大阪大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [1, "原 隆浩", "大阪大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [1, "西尾 章治郎", "大阪大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [2, "欅 惇志", "奈良先端科学技術大学院大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [2, "宮崎 純", "東京工業大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [2, "波多野 賢治", "同志社大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [2, "山本 豪志朗", "奈良先端科学技術大学院大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [2, "武富 貴史", "奈良先端科学技術大学院大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [2, "加藤 博一", "奈良先端科学技術大学院大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [3, "川上 未来", "筑波大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [3, "佐藤 哲司", "筑波大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [4, "小松 恭子", "KDDI研究所", 1]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [4, "中澤 昌美", "KDDI研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [4, "池田 和史", "KDDI研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [4, "服部 元", "KDDI研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [4, "滝嶋 康弘", "KDDI研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [5, "津川 敦朗", "岡山大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [5, "新妻 弘崇", "岡山大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [5, "太田 学", "岡山大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [6, "栗原 俊明", "東京大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [6, "豊田 正史", "東京大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [6, "喜連川 優", "東京大学／国立情報学研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [7, "菱沼 直子", "お茶の水女子大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [7, "竹房 あつ子", "産業技術総合研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [7, "中田 秀基", "産業技術総合研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [7, "小口 正人", "お茶の水女子大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [8, "牧野 浩之", "NTT", 1]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [8, "鬼塚 真", "NTT", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [9, "松尾 哉太", "岡山大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [9, "新妻 弘崇", "岡山大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [9, "太田 学", "岡山大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [10, "谷 俊廣", "立命館大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [10, "黄 宏軒", "立命館大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( NULL, ?, ?, ?, ? )", [10, "川越 恭二", "立命館大学", 0]);



			// 仮データを挿入する (keyword)
			tr.executeSql("DELETE FROM keyword");
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [1, "Wikipedia"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [1, "XML"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [2, "Wikipedia"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [2, "XML"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [3, "SNS"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [4, "SNS"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [5, "Web情報抽出"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [6, "Web情報抽出"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [7, "MapReduce"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [7, "分散処理"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [8, "MapReduce"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [8, "分散処理"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [9, "情報可視化"]);
			tr.executeSql("INSERT INTO keyword VALUES ( NULL, ?, ? )", [10, "情報可視化"]);

		},
		function(err){},
		//c
		function(){}
	);
}
*/