namespace A10_2_PolymorphieAnimation {
    /*
Aufgabe: L10_2_PolymorphieAnimation
Name: Jona Ruder
Matrikel: 265274
Datum: 17.06.2023
Quellen: -
*/
    export class Moveable {
        posX: number;
        posY: number;
        speedX: number;
        speedY: number;
        color: string;
        id: number;
        starter: boolean;

        constructor(_posX: number, _posY: number, _speedX: number, _speedY: number, _color: string, _id: number, _starter: boolean) {
            this.posX = _posX;
            this.posY = _posY;
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.color = _color;
            this.id = _id;
            this.starter = _starter;
        }

        draw(): void {
            // console.log("Moveable");
        }
    }
}