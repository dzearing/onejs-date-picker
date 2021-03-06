var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/Selection', '../onejs/View', '../onejs/ViewModel', './DatePickerStrings'], function(require, exports, Selection, View, ViewModel, DatePickerStrings) {
    var DatePickerBase = (function (_super) {
        __extends(DatePickerBase, _super);
        function DatePickerBase() {
            _super.apply(this, arguments);
            this.weeks = [];
            this.selection = new Selection();
            this._dateToItem = {};
            this._selectedMonth = -1;
            this._months = DatePickerStrings.months;
            this._days = DatePickerStrings.days;
        }
        DatePickerBase.prototype.adjustMonth = function (direction) {
            var monthAdjustment = (direction == 'next') ? 1 : -1;
            var viewModel = this.getViewModel();
            var date = new Date(viewModel.year, viewModel.month - 1 + monthAdjustment, 1);

            viewModel.setData({
                year: date.getFullYear(),
                month: date.getMonth()
            });

            return false;
        };

        DatePickerBase.prototype.onViewModelChanged = function () {
            var viewModel = this.getViewModel();
            var monthIndex = viewModel.month - 1;

            if (this._selectedMonth !== monthIndex) {
                this._selectedMonth = monthIndex;
                this.titleText = DatePickerStrings.titleFormat.replace('{month}', this._months[monthIndex]).replace('{year}', viewModel.year);
                this.weeks = this._getWeeks(monthIndex, viewModel.year);
                this._dateToItem = this._getDateToItem(this.weeks);
            }

            this.selection.setSelected(new Date(viewModel.year, monthIndex, viewModel.date).getTime());
        };

        DatePickerBase.prototype._getWeeks = function (month, year) {
            var date = new Date(year, month, 1);
            var today = new Date().getTime();
            var weeks = [];
            var _this = this;

            while (date.getDay() > 0) {
                date.setDate(date.getDate() - 1);
            }

            for (var weekIndex = 0; weekIndex < 6; weekIndex++) {
                var week = [];

                for (var dayIndex = 0; dayIndex <= 6; dayIndex++) {
                    var key = date.getTime();

                    week.push(new ViewModel({
                        key: key,
                        date: date.getDate(),
                        month: date.getMonth() + 1,
                        year: date.getFullYear(),
                        isInMonth: date.getMonth() === month,
                        isToday: this._isToday(date),
                        weekIndex: weekIndex,
                        dayIndex: dayIndex,
                        originalDate: new Date(date.toString()),
                        selection: this.selection,
                        isSelected: function () {
                            return this.selection.isSelected(this.key);
                        }
                    }));

                    date.setDate(date.getDate() + 1);
                }

                weeks.push(week);
            }

            return weeks;
        };

        DatePickerBase.prototype._getDateToItem = function (weeks) {
            var datesToItem = {};

            for (var weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
                var week = weeks[weekIndex];

                for (var dayIndex = 0; dayIndex < week.length; dayIndex++) {
                    var item = week[dayIndex];

                    datesToItem[item.originalDate.getTime()] = item;
                }
            }

            return datesToItem;
        };

        DatePickerBase.prototype._isToday = function (date) {
            var today = new Date();

            return (date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate());
        };

        DatePickerBase.prototype._onClick = function (day) {
            this._updateByDate(day.originalDate);

            return false;
        };

        DatePickerBase.prototype._onKeyDown = function (ev) {
            var item = this._dateToItem[this.selection.selectedKey];
            var targetDate = new Date(item.originalDate.toString());
            var date = targetDate.getDate();
            var viewModel = this.getViewModel();

            switch (ev.which) {
                case 37:
                    targetDate.setDate(date - 1);
                    break;

                case 39:
                    targetDate.setDate(date + 1);
                    break;

                case 38:
                    targetDate.setDate(date - 7);
                    break;

                case 40:
                    targetDate.setDate(date + 7);
                    break;

                default:
                    return;
            }

            this._updateByDate(targetDate);

            return false;
        };

        DatePickerBase.prototype._updateByDate = function (targetDate) {
            this.setData({
                year: targetDate.getFullYear(),
                month: targetDate.getMonth() + 1,
                date: targetDate.getDate()
            });
        };
        return DatePickerBase;
    })(View);

    
    return DatePickerBase;
});
