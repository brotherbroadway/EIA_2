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
    class Balloon extends A10_2_PolymorphieAnimation.Moveable {
        constructor(_posX, _posY, _speedX, _speedY, _color, _personColor, _id, _starter) {
            super(_posX, _posY, _speedX, _speedY, _color, _id, _starter);
            this.personColor = _personColor;
        }
        // draws hot air balloon with passenger
        draw() {
            //console.log("HotAirBalloon", this.posX, this.posY);
            let size = A10_2_PolymorphieAnimation.canvasW * 0.02;
            A10_2_PolymorphieAnimation.crc2.save();
            A10_2_PolymorphieAnimation.crc2.translate(this.posX, this.posY);
            // adds basket inside
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.moveTo(0, -(size * 0.6) - (size * 0.6));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 1.5, -(size * 0.6) - (size * 0.6));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 2.5, -(size * 0.6));
            A10_2_PolymorphieAnimation.crc2.lineTo(size, -(size * 0.6));
            A10_2_PolymorphieAnimation.crc2.fillStyle = "rgba(60, 00, 00, 1)";
            A10_2_PolymorphieAnimation.crc2.fill();
            A10_2_PolymorphieAnimation.crc2.closePath();
            // adds back strings
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.moveTo(1, -(size * 0.6) - (size * 0.6));
            A10_2_PolymorphieAnimation.crc2.lineTo(1, -(size * 2.6));
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 1.5, -(size * 0.6) - (size * 0.6));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 1.5, -(size * 2.6));
            A10_2_PolymorphieAnimation.crc2.strokeStyle = "white";
            A10_2_PolymorphieAnimation.crc2.lineWidth = size * 0.08;
            A10_2_PolymorphieAnimation.crc2.stroke();
            A10_2_PolymorphieAnimation.crc2.closePath();
            // adds stickperson
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 1.3, -(size * 1.5));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 1.3, -(size * 0.2));
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 1.3, -(size));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 0.7, -(size * 1.3));
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 1.3, -(size));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 1.9, -(size * 1.2));
            A10_2_PolymorphieAnimation.crc2.strokeStyle = "black";
            A10_2_PolymorphieAnimation.crc2.lineWidth = size * 0.06;
            A10_2_PolymorphieAnimation.crc2.stroke();
            A10_2_PolymorphieAnimation.crc2.closePath();
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.arc(size * 1.3, -(size * 1.6), size * 0.3, 0, 2 * Math.PI);
            A10_2_PolymorphieAnimation.crc2.strokeStyle = "black";
            A10_2_PolymorphieAnimation.crc2.lineWidth = size * 0.12;
            A10_2_PolymorphieAnimation.crc2.stroke();
            A10_2_PolymorphieAnimation.crc2.fillStyle = this.personColor;
            A10_2_PolymorphieAnimation.crc2.fill();
            A10_2_PolymorphieAnimation.crc2.closePath();
            // adds basket side
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.moveTo(0, 0);
            A10_2_PolymorphieAnimation.crc2.lineTo(size, size * 0.6);
            A10_2_PolymorphieAnimation.crc2.lineTo(size, -(size * 0.6));
            A10_2_PolymorphieAnimation.crc2.lineTo(0, -(size * 0.6) - (size * 0.6));
            A10_2_PolymorphieAnimation.crc2.fillStyle = "rgba(100, 20, 20, 1)";
            A10_2_PolymorphieAnimation.crc2.fill();
            A10_2_PolymorphieAnimation.crc2.closePath();
            // adds basket front
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.moveTo(size, size * 0.6);
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 2.5, size * 0.6);
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 2.5, -(size * 0.6));
            A10_2_PolymorphieAnimation.crc2.lineTo(size, -(size * 0.6));
            A10_2_PolymorphieAnimation.crc2.fillStyle = "brown";
            A10_2_PolymorphieAnimation.crc2.fill();
            A10_2_PolymorphieAnimation.crc2.closePath();
            // adds front strings
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.moveTo(size, -(size * 0.6));
            A10_2_PolymorphieAnimation.crc2.lineTo(size, -(size * 2.2));
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 2.4, -(size * 0.6));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 2.4, -(size * 2.2));
            A10_2_PolymorphieAnimation.crc2.strokeStyle = "white";
            A10_2_PolymorphieAnimation.crc2.lineWidth = size * 0.08;
            A10_2_PolymorphieAnimation.crc2.stroke();
            A10_2_PolymorphieAnimation.crc2.closePath();
            // adds balloon
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 2.4, -(size * 2.2));
            A10_2_PolymorphieAnimation.crc2.bezierCurveTo((size * 7), -(size * 8), -(size * 4), -(size * 8), 1, -(size * 2.6));
            A10_2_PolymorphieAnimation.crc2.lineTo(size, -(size * 2.2));
            A10_2_PolymorphieAnimation.crc2.closePath();
            let gradient = A10_2_PolymorphieAnimation.crc2.createRadialGradient(size * 6, -(size * 15), size * 0.5, -(size * 1), size * 2, size * 4);
            // adds smol gradient
            gradient.addColorStop(0, "white");
            gradient.addColorStop(1, this.color);
            A10_2_PolymorphieAnimation.crc2.fillStyle = gradient;
            A10_2_PolymorphieAnimation.crc2.fill();
            A10_2_PolymorphieAnimation.crc2.restore();
            // THE ANIMATION
            // set next position via speed
            this.posX += this.speedX;
            this.posY += this.speedY;
            // so balloons don't sink too low
            if (this.posY > A10_2_PolymorphieAnimation.horizon - A10_2_PolymorphieAnimation.canvasH * (Math.random() * 0.1)) {
                this.speedY = -this.speedY;
            }
            else if (A10_2_PolymorphieAnimation.getRandomBool()) {
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
                if (this.posX < -A10_2_PolymorphieAnimation.canvasW * 0.1 || this.posX > A10_2_PolymorphieAnimation.canvasW * 1.1 || this.posY < -A10_2_PolymorphieAnimation.canvasH * 0.05) {
                    delete A10_2_PolymorphieAnimation.allMoveables[this.id]; // using splice caused weird side effects
                    console.log("Removed Balloon X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
                }
            }
            else if (this.posX > 0 || this.posX < A10_2_PolymorphieAnimation.canvasW) {
                this.starter = true;
            }
        }
    }
    A10_2_PolymorphieAnimation.Balloon = Balloon;
})(A10_2_PolymorphieAnimation || (A10_2_PolymorphieAnimation = {}));
//# sourceMappingURL=balloons.js.map