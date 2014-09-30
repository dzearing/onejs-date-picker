var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/View', '../DatePicker/DatePicker', '../onejs/DomUtils', './AppRoot.css'], function(require, exports, View, DatePicker, DomUtils, AppRootcss) {
    DomUtils.loadStyles(AppRootcss.styles);

    var AppRoot = (function (_super) {
        __extends(AppRoot, _super);
        function AppRoot() {
            _super.apply(this, arguments);
            this.viewName = 'AppRoot';
            this.dp = this.addChild(new DatePicker());
            this._bindings = [
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
        AppRoot.prototype.onViewModelChanged = function () {
            _super.prototype.onViewModelChanged.call(this);
            this.dp.setData({ month: 10, year: 1977 });
        };

        AppRoot.prototype.onRender = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("div", ["class", "c-AppRoot"], null, [
                _this._ce("div", ["class", "selectionDescription"], null, [
                    _this._ct("\n        You have selected "),
                    _this._ce("span", [], bindings[0]),
                    _this._ct("-"),
                    _this._ce("span", [], bindings[1]),
                    _this._ct("-"),
                    _this._ce("span", [], bindings[2]),
                    _this._ct(".\n    ")
                ]),
                _this._ce("div", ["class", "controlArea"], null, [
                    _this.dp.render()
                ]),
                _this._ce("div", ["id", "morePickers", "class", "controlArea"])
            ]));
        };
        return AppRoot;
    })(View);

    
    return AppRoot;
});
