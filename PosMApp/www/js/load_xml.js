// XMLをロードする
function xmlLoad(addr, func) {
	$.ajax({
		url : addr,
		type : 'get',
		dataType : 'xml',
		timeout : 1000,
		success : func
	});
}