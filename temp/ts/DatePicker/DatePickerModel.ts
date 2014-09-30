import ViewModel = require('../onejs/ViewModel');

class DatePickerModel extends ViewModel {
    month = new Date().getMonth() + 1;
    year = new Date().getFullYear();
    date = 1;
}

export = DatePickerModel;
