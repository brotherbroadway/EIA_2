namespace EIA2SoSe23_Abschlussarbeit {
    /*
Aufgabe: Abschlussarbeit EIA2 SoSe 23
Name: Jona Ruder
Matrikel: 265274
Datum: 06.07.2023
Quellen: -
*/

    // serving tab elements
    export let dropdownServe: HTMLSelectElement = <HTMLSelectElement>document.getElementById("dropdownserve");
    export let serveBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("servebutton");
    export let editServeBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("serveeditbutton");
    export let deleteServeBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("servedeletebutton");
    export let waffleCheck: HTMLInputElement = <HTMLInputElement>document.getElementById("wafflecheck");
    export let pricePreviewParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("pricepreview");
    export let priceProdPreviewParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("priceprodpreview");

    // creator tab elements
    export let creatorDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("creatordiv");
    export let createNewBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("createnewbutton");
    export let titleField: HTMLInputElement = <HTMLInputElement>document.getElementById("creamtitle");
    export let addToppingBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addcreambutton");
    export let removeToppingBttn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("removecreambutton");
    export let dropdownToppingsArray: HTMLSelectElement[] = [];
    export let dropdownSauce: HTMLSelectElement = <HTMLSelectElement>document.getElementById("dropdownsauce");
    export let dropdownSprinkles: HTMLSelectElement = <HTMLSelectElement>document.getElementById("dropdownsprinkles");
    export let whippedCheck: HTMLInputElement = <HTMLInputElement>document.getElementById("whippedcheck");
    export let priceField: HTMLInputElement = <HTMLInputElement>document.getElementById("creatorprice");
    export let creatorProdParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("creatorpriceprod");
    export let submitIcecreamButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("creatorsubmitbutton");

    // canvas elements
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    export let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    crc2.canvas.height = window.innerHeight * 0.95;
    crc2.canvas.width = window.innerWidth * 0.8;
    export let canvasH: number = crc2.canvas.height;
    export let canvasW: number = crc2.canvas.width;
    let windowW: number = window.innerWidth;
    let newWindowW: number = window.innerWidth;
    let resizeW: number = 250;
    let golden: number = 0.62;
    let horizon: number = canvasH * golden;
    let backgroundData: ImageData;
    let animationInterval: any;

    export let bowlColor: string = "rgb(246, 255, 179)";
    export let waffleColor: string = "rgb(202, 165, 83)";
    export let outlineColor: string = "rgba(255, 255, 255, 0.5)";
    export let whippedColor: string = "rgb(255, 248, 229)";

    export let previewServeIcecream: DisplayIcecream;
    export let creatingIcecream: DisplayIcecream;
    export let previewVisible: boolean = false;

    export let createFormOpen: boolean = false;
    export let editingForm: boolean = false;
    export let formEmpty: boolean = true;
    export let sauceSelected: boolean = false;
    export let visibleToppings: number = 1;
    export let creatorIcecream: FullIcecream;

    export let myUrl: string = "https://webuser.hs-furtwangen.de/~ruderjon/Database/?";
    export let savedCreams: FullIcecream[] = [];
    export let savedCreamsAmount: number = 0;
    let myMoney: number = 0;
    export let currentSelectedPrice: number = 0;
    export let currentSelectedProdCost: number = 0;

    let waitingPosTaken: boolean[] = [false, false, false, false, false, false];
    let seatTaken: boolean[] = [false, false, false, false, false, false];

    enum CustomerStatus {
        Arriving,
        WaitingOutside,
        AskingForIcecream,
        WaitingInside,
        GoingToSeat,
        Eating,
        Leaving,
        Reviewing,
    }

    window.addEventListener("load", handleLoad);

    async function handleLoad(): Promise<void> {
        drawEverything();

        await installListeners();
    }

    // handles drawn visuals
    function drawEverything(): void {
        if (animationInterval != null) {
            clearInterval(animationInterval);
            console.log("Interval cleared.");
        }

        drawBackground();

        drawSun(canvasW * 0.05, canvasH * 0.15);

        // clouds
        let cloudAmount: number = getRandomNumber(canvasW * 0.0125, canvasW * 0.005);
        for (let i: number = 0; i < cloudAmount; i++) {
            drawCloud(canvasW * Math.random(), canvasH * Math.random() * 0.25, getRandomNumber(200, 75), getRandomNumber(75, 35));
        }

        drawShop(canvasW * 0.125, horizon);

        backgroundData = crc2.getImageData(0, 0, canvas.width, canvas.height);

        // THE ANIMATION
        animationInterval = setInterval(drawAnimated, 100);
    }

    // draws animated and foreground stuff
    function drawAnimated(): void {
        crc2.putImageData(backgroundData, 0, 0);

        if (previewVisible) {
            //console.log("Drawing preview...");
            previewServeIcecream.draw();
        }

        if (createFormOpen) {
            creatingIcecream.draw();
        }
    }
    
    // draw background with golden ratio
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

    // draws sun (can't use Vector (not found?))
    function drawSun(_posX: number, _posY: number): void {
        console.log("Sun", _posX, _posY);

        // shine radius
        let r1: number = 30;
        let r2: number = 150;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        // adds shine gradient
        gradient.addColorStop(0, "HSLA(40, 100%, 100%, 1)");
        gradient.addColorStop(1, "HSLA(50, 100%, 60%, 0)");

        crc2.save();
        crc2.translate(_posX, _posY);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    // draws clouds
    function drawCloud(_posX: number, _posY: number, _sizeX: number, _sizeY: number): void {
        console.log("Cloud", _posX, _posY, _sizeX, _sizeY);

        // generate particles
        let nParticles: number = _sizeX * 0.2;
        let radiusParticle: number = _sizeY * 0.6;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        // add gradient to clouds
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.9");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0");

        crc2.save();
        crc2.translate(_posX, _posY);
        crc2.fillStyle = gradient;

        // draw cloud particles within size
        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let thisX: number = (Math.random() - 0.5) * _sizeX;
            let thisY: number = (Math.random() * _sizeY);
            crc2.translate(thisX, thisY);
            crc2.fill(particle);
            crc2.restore();
        }

        crc2.restore();
    }

    // draws the icecream shop
    function drawShop(_posX: number, _posY: number): void {
        // draw back wall
        drawBackwall(_posX, _posY);

        // draw ground
        crc2.beginPath();
        crc2.rect(_posX, _posY, canvasW - _posX, canvasH - _posY);
        let gradient: CanvasGradient = crc2.createLinearGradient(0, _posY, 0, canvasH);

        // add gradient to ground
        gradient.addColorStop(0, "rgb(198, 237, 251)");
        gradient.addColorStop(0.9, "rgb(230, 251, 255)");
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.closePath();

        // draw chairs (from left to right)
        let chairY: number = _posY + (canvasH * 0.025);
        let chairLX1: number = canvasW * 0.125;
        let chairLX2: number = canvasW * 0.405;
        let chairLX3: number = canvasW * 0.695;

        drawChair(chairLX1, chairY, false);
        drawChair(canvasW * 0.42, chairY, true);
        drawChair(chairLX2, chairY, false);
        drawChair(canvasW * 0.71, chairY, true);
        drawChair(chairLX3, chairY, false);
        drawChair(canvasW * 1, chairY, true);

        chairY *= 0.99;
        let tableX: number = canvasW * 0.145;
        drawTable(chairLX1 + tableX, chairY);
        drawTable(chairLX2 + tableX, chairY);
        drawTable(chairLX3 + tableX, chairY);

        // draw wall
        crc2.beginPath();
        crc2.rect(_posX - canvasW * 0.0075, 0, canvasW * 0.0075, canvasH);
        crc2.fillStyle = "rgb(121, 153, 164)";
        crc2.fill();
        crc2.closePath();

        drawCounter(_posX, _posY);
    }

    // draws counter
    function drawCounter(_posX: number, _posY: number): void {
        // draw counter
        crc2.beginPath();
        crc2.rect(_posX, canvasH * 0.875, canvasW, canvasH);
        crc2.fillStyle = "rgb(183, 211, 225)";
        crc2.fill();
        crc2.closePath();
    }

    // draws backwall
    function drawBackwall(_posX: number, _posY: number): void {
        crc2.beginPath();
        crc2.rect(_posX, 0, canvasW - _posX, canvasH);
        // Create a pattern, offscreen
        let patternCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");
        let patternContext: CanvasRenderingContext2D = <CanvasRenderingContext2D>patternCanvas.getContext("2d");

        // Give the pattern a width and height
        let patternSize: number = canvasW * 0.02;
        patternCanvas.width = patternSize;
        patternCanvas.height = patternSize;

        // Give the pattern a background color and draw an arc
        patternContext.fillStyle = "rgb(214, 245, 255)";
        patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
        patternContext.arc(0, 0, patternSize, 0, 0.5 * Math.PI);
        patternContext.strokeStyle = "rgb(158, 231, 255)";
        patternContext.stroke();

        let pattern: CanvasPattern = <CanvasPattern>crc2.createPattern(patternCanvas, "repeat");
        crc2.fillStyle = pattern;
        crc2.fill();
        crc2.closePath();
    }

    // draw chair
    function drawChair(_posX: number, _posY: number, _right: boolean): void {
        console.log("Chair", _posX, _posY);

        crc2.save();
        crc2.translate(_posX, _posY);

        let maxH: number = -(canvasH * 0.28);
        let backrestW: number = canvasW * 0.02;
        let maxW: number = canvasW * 0.09;
        let sitH: number = -(canvasH * 0.1);

        // right-facing
        if (_right) {
            backrestW = -backrestW;
            maxW = -maxW;
        }

        // chair drawing
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(maxW, 0);
        crc2.lineTo(maxW, sitH);
        crc2.lineTo(backrestW, sitH);
        crc2.lineTo(backrestW, maxH);
        crc2.lineTo(0, maxH);

        crc2.fillStyle = "rgb(151, 175, 191)";
        //crc2.strokeStyle = "rgb(171, 185, 191)";
        //crc2.lineWidth = 3;
        //crc2.stroke();
        crc2.fill();
        crc2.closePath();

        crc2.restore();
    }

    // draw table
    function drawTable(_posX: number, _posY: number): void {
        console.log("Table", _posX, _posY);

        crc2.save();
        crc2.translate(_posX, _posY);

        let footW: number = canvasW * 0.01;
        let footH: number = -(canvasH * 0.13);
        let topW: number = canvasW * 0.065;
        let topH: number = footH * 1.12;

        // table drawing
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(footW, 0);
        crc2.lineTo(footW, footH);
        crc2.lineTo(topW, footH);
        crc2.lineTo(topW, topH);
        crc2.lineTo(-topW + footW, topH);
        crc2.lineTo(-topW + footW, footH);
        crc2.lineTo(0, footH);

        crc2.fillStyle = "rgb(151, 175, 191)";
        //crc2.strokeStyle = "rgb(194, 204, 209)";
        //crc2.lineWidth = 3;
        //crc2.stroke();
        crc2.fill();
        crc2.closePath();

        crc2.restore();
    }

    // gets random random, optional minimum
    function getRandomNumber(_max: number, _min: number = 0): number {
        let num: number = Math.floor(Math.random() * _max);
        if (num < _min) {
            num += _min;
            if (num > _max) {
                num = _max;
            }
        }
        return num;
    }

    // gets an icecream topping color
    export function getIcecreamColor(_topping: CreamTypes, _sauce: boolean = false): string {
        let colorR: number = 0;
        let colorG: number = 0;
        let colorB: number = 0;
        let sauceBonus: number = 0;
        let color: string = "";

        // sauce is a bit brighter
        if (_sauce) {
            sauceBonus = -30;
        }

        // get icecream rgb values
        switch (_topping) {
            case CreamTypes.Chocolate:
                colorR = 71;
                colorG = 38;
                colorB = 30;
                break;
            case CreamTypes.Vanilla:
                colorR = 235;
                colorG = 203;
                colorB = 159;
                break;
            case CreamTypes.Strawberry:
                colorR = 197;
                colorG = 31;
                colorB = 73;
                break;
            case CreamTypes.Blueberry:
                colorR = 78;
                colorG = 30;
                colorB = 2099;
                break;
            case CreamTypes.Banana:
                colorR = 217;
                colorG = 192;
                colorB = 69;
                break;
            case CreamTypes.Smurf:
                colorR = 30;
                colorG = 87;
                colorB = 255;
                break;
        }

        // add them with sauce brightness together
        color = "rgb(" + (colorR + sauceBonus) + ", " + (colorG + sauceBonus) + ", " + (colorB + sauceBonus) + ")";

        //console.log("Color: " + color, CreamTypes[_topping], _sauce);

        return color;
    }

    export function getSprinklesColor(_sprinkles: SprinklesType): string {
        let color: string = "";

        switch (_sprinkles) {
            case SprinklesType.None:
                break;
            case SprinklesType.Chocolate:
                color = "rgb(20, 4, 0)";
                break;
            case SprinklesType.Mint:
                color = "rgb(169, 236, 24)";
                break;
        }

        return color;
    }
}