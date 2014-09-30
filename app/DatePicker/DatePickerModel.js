var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/ViewModel'], function(require, exports, ViewModel) {
    var DatePickerModel = (function (_super) {
        __extends(DatePickerModel, _super);
        function DatePickerModel() {
            _super.apply(this, arguments);
            this.month = new Date().getMonth() + 1;
            this.year = new Date().getFullYear();
            this.date = 1;
        }
        return DatePickerModel;
    })(ViewModel);

    
    return DatePickerModel;
});
