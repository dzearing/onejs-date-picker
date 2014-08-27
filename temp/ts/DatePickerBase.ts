import View = require('View');
import DatePickerStrings = require('DatePickerStrings');
import Selection = require('Selection');
import ViewModel = require('ViewModel');

class DatePickerBase extends View {
    titleText: string;
    weeks = [];

    selection = new Selection();

    _dateToItem = {};
    _selectedMonth = -1;

    _months = DatePickerStrings.months;
    _days = DatePickerStrings.days;

    adjustMonth(direction: string) {
        var monthAdjustment = (direction == 'next') ? 1 : -1;
        var viewModel = this.getViewModel();
        var date = new Date(viewModel.year, viewModel.month + monthAdjustment, 1);

        viewModel.setData({
            year: date.getFullYear(),
            month: date.getMonth()
        });

        return false;
    }

    onViewModelChanged() {
        var viewModel = this.getViewModel();

        if (this._selectedMonth !== viewModel.month) {
            this._selectedMonth = viewModel.month;
            this.titleText = DatePickerStrings.titleFormat.replace('{month}', this._months[viewModel.month]).replace('{year}', viewModel.year);
            this.weeks = this._getWeeks(viewModel.month, viewModel.year);
            this._dateToItem = this._getDateToItem(this.weeks);
        }

        this.selection.setSelected(this._dateToItem[new Date(viewModel.year, viewModel.month, viewModel.date).getTime()]);
    }

    _getWeeks(month, year) {
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
                week.push(new ViewModel({
                    key: date.getTime(),
                    date: date.getDate(),
                    month: date.getMonth() + 1,
                    year: date.getFullYear(),
                    isInMonth: date.getMonth() === month,
                    isToday: this._isToday(date),
                    weekIndex: weekIndex,
                    dayIndex: dayIndex,
                    originalDate: new Date(date.toString()),
                    selection: this.selection,
                    isSelected: function() { return this.selection.isSelected(this); }
                }));

                date.setDate(date.getDate() + 1);
            }

            weeks.push(week);
        }

        return weeks;
    }

    _getDateToItem(weeks) {
        var datesToItem = {};

        for (var weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
            var week = weeks[weekIndex];

            for (var dayIndex = 0; dayIndex < week.length; dayIndex++) {
                var item = week[dayIndex];

                datesToItem[item.originalDate.getTime()] = item;
            }
        }

        return datesToItem;
    }

    _isToday(date) {
        var today = new Date();

        return (date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate());
    }
/*
    _getItemByDate(date) {

    }
    _getItem(weekIndex, dayIndex) {
        var week = (weekIndex >= 0 && weekIndex < this.weeks.length) ? this.weeks[weekIndex] : null;

        return (week && dayIndex >= 0 && dayIndex < week.length) ? week[dayIndex] : null;
    }
*/

    _onClick(day) {
        this._updateByDate(day.originalDate);

        return false;
    }

    _onKeyDown(ev) {
        var item = this.selection.getSelectedItems()[0];
        var targetDate = new Date(item.originalDate.toString());
        var date = targetDate.getDate();
        var viewModel = this.getViewModel();

        switch (ev.which) {
            case 37: // left
                targetDate.setDate(date - 1);
                break;

            case 39: // right
                targetDate.setDate(date + 1);
                break;

            case 38: // up
                targetDate.setDate(date - 7);
                break;

            case 40: // down
                targetDate.setDate(date + 7);
                break;

            default:
                return;
        }

        this._updateByDate(targetDate);

        return false;
    }

    _updateByDate(targetDate) {
        this.setData({
            year: targetDate.getFullYear(),
            month: targetDate.getMonth(),
            date: targetDate.getDate()
        });
    }

}

export = DatePickerBase;
