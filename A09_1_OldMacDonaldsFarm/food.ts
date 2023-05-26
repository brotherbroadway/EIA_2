namespace A09_1_OldMacDonaldsFarm {
    export class Food {
        name: string;
        amount: number;
        color: string;

        constructor(_name: string, _amount: number, _color: string) {
            this.name = _name;
            this.amount = _amount;
            this.color = _color;
        }

        remove(_removeAmount: number): void {
            this.amount -= _removeAmount;
        }

        getName(): string {
            return capitalism(this.name);
        }
    }
}