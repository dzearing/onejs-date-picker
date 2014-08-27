import View = require('View');
import DatePicker = require('DatePicker');

class AppRootBase extends View {
    dp: DatePicker;

    onInitialize() {
        this.setData({
            selection: this.dp.selection
        });
    }
}

export = AppRootBase;
