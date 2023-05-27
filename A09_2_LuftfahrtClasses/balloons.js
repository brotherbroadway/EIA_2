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
    class Balloon {
        constructor(_posX, _posY, _speedX, _speedY, _balloonColor, _personColor, _id, _starter) {
            this.posX = _posX;
            this.posY = _posY;
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.balloonColor = _balloonColor;
            this.personColor = _personColor;
            this.id = _id;
            this.starter = _starter;
        }
        // draws hot air balloon with passenger
        drawHotAirBalloon() {
            //console.log("HotAirBalloon", this.posX, this.posY);
            let size = A09_2_LuftfahrtClasses.canvasW * 0.02;
            A09_2_LuftfahrtClasses.crc2.save();
            A09_2_LuftfahrtClasses.crc2.translate(this.posX, this.posY);
            // adds basket inside
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(0, -(size * 0.6) - (size * 0.6));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 1.5, -(size * 0.6) - (size * 0.6));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 2.5, -(size * 0.6));
            A09_2_LuftfahrtClasses.crc2.lineTo(size, -(size * 0.6));
            A09_2_LuftfahrtClasses.crc2.fillStyle = "rgba(60, 00, 00, 1)";
            A09_2_LuftfahrtClasses.crc2.fill();
            A09_2_LuftfahrtClasses.crc2.closePath();
            // adds back strings
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(1, -(size * 0.6) - (size * 0.6));
            A09_2_LuftfahrtClasses.crc2.lineTo(1, -(size * 2.6));
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 1.5, -(size * 0.6) - (size * 0.6));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 1.5, -(size * 2.6));
            A09_2_LuftfahrtClasses.crc2.strokeStyle = "white";
            A09_2_LuftfahrtClasses.crc2.lineWidth = size * 0.08;
            A09_2_LuftfahrtClasses.crc2.stroke();
            A09_2_LuftfahrtClasses.crc2.closePath();
            // adds stickperson
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 1.3, -(size * 1.5));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 1.3, -(size * 0.2));
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 1.3, -(size));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 0.7, -(size * 1.3));
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 1.3, -(size));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 1.9, -(size * 1.2));
            A09_2_LuftfahrtClasses.crc2.strokeStyle = "black";
            A09_2_LuftfahrtClasses.crc2.lineWidth = size * 0.06;
            A09_2_LuftfahrtClasses.crc2.stroke();
            A09_2_LuftfahrtClasses.crc2.closePath();
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.arc(size * 1.3, -(size * 1.6), size * 0.3, 0, 2 * Math.PI);
            A09_2_LuftfahrtClasses.crc2.strokeStyle = "black";
            A09_2_LuftfahrtClasses.crc2.lineWidth = size * 0.12;
            A09_2_LuftfahrtClasses.crc2.stroke();
            A09_2_LuftfahrtClasses.crc2.fillStyle = this.personColor;
            A09_2_LuftfahrtClasses.crc2.fill();
            A09_2_LuftfahrtClasses.crc2.closePath();
            // adds basket side
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(0, 0);
            A09_2_LuftfahrtClasses.crc2.lineTo(size, size * 0.6);
            A09_2_LuftfahrtClasses.crc2.lineTo(size, -(size * 0.6));
            A09_2_LuftfahrtClasses.crc2.lineTo(0, -(size * 0.6) - (size * 0.6));
            A09_2_LuftfahrtClasses.crc2.fillStyle = "rgba(100, 20, 20, 1)";
            A09_2_LuftfahrtClasses.crc2.fill();
            A09_2_LuftfahrtClasses.crc2.closePath();
            // adds basket front
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(size, size * 0.6);
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 2.5, size * 0.6);
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 2.5, -(size * 0.6));
            A09_2_LuftfahrtClasses.crc2.lineTo(size, -(size * 0.6));
            A09_2_LuftfahrtClasses.crc2.fillStyle = "brown";
            A09_2_LuftfahrtClasses.crc2.fill();
            A09_2_LuftfahrtClasses.crc2.closePath();
            // adds front strings
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(size, -(size * 0.6));
            A09_2_LuftfahrtClasses.crc2.lineTo(size, -(size * 2.2));
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 2.4, -(size * 0.6));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 2.4, -(size * 2.2));
            A09_2_LuftfahrtClasses.crc2.strokeStyle = "white";
            A09_2_LuftfahrtClasses.crc2.lineWidth = size * 0.08;
            A09_2_LuftfahrtClasses.crc2.stroke();
            A09_2_LuftfahrtClasses.crc2.closePath();
            // adds balloon
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 2.4, -(size * 2.2));
            A09_2_LuftfahrtClasses.crc2.bezierCurveTo((size * 7), -(size * 8), -(size * 4), -(size * 8), 1, -(size * 2.6));
            A09_2_LuftfahrtClasses.crc2.lineTo(size, -(size * 2.2));
            A09_2_LuftfahrtClasses.crc2.closePath();
            let gradient = A09_2_LuftfahrtClasses.crc2.createRadialGradient(size * 6, -(size * 15), size * 0.5, -(size * 1), size * 2, size * 4);
            // adds smol gradient
            gradient.addColorStop(0, "white");
            gradient.addColorStop(1, this.balloonColor);
            A09_2_LuftfahrtClasses.crc2.fillStyle = gradient;
            A09_2_LuftfahrtClasses.crc2.fill();
            A09_2_LuftfahrtClasses.crc2.restore();
            // THE ANIMATION
            // set next position via speed
            this.posX += this.speedX;
            this.posY += this.speedY;
            // so balloons don't sink too low
            if (this.posY > A09_2_LuftfahrtClasses.horizon - A09_2_LuftfahrtClasses.canvasH * (Math.random() * 0.1)) {
                this.speedY = -this.speedY;
            }
            else if (A09_2_LuftfahrtClasses.getRandomBool()) {
                // random height
                this.speedY = -this.speedY;
            }
            // sometimes turns around randomly
            if (Math.random() < 0.1) {
                this.speedX = -this.speedX;
            }
            // removes balloon if it was on canvas before and then exited the canvas
            if (this.starter) {
                // if outside of canvas X or -X or -Y
                if (this.posX < -A09_2_LuftfahrtClasses.canvasW * 0.1 || this.posX > A09_2_LuftfahrtClasses.canvasW * 1.1 || this.posY < -A09_2_LuftfahrtClasses.canvasH * 0.05) {
                    delete A09_2_LuftfahrtClasses.allBalloons[this.id]; // using splice caused weird side effects
                    console.log("Removed Balloon X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
                }
            }
            else if (this.posX > 0 || this.posX < A09_2_LuftfahrtClasses.canvasW) {
                this.starter = true;
            }
        }
    }
    A09_2_LuftfahrtClasses.Balloon = Balloon;
})(A09_2_LuftfahrtClasses || (A09_2_LuftfahrtClasses = {}));
//# sourceMappingURL=balloons.js.map