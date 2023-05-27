namespace A09_2_LuftfahrtClasses {
    /*
Aufgabe: L09_2_LuftfahrtClasses
Name: Jona Ruder
Matrikel: 265274
Datum: 27.05.2023
Quellen: -
*/
    export class Climber {
        posX: number;
        posY: number;
        speedX: number;
        speedY: number;
        color: string;
        id: number;
        climbing: boolean;

        constructor(_posX: number, _posY: number, _speedX: number, _speedY: number, _color: string, _id: number, _climbing: boolean) {
            this.posX = _posX;
            this.posY = _posY;
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.color = _color;
            this.id = _id;
            this.climbing = _climbing;
        }

        drawClimber(): void {
            //console.log("Person", this.posX, this.posY);

            let size: number = canvasW * 0.02;

            crc2.save();
            crc2.translate(this.posX, this.posY);

            // adds stickperson
            crc2.beginPath();
            crc2.moveTo(size * 1.3, -(size * 1.5));
            crc2.lineTo(size * 1.3, -(size * 0.2));

            crc2.moveTo(size * 1.3, -(size));
            crc2.lineTo(size * 0.7, -(size * 1.3));

            crc2.moveTo(size * 1.3, -(size));
            crc2.lineTo(size * 1.9, -(size * 1.2));

            crc2.moveTo(size * 1.3, -(size * 0.2));
            crc2.lineTo(size * 0.7, size * 0.2);

            crc2.moveTo(size * 1.3, -(size * 0.2));
            crc2.lineTo(size * 1.7, size * 0.2);

            crc2.strokeStyle = "black";
            crc2.lineWidth = size * 0.06;
            crc2.stroke();
            crc2.closePath();

            crc2.beginPath();
            crc2.arc(size * 1.3, -(size * 1.6), size * 0.3, 0, 2* Math.PI);
            crc2.strokeStyle = "black";
            crc2.lineWidth = size * 0.12;
            crc2.stroke();
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.closePath();

            crc2.restore();

                        // THE ANIMATION
            // set next position via speed
            this.posX += this.speedX;
            this.posY += this.speedY;

            // so climber doesn't continue going down
            if (this.speedY > 0) {
                this.speedY = -this.speedY;
            }

            // so climber doesn't go too high
            if (this.posY < horizon && !this.climbing) {
                this.speedX *= 0.1;
                this.speedY *= 0.5;
                this.climbing = true;
            } else if (Math.random() < 0.1) { // sometimes turns around randomly
                this.speedX = -this.speedX;
            }

            // switches randomly X speed while climbing
            if (this.climbing && Math.random() < 0.5) {
                this.speedX = -this.speedX;
            }
            

            if (this.climbing && this.posY < horizon - (canvasH * 0.1)) {
                delete allClimbers[this.id]; // using splice caused weird side effects
                console.log("Removed Climber X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
            }
        }
    }
}