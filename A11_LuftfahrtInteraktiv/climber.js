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
    class Climber extends A11_LuftfahrtInteraktiv.Moveable {
        draw() {
            //console.log("Person", this.posX, this.posY);
            let size = A11_LuftfahrtInteraktiv.canvasW * 0.02;
            A11_LuftfahrtInteraktiv.crc2.save();
            A11_LuftfahrtInteraktiv.crc2.translate(this.posX, this.posY);
            // adds stickperson
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 1.3, -(size * 1.5));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 1.3, -(size * 0.2));
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 1.3, -(size));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 0.7, -(size * 1.3));
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 1.3, -(size));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 1.9, -(size * 1.2));
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 1.3, -(size * 0.2));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 0.7, size * 0.2);
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 1.3, -(size * 0.2));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 1.7, size * 0.2);
            A11_LuftfahrtInteraktiv.crc2.strokeStyle = "black";
            A11_LuftfahrtInteraktiv.crc2.lineWidth = size * 0.06;
            A11_LuftfahrtInteraktiv.crc2.stroke();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.arc(size * 1.3, -(size * 1.6), size * 0.3, 0, 2 * Math.PI);
            A11_LuftfahrtInteraktiv.crc2.strokeStyle = "black";
            A11_LuftfahrtInteraktiv.crc2.lineWidth = size * 0.12;
            A11_LuftfahrtInteraktiv.crc2.stroke();
            A11_LuftfahrtInteraktiv.crc2.fillStyle = this.color;
            A11_LuftfahrtInteraktiv.crc2.fill();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            A11_LuftfahrtInteraktiv.crc2.restore();
            // THE ANIMATION
            // set next position via speed
            this.posX += this.speedX;
            this.posY += this.speedY;
            // so climber doesn't continue going down
            if (this.speedY > 0) {
                this.speedY = -this.speedY;
            }
            // so climber doesn't go too high
            if (this.posY < A11_LuftfahrtInteraktiv.horizon && !this.starter) {
                this.speedX *= 0.1;
                this.speedY *= 0.5;
                this.starter = true;
            }
            else if (Math.random() < 0.1) { // sometimes turns around randomly
                this.speedX = -this.speedX;
            }
            // switches randomly X speed while climbing
            if (this.starter && Math.random() < 0.5) {
                this.speedX = -this.speedX;
            }
            if (this.starter && this.posY < A11_LuftfahrtInteraktiv.horizon - (A11_LuftfahrtInteraktiv.canvasH * 0.1)) {
                delete A11_LuftfahrtInteraktiv.allMoveables[this.id]; // using splice caused weird side effects
                console.log("Removed Climber X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
            }
        }
    }
    A11_LuftfahrtInteraktiv.Climber = Climber;
})(A11_LuftfahrtInteraktiv || (A11_LuftfahrtInteraktiv = {}));
//# sourceMappingURL=climber.js.map