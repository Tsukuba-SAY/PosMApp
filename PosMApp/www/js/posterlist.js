function showposterlist(){
	var str="";
	var posters = new Array();
	posters["id"] = new Array();
	posters["sessionid"] = new Array();
	posters["title"] = new Array();
	posters["author"] = new Array();

	if (!test) {
		document.getElementById("posterlistTableTab").innerHTML = "";
	}
	//postdataをループする、各ポスターの情報を取り出す
	for (var i = 0; i < poster.length; i++) {
		posters["id"].push(poster[i].id.toString());
		posters["sessionid"].push(poster[i].sessionid);
		posters["title"].push(poster[i].title);
		posters["author"].push(getAuthors(i+1));
		str += "<tr><td><div>ID:" + poster[i].id + "</div>";
		str += "<div>Sessionid:" + poster[i].sessionid + "</div>";
		str += "<div>Title:" + poster[i].title + "</div>";
		str += "<div>Author:" + getAuthors(i+1) + "</div></td></tr>";
		
	}
	if (!test) {
	//テーブルに配置する
		document.getElementById("posterlistTableTab").innerHTML = str;
	}
	console.log(str);

	return posters;
}

//ポスターの発表者を獲得する
function getAuthors(posterid){

	var atotal = author.length;
	var authorlist = "";
	for (var i = 0; i < atotal; i++) {
        if (author[i].posterid == posterid){
        	authorlist = authorlist + author[i].name + ",";
        }
	}
	//最後の","を削除する
	authorlist = authorlist.substring(0, authorlist.length - 1);
	return authorlist;
}