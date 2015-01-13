// BlockFinderにかけた画像の幅
var STATIC_WIDTH =  720;
var STATIC_HEIGHT = 960;

// マップエリアの幅
var MAP_AREA_WIDTH = screen.width;
// マップエリアの高さ（55がヘッダー、68がフッター分）
var MAP_AREA_HEIGHT = screen.height - 55 - 68 - 68;

// マップのスケールを決定
var INIT_SCALE = MAP_AREA_WIDTH / STATIC_WIDTH;
var SCALE_BY = "width";
if (STATIC_HEIGHT * INIT_SCALE > MAP_AREA_HEIGHT) {
    INIT_SCALE = MAP_AREA_HEIGHT / STATIC_HEIGHT;
    SCALE_BY = "height";
}

// // タップエリアの相対座標
// var taparea = 
// [
// {"id":0,"x":355,"y":15,"width":281,"height":377,"direction":"longways","color":"rgb(255,40,0)"},
// {"id":1,"x":70,"y":24,"width":265,"height":356,"direction":"longways","color":"rgb(255,245,0)"},
// {"id":2,"x":70,"y":384,"width":265,"height":356,"direction":"longways","color":"rgb(53,161,107)"},
// {"id":3,"x":226,"y":745,"width":180,"height":207,"direction":"longways","color":"rgb(0,65,255)"}
// ];

// DEIM2015 area_large.bmp
var taparea =
[
{"id":0,"x":497,"y":14,"width":134,"height":185,"direction":"longways","color":"rgb(255,40,0)"},
{"id":1,"x":358,"y":15,"width":134,"height":185,"direction":"longways","color":"rgb(255,245,0)"},
{"id":2,"x":43,"y":27,"width":124,"height":169,"direction":"longways","color":"rgb(53,161,107)"},
{"id":3,"x":359,"y":203,"width":133,"height":185,"direction":"longways","color":"rgb(0,65,255)"},
{"id":4,"x":498,"y":203,"width":133,"height":185,"direction":"longways","color":"rgb(102,204,255)"},
{"id":5,"x":42,"y":206,"width":124,"height":168,"direction":"longways","color":"rgb(255,153,160)"},
{"id":6,"x":42,"y":384,"width":124,"height":168,"direction":"longways","color":"rgb(255,153,0)"},
{"id":7,"x":123,"y":562,"width":124,"height":168,"direction":"longways","color":"rgb(154,0,121)"},
{"id":8,"x":223,"y":808,"width":97,"height":132,"direction":"longways","color":"rgb(102,51,0)"},
{"id":9,"x":324,"y":808,"width":98,"height":132,"direction":"longways","color":"rgb(127,135,143)"}
];

