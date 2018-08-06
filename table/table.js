function Table(option) {
	this.ID = $(option.id);
	this.THEAD = option.thead;
	this.TBODY = option.tbody;
	this.CHECKBOX = option.checkbox;

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
	}
};

function table(option) {
	var _default = {
		id: '#table',
		checkbox: true,
		thead: ['1', '2', '3'],
		tbody: function() {
			return '<tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr>';
		}
	};
	$.extend(_default, option);
	new Table(_default);
}
