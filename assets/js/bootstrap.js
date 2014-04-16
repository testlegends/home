(function ($) {
 
	$.fn.twitterBootstrap = function (options) {
		options = $.extend({
			formHorizontal: ['lg', 2, 4]
		}, options);

		$('.form-horizontal').each(function(){
			boostraper.formHorizontal($(this), options.formHorizontal);
		});

		$('.form-inline').each(function(){
			$(this).boostraper.formInline();
		});
	};

	var boostraper = {
		formHorizontal: function (obj, size) {
			obj.find('.form-group').each(function(){
				var label_class = 'col-' + size[0] + '-' + size[1];
				var input_class = 'col-' + size[0] + '-' + size[2];
				var offset_class = 'col-' + size[0] + '-offset-' + size[1];

				$(this).children('label').addClass('control-label ' + label_class);
				$(this).children('input').wrap('<div class="' + input_class + '" />');
				$(this).children('button[type=submit]').wrap('<div class="' + offset_class + ' ' + input_class + '" />');
			});
		},

		formInline: function (obj) {
			obj.children('.form-group').each(function(){
				$(this).children('label').addClass('sr-only');
			});
		},

		iconize: function () {
			
		}
	};
 
}(jQuery));

$(document).ready(function(){
	$('*').twitterBootstrap();
});