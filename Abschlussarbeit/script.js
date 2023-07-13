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
    EIA2SoSe23_Abschlussarbeit.windowW = window.innerWidth;
    EIA2SoSe23_Abschlussarbeit.spawnX = -(EIA2SoSe23_Abschlussarbeit.canvasW * 0.12);
    let golden = 0.62;
    EIA2SoSe23_Abschlussarbeit.horizon = EIA2SoSe23_Abschlussarbeit.canvasH * golden;
    let backgroundData;
    let animationInterval;
    EIA2SoSe23_Abschlussarbeit.bowlColor = "rgb(246, 255, 179)";
    EIA2SoSe23_Abschlussarbeit.waffleColor = "rgb(202, 165, 83)";
    EIA2SoSe23_Abschlussarbeit.whippedColor = "rgb(255, 248, 229)";
    EIA2SoSe23_Abschlussarbeit.outlineColor = "rgba(255, 255, 255, 0.5)";
    EIA2SoSe23_Abschlussarbeit.speechBubbleColor = "rgb(204, 247, 255)";
    EIA2SoSe23_Abschlussarbeit.outlineCustomerColor = "black";
    EIA2SoSe23_Abschlussarbeit.outlineSelectedColor = "red";
    let myRatingCurrent = 0;
    let myRatingTotal = 50;
    let myRatingCount = 10;
    let myMoneyCurrent = 100;
    let moneyDisplayCount = 0;
    let myMoneyReduction = 10;
    let myMoneyGain = 5;
    EIA2SoSe23_Abschlussarbeit.previewVisible = false;
    EIA2SoSe23_Abschlussarbeit.allCustomers = [];
    let customerCount;
    EIA2SoSe23_Abschlussarbeit.createFormOpen = false;
    EIA2SoSe23_Abschlussarbeit.editingForm = false;
    EIA2SoSe23_Abschlussarbeit.formEmpty = true;
    EIA2SoSe23_Abschlussarbeit.sauceSelected = false;
    EIA2SoSe23_Abschlussarbeit.visibleToppings = 1;
    EIA2SoSe23_Abschlussarbeit.myUrl = "https://webuser.hs-furtwangen.de/~ruderjon/Database/?";
    EIA2SoSe23_Abschlussarbeit.savedCreams = [];
    EIA2SoSe23_Abschlussarbeit.savedCreamsAmount = 0;
    EIA2SoSe23_Abschlussarbeit.currentSelectedPrice = 0;
    EIA2SoSe23_Abschlussarbeit.currentSelectedProdCost = 0;
    EIA2SoSe23_Abschlussarbeit.waitingPosTaken = [-1, -1, -1, -1];
    EIA2SoSe23_Abschlussarbeit.waitingPosCount = EIA2SoSe23_Abschlussarbeit.waitingPosTaken.length;
    EIA2SoSe23_Abschlussarbeit.seatTaken = [false, false, false, false, false, false];
    EIA2SoSe23_Abschlussarbeit.seatCount = EIA2SoSe23_Abschlussarbeit.seatTaken.length;
    EIA2SoSe23_Abschlussarbeit.waitingPosX = [EIA2SoSe23_Abschlussarbeit.canvasW * 0.275, EIA2SoSe23_Abschlussarbeit.canvasW * 0.475, EIA2SoSe23_Abschlussarbeit.canvasW * 0.675, EIA2SoSe23_Abschlussarbeit.canvasW * 0.87];
    EIA2SoSe23_Abschlussarbeit.waitingPosY = EIA2SoSe23_Abschlussarbeit.canvasH * 0.9;
    let waitingPosSize = (EIA2SoSe23_Abschlussarbeit.canvasW * 0.065) * 2;
    EIA2SoSe23_Abschlussarbeit.waitingSelectedID = -2;
    EIA2SoSe23_Abschlussarbeit.waitOutsidePosX = -(EIA2SoSe23_Abschlussarbeit.canvasW * 0.005);
    EIA2SoSe23_Abschlussarbeit.seatPosX = [EIA2SoSe23_Abschlussarbeit.canvasW * 0.1375, EIA2SoSe23_Abschlussarbeit.canvasW * 0.3375, EIA2SoSe23_Abschlussarbeit.canvasW * 0.4175, EIA2SoSe23_Abschlussarbeit.canvasW * 0.6175, EIA2SoSe23_Abschlussarbeit.canvasW * 0.7075, EIA2SoSe23_Abschlussarbeit.canvasW * 0.9075];
    EIA2SoSe23_Abschlussarbeit.seatPosY = EIA2SoSe23_Abschlussarbeit.canvasH * 0.545;
    let CustomerStatus;
    (function (CustomerStatus) {
        CustomerStatus[CustomerStatus["Arriving"] = 0] = "Arriving";
        CustomerStatus[CustomerStatus["WaitingOutside"] = 1] = "WaitingOutside";
        CustomerStatus[CustomerStatus["GoingToQueue"] = 2] = "GoingToQueue";
        CustomerStatus[CustomerStatus["AskingForIcecream"] = 3] = "AskingForIcecream";
        CustomerStatus[CustomerStatus["WaitingInside"] = 4] = "WaitingInside";
        CustomerStatus[CustomerStatus["GoingToSeat"] = 5] = "GoingToSeat";
        CustomerStatus[CustomerStatus["Eating"] = 6] = "Eating";
        CustomerStatus[CustomerStatus["Leaving"] = 7] = "Leaving";
        CustomerStatus[CustomerStatus["Reviewing"] = 8] = "Reviewing";
    })(CustomerStatus = EIA2SoSe23_Abschlussarbeit.CustomerStatus || (EIA2SoSe23_Abschlussarbeit.CustomerStatus = {}));
    let CustomerMood;
    (function (CustomerMood) {
        CustomerMood[CustomerMood["Bad"] = 0] = "Bad";
        CustomerMood[CustomerMood["Okay"] = 1] = "Okay";
        CustomerMood[CustomerMood["Good"] = 2] = "Good";
    })(CustomerMood = EIA2SoSe23_Abschlussarbeit.CustomerMood || (EIA2SoSe23_Abschlussarbeit.CustomerMood = {}));
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            yield EIA2SoSe23_Abschlussarbeit.installListeners();
            drawEverything();
        });
    }
    // handles drawn visuals
    function drawEverything() {
        // reset animation interval if one exists
        if (animationInterval != null) {
            clearInterval(animationInterval);
            console.log("Interval cleared.");
        }
        // background
        drawBackground();
        // sun
        drawSun(EIA2SoSe23_Abschlussarbeit.canvasW * 0.05, EIA2SoSe23_Abschlussarbeit.canvasH * 0.15);
        // clouds
        let cloudAmount = getRandomNumber(EIA2SoSe23_Abschlussarbeit.canvasW * 0.0125, EIA2SoSe23_Abschlussarbeit.canvasW * 0.005);
        for (let i = 0; i < cloudAmount; i++) {
            drawCloud(EIA2SoSe23_Abschlussarbeit.canvasW * Math.random(), EIA2SoSe23_Abschlussarbeit.canvasH * Math.random() * 0.25, getRandomNumber(200, 75), getRandomNumber(75, 35));
        }
        // shop
        drawShop(EIA2SoSe23_Abschlussarbeit.canvasW * 0.125, EIA2SoSe23_Abschlussarbeit.horizon);
        // save background data
        backgroundData = EIA2SoSe23_Abschlussarbeit.crc2.getImageData(0, 0, canvas.width, canvas.height);
        canvas.removeEventListener("click", clickCanvas);
        canvas.addEventListener("click", clickCanvas);
        //spawnNewCustomer();
        // THE ANIMATION
        animationInterval = setInterval(drawAnimated, 100);
    }
    // draws animated and foreground stuff
    function drawAnimated() {
        EIA2SoSe23_Abschlussarbeit.crc2.putImageData(backgroundData, 0, 0);
        // draws customers
        drawCustomers();
        // draws counter and wall (in front of customers)
        drawCounter();
        drawWall();
        // draw speech bubbles (if any are here)
        for (let i = 0; i < EIA2SoSe23_Abschlussarbeit.waitingPosCount; i++) {
            if (EIA2SoSe23_Abschlussarbeit.waitingPosTaken[i] >= 0 && EIA2SoSe23_Abschlussarbeit.allCustomers[EIA2SoSe23_Abschlussarbeit.waitingPosTaken[i]].status == CustomerStatus.AskingForIcecream) {
                EIA2SoSe23_Abschlussarbeit.allCustomers[EIA2SoSe23_Abschlussarbeit.waitingPosTaken[i]].drawSpeechbubble();
            }
        }
        // draws preview icecream
        if (EIA2SoSe23_Abschlussarbeit.previewVisible) {
            EIA2SoSe23_Abschlussarbeit.previewServeIcecream.draw();
        }
        // draws creator icecream
        if (EIA2SoSe23_Abschlussarbeit.createFormOpen) {
            EIA2SoSe23_Abschlussarbeit.creatingIcecream.draw();
        }
    }
    // draws customers
    function drawCustomers() {
        customerCount = 0;
        EIA2SoSe23_Abschlussarbeit.allCustomers.forEach(function (e) {
            e.draw();
            customerCount++;
        });
        if (Math.random() < 0.1 && customerCount < 10) {
            console.log("Spawned new customer");
            spawnNewCustomer();
        }
    }
    // spawns new customer
    function spawnNewCustomer() {
        // get random spawn height, speed, icecream, waffle
        let randomH = getRandomNumber(EIA2SoSe23_Abschlussarbeit.canvasH * 0.875, EIA2SoSe23_Abschlussarbeit.horizon + EIA2SoSe23_Abschlussarbeit.canvasH * 0.05);
        let randomSpeed = getRandomNumber(EIA2SoSe23_Abschlussarbeit.canvasW * 0.015, EIA2SoSe23_Abschlussarbeit.canvasW * 0.01);
        let randomIceNum = Math.floor(Math.random() * EIA2SoSe23_Abschlussarbeit.savedCreams.length);
        let randomWaffle = getRandomNumber(2);
        let randomIcecream = EIA2SoSe23_Abschlussarbeit.getDisplayIcecream(0, 0, false, randomIceNum, randomWaffle);
        let newCustomer = new EIA2SoSe23_Abschlussarbeit.Customer(EIA2SoSe23_Abschlussarbeit.spawnX, randomH, randomSpeed, randomSpeed * 0.5, EIA2SoSe23_Abschlussarbeit.allCustomers.length, randomIcecream);
        EIA2SoSe23_Abschlussarbeit.allCustomers.push(newCustomer);
    }
    // click canvas event
    function clickCanvas(_event) {
        let rect = canvas.getBoundingClientRect();
        let mouseX = _event.clientX - rect.x;
        let mouseY = _event.clientY - rect.y;
        //console.log("CLICKED CANVAS", mouseX, mouseY);
        // select customer at waiting pos
        if (mouseY < EIA2SoSe23_Abschlussarbeit.waitingPosY && mouseY > (EIA2SoSe23_Abschlussarbeit.waitingPosY - waitingPosSize)) {
            //console.log("X:", Math.floor(waitingPosX[0]), Math.floor(waitingPosX[0] + waitingPosSize), "Y:", Math.floor(waitingPosY), Math.floor(waitingPosY - waitingPosSize));
            if (mouseX > EIA2SoSe23_Abschlussarbeit.waitingPosX[0] && mouseX < (EIA2SoSe23_Abschlussarbeit.waitingPosX[0] + waitingPosSize)) {
                selectCustomer(0);
            }
            else if (mouseX > EIA2SoSe23_Abschlussarbeit.waitingPosX[1] && mouseX < (EIA2SoSe23_Abschlussarbeit.waitingPosX[1] + waitingPosSize)) {
                selectCustomer(1);
            }
            else if (mouseX > EIA2SoSe23_Abschlussarbeit.waitingPosX[2] && mouseX < (EIA2SoSe23_Abschlussarbeit.waitingPosX[2] + waitingPosSize)) {
                selectCustomer(2);
            }
            else if (mouseX > EIA2SoSe23_Abschlussarbeit.waitingPosX[3] && mouseX < (EIA2SoSe23_Abschlussarbeit.waitingPosX[3] + waitingPosSize)) {
                selectCustomer(3);
            }
        }
        else if (EIA2SoSe23_Abschlussarbeit.waitingSelectedID >= 0) { // unselect customer if clicked anywhere else
            console.log("Unselected Customer (by clicking anywhere)");
            EIA2SoSe23_Abschlussarbeit.allCustomers[EIA2SoSe23_Abschlussarbeit.waitingSelectedID].selected = false;
            EIA2SoSe23_Abschlussarbeit.waitingSelectedID = -2;
        }
    }
    // selects customer at the spot (if there's one there)
    function selectCustomer(_waitPos) {
        console.log("CLICKED WAITING POS " + (_waitPos + 1));
        // get wait pos selected if it's occupied & correct status
        if (EIA2SoSe23_Abschlussarbeit.waitingPosTaken[_waitPos] >= 0 && EIA2SoSe23_Abschlussarbeit.waitingPosTaken[_waitPos] != EIA2SoSe23_Abschlussarbeit.waitingSelectedID
            && EIA2SoSe23_Abschlussarbeit.allCustomers[EIA2SoSe23_Abschlussarbeit.waitingPosTaken[_waitPos]].status == CustomerStatus.AskingForIcecream) {
            if (EIA2SoSe23_Abschlussarbeit.waitingSelectedID >= 0 && EIA2SoSe23_Abschlussarbeit.allCustomers[EIA2SoSe23_Abschlussarbeit.waitingSelectedID].selected === true) {
                EIA2SoSe23_Abschlussarbeit.allCustomers[EIA2SoSe23_Abschlussarbeit.waitingSelectedID].selected = false;
            }
            EIA2SoSe23_Abschlussarbeit.waitingSelectedID = EIA2SoSe23_Abschlussarbeit.waitingPosTaken[_waitPos];
            console.log("Selected", EIA2SoSe23_Abschlussarbeit.waitingSelectedID);
            EIA2SoSe23_Abschlussarbeit.allCustomers[EIA2SoSe23_Abschlussarbeit.waitingSelectedID].selected = true;
        }
        else if (EIA2SoSe23_Abschlussarbeit.waitingPosTaken[_waitPos] == EIA2SoSe23_Abschlussarbeit.waitingSelectedID && EIA2SoSe23_Abschlussarbeit.allCustomers[EIA2SoSe23_Abschlussarbeit.waitingPosTaken[_waitPos]].status == CustomerStatus.AskingForIcecream) { // unselect wait pos customer
            console.log("Unselected Customer (by direct click)");
            EIA2SoSe23_Abschlussarbeit.allCustomers[EIA2SoSe23_Abschlussarbeit.waitingSelectedID].selected = false;
            EIA2SoSe23_Abschlussarbeit.waitingSelectedID = -2;
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
    }
    // draws wall
    function drawWall() {
        EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
        EIA2SoSe23_Abschlussarbeit.crc2.rect(EIA2SoSe23_Abschlussarbeit.canvasW * 0.125 - EIA2SoSe23_Abschlussarbeit.canvasW * 0.0075, 0, EIA2SoSe23_Abschlussarbeit.canvasW * 0.0075, EIA2SoSe23_Abschlussarbeit.canvasH);
        EIA2SoSe23_Abschlussarbeit.crc2.fillStyle = "rgb(121, 153, 164)";
        EIA2SoSe23_Abschlussarbeit.crc2.fill();
        EIA2SoSe23_Abschlussarbeit.crc2.closePath();
    }
    // draws counter
    function drawCounter() {
        EIA2SoSe23_Abschlussarbeit.crc2.beginPath();
        EIA2SoSe23_Abschlussarbeit.crc2.rect(EIA2SoSe23_Abschlussarbeit.canvasW * 0.125, EIA2SoSe23_Abschlussarbeit.canvasH * 0.875, EIA2SoSe23_Abschlussarbeit.canvasW, EIA2SoSe23_Abschlussarbeit.canvasH);
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
        let difference = _max - _min;
        let num = Math.random();
        num = Math.floor(num * difference);
        num += _min;
        return num;
    }
    EIA2SoSe23_Abschlussarbeit.getRandomNumber = getRandomNumber;
    // get random true or false
    function getRandomBool() {
        return Boolean(Math.round(Math.random()));
    }
    EIA2SoSe23_Abschlussarbeit.getRandomBool = getRandomBool;
    // gets an icecream topping (or sauce) color rgb code
    function getIcecreamColor(_topping, _sauce = false) {
        let colorR = 0;
        let colorG = 0;
        let colorB = 0;
        let sauceBonus = 0;
        let color = "";
        // sauce is a bit darker
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
                colorR = 219;
                colorG = 187;
                colorB = 31;
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
    // gets sprinkles color rgb code
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
    // gets customer mood color rgb code
    function getMoodColor(_mood) {
        let color = "";
        switch (_mood) {
            case CustomerMood.Bad:
                color = "rgb(205, 10, 10)"; // red
                break;
            case CustomerMood.Okay:
                color = "rgb(219, 219, 0)"; // yellow
                break;
            case CustomerMood.Good:
                color = "rgb(52, 223, 52)"; // green
                break;
            default:
                // Error color
                color = "rgb(200, 200, 200)"; // grey
                break;
        }
        return color;
    }
    EIA2SoSe23_Abschlussarbeit.getMoodColor = getMoodColor;
    // gets rating color rgb code
    function getRatingColor(_rating) {
        let color = "rgb(0, 118, 245)"; // rating more than 9 (default) - darkblue
        if (_rating < 2) {
            color = "rgb(128, 0, 0)"; // rating less than 2 - darkred
        }
        else if (_rating < 4) {
            color = "rgb(204, 0, 0)"; // rating less than 4 - red
        }
        else if (_rating < 6) {
            color = "rgb(255, 102, 0)"; // rating less than 6 - orange
        }
        else if (_rating < 7) {
            color = "rgb(255, 234, 0)"; // rating less than 7 - yellow
        }
        else if (_rating < 8) {
            color = "rgb(16, 245, 0)"; // rating less than 8 - green
        }
        else if (_rating < 9) {
            color = "rgb(0, 245, 204)"; // rating less than 9 - lightblue
        }
        return color;
    }
    EIA2SoSe23_Abschlussarbeit.getRatingColor = getRatingColor;
})(EIA2SoSe23_Abschlussarbeit || (EIA2SoSe23_Abschlussarbeit = {}));
//# sourceMappingURL=script.js.map