namespace A11_LuftfahrtInteraktiv {
    /*
Aufgabe: L11_LuftfahrtInteraktiv
Name: Jona Ruder
Matrikel: 265274
Datum: 24.06.2023
Quellen: -
*/
    export class Tree {
        private posX: number;
        private posY: number;
        private height: number;
        private id: number;

        public constructor(_posX: number, _posY: number, _height: number, _id: number) {
            this.posX = _posX;
            this.posY = _posY;
            this.height = _height;
            this.id = _id;
        }

        public drawTree(): void {
            //console.log("Tree", this.posX, this.posX);
            crc2.save();
            crc2.translate(this.posX, this.posY);
    
            // adds stump
            crc2.beginPath();
            crc2.rect(0, 0, this.posY * 0.04, this.posY * 0.1);
            crc2.fillStyle = "rgba(100, 20, 20, 1)";
            crc2.fill();
    
            // adds "leaves"
            crc2.beginPath();
            crc2.moveTo(-(this.posY * 0.025), -(this.posY * 0.1) * this.height);
            crc2.lineTo(this.posY * 0.065, -(this.posY * 0.1) * this.height);
            crc2.lineTo(this.posY * 0.02, -(this.posY * 0.2) * this.height);
    
            //crc2.beginPath();
            crc2.moveTo(-(this.posY * 0.035), -(this.posY * 0.035) * this.height);
            crc2.lineTo(this.posY * 0.075, -(this.posY * 0.035) * this.height);
            crc2.lineTo(this.posY * 0.02, -(this.posY * 0.2) * this.height);
    
            //crc2.beginPath();
            crc2.moveTo(-(this.posY * 0.04), this.posY * 0.03 * this.height);
            crc2.lineTo(this.posY * 0.08, this.posY * 0.03 * this.height);
            crc2.lineTo(this.posY * 0.02, -(this.posY * 0.2) * this.height);
    
            let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -(this.posY * 0.1) * this.height);
            gradient.addColorStop(0, "rgba(0, 120, 0, 1)");
            gradient.addColorStop(1, "rgba(0, 60, 0, 1)");
    
            crc2.fillStyle = gradient;
            crc2.fill();
            crc2.closePath();
    
            crc2.restore();
        }
    }
}