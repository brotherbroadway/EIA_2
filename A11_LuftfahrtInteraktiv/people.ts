namespace A11_LuftfahrtInteraktiv {
    /*
Aufgabe: L11_LuftfahrtInteraktiv
Name: Jona Ruder
Matrikel: 265274
Datum: 24.06.2023
Quellen: -
*/
    export class People extends Moveable {

        public draw(): void {
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

            // so person doesn't go too high
            if (this.posY < horizon + (canvasH * 0.15)) {
                this.speedY = -this.speedY;
            } else if (getRandomBool()) {
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
                if (this.posX < -canvasW * 0.1 || this.posX > canvasW * 1.1 || this.posY > canvasH * 1.05) {
                    delete allMoveables[this.id]; // using splice caused weird side effects
                    console.log("Removed Person X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
                }
            } else if (this.posX > 0 || this.posX < canvasW) {
                this.starter = true;
            }
        }
    }
}