function changeDate(date){
	//全部消す
	document.getElementById('sessiontable1').style.display ='none';
	document.getElementById('sessiontable2').style.display ='none';
	document.getElementById('sessiontable3').style.display ='none';
	//指定箇所のみ表示
	if (date) {
		document.getElementById(date).style.display=
		'block';
	}
}