import View = require('View');
import AppRootBase = require('AppRootBase');
import DatePicker = require('DatePicker');
import DomUtils = require('DomUtils');
import AppRootcss = require('AppRoot.css');

DomUtils.loadStyles(AppRootcss.styles);

class AppRoot extends AppRootBase {
    viewName = 'AppRoot';
    dp = <any>this.addChild(new DatePicker());

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","c-AppRoot"], null, [
            _this._ce("div", ["class","selectionDescription"], null, [
                _this._ct("\n            You have selected "),
                _this._ce("span", [], bindings[0]),
                _this._ct("-"),
                _this._ce("span", [], bindings[1]),
                _this._ct("-"),
                _this._ce("span", [], bindings[2]),
                _this._ct(".\n        ")
            ]),
            _this._ce("div", ["class","controlArea"], null, [
                _this.dp.renderElement()
            ]),
            _this._ce("div", ["id","morePickers","class","controlArea"])
        ]));
    }

    _bindings = [
        {
            "id": "0",
            "text": "selection.selectedItem.month"
        },
        {
            "id": "1",
            "text": "selection.selectedItem.date"
        },
        {
            "id": "2",
            "text": "selection.selectedItem.year"
        }
    ];
}

export = AppRoot;
