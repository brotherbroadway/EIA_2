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
    class People extends A10_2_PolymorphieAnimation.Moveable {
        draw() {
            //console.log("Person", this.posX, this.posY);
            let size = A10_2_PolymorphieAnimation.canvasW * 0.02;
            A10_2_PolymorphieAnimation.crc2.save();
            A10_2_PolymorphieAnimation.crc2.translate(this.posX, this.posY);
            // adds stickperson
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 1.3, -(size * 1.5));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 1.3, -(size * 0.2));
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 1.3, -(size));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 0.7, -(size * 1.3));
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 1.3, -(size));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 1.9, -(size * 1.2));
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 1.3, -(size * 0.2));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 0.7, size * 0.2);
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 1.3, -(size * 0.2));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 1.7, size * 0.2);
            A10_2_PolymorphieAnimation.crc2.strokeStyle = "black";
            A10_2_PolymorphieAnimation.crc2.lineWidth = size * 0.06;
            A10_2_PolymorphieAnimation.crc2.stroke();
            A10_2_PolymorphieAnimation.crc2.closePath();
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.arc(size * 1.3, -(size * 1.6), size * 0.3, 0, 2 * Math.PI);
            A10_2_PolymorphieAnimation.crc2.strokeStyle = "black";
            A10_2_PolymorphieAnimation.crc2.lineWidth = size * 0.12;
            A10_2_PolymorphieAnimation.crc2.stroke();
            A10_2_PolymorphieAnimation.crc2.fillStyle = this.color;
            A10_2_PolymorphieAnimation.crc2.fill();
            A10_2_PolymorphieAnimation.crc2.closePath();
            A10_2_PolymorphieAnimation.crc2.restore();
            // THE ANIMATION
            // set next position via speed
            this.posX += this.speedX;
            this.posY += this.speedY;
            // so person doesn't go too high
            if (this.posY < A10_2_PolymorphieAnimation.horizon + (A10_2_PolymorphieAnimation.canvasH * 0.15)) {
                this.speedY = -this.speedY;
            }
            else if (A10_2_PolymorphieAnimation.getRandomBool()) {
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
                if (this.posX < -A10_2_PolymorphieAnimation.canvasW * 0.1 || this.posX > A10_2_PolymorphieAnimation.canvasW * 1.1 || this.posY > A10_2_PolymorphieAnimation.canvasH * 1.05) {
                    delete A10_2_PolymorphieAnimation.allMoveables[this.id]; // using splice caused weird side effects
                    console.log("Removed Person X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
                }
            }
            else if (this.posX > 0 || this.posX < A10_2_PolymorphieAnimation.canvasW) {
                this.starter = true;
            }
        }
    }
    A10_2_PolymorphieAnimation.People = People;
})(A10_2_PolymorphieAnimation || (A10_2_PolymorphieAnimation = {}));
//# sourceMappingURL=people.js.map