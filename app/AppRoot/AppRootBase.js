var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/View'], function(require, exports, View) {
    var AppRootBase = (function (_super) {
        __extends(AppRootBase, _super);
        function AppRootBase() {
            _super.apply(this, arguments);
        }
        AppRootBase.prototype.onInitialize = function () {
            this.setData({
                selection: this.dp.selection
            });
        };
        return AppRootBase;
    })(View);

    
    return AppRootBase;
});
