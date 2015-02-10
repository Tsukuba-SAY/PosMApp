function closePanel($obj) {
	$obj.panel("close");
}

function effectPosterIcon(posterid) {
	// effect, duration, option
	$icon = $("#icon" + posterid);
	$("#icon"+posterid).hide("puff");
	$("#icon"+posterid).show("puff");
}