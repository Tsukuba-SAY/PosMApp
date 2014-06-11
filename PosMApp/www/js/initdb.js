// LocalDBを開く
var db = openDatabase("PosMAppDB", "", "PosMAppDB", 1000);

// DBを初期化する
function initDB() {
	db.transaction(
		function(tr) {
			// テーブルを作成する
			tr.executeSql("DROP TABLE IF EXISTS poster");
			tr.executeSql("DROP TABLE IF EXISTS author");
			tr.executeSql("DROP TABLE IF EXISTS keyword");
			tr.executeSql("CREATE TABLE IF NOT EXISTS poster ( id, sessionid, title, abstract, authorname, authorbelongs )");
			tr.executeSql("CREATE TABLE IF NOT EXISTS author ( id, posterid, name, belongs, first )");
			tr.executeSql("CREATE TABLE IF NOT EXISTS keyword ( id, posterid, keyword )");

			// テーブルを作成に関して制約を含めてちゃんと書いたやつですが、うまく動作しない(furuya)
			/*tr.executeSql("CREATE TABLE IF NOT EXISTS poster ( id INTEGER NOT NULL PRIMARY KEY UNSIGNED AUTO_INCREMENT, sessionid TEXT, title TEXT, abstract TEXT, authorname TEXT, authorbelongs TEXT )");
			tr.executeSql("CREATE TABLE IF NOT EXISTS author ( id INTEGER NOT NULL PRIMARY KEY UNSIGNED AUTO_INCREMENT, posterid INTEGER, name TEXT, belongs TEXT, first INTEGER, FOREIGN KEY (posterid) REFERENCES poster (id) )");
			tr.executeSql("CREATE TABLE IF NOT EXISTS keyword ( id INTEGER NOT NULL PRIMARY KEY UNSIGNED AUTO_INCREMENT, posterid INTEGER, keyword TEXT, FOREIGN KEY (posterid) REFERENCES poster (id) )");*/ 
			
			// 仮データを挿入する (poster)
			tr.executeSql("DELETE FROM poster");
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
			tr.executeSql("DELETE FROM author");
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [1, 1, "真嶋 温佳", "大阪大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [2, 1, "白川 真澄", "大阪大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [3, 1, "原 隆浩", "大阪大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [4, 1, "西尾 章治郎", "大阪大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [5, 2, "欅 惇志", "奈良先端科学技術大学院大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [6, 2, "宮崎 純", "東京工業大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [7, 2, "波多野 賢治", "同志社大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [8, 2, "山本 豪志朗", "奈良先端科学技術大学院大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [9, 2, "武富 貴史", "奈良先端科学技術大学院大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [10, 2, "加藤 博一", "奈良先端科学技術大学院大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [11, 3, "川上 未来", "筑波大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [12, 3, "佐藤 哲司", "筑波大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [13, 4, "小松 恭子", "KDDI研究所", 1]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [14, 4, "中澤 昌美", "KDDI研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [15, 4, "池田 和史", "KDDI研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [16, 4, "服部 元", "KDDI研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [17, 4, "滝嶋 康弘", "KDDI研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [18, 5, "津川 敦朗", "岡山大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [19, 5, "新妻 弘崇", "岡山大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [20, 5, "太田 学", "岡山大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [21, 6, "栗原 俊明", "東京大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [22, 6, "豊田 正史", "東京大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [23, 6, "喜連川 優", "東京大学／国立情報学研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [24, 7, "菱沼 直子", "お茶の水女子大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [25, 7, "竹房 あつ子", "産業技術総合研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [26, 7, "中田 秀基", "産業技術総合研究所", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [27, 7, "小口 正人", "お茶の水女子大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [28, 8, "牧野 浩之", "NTT", 1]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [29, 8, "鬼塚 真", "NTT", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [30, 9, "松尾 哉太", "岡山大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [31, 9, "新妻 弘崇", "岡山大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [32, 9, "太田 学", "岡山大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [33, 10, "谷 俊廣", "立命館大学", 1]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [34, 10, "黄 宏軒", "立命館大学", 0]);
			tr.executeSql("INSERT INTO author VALUES ( ?, ?, ?, ?, ? )", [35, 10, "川越 恭二", "立命館大学", 0]);



			// 仮データを挿入する (keyword)
			tr.executeSql("DELETE FROM keyword");
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [1, 1, "Wikipedia"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [2, 1, "XML"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [3, 2, "Wikipedia"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [4, 2, "XML"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [5, 3, "SNS"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [6, 4, "SNS"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [7, 5, "Web情報抽出"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [8, 6, "Web情報抽出"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [9, 7, "MapReduce"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [10, 7, "分散処理"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [11, 8, "MapReduce"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [12, 8, "分散処理"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [13, 9, "情報可視化"]);
			tr.executeSql("INSERT INTO keyword VALUES ( ?, ?, ? )", [14, 10, "情報可視化"]);

		},
		function(err){},
		function(){}
	);
}