function Dropdwon(option) {
	this.NAME = option.id.split('#')[1];
	this.ID = $(option.id);
	this.DATA = option.data;
	this.ITEMCHOOSE = option.itemChoose;
	this.ITEMCHOOSEFN = option.itemChooseFn;
	this.MULTI = option.multi;
	this.init();
}
Dropdwon.prototype = {
	init: function() {
		// this.creat();
		this.creatItem();
		this.showOptions();
		this.position();

		// 是否多选
		this.MULTI ? this.multiChoose() : this.itemChoose();
	},
	creat: function() {
		var str = '<div class="dropdwon"><div class="dropdwon-header"></div></div>';
		this.ID.append(str);
		this.HEADER = this.ID.find('.dropdwon-header');
	},
	creatItem: function() {
		var li = '';
		for (var i = 0; i < this.DATA.length; i++) {
			li += '<li value="' + this.DATA[i].id + '">' + this.DATA[i].value + '</li>';
		}
		$('body').append('<ul id="' + this.NAME + '-ul">' + li + '</ul>');
		// this.ID.find('ul').append(li);
	},
	itemChoose: function() {
		var _this = this;
		var showContent = $('#' + this.NAME + '-ul');
		this.ID.on('click', 'li', function() {
			if (_this.ITEMCHOOSE) {
				_this.ITEMCHOOSEFN($(this));
			} else {
				var text = $(this).text();
				_this.HEADER.text(text);
				_this.ITEMCHOOSEFN($(this));
			}
			showContent.hide();
		});
	},
	multiChoose: function() {
		var multiChoose = [];
		var _this = this;
		var showContent = $('#' + this.NAME + '-ul');
		showContent.find('li').click(function() {
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
		var showContent = $('#' + this.NAME + '-ul');
		this.ID.find('.dropdwon-header').click(function() {
			showContent.toggle();
		});
	},
	position: function() {
		var position = this.ID.offset();
		var width = this.ID[0].offsetWidth;
		var height = this.ID[0].offsetHeight;
		$('#' + this.NAME + '-ul').css({
			top: position.top + Number(height) + 'px',
			left: position.left + 'px',
			width: width,
			position: 'absolute',
			zIndex: ' 1'
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
