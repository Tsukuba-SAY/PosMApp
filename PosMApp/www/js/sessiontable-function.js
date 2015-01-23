// セッションテーブルからセッションリストに飛ぶやつ
$.fn.jumpToPresen = function() {
	$(this).on("click", function() {
		var id = $(this).attr("id");
		var sessionid = id.substr(10);
		sessionStorage.setItem("gotosessionid",sessionid);
		//リスト画面のreset
		$("#listchangeBtn").each(function() {
		    if($(this).children().length > 0) {
		        $($(this).children()[0]).attr('selected', 'selected');
		        $(this).change();
		    }
		});
		showPresenList();
		$(document).on("pageshow", "#presenListPage", scrollToTr);
		changePage("#presenListPage");
	});
}
function scrollToTr() {
	if(!localStorage.getItem("downloadResult")){
		var target = $("#session" + sessionStorage.getItem("gotosessionid"));
		console.log(sessionStorage.getItem("gotosessionid"));
		var position = target.offset().top;
		var speed = 500;
		// $('body,html').animate({scrollTop:position}, speed, 'linear');
		$('body,html').scrollTop(position);

		$(document).off("pageshow");
		sessionStorage.removeItem("gotosessionid");
	}
	
}

$.fn.changeDate = function(dateId) {
	var date = $(this).html();
	$(this).on('click', function(e) {
		$("#sessionDate").html(date);
		//全部消す
		document.getElementById('sessiontable1').style.display ='none';
		document.getElementById('sessiontable2').style.display ='none';
		document.getElementById('sessiontable3').style.display ='none';
		//指定箇所のみ表示
		document.getElementById(dateId).style.display = 'block';
	});
}

$.fn.jumpToVenue = function() {
	$(this).on("click", function() {
		changePage("#venuePage");
	});
}