function Dropdwon(option) {
	this.ID = $(option.id);
	this.DATA = option.data;
	this.ITEMCHOOSE = option.itemChoose;
	this.ITEMCHOOSEFN = option.itemChooseFn;
	this.MULTI = option.multi;
	this.init();
}
Dropdwon.prototype = {
	init: function() {
		this.creat();
		this.creatItem();
		this.showOptions();

		// 是否多选
		this.MULTI ? this.multiChoose() : this.itemChoose();
	},
	creat: function() {
		var str = '<div class="dropdwon"><div class="dropdwon-header"></div><ul></ul></div>';
		this.ID.append(str);
		this.HEADER = this.ID.find('.dropdwon-header');
	},
	creatItem: function() {
		var li = '';
		for (var i = 0; i < this.DATA.length; i++) {
			li += '<li value="' + this.DATA[i].id + '">' + this.DATA[i].value + '</li>';
		}
		this.ID.find('ul').append(li);
	},
	itemChoose: function() {
		var _this = this;
		this.ID.on('click', 'li', function() {
			if (_this.ITEMCHOOSE) {
				_this.ITEMCHOOSEFN($(this));
			} else {
				var text = $(this).text();
				_this.HEADER.text(text);
				_this.ITEMCHOOSEFN($(this));
			}
			_this.ID.find('ul').hide();
		});
	},
	multiChoose: function() {
		var multiChoose = [];
		var _this = this;
		this.ID.find('li').click(function() {
			var value = $(this).attr('value');
			var index = multiChoose.indexOf(value);
			if (index == -1) {
				multiChoose.push(value);
				$(this).addClass('active');
				_this.addMultiChoose(value, $(this).text());
			} else {
				multiChoose.splice(index, 1);
				$(this).removeClass('active');
				_this.removeMultiChoose(value);
			}
		});
	},
	addMultiChoose: function(value, text) {
		var str = '<span value="' + value + '">' + text + '|</span>';
		this.ID.find('.dropdwon-header').append(str);
	},
	removeMultiChoose: function(value) {
		this.ID.find('.dropdwon-header span[value="' + value + '"]').remove();
	},
	showOptions: function() {
		var _this = this;
		this.ID.find('.dropdwon-header').click(function() {
			_this.ID.find('ul').toggle();
		});
	}
};

function dropdwon(option) {
	var _default = {
		id: '#drop',
		data: [
			{
				id: '1',
				value: '1'
			},
			{
				id: '2',
				value: '2'
			},
			{
				id: '3',
				value: '3'
			}
		],
		multi: true, //多选
		itemChoose: false, //开启选项点击回调
		itemChooseFn: function(self) {
			console.log('选项点击回调');
		}
	};
	$.extend(_default, option);
	new Dropdwon(_default);
}
