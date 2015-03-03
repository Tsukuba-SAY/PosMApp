// 共通のデータを格納するグローバル変数
var poster 			= [],
	author 			= null,
	keyword 		= null,
	presen 			= null,
	presents 		= null,
	session 		= null,
	commentator 	= [],
	position_map 	= null,
	position 		= null,
	taparea 		= [],
	STATIC_WIDTH 	= null,
	STATIC_HEIGHT 	= null,
	MAP_AREA_WIDTH 	= null,
	MAP_AREA_HEIGHT = null,
	INIT_SCALE 		= null,
	SCALE_BY 		= null;

function initData() {
	// ポスターデータのJSONを置いておく（仮）

	// positionとのマッピング
	// i要素目がicon-position.jsにあるpositionのj要素目に対応させる
	// position_map = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117];

	if(localStorage.getItem("downloadSuccess")){
		poster 			= JSON.parse(localStorage.getItem("poster"));
		author 			= JSON.parse(localStorage.getItem("author"));
		keyword 		= JSON.parse(localStorage.getItem("keyword"));
		presen 			= JSON.parse(localStorage.getItem("presen"));
		presents 		= JSON.parse(localStorage.getItem("presents"));
		session 		= JSON.parse(localStorage.getItem("session"));
        commentator     = JSON.parse(localStorage.getItem("commentator"));
		position_map 	= JSON.parse(localStorage.getItem("position_map"));
		position 		= JSON.parse(localStorage.getItem("position"));
		taparea 		= JSON.parse(localStorage.getItem("taparea"));
		STATIC_WIDTH 	= parseInt(localStorage.getItem("STATIC_WIDTH"));
		STATIC_HEIGHT 	= parseInt(localStorage.getItem("STATIC_HEIGHT"));
	}

	// BlockFinderにかけた画像の幅
	STATIC_WIDTH =  720;
	STATIC_HEIGHT = 960;

	setMapSize();

// 	// DEIM2015 area_large.bmp
// 	taparea =
// 	[
// 	{"id":0,"x":497,"y":14,"width":134,"height":185,"direction":"longways","color":"rgb(255,40,0)"},
// 	{"id":1,"x":358,"y":15,"width":134,"height":185,"direction":"longways","color":"rgb(255,245,0)"},
// 	{"id":2,"x":43,"y":27,"width":124,"height":169,"direction":"longways","color":"rgb(53,161,107)"},
// 	{"id":3,"x":359,"y":203,"width":133,"height":185,"direction":"longways","color":"rgb(0,65,255)"},
// 	{"id":4,"x":498,"y":203,"width":133,"height":185,"direction":"longways","color":"rgb(102,204,255)"},
// 	{"id":5,"x":42,"y":206,"width":124,"height":168,"direction":"longways","color":"rgb(255,153,160)"},
// 	{"id":6,"x":42,"y":384,"width":124,"height":168,"direction":"longways","color":"rgb(255,153,0)"},
// 	{"id":7,"x":123,"y":562,"width":124,"height":168,"direction":"longways","color":"rgb(154,0,121)"},
// 	{"id":8,"x":223,"y":808,"width":97,"height":132,"direction":"longways","color":"rgb(102,51,0)"},
// 	{"id":9,"x":324,"y":808,"width":98,"height":132,"direction":"longways","color":"rgb(127,135,143)"}
// 	]
}

// ポスターマップの大きさに関するデータを計算して格納
function setMapSize() {
	// マップエリアの幅
	MAP_AREA_WIDTH = screen.width;
	// マップエリアの高さ（55がヘッダー、68がフッター分）
	MAP_AREA_HEIGHT = screen.height - 55 - 68 - 68;

	// マップのスケールを決定
	INIT_SCALE = MAP_AREA_WIDTH / STATIC_WIDTH;
	SCALE_BY = "width";
	if (STATIC_HEIGHT * INIT_SCALE > MAP_AREA_HEIGHT) {
	    INIT_SCALE = MAP_AREA_HEIGHT / STATIC_HEIGHT;
	    SCALE_BY = "height";
	}
}