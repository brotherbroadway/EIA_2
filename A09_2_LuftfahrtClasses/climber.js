"use strict";
var A09_2_LuftfahrtClasses;
(function (A09_2_LuftfahrtClasses) {
    /*
Aufgabe: L09_2_LuftfahrtClasses
Name: Jona Ruder
Matrikel: 265274
Datum: 27.05.2023
Quellen: -
*/
    class Climber {
        constructor(_posX, _posY, _speedX, _speedY, _color, _id, _climbing) {
            this.posX = _posX;
            this.posY = _posY;
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.color = _color;
            this.id = _id;
            this.climbing = _climbing;
        }
        drawClimber() {
            //console.log("Person", this.posX, this.posY);
            let size = A09_2_LuftfahrtClasses.canvasW * 0.02;
            A09_2_LuftfahrtClasses.crc2.save();
            A09_2_LuftfahrtClasses.crc2.translate(this.posX, this.posY);
            // adds stickperson
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 1.3, -(size * 1.5));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 1.3, -(size * 0.2));
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 1.3, -(size));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 0.7, -(size * 1.3));
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 1.3, -(size));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 1.9, -(size * 1.2));
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 1.3, -(size * 0.2));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 0.7, size * 0.2);
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 1.3, -(size * 0.2));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 1.7, size * 0.2);
            A09_2_LuftfahrtClasses.crc2.strokeStyle = "black";
            A09_2_LuftfahrtClasses.crc2.lineWidth = size * 0.06;
            A09_2_LuftfahrtClasses.crc2.stroke();
            A09_2_LuftfahrtClasses.crc2.closePath();
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.arc(size * 1.3, -(size * 1.6), size * 0.3, 0, 2 * Math.PI);
            A09_2_LuftfahrtClasses.crc2.strokeStyle = "black";
            A09_2_LuftfahrtClasses.crc2.lineWidth = size * 0.12;
            A09_2_LuftfahrtClasses.crc2.stroke();
            A09_2_LuftfahrtClasses.crc2.fillStyle = this.color;
            A09_2_LuftfahrtClasses.crc2.fill();
            A09_2_LuftfahrtClasses.crc2.closePath();
            A09_2_LuftfahrtClasses.crc2.restore();
            // THE ANIMATION
            // set next position via speed
            this.posX += this.speedX;
            this.posY += this.speedY;
            // so climber doesn't continue going down
            if (this.speedY > 0) {
                this.speedY = -this.speedY;
            }
            // so climber doesn't go too high
            if (this.posY < A09_2_LuftfahrtClasses.horizon && !this.climbing) {
                this.speedX *= 0.1;
                this.speedY *= 0.5;
                this.climbing = true;
            }
            else if (Math.random() < 0.1) { // sometimes turns around randomly
                this.speedX = -this.speedX;
            }
            // switches randomly X speed while climbing
            if (this.climbing && Math.random() < 0.5) {
                this.speedX = -this.speedX;
            }
            if (this.climbing && this.posY < A09_2_LuftfahrtClasses.horizon - (A09_2_LuftfahrtClasses.canvasH * 0.1)) {
                delete A09_2_LuftfahrtClasses.allClimbers[this.id]; // using splice caused weird side effects
                console.log("Removed Climber X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
            }
        }
    }
    A09_2_LuftfahrtClasses.Climber = Climber;
})(A09_2_LuftfahrtClasses || (A09_2_LuftfahrtClasses = {}));
//# sourceMappingURL=climber.js.map