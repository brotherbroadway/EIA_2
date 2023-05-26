namespace A09_1_OldMacDonaldsFarm {
    /*
Aufgabe: L09_1_OldMacDonaldsFarm
Name: Jona Ruder
Matrikel: 265274
Datum: 26.05.2023
Quellen: -
*/
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    let dayBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("dayButton");
    crc2.canvas.height = window.innerHeight * 0.9;
    crc2.canvas.width = window.innerWidth * 0.9;
    let canvasH: number = crc2.canvas.height;
    let canvasW: number = crc2.canvas.width;
    let golden: number = 0.62;

    let oat: Food = new Food("oat", 175, "rgb(174, 90, 45)");
    let seeds: Food = new Food ("seeds", 50, "rgb(255, 255, 204)");
    let cheese: Food = new Food ("cheese", 78, "yellow");
    let hay: Food = new Food ("hay", 100, "rgb(255, 204, 102)");
    let grass: Food = new Food ("grass", 250, "rgb(153, 255, 51)");

    let pig: Animal = new Animal("Jeff", "pig", "oink", oat, 25, "pink");
    let duck: Animal = new Animal("Brodin", "duck", "quack", seeds, 0.25, "yellow");
    let dog: Animal = new Animal("Remington", "dog", "woof", cheese, 9, "red");
    let horse: Animal = new Animal("Slow Dancer", "horse", "neigh", hay, 7.5, "rgb(150, 80, 80)");
    let cow: Animal = new Animal("Agatha", "cow", "moo", grass, 10, "white");

    let allFoods: Food[] = [oat, seeds, cheese, hay, grass];
    let allAnimals: Animal[] = [pig, duck, dog, horse, cow];
    let numID: number = 0;

    let dayNum: number = 0;
    let totalLineYPos: number = 0;

    let singInterval: any;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {

        dayBttn.addEventListener("click", nextDay);

        nextDay();
    }

    // goes to next day
    function nextDay(): void {
        if (singInterval != null) {
            clearInterval(singInterval);
            console.log("Interval cleared.");
        }

        numID = 0;
        dayNum++;

        console.log("Day " + dayNum + " has started.");

        // cycles through all animals via interval
        singInterval = setInterval(drawEverything, 2000);

        drawEverything();
    }

    // draws everything
    function drawEverything(): void {
        drawBackground();

        drawBarn(canvasW * 0.65, canvasH * 0.75);

        let lineXPos: number = canvasW * 0.4;
        let lineYPos: number = canvasH * 0.1;

        getDay(canvasW * 0.05, canvasH * 0.075);

        sayTheLine(lineXPos, lineYPos);

        getFoodStorage(canvasW * 0.1, canvasH * 0.2);

        // cycles through animals and adds "Day done" when all animals have sung and eaten
        if (numID < 4) {
            numID++;
        } else {
            clearInterval(singInterval);
            console.log("Interval cleared.");

            numID = 0;

            crc2.save();
            crc2.translate(lineXPos, lineYPos);

            let dayXPos: number = 140;

            totalLineYPos += 26;

            let dayStr: string = "Day " + dayNum + " has ended.";

            crc2.fillStyle = "lightgrey";
            crc2.font = "bold 24px Arial";
            crc2.strokeStyle = "black";
            crc2.lineWidth = 3;
            crc2.strokeText(dayStr, dayXPos, totalLineYPos);
            crc2.fillText(dayStr, dayXPos, totalLineYPos);

            console.log(dayStr);

            crc2.restore();
        }
    }

    // draws background with golden ratio
    function drawBackground(): void {
        console.log("Background");

        // adds background gradient with golden ratio
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, canvasH);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, canvasW, canvasH);
    }

    // draws a barn
    function drawBarn(_posX: number, _posY: number): void {
        console.log("Barn", _posX, _posY);
        crc2.save();
        crc2.translate(_posX, _posY);

        // draws front
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(300, 0);
        crc2.lineTo(300, -250);
        crc2.lineTo(150, -325);
        crc2.lineTo(0, -250);
        crc2.fillStyle = "red";
        crc2.fill();
        crc2.closePath();

        // draws wood beams
        crc2.beginPath();
        crc2.moveTo(5, -245);
        crc2.lineTo(295, -5);
        crc2.strokeStyle = "black";
        crc2.lineWidth = 8;
        crc2.stroke();
        crc2.closePath();

        crc2.beginPath();
        crc2.moveTo(295, -245);
        crc2.lineTo(5, -5);
        crc2.strokeStyle = "black";
        crc2.lineWidth = 8;
        crc2.stroke();
        crc2.closePath();

        // draws roof
        crc2.beginPath();
        crc2.moveTo(350, -225);
        crc2.lineTo(150, -325);
        crc2.lineTo(-50, -225);
        crc2.strokeStyle = "orange";
        crc2.lineWidth = 12;
        crc2.stroke();
        crc2.closePath();

        crc2.restore();
    }

    // makes the animal sing the song
    function sayTheLine(_posX: number, _posY: number): void {
        console.log("Say The Line", _posX, _posY, allAnimals[numID].name, numID);
        crc2.save();
        crc2.translate(_posX, _posY);

        let yPos: number = 0;

        let fullTitle: string =  allAnimals[numID].getTitle() + " sings:";

        crc2.fillStyle = allAnimals[numID].color;
        crc2.font = "bold 30px Arial";
        crc2.strokeStyle = "black";
        crc2.lineWidth = 4;
        crc2.strokeText(fullTitle, 0, yPos);
        crc2.fillText(fullTitle, 0, yPos);
        yPos += 5;

        // goes through all the verses of the song
        for (let i: number = 0; i < 6; i++) {
            yPos += 25;
            crc2.fillStyle = "black";
            crc2.font = "bold 24px Arial";
            crc2.fillText(allAnimals[numID].sing(i), 0, yPos);
        }

        yPos += 28;

        // checks if there's enough food left over
        if (allAnimals[numID].hasEnough()) {
            let nomStr: string = "" + allAnimals[numID].nom();

            crc2.fillStyle = allAnimals[numID].color;
            crc2.font = "italic bold 24px Arial";
            crc2.strokeStyle = "black";
            crc2.lineWidth = 3;
            crc2.strokeText(nomStr, 0, yPos);
            crc2.fillText(nomStr, 0, yPos);
        } else {
            let noNomStr: string = allAnimals[numID].getTitle() + " doesn't have enough food!" ;

            crc2.fillStyle = allAnimals[numID].color;
            crc2.font = "italic bold 24px Arial";
            crc2.strokeStyle = "black";
            crc2.lineWidth = 3;
            crc2.strokeText(noNomStr, 0, yPos);
            crc2.fillText(noNomStr, 0, yPos);
        }

        totalLineYPos = yPos;

        crc2.restore();
    }

    // gets the remaining food
    function getFoodStorage(_posX: number, _posY: number): void {
        console.log("Food Storage", _posX, _posY);
        crc2.save();
        crc2.translate(_posX, _posY);

        let yPos: number = 0;

        // goes through all foods
        for (let i: number = 0; i < 5; i++) {
            let nameStr: string = allFoods[i].getName() + ":";
            let amountStr: string = (Math.round(allFoods[i].amount * 100) / 100) + "kg";

            crc2.fillStyle = allFoods[i].color;
            crc2.font = "bold 24px Arial";
            crc2.strokeStyle = "black";
            crc2.lineWidth = 3;
            crc2.strokeText(nameStr, 0, yPos);
            crc2.fillText(nameStr, 0, yPos);

            crc2.fillStyle = "black";
            crc2.font = "bold 24px Arial";
            crc2.fillText(amountStr, 0, yPos + 25);
            yPos += 60;
        }

        crc2.restore();
    }

    // gets the current day
    function getDay(_posX: number, _posY: number): void {
        console.log("Day " + dayNum, _posX, _posY);
        crc2.save();
        crc2.translate(_posX, _posY);

        let dayStr: string = "Day " + dayNum;

        crc2.fillStyle = "lightgrey";
        crc2.font = "bold 50px Arial";
        crc2.strokeStyle = "black";
        crc2.lineWidth = 4;
        crc2.strokeText(dayStr, 0, 0);
        crc2.fillText(dayStr, 0, 0);

        crc2.restore();
    }
}