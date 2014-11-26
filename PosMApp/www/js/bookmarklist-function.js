 // ポスターの一覧を表示する
$.fn.showBookmarkList = function() {
	$(this).html("");
	var posters = new Array();
	posters["id"] = new Array();
	posters["sessionid"] = new Array();
	posters["title"] = new Array();
	posters["author"] = new Array();
	
	var bookmarks = localStorage.getItem("bookmarks");
	if (bookmarks === null || bookmarks === "") {
		bookmarks = "";
	}
	var bookmarkArr = bookmarks.split(",");
	
	var str = "";
	str += '<table border="1" rules="rows" >';
	
	for(var i=0; i<=bookmarkArr.length; i++){
		for (var j=0; j<=poster.length-4; j++){
			if(bookmarkArr[i]==poster[j].id){
				authors = getAuthors(i+1).split(",").join(", ")
				posters["id"].push(poster[j].id.toString());
				posters["sessionid"].push(poster[j].sessionid);
				posters["title"].push(poster[j].title);
				posters["author"].push(getAuthors(j+1));
				str += "<tr><td><div>ポスターID: " + poster[j].sessionid + "<img class='listToMapBtn' id='listToMap" +poster[j].id.toString()+ "' src='img/logo_posmapp.png' style='zoom: 5%;'></img><br>";
				str += "<strong>" + poster[j].title + "</strong><br>";
				str += "著者: " + authors + "<br></td>";
				str += "<td><div><td><img class='listToDetailBtn' id='listToDetail"+poster[j].id.toString()+"' src='img/detailinfo.png' style='zoom: 3%;'> </img></div>";
			}
		}

	}


	
	//postdataをループする、各ポスターの情報を取り出す
	
	str += '</table>'

	$(this).html(str);

	return posters;
};

