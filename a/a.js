function fuzzy(option) {
	var _default = {
		id: 'fuzzy-search',
		data: [
			{
				id: 1,
				value: 11111111
			},
			{
				id: 2,
				value: 122222
			},
			{
				id: 3,
				value: 123333
			},
			{
				id: 4,
				value: 44444444
			}
		],
		defaultItem: [] //默认所选ID
	};
	$.extend(_default, option);
	var id = _default.id;
	var contentId = _default.id + '-content';
	var data = _default.data;
	var defaultItem = _default.defaultItem;
	var selectItemId = []; //记录选择得ID

	// 生成头部
	var header = '<p chooseId=""></p>';
	$('#' + id)
		.addClass('fuzzy-search')
		.append(header);

	var showChoose = $('#' + id).find('p');
	showChoose.click(function() {
		$('#' + contentId).show();
		position();
	});

	// 生成下拉内容
	creatContent(data);
	function creatContent(data) {
		$('#' + contentId)
			.find('ul')
			.empty();
		var content = '<div id="' + contentId + '" class="fuzzy-con"><input type="text" name="" id=""><ul></ul></div>';
		$('body').append(content);
		var list = '';
		for (var i = 0; i < data.length; i++) {
			var hasChoosedIndex = selectItemId.indexOf(String(data[i].id)); //在模糊搜索时判断是否已经有选择
			var index = defaultItem.indexOf(String(data[i].id)); //判断是否有默认选项
			if (index != -1) {
				list += '<li class="active" value="' + data[i].id + '">' + data[i].value + '</li>';
				selectItemId.push(String(data[i].id));
				var selectItem = '<span value="' + data[i].id + '">' + data[i].value + '<i class="remove-selected"></i></span>';
				showChoose.append(selectItem);
				removeSelected();
			} else if (hasChoosedIndex != -1) {
				list += '<li class="active" value="' + data[i].id + '">' + data[i].value + '</li>';
			} else {
				list += '<li value="' + data[i].id + '">' + data[i].value + '</li>';
			}
		}
		$('#' + contentId)
			.find('ul')
			.append(list);
	}

	// 点击事件
	itemClick();
	function itemClick() {
		$('#' + contentId).on('click', 'li', function() {
			var value = $(this).attr('value');
			var text = $(this).text();
			var index = selectItemId.indexOf(value);
			if (index == -1) {
				selectItemId.push(value);
				var selectItem = '<span value="' + value + '">' + text + '<i class="remove-selected"></i></span>';
				showChoose.append(selectItem);
				$(this).addClass('active');
			} else {
				selectItemId.splice(index, 1);
				showChoose.find('span[value="' + value + '"]').remove();
				$(this).removeClass('active');
			}
			// 将所选ID返回到DOM
			showChoose.attr('chooseId', selectItemId);
			position();
			removeSelected();
		});
	}

	// 模糊搜索
	// 匹配搜索项
	var input = $('#' + contentId).find('input');
	function matchValue(val) {
		console.log(selectItemId);
		var reg = new RegExp(val);
		var matchVal = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i].value.toString().match(reg)) {
				matchVal.push(data[i]);
			}
		}
		return matchVal;
	}

	input.keyup(function() {
		var val = $(this).val();
		if (val == '') {
			creatContent(data);
		} else {
			creatContent(matchValue($(this).val()));
		}
	});

	// 设置内容位置、大小
	function position() {
		var position = showChoose.offset();
		var width = showChoose[0].offsetWidth;
		var height = showChoose[0].offsetHeight;
		$('#' + contentId).css({
			top: position.top + Number(height) + 'px',
			left: position.left + 'px',
			width: width
		});
	}

	// 移除选项
	function removeSelected() {
		$('.remove-selected')
			.unbind('click')
			.click(function() {
				var parent = $(this).parent('span');
				var parentId = parent.attr('value');
				selectItemId.splice(selectItemId.indexOf(String(parentId)), 1);
				showChoose.attr('chooseId', selectItemId);

				$('#' + contentId)
					.find('li[value="' + parentId + '"]')
					.removeClass('active');

				parent.remove();
			});
	}
}
