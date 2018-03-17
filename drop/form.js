$(function() {
	var Drop = function(options, self) {
		var defaultOption = {
			type: 'multi', //是单选框还是多选框，多选：multi,
			status: 'close', //是否展开下拉内容
			data: [
				{
					value: '1',
					text: '11'
				},
				{
					value: '2',
					text: '22'
				},
				{
					value: '3',
					text: '33'
				}
			],
			default: '请选择',
			multiDefault: { '1': '11' },
			callBack: function(that, text, value) {
				//选择之后的回调函数，将选择之后的text和value值一同返回
				console.log(value);
			}
		};
		this.options = $.extend(options, defaultOption);
		this.element = self;
		this.init(options, self);
	};
	Drop.prototype = {
		init: function() {
			this.create();
			this.status();
			this.toggle();

			if (this.options.type == 'single') {
				this.singleClick();
			} else if (this.options.type == 'multi') {
				this.multiClick();
			}
		},
		create: function() {
			var defaultStr = '';
			var multiDefault = {};
			if (this.options.multiDefault) {
				multiDefault = this.options.multiDefault;
				for (var key in multiDefault) {
					defaultStr += multiDefault[key] + ',';
				}
			} else {
				defaultStr = this.options.default || '请选择';
			}
			var dropStr =
				'<div class="drop">' +
				'<p class="drop-header">' +
				defaultStr +
				'</p>' +
				'<div class="drop-content">' +
				'<ul class="drop-target"></ul>' +
				'</div>' +
				'</div>';
			this.element.append(dropStr);
			var values = this.options.data;
			var optionList = '';
			for (var i = 0; i < values.length; i++) {
				if (
					this.options.multiDefault &&
					this.options.multiDefault.hasOwnProperty(values[i].value)
				) {
					optionList +=
						'<li class="multi-active" value="' +
						values[i].value +
						'">' +
						values[i].text +
						'</li>';
				} else {
					optionList += '<li value="' + values[i].value + '">' + values[i].text + '</li>';
				}
			}
			this.element.find('.drop-target').append(optionList);
			this.element.find('.drop-header').attr('status', this.options.status);
		},
		status: function() {
			var target = this.element.find('.drop-content');
			var status = this.options.status || 'close';
			switch (status) {
				case 'open':
					target.addClass('open');
					break;
				default:
					target.addClass('close');
			}
		},
		toggle: function() {
			this.element.on('click', '.drop-header', function(e) {
				e.stopPropagation();
				var parent = $(this).parent('.drop');
				var status = $(this).attr('status');
				if (status === 'close' || !status) {
					parent
						.find('.drop-content')
						.removeClass('close')
						.addClass('open');
					$(this).attr('status', 'open');
				} else if (status === 'open') {
					parent
						.find('.drop-content')
						.removeClass('open')
						.addClass('close');
					$(this).attr('status', 'close');
				}
			});
		},
		singleClick: function() {
			var self = this;
			this.element.on('click', 'li', function(e) {
				e.stopPropagation();
				var parent = $(this).parents('.drop');
				$(this)
					.addClass('active')
					.siblings()
					.removeClass('active');
				parent.find('.drop-header').text($(this).text());
				parent.find('.drop-content').addClass('close');
				parent.find('.drop-header').attr('status', 'close');
				var text = $(this).text();
				var value = $(this).attr('value');
				if (self.options.callBack) {
					self.options.callBack($(this), text, value);
				}
			});
		},
		multiClick: function() {
			var valueGroup = []; //所有选择的text
			var value = []; //回调返回的id
			var self = this;
			if (this.options.multiDefault) {
				for (var key in this.options.multiDefault) {
					valueGroup.push(this.options.multiDefault[key]);
					value.push(key);
				}
			}
			this.element.on('click', 'li', function(e) {
				e.stopPropagation();
				$(this).toggleClass('multi-active');
				var thisTxt = $(this).text();
				var thisValue = $(this).attr('value');
				// $.inArray:返回数组中指定元素的索引值
				var inArray = $.inArray(thisTxt, valueGroup);
				if (inArray == -1) {
					valueGroup.push(thisTxt);
					value.push(thisValue);
				} else {
					valueGroup.splice(inArray, 1);
					value.splice(inArray, 1);
				}
				var item = '';
				for (var i = 0; i < valueGroup.length; i++) {
					item += valueGroup[i] + '，';
				}
				self.element.find('.drop-header').text(item);
				if (self.options.callBack) {
					var text = valueGroup;
					self.options.callBack($(this), text, value);
				}
			});
		}
	};

	$('body').click(function() {
		$('.drop-content')
			.removeClass('open')
			.addClass('close');
		$('.drop-header').attr('status', 'close');
	});
	function Plugin(options) {
		new Drop(options, $(this));
	}
	$.fn.drop = Plugin;
});
