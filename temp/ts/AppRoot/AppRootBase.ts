import View = require('../onejs/View');
import DatePicker = require('../DatePicker/DatePicker');

class AppRootBase extends View {
    dp: DatePicker;

    onInitialize() {
        this.setData({
            selection: this.dp.selection
        });
    }
}

export = AppRootBase;
