function Table(option) {
	this.ID = $(option.id);
	this.THEAD = option.thead;
	this.TBODY = option.tbody;
	this.CHECKBOX = option.checkbox;
	this.PAGENO = option.pageNo;
	this.PAGEALL = option.pageAll;

	this.init();
}

Table.prototype = {
	init: function() {
		this.ID.empty();
		this.ID.append('<table class="table"><colgroup></colgroup><thead></thead><tbody></tbody></table>');
		this.colgroup = $(this.ID).find('colgroup');
		this.thead = $(this.ID).find('thead');
		this.tbody = $(this.ID).find('tbody');

		this.creatThead();
		this.creatTbody();

		this.creatPage();
		this.pagePrev();

		if (this.CHECKBOX) {
			this.creatCheckbox();
			this.selectCheckbox();
			this.selectCheckboxAll();
		}
	},
	creatThead: function() {
		var ths = '';
		for (var i = 0; i < this.THEAD.length; i++) {
			this.colgroup.append('<col>');
			ths += '<th>' + this.THEAD[i] + '</th>';
		}
		this.thead.append('<tr>' + ths + '</tr>');
	},
	creatTbody: function() {
		this.tbody.append(this.TBODY);
	},
	creatCheckbox: function() {
		// type:1全选 0tr
		// status:1全选 0全不选
		this.colgroup.prepend('<col width="50">');
		this.thead.find('tr').prepend('<th><div class="checkbox checkbox-all" status="0"><input type="checkbox" id="all"><label for="all"></label></div></th>');
		var tbody = this.tbody.find('tr');
		for (var i = 0; i < tbody.length; i++) {
			$(tbody[i]).prepend('<td><div class="checkbox checkbox-single" status="0"><input type="checkbox" id="checkbox' + i + '" ><label for="checkbox' + i + '"></label></div></td>');
		}
	},
	selectCheckbox: function() {
		// 是否选中status：0 未选中 1：选中
		var self = this;
		$('.checkbox-single').click(function() {
			var trLen = self.tbody.find('tr').length;
			var checkboxLen = self.tbody.find('input[type="checkbox"]:checked').length;
			if (trLen == checkboxLen) {
				$('.checkbox-all')
					.find('input[type="checkbox"]')
					.prop('checked', true);
				$('.checkbox-all').attr('status', '1');
			} else {
				$('.checkbox-all')
					.find('input[type="checkbox"]')
					.prop('checked', false);
				$('.checkbox-all').attr('status', '0');
			}
		});
	},
	selectCheckboxAll: function() {
		// 是否选中status：0 未选中 1：选中
		var self = this;
		$('.checkbox-all').click(function() {
			var status = $(this).attr('status');
			if (status == '0') {
				$('.checkbox-single')
					.find('input[type="checkbox"]')
					.prop('checked', true);
				$(this).attr('status', '1');
			} else {
				$('.checkbox-single')
					.find('input[type="checkbox"]')
					.prop('checked', false);
				$(this).attr('status', '0');
			}
		});
	},
	creatPage: function() {
		$('.page').remove();
		console.log(1);
		var page =
			'<div class="page">' +
			'<div class="first">首页</div>' +
			'<div class="prev">上一页</div>' +
			'<p>' +
			'<span>' +
			this.PAGENO +
			'</span>of' +
			'<span>' +
			this.PAGEALL +
			'</span>' +
			'</p>' +
			'<div class="next">下一页</div>' +
			'<div class="last">末页</div>' +
			'<input type="text" name="" id="">' +
			'<p>GO</p>' +
			'</div>';
		this.ID.append(page);
		this.pagePrev();
	},
	// 上一页
	pagePrev: function() {
		var self = this;
		$('.prev')
			.unbind('click')
			.click(function() {
				self.PAGENO--;
				self.creatPage();
			});
	}
};

function table(option) {
	var _default = {
		id: '#table',
		checkbox: true,
		pageNo: 1,
		pageAll: 10,
		thead: ['1', '2', '3'],
		tbody: function() {
			return '<tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr>';
		}
	};
	$.extend(_default, option);
	new Table(_default);
}
