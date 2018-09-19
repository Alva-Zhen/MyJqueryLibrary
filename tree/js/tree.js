var treeData = [{
	resourceId: 1,
	resourceName: '1',
	labelRemark: '1',
	resources: [{
		resourceId: 2,
		resourceName: '2',
		labelRemark: '1',
		resources: [{
			resourceId: 3,
			resourceName: '3',
			labelRemark: '1'
		}]
	}]
}];

function LabelTree(options) {
	this.id = options.id;
	this.data = options.data;
	this.state = options.state;
	this.add = options.add;
	this.remove = options.remove;
	this.edit = options.edit;
	this.multiSelect = options.multiSelect;
	this.oprations = options.oprations;
	this.init();
}

LabelTree.prototype = {
	init: function () {
		this.createItem();
		this.itemState();
		this.itemAdd();
		this.itemRemove();
		this.itemEdit();
		if (this.multiSelect) {
			this.itemClick();
		}
	},
	createItem: function () {
		$(this.id).empty();
		var item = '';
		for (var i = 0; i < this.data.length; i++) {
			item +=
				'<div class="item">' +
				'<div class="item-header" id="' + this.data[i].resourceId + '"  pidid="' + this.data[i].resourcePid + '" resourceUrl="' + this.data[i].resourceUrl + '" iconUrl="' + this.data[i].iconUrl + '" orderOn="' + this.data[i].orderOn + '" status="' + this.data[i].status + '" resourceType="' + this.data[i].resourceType + '">' +
				(this.data[i].resources && this.data[i].resources.length > 0 ? '<span state="' + this.state + '" class="item-state ' + (this.state ? 'item-open' : 'item-close') + '"></span>' : '') +
				'<p clickType="0">' +
				this.data[i].resourceName +
				'</p>' +
				/*(this.oprations ? this.addOprations() : '') +*/
				'</div>' +
				(this.data[i].resources && this.data[i].resources.length > 0 ? this.next(this.data[i].resourceId, this.data[i].resources, this.data[i].resourceName) : '') +
				'</div>';
		}
		$(this.id).append(item);
	},
	next: function (parentId, data, parentName) {
		var item = '';
		for (var i = 0; i < data.length; i++) {
			item +=
				'<div class="item">' +
				'<div class="item-header" id="' + data[i].resourceId + '" pidid="' + data[i].resourcePid + '" resourceUrl="' + data[i].resourceUrl + '" iconUrl="' + data[i].iconUrl + '" orderOn="' + data[i].orderOn + '" status="' + data[i].status + '" resourceType="' + data[i].resourceType + '" parentName="' + parentName + '">' +
				(data[i].resources && data[i].resources.length > 0 ? '<span state="' + this.state + '" class="item-state ' + (this.state ? 'item-open' : 'item-close') + '"></span>' : '') +
				'<p clickType="0">' +
				data[i].resourceName +
				'</p>' +
				(this.oprations ? this.addOprations() : '') +
				'</div>' +
				(data[i].resources && data[i].resources.length > 0 ? this.next(data[i].resourceId, data[i].resources, data[i].resourceName) : '') +
				'</div>';
		}
		return '<div class="next" parentId="' + parentId + '" style="display: ' + (this.state ? 'block' : 'none') + '">' + item + '</div>';
	},
	itemState: function () {
		// $('.item-state')状态：0:close;1:open
		$('.item-state').on('click', function () {
			var state = $(this).attr('state');
			var parentId = $(this)
				.parent('.item-header')
				.attr('id');
			if (state == '0') {
				$(this)
					.removeClass('item-close')
					.addClass('item-open');
				$(this).attr('state', '1');
				$('.next[parentid="' + parentId + '"]').slideDown();
			} else {
				$(this)
					.removeClass('item-open')
					.addClass('item-close');
				$(this).attr('state', '0');
				$('.next[parentid="' + parentId + '"]').slideUp();
			}
		});
	},
	itemAdd: function () {
		var self = this;
		$('.item-add').on('click', function () {
			self.add($(this));
		});
	},
	itemRemove: function () {
		var self = this;
		$('.item-remove').on('click', function () {
			self.remove($(this));
		});
	},
	itemEdit: function () {
		var self = this;
		$('.item-edit').on('click', function () {
			self.edit($(this));
		});
	},
	itemClick: function () {
		$('.item-header > p').click(function () {
			var clickType = $(this).attr('clickType');
			var parent = $(this).parent('.item-header');
			if (clickType == '0') {
				$(parent).addClass('active');
				$(this).attr('clickType', '1')
			} else {
				$(parent).removeClass('active');
				$(this).attr('clickType', '0')
			}
		});
	},
	addOprations: function () {
		return '<div class="item-opration">' +
			'<span class="item-add"><img src="./img/add.png" alt=""></span>' +
			'<span class="item-remove"><img src="./img/remove.png" alt=""></span>' +
			'<span class="item-edit"><img src="./img/edit.png" alt=""></span>' +
			'</div>';
	}
};

function tree(options) {
	var defaultTree = {
		id: '#tree',
		data: treeData,
		state: 1, //初始状态，下级是打开还是收起：0:close;1:open,
		multiSelect: false,
		oprations: true, //是否需要操作按钮
		add: function (self) {
			console.log('add');
		},
		remove: function (self) {
			console.log('remove');
		},
		edit: function (self) {
			console.log('edit');
		}
	};
	$.extend(defaultTree, options);
	new LabelTree(defaultTree);
}