$(function() {
	$(document).ready(function() {
		responsive();
	});

	var resizeTimer = null;
	$(window).on('resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			responsive();
		}, 200);
	});

	$('#left').on('click', function() {
		if (parseInt($('#thumbnails').css('left')) < 0) {
			$('#thumbnails').animate({
				'left' : '+=240'
			});
		}
		return false;
	});
	$('#right').on('click', function() {
		if (parseInt($('#thumbnails').css('width')) > $(window).width() + (parseInt($('#thumbnails').css('left')) * -1)) {
			$('#thumbnails').animate({
				'left' : '-=240'
			});
		}
		return false;
	});
});

function responsive() {
	if ($(window).width() > 580) {
		$('#thumbnails').width(240 * $('#thumbnails').children('.thumbnail').length);
		$('#thumbnails').find('a').attr('target', 'main');
	} else {
		$('#thumbnails').removeAttr('style');
		$('#thumbnails').find('a').attr('target', 'blink');
//		$('#main').attr('src','./html/top.html');
	}
}