// var position = [
// {"id":0,"x":417,"y":22,"width":16,"height":11,"direction":"sideways"},
// {"id":1,"x":434,"y":22,"width":17,"height":11,"direction":"sideways"},
// {"id":2,"x":453,"y":22,"width":16,"height":11,"direction":"sideways"},
// {"id":3,"x":470,"y":22,"width":16,"height":11,"direction":"sideways"},
// {"id":4,"x":503,"y":22,"width":16,"height":11,"direction":"sideways"},
// {"id":5,"x":520,"y":22,"width":17,"height":11,"direction":"sideways"},
// {"id":6,"x":539,"y":22,"width":17,"height":11,"direction":"sideways"},
// {"id":7,"x":557,"y":22,"width":16,"height":11,"direction":"sideways"},
// {"id":8,"x":575,"y":22,"width":16,"height":11,"direction":"sideways"},
// {"id":9,"x":592,"y":22,"width":17,"height":11,"direction":"sideways"},
// {"id":10,"x":613,"y":31,"width":11,"height":17,"direction":"longways"},
// {"id":11,"x":87,"y":33,"width":16,"height":11,"direction":"sideways"},
// {"id":12,"x":104,"y":33,"width":17,"height":11,"direction":"sideways"},
// {"id":13,"x":87,"y":45,"width":16,"height":11,"direction":"sideways"},
// {"id":14,"x":104,"y":45,"width":17,"height":11,"direction":"sideways"},
// {"id":15,"x":613,"y":49,"width":11,"height":16,"direction":"longways"},
// {"id":16,"x":613,"y":68,"width":11,"height":16,"direction":"longways"},
// {"id":17,"x":87,"y":76,"width":16,"height":11,"direction":"sideways"},
// {"id":18,"x":104,"y":76,"width":17,"height":11,"direction":"sideways"},
// {"id":19,"x":613,"y":85,"width":11,"height":16,"direction":"longways"},
// {"id":20,"x":87,"y":88,"width":16,"height":12,"direction":"sideways"},
// {"id":21,"x":104,"y":88,"width":17,"height":12,"direction":"sideways"},
// {"id":22,"x":613,"y":103,"width":11,"height":17,"direction":"longways"},
// {"id":23,"x":613,"y":121,"width":11,"height":16,"direction":"longways"},
// {"id":24,"x":87,"y":122,"width":16,"height":12,"direction":"sideways"},
// {"id":25,"x":104,"y":122,"width":17,"height":12,"direction":"sideways"},
// {"id":26,"x":87,"y":135,"width":16,"height":11,"direction":"sideways"},
// {"id":27,"x":104,"y":135,"width":17,"height":11,"direction":"sideways"},
// {"id":28,"x":613,"y":140,"width":11,"height":17,"direction":"longways"},
// {"id":29,"x":613,"y":158,"width":11,"height":16,"direction":"longways"},
// {"id":30,"x":87,"y":166,"width":16,"height":11,"direction":"sideways"},
// {"id":31,"x":104,"y":166,"width":17,"height":11,"direction":"sideways"},
// {"id":32,"x":87,"y":178,"width":16,"height":11,"direction":"sideways"},
// {"id":33,"x":104,"y":178,"width":17,"height":11,"direction":"sideways"},
// {"id":34,"x":614,"y":178,"width":11,"height":16,"direction":"longways"},
// {"id":35,"x":614,"y":206,"width":11,"height":17,"direction":"longways"},
// {"id":36,"x":87,"y":211,"width":16,"height":11,"direction":"sideways"},
// {"id":37,"x":104,"y":211,"width":16,"height":11,"direction":"sideways"},
// {"id":38,"x":87,"y":224,"width":16,"height":11,"direction":"sideways"},
// {"id":39,"x":104,"y":224,"width":16,"height":11,"direction":"sideways"},
// {"id":40,"x":613,"y":226,"width":11,"height":16,"direction":"longways"},
// {"id":41,"x":613,"y":243,"width":11,"height":16,"direction":"longways"},
// {"id":42,"x":87,"y":255,"width":16,"height":11,"direction":"sideways"},
// {"id":43,"x":104,"y":255,"width":16,"height":11,"direction":"sideways"},
// {"id":44,"x":613,"y":263,"width":11,"height":16,"direction":"longways"},
// {"id":45,"x":87,"y":267,"width":16,"height":11,"direction":"sideways"},
// {"id":46,"x":104,"y":267,"width":16,"height":11,"direction":"sideways"},
// {"id":47,"x":613,"y":280,"width":11,"height":16,"direction":"longways"},
// {"id":48,"x":613,"y":300,"width":11,"height":16,"direction":"longways"},
// {"id":49,"x":87,"y":301,"width":16,"height":11,"direction":"sideways"},
// {"id":50,"x":104,"y":301,"width":16,"height":11,"direction":"sideways"},
// {"id":51,"x":87,"y":313,"width":16,"height":12,"direction":"sideways"},
// {"id":52,"x":104,"y":313,"width":16,"height":12,"direction":"sideways"},
// {"id":53,"x":613,"y":317,"width":11,"height":17,"direction":"longways"},
// {"id":54,"x":613,"y":337,"width":11,"height":16,"direction":"longways"},
// {"id":55,"x":87,"y":345,"width":16,"height":11,"direction":"sideways"},
// {"id":56,"x":104,"y":345,"width":16,"height":11,"direction":"sideways"},
// {"id":57,"x":613,"y":354,"width":11,"height":16,"direction":"longways"},
// {"id":58,"x":87,"y":357,"width":16,"height":11,"direction":"sideways"},
// {"id":59,"x":104,"y":357,"width":16,"height":11,"direction":"sideways"},
// {"id":60,"x":417,"y":373,"width":17,"height":11,"direction":"sideways"},
// {"id":61,"x":435,"y":373,"width":16,"height":11,"direction":"sideways"},
// {"id":62,"x":454,"y":373,"width":16,"height":11,"direction":"sideways"},
// {"id":63,"x":471,"y":373,"width":17,"height":11,"direction":"sideways"},
// {"id":64,"x":501,"y":373,"width":17,"height":11,"direction":"sideways"},
// {"id":65,"x":519,"y":373,"width":16,"height":11,"direction":"sideways"},
// {"id":66,"x":538,"y":373,"width":17,"height":11,"direction":"sideways"},
// {"id":67,"x":556,"y":373,"width":16,"height":11,"direction":"sideways"},
// {"id":68,"x":574,"y":373,"width":17,"height":11,"direction":"sideways"},
// {"id":69,"x":592,"y":373,"width":16,"height":11,"direction":"sideways"},
// {"id":70,"x":86,"y":389,"width":17,"height":11,"direction":"sideways"},
// {"id":71,"x":104,"y":389,"width":16,"height":11,"direction":"sideways"},
// {"id":72,"x":86,"y":401,"width":17,"height":11,"direction":"sideways"},
// {"id":73,"x":104,"y":401,"width":16,"height":11,"direction":"sideways"},
// {"id":74,"x":86,"y":433,"width":17,"height":11,"direction":"sideways"},
// {"id":75,"x":104,"y":433,"width":16,"height":11,"direction":"sideways"},
// {"id":76,"x":86,"y":445,"width":17,"height":11,"direction":"sideways"},
// {"id":77,"x":104,"y":445,"width":16,"height":11,"direction":"sideways"},
// {"id":78,"x":86,"y":479,"width":17,"height":11,"direction":"sideways"},
// {"id":79,"x":104,"y":479,"width":16,"height":11,"direction":"sideways"},
// {"id":80,"x":86,"y":491,"width":17,"height":11,"direction":"sideways"},
// {"id":81,"x":104,"y":491,"width":16,"height":11,"direction":"sideways"},
// {"id":82,"x":108,"y":522,"width":16,"height":12,"direction":"sideways"},
// {"id":83,"x":125,"y":522,"width":17,"height":12,"direction":"sideways"},
// {"id":84,"x":108,"y":535,"width":16,"height":11,"direction":"sideways"},
// {"id":85,"x":125,"y":535,"width":17,"height":11,"direction":"sideways"},
// {"id":86,"x":132,"y":568,"width":16,"height":11,"direction":"sideways"},
// {"id":87,"x":149,"y":568,"width":17,"height":11,"direction":"sideways"},
// {"id":88,"x":132,"y":580,"width":16,"height":11,"direction":"sideways"},
// {"id":89,"x":149,"y":580,"width":17,"height":11,"direction":"sideways"},
// {"id":90,"x":157,"y":611,"width":16,"height":11,"direction":"sideways"},
// {"id":91,"x":174,"y":611,"width":17,"height":11,"direction":"sideways"},
// {"id":92,"x":157,"y":623,"width":16,"height":12,"direction":"sideways"},
// {"id":93,"x":174,"y":623,"width":17,"height":12,"direction":"sideways"},
// {"id":94,"x":181,"y":657,"width":16,"height":12,"direction":"sideways"},
// {"id":95,"x":198,"y":657,"width":16,"height":12,"direction":"sideways"},
// {"id":96,"x":181,"y":670,"width":16,"height":11,"direction":"sideways"},
// {"id":97,"x":198,"y":670,"width":16,"height":11,"direction":"sideways"},
// {"id":98,"x":203,"y":701,"width":16,"height":11,"direction":"sideways"},
// {"id":99,"x":220,"y":701,"width":17,"height":11,"direction":"sideways"},
// {"id":100,"x":203,"y":713,"width":16,"height":11,"direction":"sideways"},
// {"id":101,"x":220,"y":713,"width":17,"height":11,"direction":"sideways"},
// {"id":102,"x":231,"y":812,"width":11,"height":16,"direction":"longways"},
// {"id":103,"x":231,"y":829,"width":11,"height":16,"direction":"longways"},
// {"id":104,"x":231,"y":849,"width":11,"height":16,"direction":"longways"},
// {"id":105,"x":231,"y":866,"width":11,"height":16,"direction":"longways"},
// {"id":106,"x":231,"y":885,"width":11,"height":16,"direction":"longways"},
// {"id":107,"x":231,"y":902,"width":11,"height":16,"direction":"longways"},
// {"id":108,"x":244,"y":924,"width":16,"height":11,"direction":"sideways"},
// {"id":109,"x":261,"y":924,"width":17,"height":11,"direction":"sideways"},
// {"id":110,"x":282,"y":924,"width":16,"height":11,"direction":"sideways"},
// {"id":111,"x":299,"y":924,"width":16,"height":11,"direction":"sideways"},
// {"id":112,"x":328,"y":924,"width":17,"height":11,"direction":"sideways"},
// {"id":113,"x":346,"y":924,"width":16,"height":11,"direction":"sideways"},
// {"id":114,"x":366,"y":924,"width":16,"height":11,"direction":"sideways"},
// {"id":115,"x":383,"y":924,"width":17,"height":11,"direction":"sideways"}
// ];