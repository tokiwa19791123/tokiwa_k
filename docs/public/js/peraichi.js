$(function() {
	// 定数セット
	const _boxes_count = $('.content_box').length;
	const _duration = 300;
	const _easing = 'swing';

	// 変数初期値
	let _flag = 1;
	let _prev = $(window).scrollTop();

	// .content_box
	$('.content_box').each(function(_index, _element) {
		$(_element).addClass('box_' + (_index + 1));
	});

	// #navigationと#indeicatorセット
	let _navigation = '';
	let _indeicator = '';
	for (let _i = 1; _i <= _boxes_count; _i++) {
		if ($('.content_box').eq(_i - 1).prop('tagName') === 'HEADER') {
			var _subject = $('title').text();
		} else if ($('.content_box').eq(_i - 1).prop('tagName') === 'FOOTER') {
			var _subject = 'footer';
		} else {
			var _subject = $('.content_box').eq(_i - 1).children('.content_subject').text();
		}
		_navigation += '<div class="link_' + _i + '"><span>' + _subject + '</span></div>';
		_indeicator += '<li class="link_' + _i + '"><span></span></li>';
	}
	$('#navigation').html(_navigation);
	$('#indicator').html(_indeicator);

	// clickイベント
	$(document).on('click', '#switch', function() {
		$(this).toggleClass('open');
		$('#navigation').fadeToggle();
	});
	$(document).on('click', '#navigation > div', function(_e) {
		$('#switch').removeClass('open');
		$('#navigation').fadeOut();

		_e.preventDefault();
		const _offset = $('.box_' + ($(this).index() + 1)).offset().top;
		_flag = 3;
		$('html, body').stop(true).animate({
			scrollTop : _offset
		}, _duration, _easing, function() {
			_flag = 1;
		})
	});
	$(document).on('click', '#indicator > li', function(_e) {
		_e.preventDefault();
		const _offset = $('.box_' + ($(this).index() + 1)).offset().top;
		_flag = 3;
		$('html, body').stop(true).animate({
			scrollTop : _offset
		}, _duration, _easing, function() {
			_flag = 1;
		})
	});

	// scrollイベント
	var _timer = false;
	$(window).on('scroll', function() {
		if (_timer !== false) {
			clearTimeout(_timer);
		}
		_timer = setTimeout(function() {
			let _current = $(this).scrollTop();
			// #indeicator
			for (let _i = 0; _i < _boxes_count; _i++) {
				const _prev_offset = $('.box_' + (_i + 1)).offset().top;
				if (_current >= _prev_offset - 1) {
					$('#indicator li').removeClass('active');
					$('#indicator li.link_' + (_i + 1)).addClass('active');
				}
			}

			// scroll snap
			for (let _i = 1; _i < _boxes_count; _i++) {
				const _prev_offset = $('.box_' + _i).offset().top;
				const _next_offset = $('.box_' + (_i + 1)).offset().top;
				if ((_current > _prev_offset) && (_current < _next_offset) && (_flag === 1)) {
					if (_current > _prev) {
						_flag = 2;
						$('html, body').stop(true).animate({
							scrollTop : _next_offset
						}, _duration, _easing, function() {
							_flag = 1;
						});
					} else if (_current < _prev) {
						_flag = 2;
						$('html, body').stop(true).animate({
							scrollTop : _prev_offset
						}, _duration, _easing, function() {
							_flag = 1;
						});
					}
				}
			}
			_prev = _current;
		}, 100);
	});
	$(window).trigger('scroll');
});