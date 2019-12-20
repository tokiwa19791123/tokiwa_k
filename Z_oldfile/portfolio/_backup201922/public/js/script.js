$(function() {
	// 変数設定
	// $(window).on('load', function() {
	$(document).ready(function() {
		article_length = $('#main-wrapper').children('article').length;
		sample_length = $('#sample-view').children('.sample-item').length;
		window_height = $(window).height();
		window_width = $(window).width();
		nav_check();
		nav_fixed();
	});

	// ページ内リンク
	$('#nav ul li a').on('click', function() {
		$('#nav ul li a').removeClass('active');
		$(this).addClass('active');
	});

	// スクロール処理
	var timer = false;
	$('#main-wrapper').on('scroll', function() {
		sample_remove();
		if (timer !== false) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			nav_check();
		}, 200);
	});
	$(window).on('scroll', function() {
		sample_remove();
		$('#nav').removeClass('is_fixed').removeAttr('style').hide();
		if (timer !== false) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			nav_fixed();
		}, 200);
	});

	// SAMPLEビューア
	$('#sample-view').children('.sample-item').on('click', function() {
		var id = $(this).attr('id').split('-');
		sample_create(parseFloat(id[1], 10));
	});

	$(document).on('click', '#sample-prev, #sample-next', function() {
		var id = $(this).data('no');
		$.when(
			sample_remove()
		)
		.done(function() {
			sample_create(id);
		});
	});
	$(document).on('click', '#sample-close', function() {
		sample_remove();
	});





});

function nav_check() {
	$('#nav ul li a').removeClass('active');
	for (i = 0; i < article_length; i++) {
		if ($('#main-wrapper').children('article').eq(i + 1).length === 0) {
			$('#nav ul li a').eq(i).addClass('active');
			break;

		} else if ($('#main-wrapper').children('article').eq(i + 1).position().top >= (window_height * 0.5)) {
			$('#nav ul li a').eq(i).addClass('active');
			break;

		}
	}
}

function nav_fixed() {
	if ($(window).scrollTop() >= 80) {
		$('#nav').addClass('is_fixed').show().animate({
			top : 0
		});
	} else {
		$('#nav').removeClass('is_fixed').removeAttr('style');
	}
}

function sample_create(id) {
	var prev = id - 1;
	var next = id + 1;

	if (id == 1) {
		prev = sample_length;
	} else if (id == sample_length) {
		next = 1;
	}

	var dom = '<div class="sample-view-window" id="sample-view-window">';
	dom += '<div class="sample-view-wrapper"><div class="sample-view-image"><img src="' + $('#sample-' + id).data('item') + '"></div>';

	if ($('#sample-' + id).data('text')) {
		dom += '<p class="sample-view-text">' + $('#sample-' + id).data('text') + '</p>';
	}

	if ($('#sample-' + id).data('link')) {
		dom += '<p class="sample-view-link"><a href="' + $('#sample-' + id).data('link') + '" target="blink">より詳しく見る <i class="fas fa-external-link-alt"></i></a></p>';
	}

	dom += '<ul class="sample-view-navigation">';
	dom += '<li class="sample-view-navigation-prev" id="sample-prev" data-no="' + prev + '"><i class="fas fa-caret-square-left fa-2x"></i></li>';
	dom += '<li class="sample-view-navigation-next" id="sample-next" data-no="' + next + '"><i class="fas fa-caret-square-right fa-2x"></i></li>';
	dom += '<li class="sample-view-navigation-close" id="sample-close"><i class="fas fa-window-close fa-2x"></i></li>';
	dom += '</ul>';
	dom += '</div>';
	dom += '</div>';

	$('body').append(dom);
}

function sample_remove() {
	$('.sample-view-window').fadeOut(function() {
		$(this).remove();
	});
}