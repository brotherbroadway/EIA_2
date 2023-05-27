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
    class Dragonfly {
        constructor(_posX, _posY, _speedX, _speedY, _color, _wingsUp, _id, _starter) {
            this.posX = _posX;
            this.posY = _posY;
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.color = _color;
            this.wingsUp = _wingsUp;
            this.id = _id;
            this.starter = _starter;
        }
        // adds dragonfly in foreground
        drawDragonfly() {
            //console.log("Dragonfly", this.posX, this.posY);
            let size = A09_2_LuftfahrtClasses.canvasW * 0.02;
            A09_2_LuftfahrtClasses.crc2.save();
            A09_2_LuftfahrtClasses.crc2.translate(this.posX, this.posY);
            // adds right eye
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.arc(-(size * 0.8), size * 0.3, size * 0.1, 0, 2 * Math.PI);
            A09_2_LuftfahrtClasses.crc2.strokeStyle = "darkred";
            A09_2_LuftfahrtClasses.crc2.lineWidth = size * 0.08;
            A09_2_LuftfahrtClasses.crc2.stroke();
            A09_2_LuftfahrtClasses.crc2.fillStyle = "red";
            A09_2_LuftfahrtClasses.crc2.fill();
            A09_2_LuftfahrtClasses.crc2.closePath();
            // adds right legs
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 0.2, -(size * 0.2));
            A09_2_LuftfahrtClasses.crc2.lineTo(-(size * 0.3), -(size * 0.4));
            A09_2_LuftfahrtClasses.crc2.lineTo(-(size * 0.4), 0);
            A09_2_LuftfahrtClasses.crc2.moveTo(-(size * 0.1), size * 0.1);
            A09_2_LuftfahrtClasses.crc2.lineTo(-(size * 0.5), -(size * 0.2));
            A09_2_LuftfahrtClasses.crc2.lineTo(-(size * 0.6), size * 0.2);
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 0.6, -(size * 0.5));
            A09_2_LuftfahrtClasses.crc2.lineTo(0, -(size * 0.8));
            A09_2_LuftfahrtClasses.crc2.lineTo(-(size * 0.1), -(size * 0.4));
            A09_2_LuftfahrtClasses.crc2.strokeStyle = "rgba(160, 0, 0, 1)";
            A09_2_LuftfahrtClasses.crc2.lineWidth = size * 0.08;
            A09_2_LuftfahrtClasses.crc2.stroke();
            // adds right wing with animation
            if (this.wingsUp) {
                A09_2_LuftfahrtClasses.crc2.beginPath();
                A09_2_LuftfahrtClasses.crc2.ellipse(size * 0.2, -(size * 0.6), size * 0.2, size, Math.PI / 0.85, 0, 2 * Math.PI);
                A09_2_LuftfahrtClasses.crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                A09_2_LuftfahrtClasses.crc2.fill();
                A09_2_LuftfahrtClasses.crc2.closePath();
            }
            else {
                A09_2_LuftfahrtClasses.crc2.beginPath();
                A09_2_LuftfahrtClasses.crc2.ellipse(size * 0.1, -(size * 0.8), size * 0.2, size, Math.PI / 0.9, 0, 2 * Math.PI);
                A09_2_LuftfahrtClasses.crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                A09_2_LuftfahrtClasses.crc2.fill();
                A09_2_LuftfahrtClasses.crc2.closePath();
            }
            // adds body
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.ellipse(0, 0, size * 0.15, size, Math.PI / 4, 0, 2 * Math.PI);
            A09_2_LuftfahrtClasses.crc2.arc(-(size * 0.6), size * 0.5, size * 0.3, 0, 2 * Math.PI);
            A09_2_LuftfahrtClasses.crc2.fillStyle = this.color;
            A09_2_LuftfahrtClasses.crc2.fill();
            A09_2_LuftfahrtClasses.crc2.closePath();
            // adds left eye
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.arc(-(size * 0.5), size * 0.45, size * 0.1, 0, 2 * Math.PI);
            A09_2_LuftfahrtClasses.crc2.strokeStyle = "darkred";
            A09_2_LuftfahrtClasses.crc2.lineWidth = size * 0.08;
            A09_2_LuftfahrtClasses.crc2.stroke();
            A09_2_LuftfahrtClasses.crc2.fillStyle = "red";
            A09_2_LuftfahrtClasses.crc2.fill();
            A09_2_LuftfahrtClasses.crc2.closePath();
            // adds left legs
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 0.4, -(size * 0.2));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 0.6, size * 0.1);
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 0.3, size * 0.4);
            A09_2_LuftfahrtClasses.crc2.moveTo(-(size * 0.1), size * 0.1);
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 0.2, size * 0.4);
            A09_2_LuftfahrtClasses.crc2.lineTo(-(size * 0.1), size * 0.7);
            A09_2_LuftfahrtClasses.crc2.moveTo(size * 0.7, -(size * 0.5));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 1, -(size * 0.2));
            A09_2_LuftfahrtClasses.crc2.lineTo(size * 0.7, size * 0.15);
            A09_2_LuftfahrtClasses.crc2.strokeStyle = "rgba(160, 0, 0, 1)";
            A09_2_LuftfahrtClasses.crc2.lineWidth = size * 0.08;
            A09_2_LuftfahrtClasses.crc2.stroke();
            // adds left wing with animation
            if (this.wingsUp) {
                A09_2_LuftfahrtClasses.crc2.beginPath();
                A09_2_LuftfahrtClasses.crc2.ellipse(size * 0.8, -(size * 0.25), size * 0.25, size, Math.PI / 2.8, 0, 2 * Math.PI);
                A09_2_LuftfahrtClasses.crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                A09_2_LuftfahrtClasses.crc2.fill();
                A09_2_LuftfahrtClasses.crc2.closePath();
                this.wingsUp = false;
            }
            else {
                A09_2_LuftfahrtClasses.crc2.beginPath();
                A09_2_LuftfahrtClasses.crc2.ellipse(size * 0.8, -(size * 0.1), size * 0.2, size, Math.PI / 2.4, 0, 2 * Math.PI);
                A09_2_LuftfahrtClasses.crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                A09_2_LuftfahrtClasses.crc2.fill();
                A09_2_LuftfahrtClasses.crc2.closePath();
                this.wingsUp = true;
            }
            A09_2_LuftfahrtClasses.crc2.restore();
            // THE ANIMATION
            // set next position via speed
            this.posX += this.speedX;
            this.posY += this.speedY;
            // so dragonflies don't go too high
            if (this.posY < A09_2_LuftfahrtClasses.horizon + A09_2_LuftfahrtClasses.canvasH * (Math.random() * 0.1)) {
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
            // removes dragonfly if it was on canvas before and then exited the canvas
            if (this.starter) {
                // if outside of canvas X or -X or -Y
                if (this.posX < -A09_2_LuftfahrtClasses.canvasW * 0.1 || this.posX > A09_2_LuftfahrtClasses.canvasW * 1.1 || this.posY > A09_2_LuftfahrtClasses.canvasH * 1.05) {
                    delete A09_2_LuftfahrtClasses.allDragonflies[this.id]; // using splice caused weird side effects
                    console.log("Removed Dragonfly X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
                }
            }
            else if (this.posX > 0 || this.posX < A09_2_LuftfahrtClasses.canvasW) {
                this.starter = true;
            }
        }
    }
    A09_2_LuftfahrtClasses.Dragonfly = Dragonfly;
})(A09_2_LuftfahrtClasses || (A09_2_LuftfahrtClasses = {}));
//# sourceMappingURL=dragonfly.js.map