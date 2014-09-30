import DatePickerModel = require('./DatePickerModel');
import View = require('../onejs/View');
import DatePickerBase = require('./DatePickerBase');
import Repeater = require('../onejs/Repeater');
import DomUtils = require('../onejs/DomUtils');
import DatePickercss = require('./DatePicker.css');

DomUtils.loadStyles(DatePickercss.styles);

class DatePickerBlock0Item extends View {
    viewName = 'DatePickerBlock0Item';

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("td", ["class","dp-day-header"], bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "text": "day"
        }
    ];
}

class DatePickerBlock0 extends Repeater {
    viewName = 'DatePickerBlock0';
    childViewType = DatePickerBlock0Item;
    itemName = "day";

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("tr", ["class","dp-week-header"], bindings[0], this.getChildElements()));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class DatePickerBlock2Item extends View {
    viewName = 'DatePickerBlock2Item';

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("td", ["class","dp-day-cell"], bindings[0]));
    }

    _bindings = [
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

class DatePickerBlock2 extends Repeater {
    viewName = 'DatePickerBlock2';
    childViewType = DatePickerBlock2Item;
    itemName = "day";

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("tr", [], bindings[0], this.getChildElements()));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class DatePickerBlock1Item extends View {
    viewName = 'DatePickerBlock1Item';
    datePickerBlock2 = <any>this.addChild(new DatePickerBlock2());

    onInitialize() {
        super.onInitialize();
        this.datePickerBlock2.owner = this.owner;
    }

    onViewModelChanged() {
        super.onViewModelChanged();
        this.datePickerBlock2.setData({ items: this.getValue('week') });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this.datePickerBlock2.render());
    }
}

class DatePickerBlock1 extends Repeater {
    viewName = 'DatePickerBlock1';
    childViewType = DatePickerBlock1Item;
    itemName = "week";

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("tbody", [], bindings[0], this.getChildElements()));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class DatePicker extends DatePickerBase {
    viewName = 'DatePicker';
    viewModelType = DatePickerModel;
    datePickerBlock0 = <any>this.addChild(new DatePickerBlock0());
    datePickerBlock1 = <any>this.addChild(new DatePickerBlock1());

    onInitialize() {
        super.onInitialize();
        this.datePickerBlock0.owner = this;
        this.datePickerBlock1.owner = this;
    }

    onViewModelChanged() {
        super.onViewModelChanged();
        this.datePickerBlock0.setData({ items: this.getValue('$view._days') });
        this.datePickerBlock1.setData({ items: this.getValue('$view.weeks') });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","dp-control","tabindex","0"], bindings[0], [
            _this._ce("div", ["class","dp-month-header"], null, [
                _this._ce("a", ["href","#","class","dp-month-prev"], bindings[1], [
                    _this._ct("Prev")
                ]),
                _this._ce("a", ["href","#","class","dp-month-next"], bindings[2], [
                    _this._ct("Next")
                ]),
                _this._ce("div", ["class","dp-month-title"], bindings[3])
            ]),
            _this._ce("table", ["class","dp-calendar","cellpadding","0","cellspacing","0"], null, [
                _this._ce("thead", [], null, [
                    _this.datePickerBlock0.render()
                ]),
                _this.datePickerBlock1.render()
            ])
        ]));
    }

    _bindings = [
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

export = DatePicker;
