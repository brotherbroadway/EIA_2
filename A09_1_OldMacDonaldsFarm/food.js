"use strict";
var A09_1_OldMacDonaldsFarm;
(function (A09_1_OldMacDonaldsFarm) {
    class Food {
        constructor(_name, _amount, _color) {
            this.name = _name;
            this.amount = _amount;
            this.color = _color;
        }
        remove(_removeAmount) {
            this.amount -= _removeAmount;
        }
        getName() {
            return A09_1_OldMacDonaldsFarm.capitalism(this.name);
        }
    }
    A09_1_OldMacDonaldsFarm.Food = Food;
})(A09_1_OldMacDonaldsFarm || (A09_1_OldMacDonaldsFarm = {}));
//# sourceMappingURL=food.js.map