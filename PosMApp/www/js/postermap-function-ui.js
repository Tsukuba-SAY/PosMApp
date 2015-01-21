function closePanel($obj) {
	$obj.panel("close");
}

function effectPosterIcon(postericon) {
	// effect, duration, option
	$("#icon" + postericon).toggle("puff", 300, 150);
	$("#icon" + postericon).toggle("puff", 300, 150);
}