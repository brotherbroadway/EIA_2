"use strict";
var A11_LuftfahrtInteraktiv;
(function (A11_LuftfahrtInteraktiv) {
    /*
Aufgabe: L11_LuftfahrtInteraktiv
Name: Jona Ruder
Matrikel: 265274
Datum: 24.06.2023
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
        getHeadPos(_eventX, _eventY) {
            // abstract makes it so all other subclasses need it to be defined, so i didn't go with that
        }
    }
    A11_LuftfahrtInteraktiv.Moveable = Moveable;
})(A11_LuftfahrtInteraktiv || (A11_LuftfahrtInteraktiv = {}));
//# sourceMappingURL=moveable.js.map