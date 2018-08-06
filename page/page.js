function Page(option) {
	this.ID = option.id;
	this.current = option.current;
	this.allPage = option.allPage;
	this.init();
}
Page.prototype = {
	init: function() {
		this.creatPage();
		this.pre();
		this.next();
	},
	creatPage: function() {
		$(this.ID).empty();
		var str =
			'<div class="page">' +
			'<div class="pre"></div>' +
			'<p>Page<span>' +
			this.current +
			'</span>of<span>' +
			this.allPage +
			'</span>' +
			'<select>' +
			'<option selected="selected">每页显示：10条</option>' +
			'<option>每页显示：9条</option>' +
			'<option>每页显示：8条</option>' +
			'<option>每页显示：7条</option>' +
			'</select>' +
			'</p>' +
			'<div class="next"></div>' +
			'</div>';
		$(this.ID).append(str);

		this.pre();
		this.next;
	},

	pre: function() {
		var self = this;
		$('.pre').click(function() {
			if (self.current == 1) {
				self.current = 1;
			} else {
				self.current--;
			}
		});
	},
	next: function() {
		var self = this;
		$('.next').click(function() {
			debugger;
			if (self.current == self.allPage) {
				self.current = self.allPage;
			} else {
				self.current++;
			}
			self.creatPage();
		});
	}
};
function page(option) {
	var _default = {
		id: '#page',
		current: 1,
		allPage: 3
	};
	$.extend(_default, option);
	new Page(_default);
}
