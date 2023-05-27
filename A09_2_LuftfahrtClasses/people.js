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
    class People {
        constructor(_posX, _posY, _speedX, _speedY, _color, _id, _starter) {
            this.posX = _posX;
            this.posY = _posY;
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.color = _color;
            this.id = _id;
            this.starter = _starter;
        }
        drawPerson() {
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
            // so person doesn't go too high
            if (this.posY < A09_2_LuftfahrtClasses.horizon + (A09_2_LuftfahrtClasses.canvasH * 0.15)) {
                this.speedY = -this.speedY;
            }
            else if (A09_2_LuftfahrtClasses.getRandomBool()) {
                // random height
                this.speedY = -this.speedY;
            }
            // sometimes turns around randomly
            if (Math.random() < 0.075) {
                this.speedX = -this.speedX;
            }
            // removes person if it was on canvas before and then exited the canvas
            if (this.starter) {
                // if outside of canvas X or -X or -Y
                if (this.posX < -A09_2_LuftfahrtClasses.canvasW * 0.1 || this.posX > A09_2_LuftfahrtClasses.canvasW * 1.1 || this.posY > A09_2_LuftfahrtClasses.canvasH * 1.05) {
                    delete A09_2_LuftfahrtClasses.allPeople[this.id]; // using splice caused weird side effects
                    console.log("Removed Person X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
                }
            }
            else if (this.posX > 0 || this.posX < A09_2_LuftfahrtClasses.canvasW) {
                this.starter = true;
            }
        }
    }
    A09_2_LuftfahrtClasses.People = People;
})(A09_2_LuftfahrtClasses || (A09_2_LuftfahrtClasses = {}));
//# sourceMappingURL=people.js.map