// ポスターデータのJSONを置いておく（仮）

var poster =

[{"id":1,"sessionid":"A1-1","title":"YAGOを用いた拡張固有表現抽出における新出語のクラス推定精度の検証","abstract":"概要１","authorname":"真嶋 温佳","authorbelongs":"大阪大学"},
{"id":2,"sessionid":"A1-4","title":"XML部分文書検索技術の Web 文書への適用","abstract":"概要２","authorname":"欅 惇志","authorbelongs":"奈良先端科学技術大学院大学"},
{"id":3,"sessionid":"B1-1","title":"配信型授業のコミュニケーションを支援するコメント共有手法の提案","abstract":"概要３","authorname":"川上 未来","authorbelongs":"筑波大学"},
{"id":4,"sessionid":"B1-3","title":"円滑な人脈形成のためのSNS投稿に着目した仲介者探索手法","abstract":"概要４","authorname":"小松 恭子","authorbelongs":"KDDI研究所"},
{"id":5,"sessionid":"C1-3","title":"三事象間の因果関係分析のための因果関係ネットワーク構築の一手法","abstract":"概要５","authorname":"津川 敦朗","authorbelongs":"岡山大学"},
{"id":6,"sessionid":"C1-4","title":"テキストデータにおける予定変更情報の獲得および未来に起こり得る派生事象の予測","abstract":"概要６","authorname":"栗原 俊明","authorbelongs":"東京大学"},
{"id":7,"sessionid":"D1-1","title":"Hadoop Cassandra とCassandraを用いた並列分散処理機構の性能比較","abstract":"概要７","authorname":"菱沼 直子","authorbelongs":"お茶の水女子大学"},
{"id":8,"sessionid":"D1-2","title":"分散NMFにおけるAdaptive差分更新手法の適用","abstract":"概要８","authorname":"牧野 浩之","authorbelongs":"NTT"},
{"id":9,"sessionid":"E1-5","title":"Twitterタイムラインの話題の可視化の一手法","abstract":"概要９","authorname":"松尾 哉太","authorbelongs":"岡山大学"},
{"id":10,"sessionid":"E1-6","title":"スポーツ競技戦略決定支援のための移動軌跡のマイニングと可視化システム","abstract":"概要１０","authorname":"谷 俊廣","authorbelongs":"立命館大学"}]

;

var author =

[{"posterid":1,"name":"真嶋 温佳","belongs":"大阪大学","first":1},
{"posterid":1,"name":"白川 真澄","belongs":"大阪大学","first":0},
{"posterid":1,"name":"原 隆浩","belongs":"大阪大学","first":0},
{"posterid":1,"name":"西尾 章治郎","belongs":"大阪大学","first":0},
{"posterid":2,"name":"欅 惇志","belongs":"奈良先端科学技術大学院大学","first":1},
{"posterid":2,"name":"宮崎 純","belongs":"東京工業大学","first":0},
{"posterid":2,"name":"波多野 賢治","belongs":"同志社大学","first":0},
{"posterid":2,"name":"山本 豪志朗","belongs":"奈良先端科学技術大学院大学","first":0},
{"posterid":2,"name":"武富 貴史","belongs":"奈良先端科学技術大学院大学","first":0},
{"posterid":2,"name":"加藤 博一","belongs":"奈良先端科学技術大学院大学","first":0},
{"posterid":3,"name":"川上 未来","belongs":"筑波大学","first":1},
{"posterid":3,"name":"佐藤 哲司","belongs":"筑波大学","first":0},
{"posterid":4,"name":"小松 恭子","belongs":"KDDI研究所","first":1},
{"posterid":4,"name":"中澤 昌美","belongs":"KDDI研究所","first":0},
{"posterid":4,"name":"池田 和史","belongs":"KDDI研究所","first":0},
{"posterid":4,"name":"服部 元","belongs":"KDDI研究所","first":0},
{"posterid":4,"name":"滝嶋 康弘","belongs":"KDDI研究所","first":0},
{"posterid":5,"name":"津川 敦朗","belongs":"岡山大学","first":1},
{"posterid":5,"name":"新妻 弘崇","belongs":"岡山大学","first":0},
{"posterid":5,"name":"太田 学","belongs":"岡山大学","first":0},
{"posterid":6,"name":"栗原 俊明","belongs":"東京大学","first":1},
{"posterid":6,"name":"豊田 正史","belongs":"東京大学","first":0},
{"posterid":6,"name":"喜連川 優","belongs":"東京大学／国立情報学研究所","first":0},
{"posterid":7,"name":"菱沼 直子","belongs":"お茶の水女子大学","first":1},
{"posterid":7,"name":"竹房 あつ子","belongs":"産業技術総合研究所","first":0},
{"posterid":7,"name":"中田 秀基","belongs":"産業技術総合研究所","first":0},
{"posterid":7,"name":"小口 正人","belongs":"お茶の水女子大学","first":0},
{"posterid":8,"name":"牧野 浩之","belongs":"NTT","first":1},
{"posterid":8,"name":"鬼塚 真","belongs":"NTT","first":0},
{"posterid":9,"name":"松尾 哉太","belongs":"岡山大学","first":1},
{"posterid":9,"name":"新妻 弘崇","belongs":"岡山大学","first":0},
{"posterid":9,"name":"太田 学","belongs":"岡山大学","first":0},
{"posterid":10,"name":"谷 俊廣","belongs":"立命館大学","first":1},
{"posterid":10,"name":"黄 宏軒","belongs":"立命館大学","first":0},
{"posterid":10,"name":"川越 恭二","belongs":"立命館大学","first":0}]

;

var keyword =

[{"posterid":1,"keyword":"Wikipedia"},
{"posterid":1,"keyword":"XML"},
{"posterid":2,"keyword":"Wikipedia"},
{"posterid":2,"keyword":"XML"},
{"posterid":3,"keyword":"SNS"},
{"posterid":4,"keyword":"SNS"},
{"posterid":5,"keyword":"Web情報抽出"},
{"posterid":6,"keyword":"Web情報抽出"},
{"posterid":7,"keyword":"MapReduce"},
{"posterid":7,"keyword":"分散処理"},
{"posterid":8,"keyword":"MapReduce"},
{"posterid":8,"keyword":"分散処理"},
{"posterid":9,"keyword":"情報可視化"},
{"posterid":10,"keyword":"情報可視化"}]

;