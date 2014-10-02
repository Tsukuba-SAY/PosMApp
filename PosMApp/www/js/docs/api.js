YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [],
    "modules": [
        "initDB"
    ],
    "allModules": [
        {
            "displayName": "initDB",
            "name": "initDB",
            "description": "データベースを初期化するためのするためのメソッド。\n初期化のため、各テーブルを一度DELETEした後、生成する。\nテーブル生成後、posterdata.js内にあるjsonオブジェクトからそれぞれ挿入する。"
        }
    ]
} };
});