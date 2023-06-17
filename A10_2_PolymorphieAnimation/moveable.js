"use strict";
var A10_2_PolymorphieAnimation;
(function (A10_2_PolymorphieAnimation) {
    /*
Aufgabe: L10_2_PolymorphieAnimation
Name: Jona Ruder
Matrikel: 265274
Datum: 17.06.2023
Quellen: -
*/
    class Moveable {
        constructor(_posX, _posY, _speedX, _speedY, _color, _id, _starter) {
            this.posX = _posX;
            this.posY = _posY;
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.color = _color;
            this.id = _id;
            this.starter = _starter;
        }
        draw() {
            // console.log("Moveable");
        }
    }
    A10_2_PolymorphieAnimation.Moveable = Moveable;
})(A10_2_PolymorphieAnimation || (A10_2_PolymorphieAnimation = {}));
//# sourceMappingURL=moveable.js.map