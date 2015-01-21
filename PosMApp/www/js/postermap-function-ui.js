function closePanel($obj) {
	$obj.panel("close");
}

function effectPosterIcon(posterid) {
	// effect, duration, option
	$icon = $("#icon" + posterid);
	$icon.toggle("puff", 300, 150);
	$icon.toggle("puff", 300, 150);
}