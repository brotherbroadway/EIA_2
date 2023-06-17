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
    class Dragonfly extends A10_2_PolymorphieAnimation.Moveable {
        constructor(_posX, _posY, _speedX, _speedY, _color, _wingsUp, _id, _starter) {
            super(_posX, _posY, _speedX, _speedY, _color, _id, _starter);
            this.wingsUp = _wingsUp;
        }
        // adds dragonfly in foreground
        draw() {
            //console.log("Dragonfly", this.posX, this.posY);
            let size = A10_2_PolymorphieAnimation.canvasW * 0.02;
            A10_2_PolymorphieAnimation.crc2.save();
            A10_2_PolymorphieAnimation.crc2.translate(this.posX, this.posY);
            // adds right eye
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.arc(-(size * 0.8), size * 0.3, size * 0.1, 0, 2 * Math.PI);
            A10_2_PolymorphieAnimation.crc2.strokeStyle = "darkred";
            A10_2_PolymorphieAnimation.crc2.lineWidth = size * 0.08;
            A10_2_PolymorphieAnimation.crc2.stroke();
            A10_2_PolymorphieAnimation.crc2.fillStyle = "red";
            A10_2_PolymorphieAnimation.crc2.fill();
            A10_2_PolymorphieAnimation.crc2.closePath();
            // adds right legs
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 0.2, -(size * 0.2));
            A10_2_PolymorphieAnimation.crc2.lineTo(-(size * 0.3), -(size * 0.4));
            A10_2_PolymorphieAnimation.crc2.lineTo(-(size * 0.4), 0);
            A10_2_PolymorphieAnimation.crc2.moveTo(-(size * 0.1), size * 0.1);
            A10_2_PolymorphieAnimation.crc2.lineTo(-(size * 0.5), -(size * 0.2));
            A10_2_PolymorphieAnimation.crc2.lineTo(-(size * 0.6), size * 0.2);
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 0.6, -(size * 0.5));
            A10_2_PolymorphieAnimation.crc2.lineTo(0, -(size * 0.8));
            A10_2_PolymorphieAnimation.crc2.lineTo(-(size * 0.1), -(size * 0.4));
            A10_2_PolymorphieAnimation.crc2.strokeStyle = "rgba(160, 0, 0, 1)";
            A10_2_PolymorphieAnimation.crc2.lineWidth = size * 0.08;
            A10_2_PolymorphieAnimation.crc2.stroke();
            // adds right wing with animation
            if (this.wingsUp) {
                A10_2_PolymorphieAnimation.crc2.beginPath();
                A10_2_PolymorphieAnimation.crc2.ellipse(size * 0.2, -(size * 0.6), size * 0.2, size, Math.PI / 0.85, 0, 2 * Math.PI);
                A10_2_PolymorphieAnimation.crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                A10_2_PolymorphieAnimation.crc2.fill();
                A10_2_PolymorphieAnimation.crc2.closePath();
            }
            else {
                A10_2_PolymorphieAnimation.crc2.beginPath();
                A10_2_PolymorphieAnimation.crc2.ellipse(size * 0.1, -(size * 0.8), size * 0.2, size, Math.PI / 0.9, 0, 2 * Math.PI);
                A10_2_PolymorphieAnimation.crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                A10_2_PolymorphieAnimation.crc2.fill();
                A10_2_PolymorphieAnimation.crc2.closePath();
            }
            // adds body
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.ellipse(0, 0, size * 0.15, size, Math.PI / 4, 0, 2 * Math.PI);
            A10_2_PolymorphieAnimation.crc2.arc(-(size * 0.6), size * 0.5, size * 0.3, 0, 2 * Math.PI);
            A10_2_PolymorphieAnimation.crc2.fillStyle = this.color;
            A10_2_PolymorphieAnimation.crc2.fill();
            A10_2_PolymorphieAnimation.crc2.closePath();
            // adds left eye
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.arc(-(size * 0.5), size * 0.45, size * 0.1, 0, 2 * Math.PI);
            A10_2_PolymorphieAnimation.crc2.strokeStyle = "darkred";
            A10_2_PolymorphieAnimation.crc2.lineWidth = size * 0.08;
            A10_2_PolymorphieAnimation.crc2.stroke();
            A10_2_PolymorphieAnimation.crc2.fillStyle = "red";
            A10_2_PolymorphieAnimation.crc2.fill();
            A10_2_PolymorphieAnimation.crc2.closePath();
            // adds left legs
            A10_2_PolymorphieAnimation.crc2.beginPath();
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 0.4, -(size * 0.2));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 0.6, size * 0.1);
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 0.3, size * 0.4);
            A10_2_PolymorphieAnimation.crc2.moveTo(-(size * 0.1), size * 0.1);
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 0.2, size * 0.4);
            A10_2_PolymorphieAnimation.crc2.lineTo(-(size * 0.1), size * 0.7);
            A10_2_PolymorphieAnimation.crc2.moveTo(size * 0.7, -(size * 0.5));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 1, -(size * 0.2));
            A10_2_PolymorphieAnimation.crc2.lineTo(size * 0.7, size * 0.15);
            A10_2_PolymorphieAnimation.crc2.strokeStyle = "rgba(160, 0, 0, 1)";
            A10_2_PolymorphieAnimation.crc2.lineWidth = size * 0.08;
            A10_2_PolymorphieAnimation.crc2.stroke();
            // adds left wing with animation
            if (this.wingsUp) {
                A10_2_PolymorphieAnimation.crc2.beginPath();
                A10_2_PolymorphieAnimation.crc2.ellipse(size * 0.8, -(size * 0.25), size * 0.25, size, Math.PI / 2.8, 0, 2 * Math.PI);
                A10_2_PolymorphieAnimation.crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                A10_2_PolymorphieAnimation.crc2.fill();
                A10_2_PolymorphieAnimation.crc2.closePath();
                this.wingsUp = false;
            }
            else {
                A10_2_PolymorphieAnimation.crc2.beginPath();
                A10_2_PolymorphieAnimation.crc2.ellipse(size * 0.8, -(size * 0.1), size * 0.2, size, Math.PI / 2.4, 0, 2 * Math.PI);
                A10_2_PolymorphieAnimation.crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                A10_2_PolymorphieAnimation.crc2.fill();
                A10_2_PolymorphieAnimation.crc2.closePath();
                this.wingsUp = true;
            }
            A10_2_PolymorphieAnimation.crc2.restore();
            // THE ANIMATION
            // set next position via speed
            this.posX += this.speedX;
            this.posY += this.speedY;
            // so dragonflies don't go too high
            if (this.posY < A10_2_PolymorphieAnimation.horizon + A10_2_PolymorphieAnimation.canvasH * (Math.random() * 0.1)) {
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
            // removes dragonfly if it was on canvas before and then exited the canvas
            if (this.starter) {
                // if outside of canvas X or -X or -Y
                if (this.posX < -A10_2_PolymorphieAnimation.canvasW * 0.1 || this.posX > A10_2_PolymorphieAnimation.canvasW * 1.1 || this.posY > A10_2_PolymorphieAnimation.canvasH * 1.05) {
                    delete A10_2_PolymorphieAnimation.allMoveables[this.id]; // using splice caused weird side effects
                    console.log("Removed Dragonfly X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
                }
            }
            else if (this.posX > 0 || this.posX < A10_2_PolymorphieAnimation.canvasW) {
                this.starter = true;
            }
        }
    }
    A10_2_PolymorphieAnimation.Dragonfly = Dragonfly;
})(A10_2_PolymorphieAnimation || (A10_2_PolymorphieAnimation = {}));
//# sourceMappingURL=dragonfly.js.map