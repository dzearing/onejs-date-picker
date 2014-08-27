import ViewModel = require('ViewModel');

class DatePickerModel extends ViewModel {
    month = new Date().getMonth();
    year = new Date().getFullYear();
    date = 1;
}

export = DatePickerModel;
