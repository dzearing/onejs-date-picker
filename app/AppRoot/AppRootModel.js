var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/ViewModel'], function(require, exports, ViewModel) {
    var AppRootModel = (function (_super) {
        __extends(AppRootModel, _super);
        function AppRootModel() {
            _super.apply(this, arguments);
            this.selectedDate = new ViewModel({
                date: new Date().getDate(),
                month: new Date().getMonth(),
                year: new Date().getFullYear()
            });
        }
        return AppRootModel;
    })(ViewModel);

    
    return AppRootModel;
});
