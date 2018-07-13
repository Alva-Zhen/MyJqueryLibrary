$(function() {
	var Calendar = function(element, option) {
		this.option = option;
		this.element = element;
		var date = new Date();
		this.year = date.getFullYear();
		this.month = date.getMonth();
		this.day = date.getDate();
		this.hour = date.getHours();
		this.minute = date.getMinutes();
		this.second = date.getSeconds();
		this.init();
	};
	Calendar.prototype = {
		init: function() {
			this.creat(); //生成日期
			this.creatDates(); //生成每个月的天数
			this.creatHeader(); //生成头部
			this.clickDates(); //日期点击事件
			this.nextMonth(); //下个月
			this.preMonth(); //上个月
			this.showCalendar(); //展示日期
			this.showOnInput();
			this.selectDay();
		},
		creat: function() {
			var weekArr = ['日', '一', '二', '三', '四', '五', '六'];
			var week = '';
			for (var i = 0; i < weekArr.length; i++) {
				week += '<p>' + weekArr[i] + '</p>';
			}
			var html =
				'<div class="calendar">' +
				'<div class="calendar-header">' +
				'<p></p>' +
				'<i class="fa fa-angle-left calendar-pre"></i>' +
				'<i class="fa fa-angle-right calendar-next"></i>' +
				'</div>' +
				'<div class="clendar-main">' +
				' <div class="calendar-week">' +
				week +
				'</div>' +
				'<ul class="calendar-days"></ul>' +
				'</div>' +
				'<div class="calendar-bottom"><div class="time-show"></div><div class="calendar-button"></div></div>' +
				'</div>';
			$(this.element).append(html);
		},
		creatHeader: function() {
			var header = this.year + '-' + (this.month + 1 < 10 ? '0' + (this.month + 1) : this.month + 1) + '-' + this.day;
			$('.calendar-header p').text(header);
		},
		creatDates: function() {
			$('.calendar-days').empty();
			var dates = '';
			var lastMonthWeekDay = new Date(this.year, this.month, 0).getDay(); //上月最后一天是周几
			var lastMonthDay = new Date(this.year, this.month, 0).getDate(); //上个月有多少天
			var currentMonthDay = new Date(this.year, this.month + 1, 0).getDate(); //本月有多少天
			var currentMonthWeekDay = new Date(this.year, this.month + 1, 0).getDay(); //本月最后一天星期几

			if (lastMonthWeekDay != 6) {
				for (var i = 0; i <= lastMonthWeekDay; i++) {
					dates += '<li><p class="date-default">' + (lastMonthDay - lastMonthWeekDay + i) + '</p></li>';
				}
			}
			for (var i = 0; i < currentMonthDay; i++) {
				if (i + 1 == this.day) {
					dates += '<li class="date active"><p>' + (i + 1) + '</p></li>';
				} else {
					dates += '<li class="date"><p>' + (i + 1) + '</p></li>';
				}
			}
			// 当前展示面板上下个月展示几天
			if (currentMonthWeekDay != 6) {
				var nextMonth = 6 - currentMonthWeekDay;
				for (var i = 0; i < nextMonth; i++) {
					dates += '<li><p class="date-default">' + (i + 1) + '</p></li>';
				}
			}
			$('.calendar-days').append(dates);
		},
		clickDates: function() {
			this.element.on('click', '.date', function() {
				if ($('.active').length > 0) {
					$('.active').removeClass('active');
					$(this).addClass('active');
				} else {
					$(this).addClass('active');
				}
			});
		},
		nextMonth: function() {
			var self = this;
			this.element.on('click', '.fa-angle-right', function(e) {
				e.stopPropagation();
				if (self.month < 11) {
					self.month++;
				} else {
					self.year++;
					self.month = 0;
				}
				self.creatHeader();
				self.creatDates();
			});
		},
		preMonth: function() {
			var self = this;
			this.element.on('click', '.fa-angle-left', function(e) {
				e.stopPropagation();
				if (self.month > 0) {
					self.month--;
				} else {
					self.year--;
					self.month = 11;
				}
				self.creatHeader();
				self.creatDates();
			});
		},
		selectDay: function() {
			var self = this;
			this.element.on('click', '.date', function(e) {
				e.stopPropagation();
				self.day = $(this).text();
				self.creatHeader();
				if (!self.option.button) {
					self.showOnInput();
				}
			});
		},
		showCalendar: function() {
			this.element.on('click', 'input', function() {
				$('.calendar').toggle();
			});
		},

		showOnInput: function() {
			var value = this.year + '-' + (this.month + 1 < 10 ? '0' + (this.month + 1) : this.month) + '-' + (this.day < 10 ? '0' + this.day : this.day);

			this.element.find('input').val(value.trim());
		}
	};

	$.fn.calendar = function(option) {
		var defaultOptions = {};
		new Calendar(this, $.extend(defaultOptions, option));
	};
});
