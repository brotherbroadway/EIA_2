"use strict";
var A10_2_PolymorphieAnimation;
(function (A10_2_PolymorphieAnimation) {
    /*
Aufgabe: L10_2_PolymorphieAnimation
Name: Jona Ruder
Matrikel: 265274
Datum: 17.06.2023
Quellen: -
*/
    let canvas = document.querySelector("canvas");
    A10_2_PolymorphieAnimation.crc2 = canvas.getContext("2d");
    A10_2_PolymorphieAnimation.crc2.canvas.height = window.innerHeight * 0.9;
    A10_2_PolymorphieAnimation.crc2.canvas.width = window.innerWidth * 0.9;
    A10_2_PolymorphieAnimation.canvasH = A10_2_PolymorphieAnimation.crc2.canvas.height;
    A10_2_PolymorphieAnimation.canvasW = A10_2_PolymorphieAnimation.crc2.canvas.width;
    let windowW = window.innerWidth;
    let newWindowW = window.innerWidth;
    let resizeW = 250;
    let golden = 0.62;
    A10_2_PolymorphieAnimation.horizon = A10_2_PolymorphieAnimation.canvasH * golden;
    let landingX = A10_2_PolymorphieAnimation.canvasW * 0.15 + (A10_2_PolymorphieAnimation.canvasW * 0.05 * Math.random());
    let landingY = A10_2_PolymorphieAnimation.canvasH * 0.75 + (A10_2_PolymorphieAnimation.canvasH * 0.05 * Math.random());
    let houseX = A10_2_PolymorphieAnimation.canvasW * 0.6 + (A10_2_PolymorphieAnimation.canvasW * 0.05 * Math.random());
    let houseY = A10_2_PolymorphieAnimation.canvasH * 0.7 + (A10_2_PolymorphieAnimation.canvasH * 0.05 * Math.random());
    let backgroundData;
    A10_2_PolymorphieAnimation.allMoveables = [];
    // Trees don't move so they're separate :) (they also only share like 1/4th of the constructor of the animated ones)
    let allBackgroundTrees = [];
    let allForegroundTrees = [];
    let moveablesID = 0;
    let animationInterval;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        windowW = window.innerWidth;
        window.addEventListener("resize", widthChange, false);
        drawEverything();
    }
    // draws everything
    function drawEverything() {
        if (animationInterval != null) {
            clearInterval(animationInterval);
            console.log("Interval cleared.");
        }
        moveablesID = 0;
        let cloudAmount = getRandomNumber(A10_2_PolymorphieAnimation.canvasW * 0.0125, A10_2_PolymorphieAnimation.canvasW * 0.005);
        // background
        drawBackground();
        // sun
        drawSun(A10_2_PolymorphieAnimation.canvasW * Math.random(), A10_2_PolymorphieAnimation.canvasH * Math.random() * 0.25);
        // clouds
        for (let i = 0; i < cloudAmount; i++) {
            drawCloud(A10_2_PolymorphieAnimation.canvasW * Math.random(), A10_2_PolymorphieAnimation.canvasH * Math.random() * 0.25, getRandomNumber(200, 75), getRandomNumber(75, 35));
        }
        // mountain range
        drawMountains(0, A10_2_PolymorphieAnimation.horizon, 150, 275, "lightgrey", "white", A10_2_PolymorphieAnimation.canvasW * 0.08, A10_2_PolymorphieAnimation.canvasW * 0.13);
        drawMountains(0, A10_2_PolymorphieAnimation.horizon, 125, 200, "grey", "white", A10_2_PolymorphieAnimation.canvasW * 0.04, A10_2_PolymorphieAnimation.canvasW * 0.07);
        drawMountains(0, A10_2_PolymorphieAnimation.horizon, 50, 150, "grey", "lightgrey", A10_2_PolymorphieAnimation.canvasW * 0.02, A10_2_PolymorphieAnimation.canvasW * 0.04);
        backgroundData = A10_2_PolymorphieAnimation.crc2.getImageData(0, 0, canvas.width, canvas.height);
        // reset animated features
        A10_2_PolymorphieAnimation.allMoveables = [];
        allForegroundTrees = [];
        allBackgroundTrees = [];
        // draw initial frame
        drawInitialAnimation();
        drawInitialForeground();
        // THE ANIMATION
        animationInterval = setInterval(drawAnimated, 100);
    }
    // draws foreground stuff (mostly unanimated, but just so it layers correctly)
    function drawInitialForeground() {
        // background trees
        let treeAmount = getRandomNumber(A10_2_PolymorphieAnimation.canvasW * 0.01, A10_2_PolymorphieAnimation.canvasW * 0.0025);
        let houseHeight = A10_2_PolymorphieAnimation.canvasH * 0.7 + (A10_2_PolymorphieAnimation.canvasH * 0.05 * Math.random());
        for (let i = 0; i < treeAmount; i++) {
            let tree = new A10_2_PolymorphieAnimation.Tree(getRandomNumber(A10_2_PolymorphieAnimation.canvasW * 0.9, A10_2_PolymorphieAnimation.canvasW * 0.1), getRandomNumber(houseHeight - (A10_2_PolymorphieAnimation.canvasH * 0.1), golden + (A10_2_PolymorphieAnimation.canvasH * 0.57)), getRandomNumber(1.2, 0.8), i);
            allBackgroundTrees.push(tree);
            allBackgroundTrees[i].drawTree();
        }
        // house
        drawHouse(houseX, houseY);
        // landing spot
        drawLandingSpot(landingX, landingY);
        // windbag
        drawWindbag(landingX, landingY);
        // ANIMATED people
        let peopleAmount = getRandomNumber(10, 5) + moveablesID;
        console.log("MOVEID: " + moveablesID);
        for (let i = moveablesID; i < peopleAmount; i++) {
            drawNewPerson(getRandomNumber(A10_2_PolymorphieAnimation.canvasW * 0.95, A10_2_PolymorphieAnimation.canvasW * 0.05), getRandomNumber(A10_2_PolymorphieAnimation.canvasH * 0.95, A10_2_PolymorphieAnimation.horizon + (A10_2_PolymorphieAnimation.canvasH * 0.15)), i, true);
        }
        // foreground trees
        treeAmount = getRandomNumber(A10_2_PolymorphieAnimation.canvasW * 0.01, A10_2_PolymorphieAnimation.canvasW * 0.002);
        for (let i = 0; i < treeAmount; i++) {
            let tree = new A10_2_PolymorphieAnimation.Tree(getRandomNumber(A10_2_PolymorphieAnimation.canvasW * 0.9, A10_2_PolymorphieAnimation.canvasW * 0.1), getRandomNumber(A10_2_PolymorphieAnimation.canvasH * 0.9, houseHeight + (A10_2_PolymorphieAnimation.canvasH * 0.075)), getRandomNumber(1.5, 1), i);
            allForegroundTrees.push(tree);
            allForegroundTrees[i].drawTree();
        }
    }
    // draw initial animated stuff
    function drawInitialAnimation() {
        // initial hot air balloons
        let ballonAmount = 10 + moveablesID;
        for (let i = moveablesID; i < ballonAmount; i++) {
            drawNewBalloon(getRandomNumber(A10_2_PolymorphieAnimation.canvasW * 0.95, A10_2_PolymorphieAnimation.canvasW * 0.05), getRandomNumber(A10_2_PolymorphieAnimation.canvasH * 0.55, A10_2_PolymorphieAnimation.canvasH * 0.1), i, true);
        }
        moveablesID = ballonAmount;
        // initial dragonflies
        let dragonflyAmount = getRandomNumber(12, 6) + moveablesID;
        for (let i = moveablesID; i < dragonflyAmount; i++) {
            drawNewDragonfly(getRandomNumber(A10_2_PolymorphieAnimation.canvasW * 0.95, A10_2_PolymorphieAnimation.canvasW * 0.05), getRandomNumber(A10_2_PolymorphieAnimation.canvasH * 0.95, A10_2_PolymorphieAnimation.horizon - (A10_2_PolymorphieAnimation.canvasH * 0.05)), i, true);
        }
        moveablesID = dragonflyAmount;
    }
    // draw foreground layers
    function drawForegroundLayers() {
        // climbers
        let climberCount = 0;
        // separated from others because of background trees
        A10_2_PolymorphieAnimation.allMoveables.forEach(function (e) {
            switch (e.constructor) {
                case A10_2_PolymorphieAnimation.Climber:
                    //console.log("PEOPLE");
                    e.draw();
                    climberCount++;
                    break;
                default:
                    //console.log(e.constructor);
                    break;
            }
        });
        // spawns new climbers if less than 2 are on screen or at random
        if (climberCount < 2 || Math.random() < 0.05) {
            let spawnPosX = houseX + (A10_2_PolymorphieAnimation.canvasW * 0.05 * Math.random());
            let spawnPosY = houseY - (A10_2_PolymorphieAnimation.canvasH * 0.1 * Math.random());
            drawNewClimber(spawnPosX, spawnPosY, A10_2_PolymorphieAnimation.allMoveables.length, false);
        }
        // background trees
        allBackgroundTrees.forEach(function (e) {
            e.drawTree();
        });
        // house
        drawHouse(houseX, houseY);
        // landing spot
        drawLandingSpot(landingX, landingY);
        // windbag
        drawWindbag(landingX, landingY);
        // people
        let peopleCount = 0;
        // separated from others because of foreground trees
        A10_2_PolymorphieAnimation.allMoveables.forEach(function (e) {
            switch (e.constructor) {
                case A10_2_PolymorphieAnimation.People:
                    //console.log("PEOPLE");
                    e.draw();
                    peopleCount++;
                    break;
                default:
                    //console.log("WHAT IS THIS");
                    break;
            }
        });
        // spawns new people if less than 3 are on screen or at random
        if (peopleCount < 3 && peopleCount < 12 || Math.random() < 0.03 && peopleCount < 12) {
            let spawnPosX = A10_2_PolymorphieAnimation.canvasW * (-0.1 * Math.random()) - 25;
            if (getRandomBool()) {
                spawnPosX = A10_2_PolymorphieAnimation.canvasW + (A10_2_PolymorphieAnimation.canvasW * 0.1 * Math.random()) + 25;
            }
            drawNewPerson(spawnPosX, getRandomNumber(A10_2_PolymorphieAnimation.canvasH * 0.95, A10_2_PolymorphieAnimation.horizon + (A10_2_PolymorphieAnimation.canvasH * 0.15)), A10_2_PolymorphieAnimation.allMoveables.length, false);
        }
        // foreground trees
        allForegroundTrees.forEach(function (e) {
            e.drawTree();
        });
    }
    // draw animated stuff for interval
    function drawAnimated() {
        //console.log("Animation trigger");
        A10_2_PolymorphieAnimation.crc2.putImageData(backgroundData, 0, 0);
        drawForegroundLayers();
        // --- balloons ---
        let balloonCount = 0;
        let dragonflyCount = 0;
        A10_2_PolymorphieAnimation.allMoveables.forEach(function (e) {
            switch (e.constructor) {
                case A10_2_PolymorphieAnimation.Balloon:
                    //console.log("BALLOON");
                    e.draw();
                    balloonCount++;
                    break;
                case A10_2_PolymorphieAnimation.Dragonfly:
                    //console.log("DRAGON")
                    e.draw();
                    dragonflyCount++;
                    break;
                default:
                    //console.log("WHAT IS THIS");
                    break;
            }
        });
        // spawns new balloons if less than 10 are on screen or at random
        if (balloonCount < 10 && balloonCount < 15 || Math.random() < 0.05 && balloonCount < 15) {
            let spawnPosX = A10_2_PolymorphieAnimation.canvasW * (-0.1 * Math.random()) - 25;
            if (getRandomBool()) {
                spawnPosX = A10_2_PolymorphieAnimation.canvasW + (A10_2_PolymorphieAnimation.canvasW * 0.1 * Math.random()) + 25;
            }
            drawNewBalloon(spawnPosX, getRandomNumber(A10_2_PolymorphieAnimation.canvasH * 0.55, A10_2_PolymorphieAnimation.canvasH * 0.1), A10_2_PolymorphieAnimation.allMoveables.length, false);
        }
        //console.log("Balloon Count: " + balloonCount);
        // --- dragonflies ----
        // spawns new dragonflies if less than 5 are on screen or at random
        if (dragonflyCount < 5 || Math.random() < 0.05) {
            let spawnPosX = A10_2_PolymorphieAnimation.canvasW * (-0.1 * Math.random()) - 25;
            if (getRandomBool()) {
                spawnPosX = A10_2_PolymorphieAnimation.canvasW + (A10_2_PolymorphieAnimation.canvasW * 0.1 * Math.random()) + 25;
            }
            drawNewDragonfly(spawnPosX, getRandomNumber(A10_2_PolymorphieAnimation.canvasH * 0.95, A10_2_PolymorphieAnimation.horizon - (A10_2_PolymorphieAnimation.canvasH * 0.05)), A10_2_PolymorphieAnimation.allMoveables.length, false);
        }
        //console.log("Dragonfly Count: " + dragonflyCount);
    }
    // draws new balloon
    function drawNewBalloon(_posX, _posY, _id, _starter) {
        let randomXspeed = A10_2_PolymorphieAnimation.canvasW * (0.004 * Math.random() + 0.002);
        let randomYspeed = A10_2_PolymorphieAnimation.canvasH * (0.004 * Math.random() + 0.002);
        if (_starter && getRandomBool() || !_starter && _posX > A10_2_PolymorphieAnimation.canvasW) {
            randomXspeed = -randomXspeed;
        }
        let balloon = new A10_2_PolymorphieAnimation.Balloon(_posX, _posY, randomXspeed, randomYspeed, getRandomColor(), getRandomColor(), _id, _starter);
        A10_2_PolymorphieAnimation.allMoveables.push(balloon);
        A10_2_PolymorphieAnimation.allMoveables[_id].draw();
        console.log("New Balloon X: " + Math.floor(_posX) + ", Y: " + Math.floor(_posY));
    }
    // draws new dragonfly
    function drawNewDragonfly(_posX, _posY, _id, _starter) {
        let randomXspeed = A10_2_PolymorphieAnimation.canvasW * (0.06 * Math.random() + 0.01);
        let randomYspeed = A10_2_PolymorphieAnimation.canvasH * (0.06 * Math.random() + 0.01);
        if (_starter && getRandomBool() || !_starter && _posX > A10_2_PolymorphieAnimation.canvasW) {
            randomXspeed = -randomXspeed;
        }
        let dragonfly = new A10_2_PolymorphieAnimation.Dragonfly(_posX, _posY, randomXspeed, randomYspeed, getRandomColor(), getRandomBool(), _id, _starter);
        A10_2_PolymorphieAnimation.allMoveables.push(dragonfly);
        A10_2_PolymorphieAnimation.allMoveables[_id].draw();
        console.log("New Dragonfly X: " + Math.floor(_posX) + ", Y: " + Math.floor(_posY));
    }
    // draws new foreground person
    function drawNewPerson(_posX, _posY, _id, _starter) {
        let randomXspeed = A10_2_PolymorphieAnimation.canvasW * (0.005 * Math.random() + 0.0025);
        let randomYspeed = A10_2_PolymorphieAnimation.canvasH * (0.005 * Math.random() + 0.0025);
        if (_starter && getRandomBool() || !_starter && _posX > A10_2_PolymorphieAnimation.canvasW) {
            randomXspeed = -randomXspeed;
        }
        let person = new A10_2_PolymorphieAnimation.People(_posX, _posY, randomXspeed, randomYspeed, getRandomColor(), _id, _starter);
        A10_2_PolymorphieAnimation.allMoveables.push(person);
        A10_2_PolymorphieAnimation.allMoveables[_id].draw();
        console.log("New Person X: " + Math.floor(_posX) + ", Y: " + Math.floor(_posY));
    }
    // draws new climber
    function drawNewClimber(_posX, _posY, _id, _starter) {
        let randomXspeed = -(A10_2_PolymorphieAnimation.canvasW * (0.02 * Math.random() + 0.0025));
        let randomYspeed = -(A10_2_PolymorphieAnimation.canvasH * (0.01 * Math.random() + 0.005));
        let climber = new A10_2_PolymorphieAnimation.Climber(_posX, _posY, randomXspeed, randomYspeed, getRandomColor(), _id, false);
        A10_2_PolymorphieAnimation.allMoveables.push(climber);
        A10_2_PolymorphieAnimation.allMoveables[_id].draw();
        console.log("New Climber X: " + Math.floor(_posX) + ", Y: " + Math.floor(randomYspeed));
    }
    // creates new canvas if new window width is a lot smaller/bigger
    function widthChange() {
        newWindowW = window.innerWidth;
        // i know we were supposed to do this with css, but that just squeezes everything if it gets resized at runtime and doesn't look nice
        if (windowW - newWindowW > resizeW || windowW - newWindowW < -resizeW) {
            console.log("--- Canvas updated because of aspect ratio ---");
            windowW = window.innerWidth;
            A10_2_PolymorphieAnimation.crc2.clearRect(0, 0, A10_2_PolymorphieAnimation.canvasW, A10_2_PolymorphieAnimation.canvasH);
            A10_2_PolymorphieAnimation.crc2.canvas.height = window.innerHeight * 0.9;
            A10_2_PolymorphieAnimation.crc2.canvas.width = window.innerWidth * 0.9;
            A10_2_PolymorphieAnimation.canvasH = A10_2_PolymorphieAnimation.crc2.canvas.height;
            A10_2_PolymorphieAnimation.canvasW = A10_2_PolymorphieAnimation.crc2.canvas.width;
            A10_2_PolymorphieAnimation.horizon = A10_2_PolymorphieAnimation.canvasH * golden;
            landingX = A10_2_PolymorphieAnimation.canvasW * 0.15 + (A10_2_PolymorphieAnimation.canvasW * 0.05 * Math.random());
            landingY = A10_2_PolymorphieAnimation.canvasH * 0.75 + (A10_2_PolymorphieAnimation.canvasH * 0.05 * Math.random());
            houseX = A10_2_PolymorphieAnimation.canvasW * 0.6 + (A10_2_PolymorphieAnimation.canvasW * 0.05 * Math.random());
            houseY = A10_2_PolymorphieAnimation.canvasH * 0.7 + (A10_2_PolymorphieAnimation.canvasH * 0.05 * Math.random());
            drawEverything();
        }
    }
    // gets random rgb value
    function getRandomColor() {
        let redValue = Math.random() * 255;
        let greenValue = Math.random() * 255;
        let blueValue = Math.random() * 255;
        //let alphaValue: number = Math.random();
        let randomColor = "rgba(" + redValue + ", " + greenValue + ", " + blueValue + ", " + 1 + ")";
        return randomColor;
    }
    A10_2_PolymorphieAnimation.getRandomColor = getRandomColor;
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
    // get random true or false
    function getRandomBool() {
        return Boolean(Math.round(Math.random()));
    }
    A10_2_PolymorphieAnimation.getRandomBool = getRandomBool;
    // draw background with golden ratio
    function drawBackground() {
        console.log("Background");
        // adds background gradient with golden ratio
        let gradient = A10_2_PolymorphieAnimation.crc2.createLinearGradient(0, 0, 0, A10_2_PolymorphieAnimation.canvasH);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%");
        A10_2_PolymorphieAnimation.crc2.fillStyle = gradient;
        A10_2_PolymorphieAnimation.crc2.fillRect(0, 0, A10_2_PolymorphieAnimation.canvasW, A10_2_PolymorphieAnimation.canvasH);
    }
    // draws sun (can't use Vector (not found?))
    function drawSun(_posX, _posY) {
        console.log("Sun", _posX, _posY);
        // shine radius
        let r1 = 30;
        let r2 = 150;
        let gradient = A10_2_PolymorphieAnimation.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        // adds shine gradient
        gradient.addColorStop(0, "HSLA(40, 100%, 100%, 1)");
        gradient.addColorStop(1, "HSLA(50, 100%, 60%, 0)");
        A10_2_PolymorphieAnimation.crc2.save();
        A10_2_PolymorphieAnimation.crc2.translate(_posX, _posY);
        A10_2_PolymorphieAnimation.crc2.fillStyle = gradient;
        A10_2_PolymorphieAnimation.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        A10_2_PolymorphieAnimation.crc2.fill();
        A10_2_PolymorphieAnimation.crc2.restore();
    }
    // draws clouds
    function drawCloud(_posX, _posY, _sizeX, _sizeY) {
        console.log("Cloud", _posX, _posY, _sizeX, _sizeY);
        // generate particles
        let nParticles = _sizeX * 0.2;
        let radiusParticle = _sizeY * 0.6;
        let particle = new Path2D();
        let gradient = A10_2_PolymorphieAnimation.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        // add gradient to clouds
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.9");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0");
        A10_2_PolymorphieAnimation.crc2.save();
        A10_2_PolymorphieAnimation.crc2.translate(_posX, _posY);
        A10_2_PolymorphieAnimation.crc2.fillStyle = gradient;
        // draw cloud particles within size
        for (let drawn = 0; drawn < nParticles; drawn++) {
            A10_2_PolymorphieAnimation.crc2.save();
            let thisX = (Math.random() - 0.5) * _sizeX;
            let thisY = (Math.random() * _sizeY);
            A10_2_PolymorphieAnimation.crc2.translate(thisX, thisY);
            A10_2_PolymorphieAnimation.crc2.fill(particle);
            A10_2_PolymorphieAnimation.crc2.restore();
        }
        A10_2_PolymorphieAnimation.crc2.restore();
    }
    // draws mountain range
    function drawMountains(_posX, _posY, _min, _max, _colorLow, _colorHigh, _stepMin, _stepMax) {
        console.log("Mountains", _posX, _posY, _min, _max, _colorLow, _colorHigh);
        let thisX = 0;
        A10_2_PolymorphieAnimation.crc2.save();
        A10_2_PolymorphieAnimation.crc2.translate(_posX, _posY);
        A10_2_PolymorphieAnimation.crc2.beginPath();
        A10_2_PolymorphieAnimation.crc2.moveTo(0, 0);
        A10_2_PolymorphieAnimation.crc2.lineTo(0, -_max);
        // generate mountain peaks
        do {
            thisX += _stepMin + Math.random() * (_stepMax - _stepMin);
            //console.log(thisX);
            let thisY = -_min - Math.random() * (_max - _min);
            A10_2_PolymorphieAnimation.crc2.lineTo(thisX, thisY);
        } while (thisX < A10_2_PolymorphieAnimation.canvasW);
        A10_2_PolymorphieAnimation.crc2.lineTo(thisX, 0);
        A10_2_PolymorphieAnimation.crc2.closePath();
        // add mountain gradient color
        let gradient = A10_2_PolymorphieAnimation.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(1, _colorHigh);
        A10_2_PolymorphieAnimation.crc2.fillStyle = gradient;
        A10_2_PolymorphieAnimation.crc2.fill();
        A10_2_PolymorphieAnimation.crc2.restore();
    }
    // draws landing spot in foreground
    function drawLandingSpot(_posX, _posY) {
        //console.log("Landing Spot", _posX, _posY);
        A10_2_PolymorphieAnimation.crc2.save();
        A10_2_PolymorphieAnimation.crc2.translate(_posX, _posY);
        // add parallelogram for landing spot
        A10_2_PolymorphieAnimation.crc2.beginPath();
        //crc2.rect(0, 0, 30, 50);
        A10_2_PolymorphieAnimation.crc2.moveTo(0, 0);
        A10_2_PolymorphieAnimation.crc2.lineTo(-20, 50);
        A10_2_PolymorphieAnimation.crc2.lineTo(40, 50);
        A10_2_PolymorphieAnimation.crc2.lineTo(60, 0);
        A10_2_PolymorphieAnimation.crc2.lineTo(0, 0);
        A10_2_PolymorphieAnimation.crc2.closePath();
        let gradient = A10_2_PolymorphieAnimation.crc2.createLinearGradient(0, 0, 0, 60);
        gradient.addColorStop(0, "grey");
        gradient.addColorStop(1, "rgba(60, 60, 60, 1)");
        A10_2_PolymorphieAnimation.crc2.fillStyle = gradient;
        //crc2.strokeStyle = "black";
        //crc2.stroke();
        A10_2_PolymorphieAnimation.crc2.fill();
        // add ellipse for landing spot
        A10_2_PolymorphieAnimation.crc2.beginPath();
        A10_2_PolymorphieAnimation.crc2.ellipse(20, 25, 22, 20, Math.PI / 1.2, 0, 2 * Math.PI);
        A10_2_PolymorphieAnimation.crc2.strokeStyle = "white";
        A10_2_PolymorphieAnimation.crc2.lineWidth = 3;
        A10_2_PolymorphieAnimation.crc2.stroke();
        A10_2_PolymorphieAnimation.crc2.closePath();
        // add letter for landing spot
        A10_2_PolymorphieAnimation.crc2.fillStyle = "white";
        A10_2_PolymorphieAnimation.crc2.font = "italic 30px Arial";
        A10_2_PolymorphieAnimation.crc2.fillText("H", 8, 35);
        A10_2_PolymorphieAnimation.crc2.restore();
    }
    // draws windbag
    function drawWindbag(_posX, _posY) {
        //console.log("Windbag", _posX, _posY);
        A10_2_PolymorphieAnimation.crc2.save();
        A10_2_PolymorphieAnimation.crc2.translate(_posX, _posY);
        // add pole
        A10_2_PolymorphieAnimation.crc2.beginPath();
        A10_2_PolymorphieAnimation.crc2.rect(70, -20, 5, 50);
        A10_2_PolymorphieAnimation.crc2.closePath();
        A10_2_PolymorphieAnimation.crc2.fillStyle = "red";
        A10_2_PolymorphieAnimation.crc2.fill();
        // add windbag
        A10_2_PolymorphieAnimation.crc2.beginPath();
        A10_2_PolymorphieAnimation.crc2.bezierCurveTo(72, -14, 100, -40, 150, -25);
        A10_2_PolymorphieAnimation.crc2.lineTo(152, -55);
        A10_2_PolymorphieAnimation.crc2.bezierCurveTo(150, -55, 100, -80, 70, -55);
        A10_2_PolymorphieAnimation.crc2.fillStyle = "red";
        A10_2_PolymorphieAnimation.crc2.fill();
        A10_2_PolymorphieAnimation.crc2.closePath();
        A10_2_PolymorphieAnimation.crc2.beginPath();
        A10_2_PolymorphieAnimation.crc2.ellipse(150, -40, 5, 15, Math.PI, 0, 2 * Math.PI);
        A10_2_PolymorphieAnimation.crc2.closePath();
        A10_2_PolymorphieAnimation.crc2.fillStyle = "red";
        A10_2_PolymorphieAnimation.crc2.fill();
        A10_2_PolymorphieAnimation.crc2.beginPath();
        A10_2_PolymorphieAnimation.crc2.ellipse(72, -35, 8, 20, Math.PI, 0, 2 * Math.PI);
        A10_2_PolymorphieAnimation.crc2.fillStyle = "orange";
        A10_2_PolymorphieAnimation.crc2.fill();
        A10_2_PolymorphieAnimation.crc2.closePath();
        A10_2_PolymorphieAnimation.crc2.restore();
    }
    // draws house in foreground
    function drawHouse(_posX, _posY) {
        //console.log("House", _posX, _posY);
        A10_2_PolymorphieAnimation.crc2.save();
        A10_2_PolymorphieAnimation.crc2.translate(_posX, _posY);
        // adds rightside roof
        A10_2_PolymorphieAnimation.crc2.beginPath();
        A10_2_PolymorphieAnimation.crc2.moveTo(80, -70);
        A10_2_PolymorphieAnimation.crc2.lineTo(110, -40);
        A10_2_PolymorphieAnimation.crc2.lineTo(40, -40);
        A10_2_PolymorphieAnimation.crc2.fillStyle = "rgba(200, 80, 0, 1)";
        A10_2_PolymorphieAnimation.crc2.fill();
        A10_2_PolymorphieAnimation.crc2.closePath();
        // adds front
        A10_2_PolymorphieAnimation.crc2.beginPath();
        A10_2_PolymorphieAnimation.crc2.moveTo(40, 30);
        A10_2_PolymorphieAnimation.crc2.lineTo(100, 30);
        A10_2_PolymorphieAnimation.crc2.lineTo(100, -50);
        A10_2_PolymorphieAnimation.crc2.lineTo(80, -70);
        A10_2_PolymorphieAnimation.crc2.lineTo(40, -50);
        A10_2_PolymorphieAnimation.crc2.lineTo(40, 30);
        A10_2_PolymorphieAnimation.crc2.fillStyle = "rgba(255, 0, 0, 1)";
        A10_2_PolymorphieAnimation.crc2.fill();
        A10_2_PolymorphieAnimation.crc2.closePath();
        // adds side
        A10_2_PolymorphieAnimation.crc2.beginPath();
        A10_2_PolymorphieAnimation.crc2.moveTo(0, 0);
        A10_2_PolymorphieAnimation.crc2.lineTo(0, -80);
        A10_2_PolymorphieAnimation.crc2.lineTo(40, -50);
        A10_2_PolymorphieAnimation.crc2.lineTo(40, 30);
        A10_2_PolymorphieAnimation.crc2.fillStyle = "rgba(180, 0, 0, 1)";
        A10_2_PolymorphieAnimation.crc2.fill();
        A10_2_PolymorphieAnimation.crc2.closePath();
        // adds leftside roof
        A10_2_PolymorphieAnimation.crc2.beginPath();
        A10_2_PolymorphieAnimation.crc2.moveTo(-15, -70);
        A10_2_PolymorphieAnimation.crc2.lineTo(30, -100);
        A10_2_PolymorphieAnimation.crc2.lineTo(80, -70);
        A10_2_PolymorphieAnimation.crc2.lineTo(30, -40);
        A10_2_PolymorphieAnimation.crc2.lineTo(-15, -70);
        A10_2_PolymorphieAnimation.crc2.fillStyle = "rgba(255, 120, 30, 1)";
        A10_2_PolymorphieAnimation.crc2.fill();
        A10_2_PolymorphieAnimation.crc2.closePath();
        // adds window
        A10_2_PolymorphieAnimation.crc2.beginPath();
        A10_2_PolymorphieAnimation.crc2.moveTo(4, -20);
        A10_2_PolymorphieAnimation.crc2.lineTo(36, 0);
        A10_2_PolymorphieAnimation.crc2.lineTo(36, -30);
        A10_2_PolymorphieAnimation.crc2.lineTo(4, -50);
        let gradient = A10_2_PolymorphieAnimation.crc2.createLinearGradient(0, 0, 15, -35);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(1, "orange");
        A10_2_PolymorphieAnimation.crc2.fillStyle = gradient;
        A10_2_PolymorphieAnimation.crc2.fill();
        A10_2_PolymorphieAnimation.crc2.closePath();
        A10_2_PolymorphieAnimation.crc2.restore();
    }
})(A10_2_PolymorphieAnimation || (A10_2_PolymorphieAnimation = {}));
//# sourceMappingURL=script.js.map