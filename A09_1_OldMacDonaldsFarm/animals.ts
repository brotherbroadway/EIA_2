namespace A09_1_OldMacDonaldsFarm {
    
    export class Animal {
        name: string;
        type: string;
        sound: string;
        food: Food;
        foodAmount: number;
        color: string;

        constructor(_name: string, _type: string, _sound: string, _food: Food, _foodAmount: number, _color: string) {
            this.name = _name;
            this.type = _type;
            this.sound = _sound;
            this.food = _food;
            this.foodAmount = _foodAmount;
            this.color = _color;
        }

        // returns one of the following verses
        sing(_verse: number): string {
            let song: string = "";
            switch (_verse) {
                default:
                    song  += "MISSING VERSE";
                    break;
                case 0:
                    song += "Old MacDonald had a farm. E-I-E-I-O.";
                    break;
                case 1:
                    song += "And on that farm he had a " + this.type + ". E-I-E-I-O.";
                    break;
                case 2:
                    song += "With a" + addAn(this.sound) + this.sound + " " + this.sound + " here.";
                    break;
                case 3:
                    song += "Here a" + addAn(this.sound) + this.sound + ". There a" + addAn(this.sound) + this.sound + ".";
                    break;
                case 4:
                    song += "Everywhere a" + addAn(this.sound) + this.sound + " " + this.sound + ".";
                    break;
                case 5:
                    song += "Old MacDonald had a farm. E-I-E-I-O.";
                    break;
            }
            return song;
        }

        // returns full title of the animal
        getTitle(): string {
            let name: string = this.name + " the " + capitalism(this.type);
            return name;
        }

        // returns what and how much the animal is eating
        nom(): string {
            let eating: string = this.getTitle() + " eats " + this.foodAmount + "kg of " + this.food.name + ".";
            console.log(this.getTitle() + " ate " + this.foodAmount + "kg of the remaining " + this.food.amount + "kg " + this.food.name + ".\nNew amount: " + (this.food.amount - this.foodAmount) + "kg");
            this.food.remove(this.foodAmount);
            return eating;
        }

        // checks if there's enough food left over
        hasEnough(): boolean {
            if (this.food.amount - this.foodAmount < 0) {
                return false;
            } else {
                return true;
            }
        }
    }

    // capitalizes first letter of string
    export function capitalism(_string: string): string {
        return _string.charAt(0).toUpperCase() + _string.slice(1);
    }

    // adds an "an" if first character is a vowel/"o" in this case
    function addAn(_string: string): string {
        if (_string.charAt(0) == "o") {
            return "n ";
        } else {
            return " ";
        }
    }
}