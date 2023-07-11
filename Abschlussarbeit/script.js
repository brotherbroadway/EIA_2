"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var EIA2SoSe23_Abschlussarbeit;
(function (EIA2SoSe23_Abschlussarbeit) {
    /*
Aufgabe: Abschlussarbeit EIA2 SoSe 23
Name: Jona Ruder
Matrikel: 265274
Datum: 06.07.2023
Quellen: -
*/
    // serving tab elements
    EIA2SoSe23_Abschlussarbeit.dropdownServe = document.getElementById("dropdownserve");
    EIA2SoSe23_Abschlussarbeit.serveBttn = document.getElementById("servebutton");
    EIA2SoSe23_Abschlussarbeit.editServeBttn = document.getElementById("serveeditbutton");
    EIA2SoSe23_Abschlussarbeit.deleteServeBttn = document.getElementById("servedeletebutton");
    EIA2SoSe23_Abschlussarbeit.waffleCheck = document.getElementById("wafflecheck");
    EIA2SoSe23_Abschlussarbeit.pricePreviewParagraph = document.getElementById("pricepreview");
    EIA2SoSe23_Abschlussarbeit.priceProdPreviewParagraph = document.getElementById("priceprodpreview");
    // creator tab elements
    EIA2SoSe23_Abschlussarbeit.creatorDiv = document.getElementById("creatordiv");
    EIA2SoSe23_Abschlussarbeit.createNewBttn = document.getElementById("createnewbutton");
    EIA2SoSe23_Abschlussarbeit.titleField = document.getElementById("creamtitle");
    EIA2SoSe23_Abschlussarbeit.addToppingBttn = document.getElementById("addcreambutton");
    EIA2SoSe23_Abschlussarbeit.removeToppingBttn = document.getElementById("removecreambutton");
    EIA2SoSe23_Abschlussarbeit.dropdownToppingsArray = [];
    EIA2SoSe23_Abschlussarbeit.dropdownSauce = document.getElementById("dropdownsauce");
    EIA2SoSe23_Abschlussarbeit.dropdownSprinkles = document.getElementById("dropdownsprinkles");
    EIA2SoSe23_Abschlussarbeit.whippedCheck = document.getElementById("whippedcheck");
    EIA2SoSe23_Abschlussarbeit.priceField = document.getElementById("creatorprice");
    EIA2SoSe23_Abschlussarbeit.creatorProdParagraph = document.getElementById("creatorpriceprod");
    EIA2SoSe23_Abschlussarbeit.submitIcecreamButton = document.getElementById("creatorsubmitbutton");
    // canvas elements
    let canvas = document.querySelector("canvas");
    EIA2SoSe23_Abschlussarbeit.crc2 = canvas.getContext("2d");
    EIA2SoSe23_Abschlussarbeit.crc2.canvas.height = window.innerHeight * 0.95;
    EIA2SoSe23_Abschlussarbeit.crc2.canvas.width = window.innerWidth * 0.8;
    EIA2SoSe23_Abschlussarbeit.canvasH = EIA2SoSe23_Abschlussarbeit.crc2.canvas.height;
    EIA2SoSe23_Abschlussarbeit.canvasW = EIA2SoSe23_Abschlussarbeit.crc2.canvas.width;
    let windowW = window.innerWidth;
    let newWindowW = window.innerWidth;
    let resizeW = 250;
    let golden = 0.62;
    let horizon = EIA2SoSe23_Abschlussarbeit.canvasH * golden;
    let backgroundData;
    let animationInterval;
    EIA2SoSe23_Abschlussarbeit.bowlColor = "rgb(246, 255, 179)";
    EIA2SoSe23_Abschlussarbeit.waffleColor = "rgb(202, 165, 83)";
    EIA2SoSe23_Abschlussarbeit.outlineColor = "rgba(255, 255, 255, 0.5)";
    EIA2SoSe23_Abschlussarbeit.whippedColor = "rgb(255, 248, 229)";
    EIA2SoSe23_Abschlussarbeit.previewVisible = false;
    EIA2SoSe23_Abschlussarbeit.createFormOpen = false;
    EIA2SoSe23_Abschlussarbeit.editingForm = false;
    EIA2SoSe23_Abschlussarbeit.formEmpty = true;
    EIA2SoSe23_Abschlussarbeit.sauceSelected = false;
    EIA2SoSe23_Abschlussarbeit.visibleToppings = 1;
    EIA2SoSe23_Abschlussarbeit.myUrl = "https://webuser.hs-furtwangen.de/~ruderjon/Database/?";
    EIA2SoSe23_Abschlussarbeit.savedCreams = [];
    EIA2SoSe23_Abschlussarbeit.savedCreamsAmount = 0;
    let myMoney = 0;
    EIA2SoSe23_Abschlussarbeit.currentSelectedPrice = 0;
    EIA2SoSe23_Abschlussarbeit.currentSelectedProdCost = 0;
    let waitingPosTaken = [false, false, false, false, false, false];
    let seatTaken = [false, false, false, false, false, false];
    let CustomerStatus;
    (function (CustomerStatus) {
        CustomerStatus[CustomerStatus["Arriving"] = 0] = "Arriving";
        CustomerStatus[CustomerStatus["WaitingOutside"] = 1] = "WaitingOutside";
        CustomerStatus[CustomerStatus["AskingForIcecream"] = 2] = "AskingForIcecream";
        CustomerStatus[CustomerStatus["WaitingInside"] = 3] = "WaitingInside";
        CustomerStatus[CustomerStatus["GoingToSeat"] = 4] = "GoingToSeat";
        CustomerStatus[CustomerStatus["Eating"] = 5] = "Eating";
        CustomerStatus[CustomerStatus["Leaving"] = 6] = "Leaving";
        CustomerStatus[CustomerStatus["Reviewing"] = 7] = "Reviewing";
    })(CustomerStatus || (CustomerStatus = {}));
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            drawEverything();
            yield EIA2SoSe23_Abschlussarbeit.installListeners();
        });
    }
    // handles drawn visuals
    function drawEverything() {
        if (animationInterval != null) {
            clearInterval(animationInterval);
            console.log("Interval cleared.");
        }
        drawBackground();
        drawSun(EIA2SoSe23_Abschlussarbeit.canvasW * 0.05, EIA2SoSe23_Abschlussarbeit.canvasH * 0.15);
        // clouds
        let cloudAmount = getRandomNumber(EIA2SoSe23_Abschlussarbeit.canvasW * 0.0125, EIA2SoSe23_Abschlussarbeit.canvasW * 0.005);
        for (let i = 0; i < cloudAmount; i++) {
            drawCloud(EIA2SoSe23_Abschlussarbeit.canvasW * Math.random(), EIA2SoSe23_Abschlussarbeit.canvasH * Math.random() * 0.25, getRandomNumber(200, 75), getRandomNumber(75, 35));
        }
        drawShop(EIA2SoSe23_Abschlussarbeit.canvasW * 0.125, horizon);
        backgroundData = EIA2SoSe23_Abschlussarbeit.crc2.getImageData(0, 0, canvas.width, canvas.height);
        // THE ANIMATION
        animationInterval = setInterval(drawAnimated, 100);
    }
    // draws animated and foreground stuff
    function drawAnimated() {
        EIA2SoSe23_Abschlussarbeit.crc2.putImageData(backgroundData, 0, 0);
        if (EIA2SoSe23_Abschlussarbeit.previewVisible) {
            //console.log("Drawing preview...");
            EIA2SoSe23_Abschlussarbeit.previewServeIcecream.draw();
        }
        if (EIA2SoSe23_Abschlussarbeit.createFormOpen) {
            EIA2SoSe23_Abschlussarbeit.creatingIcecream.draw();
        }
    }
    // draw background with golden ratio
    function drawBackground() {
        console.log("Background");
        // adds background gradient with golden ratio
        let gradient = EIA2SoSe23_Abschlussarbeit.crc2.createLinearGradient(0, 0, 0, EIA2SoSe23_Abschlussarbeit.canvasH);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%");
        EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = gradient;
        EIA2SoSe23_Abschlussarbeit.crc2.fillRect(0, 0, EIA2SoSe23_Abschlussarbeit.canvasW, EIA2SoSe23_Abschlussarbeit.canvasH);
    }
    // draws sun (can't use Vector (not found?))
    function drawSun(_posX, _posY) {
        console.log("Sun", _posX, _posY);
        // shine radius
        let r1 = 30;
        let r2 = 150;
        let gradient = EIA2SoSe23_Abschlussarbeit.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        // adds shine gradient
        gradient.addColorStop(0, "HSLA(40, 100%, 100%, 1)");
        gradient.addColorStop(1, "HSLA(50, 100%, 60%, 0)");
        EIA2SoSe23_Abschlussarbeit.crc2.save();
        EIA2SoSe23_Abschlussarbeit.crc2.translate(_posX, _posY);
        EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = gradient;
        EIA2SoSe23_Abschlussarbeit.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        EIA2SoSe23_Abschlussarbeit.crc2.fill();
        EIA2SoSe23_Abschlussarbeit.crc2.restore();
    }
    // draws clouds
    function drawCloud(_posX, _posY, _sizeX, _sizeY) {
        console.log("Cloud", _posX, _posY, _sizeX, _sizeY);
        // generate particles
        let nParticles = _sizeX * 0.2;
        let radiusParticle = _sizeY * 0.6;
        let particle = new Path2D();
        let gradient = EIA2SoSe23_Abschlussarbeit.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        // add gradient to clouds
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.9");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0");
        EIA2SoSe23_Abschlussarbeit.crc2.save();
        EIA2SoSe23_Abschlussarbeit.crc2.translate(_posX, _posY);
        EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = gradient;
        // draw cloud particles within size
        for (let drawn = 0; drawn < nParticles; drawn++) {
            EIA2SoSe23_Abschlussarbeit.crc2.save();
            let thisX = (Math.random() - 0.5) * _sizeX;
            let thisY = (Math.random() * _sizeY);
            EIA2SoSe23_Abschlussarbeit.crc2.translate(thisX, thisY);
            EIA2SoSe23_Abschlussarbeit.crc2.fill(particle);
            EIA2SoSe23_Abschlussarbeit.crc2.restore();
        }
        EIA2SoSe23_Abschlussarbeit.crc2.restore();
    }
    // draws the icecream shop
    function drawShop(_posX, _posY) {
        // draw back wall
        drawBackwall(_posX, _posY);
        // draw ground
        EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
        EIA2SoSe23_Abschlussarbeit.crc2.rect(_posX, _posY, EIA2SoSe23_Abschlussarbeit.canvasW - _posX, EIA2SoSe23_Abschlussarbeit.canvasH - _posY);
        let gradient = EIA2SoSe23_Abschlussarbeit.crc2.createLinearGradient(0, _posY, 0, EIA2SoSe23_Abschlussarbeit.canvasH);
        // add gradient to ground
        gradient.addColorStop(0, "rgb(198, 237, 251)");
        gradient.addColorStop(0.9, "rgb(230, 251, 255)");
        EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = gradient;
        EIA2SoSe23_Abschlussarbeit.crc2.fill();
        EIA2SoSe23_Abschlussarbeit.crc2.closePath();
        // draw chairs (from left to right)
        let chairY = _posY + (EIA2SoSe23_Abschlussarbeit.canvasH * 0.025);
        let chairLX1 = EIA2SoSe23_Abschlussarbeit.canvasW * 0.125;
        let chairLX2 = EIA2SoSe23_Abschlussarbeit.canvasW * 0.405;
        let chairLX3 = EIA2SoSe23_Abschlussarbeit.canvasW * 0.695;
        drawChair(chairLX1, chairY, false);
        drawChair(EIA2SoSe23_Abschlussarbeit.canvasW * 0.42, chairY, true);
        drawChair(chairLX2, chairY, false);
        drawChair(EIA2SoSe23_Abschlussarbeit.canvasW * 0.71, chairY, true);
        drawChair(chairLX3, chairY, false);
        drawChair(EIA2SoSe23_Abschlussarbeit.canvasW * 1, chairY, true);
        chairY *= 0.99;
        let tableX = EIA2SoSe23_Abschlussarbeit.canvasW * 0.145;
        drawTable(chairLX1 + tableX, chairY);
        drawTable(chairLX2 + tableX, chairY);
        drawTable(chairLX3 + tableX, chairY);
        // draw wall
        EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
        EIA2SoSe23_Abschlussarbeit.crc2.rect(_posX - EIA2SoSe23_Abschlussarbeit.canvasW * 0.0075, 0, EIA2SoSe23_Abschlussarbeit.canvasW * 0.0075, EIA2SoSe23_Abschlussarbeit.canvasH);
        EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = "rgb(121, 153, 164)";
        EIA2SoSe23_Abschlussarbeit.crc2.fill();
        EIA2SoSe23_Abschlussarbeit.crc2.closePath();
        drawCounter(_posX, _posY);
    }
    // draws counter
    function drawCounter(_posX, _posY) {
        // draw counter
        EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
        EIA2SoSe23_Abschlussarbeit.crc2.rect(_posX, EIA2SoSe23_Abschlussarbeit.canvasH * 0.875, EIA2SoSe23_Abschlussarbeit.canvasW, EIA2SoSe23_Abschlussarbeit.canvasH);
        EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = "rgb(183, 211, 225)";
        EIA2SoSe23_Abschlussarbeit.crc2.fill();
        EIA2SoSe23_Abschlussarbeit.crc2.closePath();
    }
    // draws backwall
    function drawBackwall(_posX, _posY) {
        EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
        EIA2SoSe23_Abschlussarbeit.crc2.rect(_posX, 0, EIA2SoSe23_Abschlussarbeit.canvasW - _posX, EIA2SoSe23_Abschlussarbeit.canvasH);
        // Create a pattern, offscreen
        let patternCanvas = document.createElement("canvas");
        let patternContext = patternCanvas.getContext("2d");
        // Give the pattern a width and height
        let patternSize = EIA2SoSe23_Abschlussarbeit.canvasW * 0.02;
        patternCanvas.width = patternSize;
        patternCanvas.height = patternSize;
        // Give the pattern a background color and draw an arc
        patternContext.fillStyle = "rgb(214, 245, 255)";
        patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
        patternContext.arc(0, 0, patternSize, 0, 0.5 * Math.PI);
        patternContext.strokeStyle = "rgb(158, 231, 255)";
        patternContext.stroke();
        let pattern = EIA2SoSe23_Abschlussarbeit.crc2.createPattern(patternCanvas, "repeat");
        EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = pattern;
        EIA2SoSe23_Abschlussarbeit.crc2.fill();
        EIA2SoSe23_Abschlussarbeit.crc2.closePath();
    }
    // draw chair
    function drawChair(_posX, _posY, _right) {
        console.log("Chair", _posX, _posY);
        EIA2SoSe23_Abschlussarbeit.crc2.save();
        EIA2SoSe23_Abschlussarbeit.crc2.translate(_posX, _posY);
        let maxH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.28);
        let backrestW = EIA2SoSe23_Abschlussarbeit.canvasW * 0.02;
        let maxW = EIA2SoSe23_Abschlussarbeit.canvasW * 0.09;
        let sitH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.1);
        // right-facing
        if (_right) {
            backrestW = -backrestW;
            maxW = -maxW;
        }
        // chair drawing
        EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
        EIA2SoSe23_Abschlussarbeit.crc2.moveTo(0, 0);
        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(maxW, 0);
        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(maxW, sitH);
        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(backrestW, sitH);
        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(backrestW, maxH);
        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(0, maxH);
        EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = "rgb(151, 175, 191)";
        //crc2.strokeStyle = "rgb(171, 185, 191)";
        //crc2.lineWidth = 3;
        //crc2.stroke();
        EIA2SoSe23_Abschlussarbeit.crc2.fill();
        EIA2SoSe23_Abschlussarbeit.crc2.closePath();
        EIA2SoSe23_Abschlussarbeit.crc2.restore();
    }
    // draw table
    function drawTable(_posX, _posY) {
        console.log("Table", _posX, _posY);
        EIA2SoSe23_Abschlussarbeit.crc2.save();
        EIA2SoSe23_Abschlussarbeit.crc2.translate(_posX, _posY);
        let footW = EIA2SoSe23_Abschlussarbeit.canvasW * 0.01;
        let footH = -(EIA2SoSe23_Abschlussarbeit.canvasH * 0.13);
        let topW = EIA2SoSe23_Abschlussarbeit.canvasW * 0.065;
        let topH = footH * 1.12;
        // table drawing
        EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
        EIA2SoSe23_Abschlussarbeit.crc2.moveTo(0, 0);
        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(footW, 0);
        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(footW, footH);
        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(topW, footH);
        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(topW, topH);
        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(-topW + footW, topH);
        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(-topW + footW, footH);
        EIA2SoSe23_Abschlussarbeit.crc2.lineTo(0, footH);
        EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = "rgb(151, 175, 191)";
        //crc2.strokeStyle = "rgb(194, 204, 209)";
        //crc2.lineWidth = 3;
        //crc2.stroke();
        EIA2SoSe23_Abschlussarbeit.crc2.fill();
        EIA2SoSe23_Abschlussarbeit.crc2.closePath();
        EIA2SoSe23_Abschlussarbeit.crc2.restore();
    }
    // gets random random, optional minimum
    function getRandomNumber(_max, _min = 0) {
        let num = Math.floor(Math.random() * _max);
        if (num < _min) {
            num += _min;
            if (num > _max) {
                num = _max;
            }
        }
        return num;
    }
    // gets an icecream topping color
    function getIcecreamColor(_topping, _sauce = false) {
        let colorR = 0;
        let colorG = 0;
        let colorB = 0;
        let sauceBonus = 0;
        let color = "";
        // sauce is a bit brighter
        if (_sauce) {
            sauceBonus = -30;
        }
        // get icecream rgb values
        switch (_topping) {
            case EIA2SoSe23_Abschlussarbeit.CreamTypes.Chocolate:
                colorR = 71;
                colorG = 38;
                colorB = 30;
                break;
            case EIA2SoSe23_Abschlussarbeit.CreamTypes.Vanilla:
                colorR = 235;
                colorG = 203;
                colorB = 159;
                break;
            case EIA2SoSe23_Abschlussarbeit.CreamTypes.Strawberry:
                colorR = 197;
                colorG = 31;
                colorB = 73;
                break;
            case EIA2SoSe23_Abschlussarbeit.CreamTypes.Blueberry:
                colorR = 78;
                colorG = 30;
                colorB = 2099;
                break;
            case EIA2SoSe23_Abschlussarbeit.CreamTypes.Banana:
                colorR = 217;
                colorG = 192;
                colorB = 69;
                break;
            case EIA2SoSe23_Abschlussarbeit.CreamTypes.Smurf:
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
    EIA2SoSe23_Abschlussarbeit.getIcecreamColor = getIcecreamColor;
    function getSprinklesColor(_sprinkles) {
        let color = "";
        switch (_sprinkles) {
            case EIA2SoSe23_Abschlussarbeit.SprinklesType.None:
                break;
            case EIA2SoSe23_Abschlussarbeit.SprinklesType.Chocolate:
                color = "rgb(20, 4, 0)";
                break;
            case EIA2SoSe23_Abschlussarbeit.SprinklesType.Mint:
                color = "rgb(169, 236, 24)";
                break;
        }
        return color;
    }
    EIA2SoSe23_Abschlussarbeit.getSprinklesColor = getSprinklesColor;
})(EIA2SoSe23_Abschlussarbeit || (EIA2SoSe23_Abschlussarbeit = {}));
//# sourceMappingURL=script.js.map