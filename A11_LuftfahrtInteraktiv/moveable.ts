namespace A11_LuftfahrtInteraktiv {
    /*
Aufgabe: L11_LuftfahrtInteraktiv
Name: Jona Ruder
Matrikel: 265274
Datum: 24.06.2023
Quellen: -
*/
    export abstract class Moveable {
        protected posX: number;
        protected posY: number;
        protected speedX: number;
        protected speedY: number;
        protected color: string;
        protected id: number;
        protected starter: boolean;

        public constructor(_posX: number, _posY: number, _speedX: number, _speedY: number, _color: string, _id: number, _starter: boolean) {
            this.posX = _posX;
            this.posY = _posY;
            this.speedX = _speedX;
            this.speedY = _speedY;
            this.color = _color;
            this.id = _id;
            this.starter = _starter;
        }

        public abstract draw(): void;

        public getHeadPos(_eventX: number, _eventY: number): void {
            // abstract makes it so all other subclasses need it to be defined, so i didn't go with that
        }
    }
}