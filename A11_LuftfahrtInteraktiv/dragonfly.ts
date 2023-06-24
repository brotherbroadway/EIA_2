namespace A11_LuftfahrtInteraktiv {
    /*
Aufgabe: L11_LuftfahrtInteraktiv
Name: Jona Ruder
Matrikel: 265274
Datum: 24.06.2023
Quellen: -
*/
    export class Dragonfly extends Moveable {
        private wingsUp: boolean;

        public constructor(_posX: number, _posY: number, _speedX: number, _speedY: number, _color: string, _wingsUp: boolean, _id: number, _starter: boolean) {
            super(_posX, _posY, _speedX, _speedY, _color, _id, _starter);

            this.wingsUp = _wingsUp;
        }

        // adds dragonfly in foreground
        public draw(): void {
            //console.log("Dragonfly", this.posX, this.posY);

            let size: number = canvasW * 0.02;

            crc2.save();
            crc2.translate(this.posX, this.posY);

            // adds right eye
            crc2.beginPath();
            crc2.arc(-(size * 0.8), size * 0.3, size * 0.1, 0, 2* Math.PI);
            crc2.strokeStyle = "darkred";
            crc2.lineWidth = size * 0.08;
            crc2.stroke();
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.closePath();

            // adds right legs
            crc2.beginPath();
            crc2.moveTo(size * 0.2, -(size * 0.2));
            crc2.lineTo(-(size * 0.3), -(size * 0.4));
            crc2.lineTo(-(size * 0.4), 0);

            crc2.moveTo(-(size * 0.1), size * 0.1);
            crc2.lineTo(-(size * 0.5), -(size * 0.2));
            crc2.lineTo(-(size * 0.6), size * 0.2);

            crc2.moveTo(size * 0.6, -(size * 0.5));
            crc2.lineTo(0, -(size * 0.8));
            crc2.lineTo(-(size * 0.1), -(size * 0.4));

            crc2.strokeStyle = "rgba(160, 0, 0, 1)";
            crc2.lineWidth = size * 0.08;
            crc2.stroke();

            // adds right wing with animation
            if (this.wingsUp) {
                crc2.beginPath();
                crc2.ellipse(size * 0.2, -(size * 0.6), size * 0.2, size, Math.PI / 0.85, 0, 2* Math.PI);
                crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                crc2.fill();
                crc2.closePath();
            } else {
                crc2.beginPath();
                crc2.ellipse(size * 0.1, -(size * 0.8), size * 0.2, size, Math.PI / 0.9, 0, 2* Math.PI);
                crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                crc2.fill();
                crc2.closePath();
            }

            // adds body
            crc2.beginPath();
            crc2.ellipse(0, 0, size * 0.15, size, Math.PI / 4, 0, 2* Math.PI);
            crc2.arc(-(size * 0.6), size * 0.5, size * 0.3, 0, 2* Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.closePath();

            // adds left eye
            crc2.beginPath();
            crc2.arc(-(size * 0.5), size * 0.45, size * 0.1, 0, 2* Math.PI);
            crc2.strokeStyle = "darkred";
            crc2.lineWidth = size * 0.08;
            crc2.stroke();
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.closePath();

            // adds left legs
            crc2.beginPath();
            crc2.moveTo(size * 0.4, -(size * 0.2));
            crc2.lineTo(size * 0.6, size * 0.1);
            crc2.lineTo(size * 0.3, size * 0.4);

            crc2.moveTo(-(size * 0.1), size * 0.1);
            crc2.lineTo(size * 0.2, size * 0.4);
            crc2.lineTo(-(size * 0.1), size * 0.7);

            crc2.moveTo(size * 0.7, -(size * 0.5));
            crc2.lineTo(size * 1, -(size * 0.2));
            crc2.lineTo(size * 0.7, size * 0.15);

            crc2.strokeStyle = "rgba(160, 0, 0, 1)";
            crc2.lineWidth = size * 0.08;
            crc2.stroke();

            // adds left wing with animation
            if (this.wingsUp) {
                crc2.beginPath();
                crc2.ellipse(size * 0.8, -(size * 0.25), size * 0.25, size, Math.PI / 2.8, 0, 2* Math.PI);
                crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                crc2.fill();
                crc2.closePath();
                
                this.wingsUp = false;
            } else {
                crc2.beginPath();
                crc2.ellipse(size * 0.8, -(size * 0.1), size * 0.2, size, Math.PI / 2.4, 0, 2* Math.PI);
                crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
                crc2.fill();
                crc2.closePath();

                this.wingsUp = true;
            }

            crc2.restore();

            // THE ANIMATION

            // change direction based on wind
            switch (currentWindDir) {
                case WIND.NONE:
                    break;
                case WIND.EAST:
                    if (this.speedX > 0) {
                        this.speedX = -this.speedX;
                    }
                    break;
                case WIND.WEST:
                    if (this.speedX < 0) {
                        this.speedX = -this.speedX;
                    }
                    break;
                default:
                    break;
            }

            // set next position via speed
            this.posX += this.speedX * windPower;
            this.posY += this.speedY;

            // so dragonflies don't go too high
            if (this.posY < horizon + canvasH * (Math.random() * 0.1)) {
                this.speedY = -this.speedY;
            } else if (getRandomBool()) {
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
                if (this.posX < -canvasW * 0.1 || this.posX > canvasW * 1.1 || this.posY > canvasH * 1.05) {
                    delete allMoveables[this.id]; // using splice caused weird side effects
                    console.log("Removed Dragonfly X: " + Math.floor(this.posX) + ", Y: " + Math.floor(this.posY));
                }
            } else if (this.posX > 0 || this.posX < canvasW) {
                this.starter = true;
            }
        }
    }
}