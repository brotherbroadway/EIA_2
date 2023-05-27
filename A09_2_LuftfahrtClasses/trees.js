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
    class Tree {
        constructor(_posX, _posY, _height, _id) {
            this.posX = _posX;
            this.posY = _posY;
            this.height = _height;
            this.id = _id;
        }
        drawTree() {
            //console.log("Tree", this.posX, this.posX);
            A09_2_LuftfahrtClasses.crc2.save();
            A09_2_LuftfahrtClasses.crc2.translate(this.posX, this.posY);
            // adds stump
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.rect(0, 0, this.posY * 0.04, this.posY * 0.1);
            A09_2_LuftfahrtClasses.crc2.fillStyle = "rgba(100, 20, 20, 1)";
            A09_2_LuftfahrtClasses.crc2.fill();
            // adds "leaves"
            A09_2_LuftfahrtClasses.crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(-(this.posY * 0.025), -(this.posY * 0.1) * this.height);
            A09_2_LuftfahrtClasses.crc2.lineTo(this.posY * 0.065, -(this.posY * 0.1) * this.height);
            A09_2_LuftfahrtClasses.crc2.lineTo(this.posY * 0.02, -(this.posY * 0.2) * this.height);
            //crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(-(this.posY * 0.035), -(this.posY * 0.035) * this.height);
            A09_2_LuftfahrtClasses.crc2.lineTo(this.posY * 0.075, -(this.posY * 0.035) * this.height);
            A09_2_LuftfahrtClasses.crc2.lineTo(this.posY * 0.02, -(this.posY * 0.2) * this.height);
            //crc2.beginPath();
            A09_2_LuftfahrtClasses.crc2.moveTo(-(this.posY * 0.04), this.posY * 0.03 * this.height);
            A09_2_LuftfahrtClasses.crc2.lineTo(this.posY * 0.08, this.posY * 0.03 * this.height);
            A09_2_LuftfahrtClasses.crc2.lineTo(this.posY * 0.02, -(this.posY * 0.2) * this.height);
            let gradient = A09_2_LuftfahrtClasses.crc2.createLinearGradient(0, 0, 0, -(this.posY * 0.1) * this.height);
            gradient.addColorStop(0, "rgba(0, 120, 0, 1)");
            gradient.addColorStop(1, "rgba(0, 60, 0, 1)");
            A09_2_LuftfahrtClasses.crc2.fillStyle = gradient;
            A09_2_LuftfahrtClasses.crc2.fill();
            A09_2_LuftfahrtClasses.crc2.closePath();
            A09_2_LuftfahrtClasses.crc2.restore();
        }
    }
    A09_2_LuftfahrtClasses.Tree = Tree;
})(A09_2_LuftfahrtClasses || (A09_2_LuftfahrtClasses = {}));
//# sourceMappingURL=trees.js.map