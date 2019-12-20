$(function() {
	$(document).ready(function() {
		setInterval(function() {
			var now = new Date();
			angle(now.getHours(), 30, 'hour');
			angle(now.getMinutes(), 6, 'minutes');
			angle(now.getSeconds(), 6, 'second');
		}, 1000);
	});
});

function angle(n, d, id) {
	var deg = ((n * d) - 90);
	$('#' + id).css({
		'transform' : 'rotateZ(' + deg + 'deg)'
	});
}