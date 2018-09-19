var TwoLinkageDrop = function(option) {
	this.ID = $(option.id);
	this.DATA = option.data;
	this.DEFAULEHEADER = option.defaultHeader;
	this.init();
};
TwoLinkageDrop.prototype = {
	init: function() {
		this.ID.addClass('linkage-wrap');
		var str = '<div>' + '<div class="drop-wrap linkage-one">' + '<p>' + this.DEFAULEHEADER[0] + '</p>' + '<ul></ul>' + ' </div>' + '</div>' + '<div>' + '<div class="drop-wrap  linkage-two">' + '<p>' + this.DEFAULEHEADER[1] + '</p>' + '<ul></ul>' + '</div>' + '</div>';
		this.ID.append(str);
		this.one = this.ID.find('.linkage-one');
		this.two = this.ID.find('.linkage-two');

		this.creatItem(this.one, this.DATA.taxType); //首次加载第一个下拉框
		this.itemClickOne();
		this.select();
	},
	creatItem: function(parent, data) {
		$('.linkage-two ul').empty();
		if (data.length == 0) {
			$('.linkage-two p').text('无选项');
		} else {
			$('.linkage-two p').text(this.DEFAULEHEADER[1]);
		}
		var item = '';
		for (var i = 0; i < data.length; i++) {
			item += '<li value="' + data[i].id + '">' + data[i].value + '</li>';
		}
		parent.find('ul').append(item);
	},
	itemClickOne: function() {
		var _this = this;
		$('.linkage-one li').click(function() {
			var value = $(this).attr('value');
			var twoData = _this.DATA.taxCategory[value];
			_this.creatItem(_this.two, twoData);
			_this.select();
		});
	},
	select: function() {
		$('.linkage-wrap li').click(function() {
			var parent = $(this).parents('.drop-wrap');
			var text = $(this).text();
			parent.find('p').text(text);
		});
	}
};
function twoLinkageDrop(option) {
	var _default = {
		id: '#drop',
		defaultHeader: ['请选择1', '请选择2'],
		data: {
			taxType: [
				{
					id: 1,
					value: '增值税'
				},
				{
					id: 2,
					value: '营业税'
				}
			],
			taxCategory: {
				'1': [],
				'2': [
					{
						sysVal: '16',
						id: 1,
						value: '销售货物'
					},
					{
						sysVal: '6',
						id: 2,
						value: '广告业务'
					}
				]
			}
		}
	};
	new TwoLinkageDrop($.extend(_default, option));
}
