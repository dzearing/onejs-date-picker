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
        }
        AppRoot.prototype.onViewModelChanged = function () {
            _super.prototype.onViewModelChanged.call(this);
            this.dp.setData({ month: 10, year: 1977 });
        };

        AppRoot.prototype.onRender = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("div", ["class", "c-AppRoot"], null, [
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
