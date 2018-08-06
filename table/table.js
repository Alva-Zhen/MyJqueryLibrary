function Table(option) {
	var _default = {
		id: '#table',
		checkbox: true,
		thead: ['1', '2', '3'],
		tbody: function() {
			return '<tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr>';
		}
	};
	$.extend(_default, option);
	this.ID = $(_default.id);
	this.THEAD = _default.thead;
	this.TBODY = _default.tbody;
	this.CHECKBOX = _default.checkbox;

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
			this.selectCheckbox = [];
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
		this.thead.find('tr').prepend('<th><div class="checkbox checkbox-all" type="1" status="0"><input type="checkbox" id="all"><label for="all"></label></div></th>');
		var tbody = this.tbody.find('tr');
		for (var i = 0; i < tbody.length; i++) {
			$(tbody[i]).prepend('<td><div class="checkbox" type="0"  inputId="inputId' + i + '"><input status="0" type="checkbox" id="' + i + '" ><label for="' + i + '"></label></div></td>');
		}
	},
	selectCheckbox: function() {
		var selectCheckbox = [];
		$('.checkbox[inputid="inputId0"] label,.checkbox-all label').click(function(e) {
			e.stopPropagation();
		});
		$('.checkbox')
			.unbind('click')
			.click(function(e) {
				var checkboxId = $(this).attr('inputId');
				var type = $(this).attr('type');
				if (type == 0) {
					var index = selectCheckbox.indexOf(checkboxId);
					if (index == -1) {
						selectCheckbox.push(checkboxId);
						$(this).attr('status', 1);
						$(this)
							.find('input')
							.prop('checked', true);
					} else {
						selectCheckbox.splice(index, 1);
						$(this).attr('status', 0);
						$(this)
							.find('input')
							.prop('checked', false);
					}
					if ($('.checkbox[type="0"]').length == selectCheckbox.length) {
						$('.checkbox[type="1"]')
							.find('input')
							.prop('checked', true);
					} else {
						$('.checkbox[type="1"]')
							.find('input')
							.prop('checked', false);
					}
					console.log(selectCheckbox);
				} else {
					selectCheckbox = [];
					var status = $(this).attr('status');
					if (status == 0) {
						for (var i = 0; i < $('.checkbox[type="0"]').length; i++) {
							selectCheckbox.push($($('.checkbox[type="0"]')[i]).attr('inputId'));
						}
						$('.checkbox[type="0"]')
							.find('input')
							.prop('checked', true);
						$(this)
							.find('input')
							.attr('status', 1);
						$(this).attr('status', '1');
					} else {
						selectCheckbox = [];
						$(this)
							.parent('.checkbox')
							.attr('status', 0);
						$('.checkbox[type="0"]')
							.find('input')
							.prop('checked', false);
						$(this).attr('status', '0');
					}
				}
			});
	}
};

function table(option) {
	new Table(option);
}
