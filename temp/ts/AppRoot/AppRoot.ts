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
            _this._ce("div", ["class","selectionDescription"], null, [
                _this._ct("\n        You have selected "),
                _this._ce("span", [], bindings[0]),
                _this._ct("-"),
                _this._ce("span", [], bindings[1]),
                _this._ct("-"),
                _this._ce("span", [], bindings[2]),
                _this._ct(".\n    ")
            ]),
            _this._ce("div", ["class","controlArea"], null, [
                _this.dp.render()
            ]),
            _this._ce("div", ["id","morePickers","class","controlArea"])
        ]));
    }

    _bindings = [
        {
            "id": "0",
            "text": "$view.dp._viewModel.month"
        },
        {
            "id": "1",
            "text": "$view.dp._viewModel.date"
        },
        {
            "id": "2",
            "text": "$view.dp._viewModel.year"
        }
    ];
}

export = AppRoot;
