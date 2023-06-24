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
    class Dragonfly extends A11_LuftfahrtInteraktiv.Moveable {
        constructor(_posX, _posY, _speedX, _speedY, _color, _wingsUp, _id, _starter) {
            super(_posX, _posY, _speedX, _speedY, _color, _id, _starter);
            this.wingsUp = _wingsUp;
        }
        // adds dragonfly in foreground
        draw() {
            //console.log("Dragonfly", this.posX, this.posY);
            let size = A11_LuftfahrtInteraktiv.canvasW * 0.02;
            A11_LuftfahrtInteraktiv.crc2.save();
            A11_LuftfahrtInteraktiv.crc2.translate(this.posX, this.posY);
            // adds right eye
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.arc(-(size * 0.8), size * 0.3, size * 0.1, 0, 2 * Math.PI);
            A11_LuftfahrtInteraktiv.crc2.strokeStyle = "darkred";
            A11_LuftfahrtInteraktiv.crc2.lineWidth = size * 0.08;
            A11_LuftfahrtInteraktiv.crc2.stroke();
            A11_LuftfahrtInteraktiv.crc2.fillStyle = "red";
            A11_LuftfahrtInteraktiv.crc2.fill();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            // adds right legs
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 0.2, -(size * 0.2));
            A11_LuftfahrtInteraktiv.crc2.lineTo(-(size * 0.3), -(size * 0.4));
            A11_LuftfahrtInteraktiv.crc2.lineTo(-(size * 0.4), 0);
            A11_LuftfahrtInteraktiv.crc2.moveTo(-(size * 0.1), size * 0.1);
            A11_LuftfahrtInteraktiv.crc2.lineTo(-(size * 0.5), -(size * 0.2));
            A11_LuftfahrtInteraktiv.crc2.lineTo(-(size * 0.6), size * 0.2);
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 0.6, -(size * 0.5));
            A11_LuftfahrtInteraktiv.crc2.lineTo(0, -(size * 0.8));
            A11_LuftfahrtInteraktiv.crc2.lineTo(-(size * 0.1), -(size * 0.4));
            A11_LuftfahrtInteraktiv.crc2.strokeStyle = "rgba(160, 0, 0, 1)";
            A11_LuftfahrtInteraktiv.crc2.lineWidth = size * 0.08;
            A11_LuftfahrtInteraktiv.crc2.stroke();
            // adds right wing with animation
            if (this.wingsUp) {
                A11_LuftfahrtInteraktiv.crc2.beginPath();
                A11_LuftfahrtInteraktiv.crc2.ellipse(size * 0.2, -(size * 0.6), size * 0.2, size, Math.PI / 0.85, 0, 2 * Math.PI);
                A11_LuftfahrtInteraktiv.crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                A11_LuftfahrtInteraktiv.crc2.fill();
                A11_LuftfahrtInteraktiv.crc2.closePath();
            }
            else {
                A11_LuftfahrtInteraktiv.crc2.beginPath();
                A11_LuftfahrtInteraktiv.crc2.ellipse(size * 0.1, -(size * 0.8), size * 0.2, size, Math.PI / 0.9, 0, 2 * Math.PI);
                A11_LuftfahrtInteraktiv.crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                A11_LuftfahrtInteraktiv.crc2.fill();
                A11_LuftfahrtInteraktiv.crc2.closePath();
            }
            // adds body
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.ellipse(0, 0, size * 0.15, size, Math.PI / 4, 0, 2 * Math.PI);
            A11_LuftfahrtInteraktiv.crc2.arc(-(size * 0.6), size * 0.5, size * 0.3, 0, 2 * Math.PI);
            A11_LuftfahrtInteraktiv.crc2.fillStyle = this.color;
            A11_LuftfahrtInteraktiv.crc2.fill();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            // adds left eye
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.arc(-(size * 0.5), size * 0.45, size * 0.1, 0, 2 * Math.PI);
            A11_LuftfahrtInteraktiv.crc2.strokeStyle = "darkred";
            A11_LuftfahrtInteraktiv.crc2.lineWidth = size * 0.08;
            A11_LuftfahrtInteraktiv.crc2.stroke();
            A11_LuftfahrtInteraktiv.crc2.fillStyle = "red";
            A11_LuftfahrtInteraktiv.crc2.fill();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            // adds left legs
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 0.4, -(size * 0.2));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 0.6, size * 0.1);
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 0.3, size * 0.4);
            A11_LuftfahrtInteraktiv.crc2.moveTo(-(size * 0.1), size * 0.1);
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 0.2, size * 0.4);
            A11_LuftfahrtInteraktiv.crc2.lineTo(-(size * 0.1), size * 0.7);
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 0.7, -(size * 0.5));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 1, -(size * 0.2));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 0.7, size * 0.15);
            A11_LuftfahrtInteraktiv.crc2.strokeStyle = "rgba(160, 0, 0, 1)";
            A11_LuftfahrtInteraktiv.crc2.lineWidth = size * 0.08;
            A11_LuftfahrtInteraktiv.crc2.stroke();
            // adds left wing with animation
            if (this.wingsUp) {
                A11_LuftfahrtInteraktiv.crc2.beginPath();
                A11_LuftfahrtInteraktiv.crc2.ellipse(size * 0.8, -(size * 0.25), size * 0.25, size, Math.PI / 2.8, 0, 2 * Math.PI);
                A11_LuftfahrtInteraktiv.crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                A11_LuftfahrtInteraktiv.crc2.fill();
                A11_LuftfahrtInteraktiv.crc2.closePath();
                this.wingsUp = false;
            }
            else {
                A11_LuftfahrtInteraktiv.crc2.beginPath();
                A11_LuftfahrtInteraktiv.crc2.ellipse(size * 0.8, -(size * 0.1), size * 0.2, size, Math.PI / 2.4, 0, 2 * Math.PI);
                A11_LuftfahrtInteraktiv.crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                A11_LuftfahrtInteraktiv.crc2.fill();
                A11_LuftfahrtInteraktiv.crc2.closePath();
                this.wingsUp = true;
            }
            A11_LuftfahrtInteraktiv.crc2.restore();
            // THE ANIMATION
            // change direction based on wind
            switch (A11_LuftfahrtInteraktiv.currentWindDir) {
                case A11_LuftfahrtInteraktiv.WIND.NONE:
                    break;
                case A11_LuftfahrtInteraktiv.WIND.EAST:
                    if (this.speedX > 0) {
                        this.speedX = -this.speedX;
                    }
                    break;
                case A11_LuftfahrtInteraktiv.WIND.WEST:
                    if (this.speedX < 0) {
                        this.speedX = -this.speedX;
                    }
                    break;
                default:
                    break;
            }
            // set next position via speed
            this.posX += this.speedX * A11_LuftfahrtInteraktiv.windPower;
            this.posY += this.speedY;
            // so dragonflies don't go too high
            if (this.posY < A11_LuftfahrtInteraktiv.horizon + A11_LuftfahrtInteraktiv.canvasH * (Math.random() * 0.1)) {
                this.speedY = -this.speedY;
            }
            else if (A11_LuftfahrtInteraktiv.getRandomBool()) {
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
                if (this.posX < -A11_LuftfahrtInteraktiv.canvasW * 0.1 || this.posX > A11_LuftfahrtInteraktiv.canvasW * 1.1 || this.posY > A11_LuftfahrtInteraktiv.canvasH * 1.05) {
                    delete A11_LuftfahrtInteraktiv.allMoveables[this.id]; // using splice caused weird side effects
                    console.log("Removed Dragonfly X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
                }
            }
            else if (this.posX > 0 || this.posX < A11_LuftfahrtInteraktiv.canvasW) {
                this.starter = true;
            }
        }
    }
    A11_LuftfahrtInteraktiv.Dragonfly = Dragonfly;
})(A11_LuftfahrtInteraktiv || (A11_LuftfahrtInteraktiv = {}));
//# sourceMappingURL=dragonfly.js.map