(function($) {
	$.selectSuggest = function(target, data, defaultItem, itemSelectFunction) {
		var defaulOption = {
			suggestMaxHeight: '200px', //弹出框最大高度
			itemColor: '#000000', //默认字体颜色
			itemBackgroundColor: 'RGB(199,237,204)', //默认背景颜色
			itemOverColor: '#ffffff', //选中字体颜色
			itemOverBackgroundColor: '#C9302C', //选中背景颜色
			itemPadding: 3, //item间距
			fontSize: 12, //默认字体大小
			alwaysShowALL: true //点击input是否展示所有可选项
		};
		var maxFontNumber = 0; //最大字数
		var currentItem;
		var suggestContainerId = target + '-suggest';
		var suggestContainerWidth = $('#' + target).innerWidth();
		var suggestContainerLeft = $('#' + target).offset().left;
		var suggestContainerTop = $('#' + target).offset().top + $('#' + target).outerHeight();

		var showClickTextFunction = function(self) {
			$('#' + target).val(this.innerText);
			currentItem = null;
			$('#' + suggestContainerId).hide();
		};
		var suggestContainer;
		if ($('#' + suggestContainerId)[0]) {
			suggestContainer = $('#' + suggestContainerId);
			suggestContainer.empty();
		} else {
			suggestContainer = $('<ul class="dim-search"></ul>'); //创建一个子<div>
		}

		suggestContainer.attr('id', suggestContainerId);
		suggestContainer.attr('tabindex', '0');
		suggestContainer.hide();
		var _initItems = function(items) {
			var defaultSelect = $('#' + target).attr('defaultSelect');
			suggestContainer.empty();
			var suggestItem = '';
			for (var i = 0; i < items.length; i++) {
				if (items[i].value.length > maxFontNumber) {
					maxFontNumber = items[i].value.length;
				}
				if (defaultItem && items[i].id == defaultItem) {
					suggestItem += '<li id="' + items[i].id + '">' + items[i].value + '</li>';
					$('#' + target).val(items[i].value);
					$('#' + target).attr('selectId', items[i].id);
				} else if (defaultSelect && defaultSelect != '' && defaultSelect == items[i].id) {
					suggestItem += '<li id="' + items[i].id + '">' + items[i].value + '</li>';
					$('#' + target).val(items[i].value);
					$('#' + target).attr('selectId', items[i].id);
				} else {
					suggestItem += '<li id="' + items[i].id + '">' + items[i].value + '</li>';
				}
			}

			$('body').append(suggestContainer);
			$('#' + suggestContainerId).append(suggestItem);
			// 点击选项将值返回给input
			$('#' + suggestContainerId)
				.unbind('click')
				.on('click', 'li', function() {
					$('#' + target).val($(this).text());
					$('#' + target).attr('selectId', $(this).attr('id'));
					currentItem = null;
					$('#' + suggestContainerId).hide();
					if (itemSelectFunction) {
						itemSelectFunction($(this).attr('id'), $(this).text(), $(this));
					}
				});
		};

		var inputChange = function() {
			var inputValue = $('#' + target).val();
			var reg = new RegExp(inputValue);
			var haveVal = [];
			for (var i = 0; i < data.length; i++) {
				if (data[i].value.match(reg)) {
					haveVal.push(data[i]);
				}
				// if (data[i].value.indexOf(inputValue) != -1) {
				// 	haveVal.push(list[i]);
				// }
			}
			// inputValue = inputValue.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
			// var matcher = new RegExp(inputValue, 'i');
			// return $.grep(data, function(value) {
			// 	return matcher.test(value.text);
			// });
			return haveVal;
		};

		$('#' + target).bind('keyup', function() {
			_initItems(inputChange());
		});
		$('#' + target).bind('blur', function() {
			if (!$('#' + suggestContainerId).is(':focus')) {
				// $('#' + suggestContainerId).hide();
				if (currentItem) {
					currentItem.trigger('click');
				}
				currentItem = null;
				return;
			}
		});

		$('#' + target).bind('click', function(e) {
			e.stopPropagation();
			var position = $(this).offset();
			var width = $(this)[0].offsetWidth;
			var height = $(this).height() + 2;
			if (defaulOption.alwaysShowALL) {
				_initItems(data);
			} else {
				_initItems(inputChange());
			}
			$('#' + suggestContainerId).removeAttr('style');
			var tempWidth = defaulOption.fontSize * maxFontNumber + 2 * defaulOption.itemPadding + 30;
			var containerWidth = Math.max(tempWidth, suggestContainerWidth);
			$('#' + suggestContainerId).css({
				top: position.top + height + 'px',
				left: position.left + 'px',
				width: width
			});
			$('.dim-search').hide();
			$('#' + suggestContainerId).show();
		});

		_initItems(data);

		$('#' + suggestContainerId).bind('blur', function() {
			$('#' + suggestContainerId).hide();
		});
		$(document).click(function() {
			$('#' + suggestContainerId).hide();
		});
	};
})(jQuery);
