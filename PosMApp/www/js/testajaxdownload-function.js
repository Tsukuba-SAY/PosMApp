//testする前に、localStorageにデータを入れる
function ajaxdownload(){
		localStorage.setItem("poster", JSON.stringify(poster));
		localStorage.setItem("author", JSON.stringify(author));
		localStorage.setItem("keyword", JSON.stringify(keyword));
		localStorage.setItem("presen", JSON.stringify(presen));
		localStorage.setItem("presents", JSON.stringify(presents));
		localStorage.setItem("session", JSON.stringify(session));
		localStorage.setItem("commontator", JSON.stringify(commontator));
		localStorage.setItem("position_map", JSON.stringify(position_map));
		localStorage.setItem("position", JSON.stringify(position));
		localStorage.setItem("STATIC_WIDTH", 432);
		localStorage.setItem("testData","true");
}