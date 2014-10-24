function showposterlist(){
	var str="";
	document.getElementById("posterlistTableTab").innerHTML = "";
	//postdataをループする、各ポスターの情報を取り出す
	for (var i = 0; i < poster.length; i++) {
		
		str += "<tr><td><div>ID:" + poster[i].id + "</div>";
		str += "<div>Sessionid:" + poster[i].sessionid + "</div>";
		str += "<div>Title:" + poster[i].title + "</div>";
		str += "<div>Author:" + getAuthors(i+1) + "</div></td></tr>";
		
	}
	//テーブルに配置する
	document.getElementById("posterlistTableTab").innerHTML = str;
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