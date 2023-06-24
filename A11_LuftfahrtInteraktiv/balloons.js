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
    class Balloon extends A11_LuftfahrtInteraktiv.Moveable {
        constructor(_posX, _posY, _speedX, _speedY, _color, _personColor, _id, _starter, _helloCount = 0, _greeting = 0) {
            super(_posX, _posY, _speedX, _speedY, _color, _id, _starter);
            this.personColor = _personColor;
            this.helloCount = _helloCount;
            this.greeting = _greeting;
        }
        // draws hot air balloon with passenger
        draw() {
            //console.log("HotAirBalloon", this.posX, this.posY);
            let size = A11_LuftfahrtInteraktiv.canvasW * 0.02;
            A11_LuftfahrtInteraktiv.crc2.save();
            A11_LuftfahrtInteraktiv.crc2.translate(this.posX, this.posY);
            // adds basket inside
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.moveTo(0, -(size * 0.6) - (size * 0.6));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 1.5, -(size * 0.6) - (size * 0.6));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 2.5, -(size * 0.6));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size, -(size * 0.6));
            A11_LuftfahrtInteraktiv.crc2.fillStyle = "rgba(60, 00, 00, 1)";
            A11_LuftfahrtInteraktiv.crc2.fill();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            // adds back strings
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.moveTo(1, -(size * 0.6) - (size * 0.6));
            A11_LuftfahrtInteraktiv.crc2.lineTo(1, -(size * 2.6));
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 1.5, -(size * 0.6) - (size * 0.6));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 1.5, -(size * 2.6));
            A11_LuftfahrtInteraktiv.crc2.strokeStyle = "white";
            A11_LuftfahrtInteraktiv.crc2.lineWidth = size * 0.08;
            A11_LuftfahrtInteraktiv.crc2.stroke();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            // adds stickperson
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 1.3, -(size * 1.5));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 1.3, -(size * 0.2));
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 1.3, -(size));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 0.7, -(size * 1.3));
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 1.3, -(size));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 1.9, -(size * 1.2));
            A11_LuftfahrtInteraktiv.crc2.strokeStyle = "black";
            A11_LuftfahrtInteraktiv.crc2.lineWidth = size * 0.06;
            A11_LuftfahrtInteraktiv.crc2.stroke();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.arc(size * 1.3, -(size * 1.6), size * 0.3, 0, 2 * Math.PI);
            A11_LuftfahrtInteraktiv.crc2.strokeStyle = "black";
            A11_LuftfahrtInteraktiv.crc2.lineWidth = size * 0.12;
            A11_LuftfahrtInteraktiv.crc2.stroke();
            A11_LuftfahrtInteraktiv.crc2.fillStyle = this.personColor;
            A11_LuftfahrtInteraktiv.crc2.fill();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            // adds basket side
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.moveTo(0, 0);
            A11_LuftfahrtInteraktiv.crc2.lineTo(size, size * 0.6);
            A11_LuftfahrtInteraktiv.crc2.lineTo(size, -(size * 0.6));
            A11_LuftfahrtInteraktiv.crc2.lineTo(0, -(size * 0.6) - (size * 0.6));
            A11_LuftfahrtInteraktiv.crc2.fillStyle = "rgba(100, 20, 20, 1)";
            A11_LuftfahrtInteraktiv.crc2.fill();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            // adds basket front
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.moveTo(size, size * 0.6);
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 2.5, size * 0.6);
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 2.5, -(size * 0.6));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size, -(size * 0.6));
            A11_LuftfahrtInteraktiv.crc2.fillStyle = "brown";
            A11_LuftfahrtInteraktiv.crc2.fill();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            // adds front strings
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.moveTo(size, -(size * 0.6));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size, -(size * 2.2));
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 2.4, -(size * 0.6));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size * 2.4, -(size * 2.2));
            A11_LuftfahrtInteraktiv.crc2.strokeStyle = "white";
            A11_LuftfahrtInteraktiv.crc2.lineWidth = size * 0.08;
            A11_LuftfahrtInteraktiv.crc2.stroke();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            // adds balloon
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.moveTo(size * 2.4, -(size * 2.2));
            A11_LuftfahrtInteraktiv.crc2.bezierCurveTo((size * 7), -(size * 8), -(size * 4), -(size * 8), 1, -(size * 2.6));
            A11_LuftfahrtInteraktiv.crc2.lineTo(size, -(size * 2.2));
            A11_LuftfahrtInteraktiv.crc2.closePath();
            let gradient = A11_LuftfahrtInteraktiv.crc2.createRadialGradient(size * 6, -(size * 15), size * 0.5, -(size * 1), size * 2, size * 4);
            // adds smol gradient
            gradient.addColorStop(0, "white");
            gradient.addColorStop(1, this.color);
            A11_LuftfahrtInteraktiv.crc2.fillStyle = gradient;
            A11_LuftfahrtInteraktiv.crc2.fill();
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
            this.posX += this.speedX;
            this.posY += this.speedY;
            // so balloons don't sink too low
            if (this.posY > A11_LuftfahrtInteraktiv.horizon - A11_LuftfahrtInteraktiv.canvasH * (Math.random() * 0.1)) {
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
            // create hello bubble
            if (this.helloCount > 0) {
                this.sayHello(size);
            }
            // removes balloon if it was on canvas before and then exited the canvas
            if (this.starter) {
                // if outside of canvas X or -X or -Y
                if (this.posX < -A11_LuftfahrtInteraktiv.canvasW * 0.1 || this.posX > A11_LuftfahrtInteraktiv.canvasW * 1.1 || this.posY < -A11_LuftfahrtInteraktiv.canvasH * 0.05) {
                    delete A11_LuftfahrtInteraktiv.allMoveables[this.id]; // using splice caused weird side effects
                    console.log("Removed Balloon X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
                }
            }
            else if (this.posX > 0 || this.posX < A11_LuftfahrtInteraktiv.canvasW) {
                this.starter = true;
            }
        }
        getHeadPos(_eventX, _eventY) {
            let size = A11_LuftfahrtInteraktiv.canvasW * 0.02;
            let totalSize = size * 0.3;
            let headPosX = Math.floor(this.posX - this.speedX + (size * 1.3) - totalSize * 2);
            let headPosY = Math.floor(this.posY - this.speedY - (size * 1.6) - totalSize * 2);
            let headMaxX = Math.floor(headPosX + totalSize * 4);
            let headMaxY = Math.floor(headPosY + totalSize * 4);
            //console.log("HEADPOS", headPosX, headMaxX, headPosY, headMaxY);
            if (_eventX > headPosX && _eventX < headMaxX && _eventY > headPosY && _eventY < headMaxY) {
                console.log("BALLOONGUY CLICKED!");
                // set hello frame count and draw hello bubble
                this.helloCount = 20;
                this.greeting = Math.floor(Math.random() * A11_LuftfahrtInteraktiv.greetingList.length);
                this.sayHello(size);
            }
        }
        // draws hello bubble, text, removes one from frame count
        sayHello(_size) {
            A11_LuftfahrtInteraktiv.crc2.save();
            A11_LuftfahrtInteraktiv.crc2.translate(this.posX, this.posY);
            // draw speech bubble
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.ellipse(_size * 3, -(_size * 2.5), _size, _size * 0.7, Math.PI, 0, 2 * Math.PI);
            A11_LuftfahrtInteraktiv.crc2.strokeStyle = "black";
            A11_LuftfahrtInteraktiv.crc2.lineWidth = _size * 0.08;
            A11_LuftfahrtInteraktiv.crc2.stroke();
            A11_LuftfahrtInteraktiv.crc2.fillStyle = "white";
            A11_LuftfahrtInteraktiv.crc2.fill();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            // draw bubble connector
            A11_LuftfahrtInteraktiv.crc2.beginPath();
            A11_LuftfahrtInteraktiv.crc2.moveTo(_size * 2.1, -(_size * 2.2));
            A11_LuftfahrtInteraktiv.crc2.lineTo(_size * 1.7, -(_size * 1.75));
            A11_LuftfahrtInteraktiv.crc2.lineTo(_size * 2.5, -(_size * 1.9));
            A11_LuftfahrtInteraktiv.crc2.strokeStyle = "black";
            A11_LuftfahrtInteraktiv.crc2.lineWidth = _size * 0.08;
            A11_LuftfahrtInteraktiv.crc2.stroke();
            A11_LuftfahrtInteraktiv.crc2.fillStyle = "white";
            A11_LuftfahrtInteraktiv.crc2.fill();
            A11_LuftfahrtInteraktiv.crc2.closePath();
            //console.log("greeting", this.greeting, greetingList.length);
            // draw hello text
            A11_LuftfahrtInteraktiv.crc2.fillStyle = "black";
            A11_LuftfahrtInteraktiv.crc2.font = _size * 0.55 + "px Arial";
            A11_LuftfahrtInteraktiv.crc2.textAlign = "center";
            A11_LuftfahrtInteraktiv.crc2.fillText(A11_LuftfahrtInteraktiv.greetingList[this.greeting], _size * 3, -(_size * 2.3));
            A11_LuftfahrtInteraktiv.crc2.restore();
            // remove one from frame count
            this.helloCount--;
        }
    }
    A11_LuftfahrtInteraktiv.Balloon = Balloon;
})(A11_LuftfahrtInteraktiv || (A11_LuftfahrtInteraktiv = {}));
//# sourceMappingURL=balloons.js.map