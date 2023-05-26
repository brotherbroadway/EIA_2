"use strict";
var A09_1_OldMacDonaldsFarm;
(function (A09_1_OldMacDonaldsFarm) {
    class Animal {
        constructor(_name, _type, _sound, _food, _foodAmount, _color) {
            this.name = _name;
            this.type = _type;
            this.sound = _sound;
            this.food = _food;
            this.foodAmount = _foodAmount;
            this.color = _color;
        }
        // returns one of the following verses
        sing(_verse) {
            let song = "";
            switch (_verse) {
                default:
                    song += "MISSING VERSE";
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
        getTitle() {
            let name = this.name + " the " + capitalism(this.type);
            return name;
        }
        // returns what and how much the animal is eating
        nom() {
            let eating = this.getTitle() + " eats " + this.foodAmount + "kg of " + this.food.name + ".";
            console.log(this.getTitle() + " ate " + this.foodAmount + "kg of the remaining " + this.food.amount + "kg " + this.food.name + ".\nNew amount: " + (this.food.amount - this.foodAmount) + "kg");
            this.food.remove(this.foodAmount);
            return eating;
        }
        // checks if there's enough food left over
        hasEnough() {
            if (this.food.amount - this.foodAmount < 0) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    A09_1_OldMacDonaldsFarm.Animal = Animal;
    // capitalizes first letter of string
    function capitalism(_string) {
        return _string.charAt(0).toUpperCase() + _string.slice(1);
    }
    A09_1_OldMacDonaldsFarm.capitalism = capitalism;
    // adds an "an" if first character is a vowel/"o" in this case
    function addAn(_string) {
        if (_string.charAt(0) == "o") {
            return "n ";
        }
        else {
            return " ";
        }
    }
})(A09_1_OldMacDonaldsFarm || (A09_1_OldMacDonaldsFarm = {}));
//# sourceMappingURL=animals.js.map