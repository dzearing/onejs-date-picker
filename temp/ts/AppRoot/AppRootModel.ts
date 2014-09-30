import ViewModel = require('../onejs/ViewModel');

class AppRootModel extends ViewModel {
	selectedDate = new ViewModel({
		date: new Date().getDate(),
		month: new Date().getMonth(),
		year: new Date().getYear() 
	});
}

export = AppRootModel;