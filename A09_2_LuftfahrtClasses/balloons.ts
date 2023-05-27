namespace A09_2_LuftfahrtClasses {
    /*
Aufgabe: L09_2_LuftfahrtClasses
Name: Jona Ruder
Matrikel: 265274
Datum: 27.05.2023
Quellen: -
*/
    export class Balloon {
        posX: number;
        posY: number;
        speedX: number;
        speedY: number;
        balloonColor: string;
        personColor: string;
        id: number;
        starter: boolean;

        constructor(_posX: number, _posY: number, _speedX: number, _speedY: number, _balloonColor: string, _personColor: string, _id: number, _starter: boolean) {
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
        drawHotAirBalloon(): void {
            //console.log("HotAirBalloon", this.posX, this.posY);

            let size: number = canvasW * 0.02;

            crc2.save();
            crc2.translate(this.posX, this.posY);

            // adds basket inside
            crc2.beginPath();
            crc2.moveTo(0, -(size * 0.6) - (size * 0.6));
            crc2.lineTo(size * 1.5, -(size * 0.6) - (size * 0.6));
            crc2.lineTo(size * 2.5, -(size * 0.6));
            crc2.lineTo(size, -(size * 0.6))

            crc2.fillStyle = "rgba(60, 00, 00, 1)";
            crc2.fill();
            crc2.closePath();

            // adds back strings
            crc2.beginPath();
            crc2.moveTo(1, -(size * 0.6) - (size * 0.6));
            crc2.lineTo(1, -(size * 2.6));

            crc2.moveTo(size * 1.5, -(size * 0.6) - (size * 0.6));
            crc2.lineTo(size * 1.5, -(size * 2.6));

            crc2.strokeStyle = "white";
            crc2.lineWidth = size * 0.08;
            crc2.stroke();
            crc2.closePath();

            // adds stickperson
            crc2.beginPath();
            crc2.moveTo(size * 1.3, -(size * 1.5));
            crc2.lineTo(size * 1.3, -(size * 0.2));

            crc2.moveTo(size * 1.3, -(size));
            crc2.lineTo(size * 0.7, -(size * 1.3));

            crc2.moveTo(size * 1.3, -(size));
            crc2.lineTo(size * 1.9, -(size * 1.2));

            crc2.strokeStyle = "black";
            crc2.lineWidth = size * 0.06;
            crc2.stroke();
            crc2.closePath();

            crc2.beginPath();
            crc2.arc(size * 1.3, -(size * 1.6), size * 0.3, 0, 2* Math.PI);
            crc2.strokeStyle = "black";
            crc2.lineWidth = size * 0.12;
            crc2.stroke();
            crc2.fillStyle = this.personColor;
            crc2.fill();
            crc2.closePath();
            
            // adds basket side
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.lineTo(size, size * 0.6);
            crc2.lineTo(size, -(size * 0.6));
            crc2.lineTo(0, -(size * 0.6) - (size * 0.6))

            crc2.fillStyle = "rgba(100, 20, 20, 1)";
            crc2.fill();
            crc2.closePath();

            // adds basket front
            crc2.beginPath();
            crc2.moveTo(size, size * 0.6);
            crc2.lineTo(size * 2.5, size * 0.6);
            crc2.lineTo(size * 2.5, -(size * 0.6));
            crc2.lineTo(size, -(size * 0.6))

            crc2.fillStyle = "brown";
            crc2.fill();
            crc2.closePath();

            // adds front strings
            crc2.beginPath();
            crc2.moveTo(size, -(size * 0.6));
            crc2.lineTo(size, -(size * 2.2));

            crc2.moveTo(size * 2.4, -(size * 0.6));
            crc2.lineTo(size * 2.4, -(size * 2.2));

            crc2.strokeStyle = "white";
            crc2.lineWidth = size * 0.08;
            crc2.stroke();
            crc2.closePath();

            // adds balloon
            crc2.beginPath();
            crc2.moveTo(size * 2.4, -(size * 2.2));
            crc2.bezierCurveTo((size * 7), -(size * 8),
                    -(size * 4), -(size * 8),
                    1, -(size * 2.6));
            crc2.lineTo(size, -(size * 2.2));
            crc2.closePath();

            let gradient: CanvasGradient = crc2.createRadialGradient(size * 6, -(size * 15), size * 0.5, -(size * 1), size * 2, size * 4);

            // adds smol gradient
            gradient.addColorStop(0, "white");
            gradient.addColorStop(1, this.balloonColor);

            crc2.fillStyle = gradient;
            crc2.fill();

            crc2.restore();

            // THE ANIMATION
            // set next position via speed
            this.posX += this.speedX;
            this.posY += this.speedY;

            // so balloons don't sink too low
            if (this.posY > horizon - canvasH * (Math.random() * 0.1)) {
                this.speedY = -this.speedY;
            } else if (getRandomBool()) {
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
                if (this.posX < -canvasW * 0.1 || this.posX > canvasW * 1.1 || this.posY < -canvasH * 0.05) {
                    delete allBalloons[this.id]; // using splice caused weird side effects
                    console.log("Removed Balloon X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
                }
            } else if (this.posX > 0 || this.posX < canvasW) {
                this.starter = true;
            }
        }
    }
}