var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'DatePickerModel', 'View', 'DatePickerBase', 'Repeater', 'DomUtils', 'DatePicker.css'], function(require, exports, DatePickerModel, View, DatePickerBase, Repeater, DomUtils, DatePickercss) {
    DomUtils.loadStyles(DatePickercss.styles);

    var DatePickerBlock0Item = (function (_super) {
        __extends(DatePickerBlock0Item, _super);
        function DatePickerBlock0Item() {
            _super.apply(this, arguments);
            this.viewName = 'DatePickerBlock0Item';
            this._bindings = [
                {
                    "id": "0",
                    "text": "day"
                }
            ];
        }
        DatePickerBlock0Item.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("td", ["class", "dp-day-header"], bindings[0]));
        };
        return DatePickerBlock0Item;
    })(View);

    var DatePickerBlock0 = (function (_super) {
        __extends(DatePickerBlock0, _super);
        function DatePickerBlock0() {
            _super.apply(this, arguments);
            this.viewName = 'DatePickerBlock0';
            this.childViewType = DatePickerBlock0Item;
            this.itemName = "day";
            this._bindings = [
                {
                    "id": "0",
                    "childId": "surface"
                }
            ];
        }
        DatePickerBlock0.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("tr", ["class", "dp-week-header"], bindings[0], this.getChildElements()));
        };
        return DatePickerBlock0;
    })(Repeater);

    var DatePickerBlock2Item = (function (_super) {
        __extends(DatePickerBlock2Item, _super);
        function DatePickerBlock2Item() {
            _super.apply(this, arguments);
            this.viewName = 'DatePickerBlock2Item';
            this._bindings = [
                {
                    "id": "0",
                    "text": "day.date",
                    "className": {
                        "isInMonth": "day.isInMonth",
                        "isToday": "day.isToday",
                        "isSelected": "day.isSelected"
                    },
                    "events": {
                        "click": [
                            "$owner._onClick(day)"
                        ]
                    }
                }
            ];
        }
        DatePickerBlock2Item.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("td", ["class", "dp-day-cell"], bindings[0]));
        };
        return DatePickerBlock2Item;
    })(View);

    var DatePickerBlock2 = (function (_super) {
        __extends(DatePickerBlock2, _super);
        function DatePickerBlock2() {
            _super.apply(this, arguments);
            this.viewName = 'DatePickerBlock2';
            this.childViewType = DatePickerBlock2Item;
            this.itemName = "day";
            this._bindings = [
                {
                    "id": "0",
                    "childId": "surface"
                }
            ];
        }
        DatePickerBlock2.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("tr", [], bindings[0], this.getChildElements()));
        };
        return DatePickerBlock2;
    })(Repeater);

    var DatePickerBlock1Item = (function (_super) {
        __extends(DatePickerBlock1Item, _super);
        function DatePickerBlock1Item() {
            _super.apply(this, arguments);
            this.viewName = 'DatePickerBlock1Item';
            this.datePickerBlock2 = this.addChild(new DatePickerBlock2());
        }
        DatePickerBlock1Item.prototype.onInitialize = function () {
            _super.prototype.onInitialize.call(this);
            this.datePickerBlock2.owner = this.owner;
        };

        DatePickerBlock1Item.prototype.onViewModelChanged = function () {
            _super.prototype.onViewModelChanged.call(this);
            this.datePickerBlock2.setData({ items: this.getValue('week') });
        };

        DatePickerBlock1Item.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this.datePickerBlock2.renderElement());
        };
        return DatePickerBlock1Item;
    })(View);

    var DatePickerBlock1 = (function (_super) {
        __extends(DatePickerBlock1, _super);
        function DatePickerBlock1() {
            _super.apply(this, arguments);
            this.viewName = 'DatePickerBlock1';
            this.childViewType = DatePickerBlock1Item;
            this.itemName = "week";
            this._bindings = [
                {
                    "id": "0",
                    "childId": "surface"
                }
            ];
        }
        DatePickerBlock1.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("tbody", [], bindings[0], this.getChildElements()));
        };
        return DatePickerBlock1;
    })(Repeater);

    var DatePicker = (function (_super) {
        __extends(DatePicker, _super);
        function DatePicker() {
            _super.apply(this, arguments);
            this.viewName = 'DatePicker';
            this.viewModelType = DatePickerModel;
            this.datePickerBlock0 = this.addChild(new DatePickerBlock0());
            this.datePickerBlock1 = this.addChild(new DatePickerBlock1());
            this._bindings = [
                {
                    "id": "0",
                    "events": {
                        "keydown": [
                            "$view._onKeyDown"
                        ]
                    }
                },
                {
                    "id": "1",
                    "events": {
                        "click": [
                            "$view.adjustMonth"
                        ]
                    }
                },
                {
                    "id": "2",
                    "events": {
                        "click": [
                            "$view.adjustMonth('next')"
                        ]
                    }
                },
                {
                    "id": "3",
                    "text": "$view.titleText"
                }
            ];
        }
        DatePicker.prototype.onInitialize = function () {
            _super.prototype.onInitialize.call(this);
            this.datePickerBlock0.owner = this;
            this.datePickerBlock1.owner = this;
        };

        DatePicker.prototype.onViewModelChanged = function () {
            _super.prototype.onViewModelChanged.call(this);
            this.datePickerBlock0.setData({ items: this.getValue('$view._days') });
            this.datePickerBlock1.setData({ items: this.getValue('$view.weeks') });
        };

        DatePicker.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("div", ["class", "dp-control", "tabindex", "0"], bindings[0], [
                _this._ce("div", ["class", "dp-month-header"], null, [
                    _this._ce("a", ["href", "#", "class", "dp-month-prev"], bindings[1], [
                        _this._ct("Prev")
                    ]),
                    _this._ce("a", ["href", "#", "class", "dp-month-next"], bindings[2], [
                        _this._ct("Next")
                    ]),
                    _this._ce("div", ["class", "dp-month-title"], bindings[3])
                ]),
                _this._ce("table", ["class", "dp-calendar", "cellpadding", "0", "cellspacing", "0"], null, [
                    _this._ce("thead", [], null, [
                        _this.datePickerBlock0.renderElement()
                    ]),
                    _this.datePickerBlock1.renderElement()
                ])
            ]));
        };
        return DatePicker;
    })(DatePickerBase);

    
    return DatePicker;
});
