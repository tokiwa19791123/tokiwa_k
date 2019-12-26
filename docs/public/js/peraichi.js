$(function() {
	// 定数セット
	const _boxes_count = $('.peraichi-box').length;
	const _speed = 300;

	// .peraichi-box
	$('.peraichi-box').each(function(_index, lement) {
		$(lement).attr('id', 'box_' + (_index + 1));
	});

	// #navigationと#indeicatorセット
	let _navigation = '';
	let _indeicator = '';
	for (let _i = 1; _i <= _boxes_count; _i++) {
		if ($('.peraichi-box').eq(_i - 1).prop('tagName') === 'HEADER') {
			var _subject = $('title').text();
		} else if ($('.peraichi-box').eq(_i - 1).prop('tagName') === 'FOOTER') {
			var _subject = 'footer';
		} else {
			var _subject = $('.peraichi-box').eq(_i - 1).children('.peraichi-subject').text();
		}
		_navigation += '<div class="link_' + _i + '"><a href="#box_' + _i +'" title="' + _subject + '">' + _subject + '</a></div>';
		_indeicator += '<li class="link_' + _i + '"><a href="#box_' + _i +'" title="' + _subject + '"></a></li>';
	}
	$('#navigation').html(_navigation);
	$('#indicator').html(_indeicator);

	// navigation開閉
	$(document).on('click', '#switch', function() {
		$(this).toggleClass('open');
		$('#navigation').fadeToggle();
	});

	// navigation閉じる
	$(document).on('click', '#navigation > div', function() {
		$('#switch').removeClass('open');
		$('#navigation').fadeOut();
	});
});