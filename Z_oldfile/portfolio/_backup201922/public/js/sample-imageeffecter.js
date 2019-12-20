$(function() {
	// エフェクトスライダー












	// アップ画像プレビュー
	$('form').on('change', 'input[type="file"]', function(e) {
		var _file = e.target.files[0];
		var _reader = new FileReader();

		if (_file.type.indexOf('image') < 0) {
			return false;
		}

		_reader.onload = (function(_file) {
			return function(e) {
				$('#preview').empty();
				$('#preview').append($('<img>').attr({
					src : e.target.result,
					title : _file.name
				}));
			};
		})(_file);

		_reader.readAsDataURL(_file);
	});
});