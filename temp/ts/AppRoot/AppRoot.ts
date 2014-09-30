import View = require('../onejs/View');
import DatePicker = require('../DatePicker/DatePicker');
import DomUtils = require('../onejs/DomUtils');
import AppRootcss = require('./AppRoot.css');

DomUtils.loadStyles(AppRootcss.styles);

class AppRoot extends View {
    viewName = 'AppRoot';
    dp = <any>this.addChild(new DatePicker());

    onViewModelChanged() {
        super.onViewModelChanged();
        this.dp.setData({ month: 10, year: 1977 });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","c-AppRoot"], null, [
            _this._ce("div", ["class","controlArea"], null, [
                _this.dp.render()
            ]),
            _this._ce("div", ["id","morePickers","class","controlArea"])
        ]));
    }
}

export = AppRoot;
