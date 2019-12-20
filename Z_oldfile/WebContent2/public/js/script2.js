$(function() {
	const $window = $(window);
	const $boxes = $('.content_box');
	const $indicator = $('#indicator');
	let indeicatorHtml = '';
	const duration = 300;
	const easing = 'swing';

	// boxの個数
	const boxes_cnt = $boxes.length;

	// インジケーター生成
	for (let i = 0; i < boxes_cnt; i++) {
		indeicatorHtml += '<li>' + i + '</li>';
	}
	$indicator.html(indeicatorHtml);

	// boxに連番のクラス付与
	$boxes.each(function(index, element) {
		$(element).addClass('box' + (index + 1));
	});

	// 状態管理用の変数
	let flag = 1;

	// インジケーターのクリックイベント
	$indicator.on('click', 'li', function(e) {
		e.preventDefault();
		const offset = $('.box' + ($(this).index() + 1)).offset().top;
		flag = 3;
		$('html, body').stop(true).animate({
			scrollTop : offset
		}, duration, easing, function() {
			flag = 1;
		})
	});

	// prev_posの初期値（画面をロードしたときの位置）
	let prev_pos = $window.scrollTop();




	var timer = false;
	$window.on('scroll',  function() {
		if (timer !== false) {
      clearTimeout(timer);
  }
  timer = setTimeout(function() {


		let current_pos = $(this).scrollTop();

		// インジケーターの点灯・消灯
		for (let i = 0; i < boxes_cnt; i++) {
			const prev_offset = $('.box' + (i + 1)).offset().top;
			if (current_pos >= prev_offset - 1) { // IE11用に-1
				$('#indicator a').removeClass('active');
				$('#indicator a.indicator' + (i + 1)).addClass('active');
			}
		}

		// スクロールスナップ
		for (let i = 1; i < boxes_cnt; i++) {
			const prev_offset = $('.box' + i).offset().top;
			const next_offset = $('.box' + (i + 1)).offset().top;

			if ((current_pos > prev_offset) && (current_pos < next_offset) && (flag === 1)) {

				if (current_pos > prev_pos) {
					flag = 2;
					$('html, body').stop(true).animate({
						scrollTop : next_offset
					}, duration, easing, function() {
						flag = 1;
					});
				} else if (current_pos < prev_pos) {
					flag = 2;
					$('html, body').stop(true).animate({
						scrollTop : prev_offset
					}, duration, easing, function() {
						flag = 1;
					});
				}

			}
		}
		prev_pos = current_pos;

  }, 100);
	});

//	$window.trigger('scroll');

});