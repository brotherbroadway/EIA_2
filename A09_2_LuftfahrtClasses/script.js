"use strict";
var A09_2_LuftfahrtClasses;
(function (A09_2_LuftfahrtClasses) {
    /*
Aufgabe: L09_2_LuftfahrtClasses
Name: Jona Ruder
Matrikel: 265274
Datum: 27.05.2023
Quellen: -
*/
    let canvas = document.querySelector("canvas");
    A09_2_LuftfahrtClasses.crc2 = canvas.getContext("2d");
    A09_2_LuftfahrtClasses.crc2.canvas.height = window.innerHeight * 0.9;
    A09_2_LuftfahrtClasses.crc2.canvas.width = window.innerWidth * 0.9;
    A09_2_LuftfahrtClasses.canvasH = A09_2_LuftfahrtClasses.crc2.canvas.height;
    A09_2_LuftfahrtClasses.canvasW = A09_2_LuftfahrtClasses.crc2.canvas.width;
    let windowW = window.innerWidth;
    let newWindowW = window.innerWidth;
    let resizeW = 250;
    let golden = 0.62;
    A09_2_LuftfahrtClasses.horizon = A09_2_LuftfahrtClasses.canvasH * golden;
    let landingX = A09_2_LuftfahrtClasses.canvasW * 0.15 + (A09_2_LuftfahrtClasses.canvasW * 0.05 * Math.random());
    let landingY = A09_2_LuftfahrtClasses.canvasH * 0.75 + (A09_2_LuftfahrtClasses.canvasH * 0.05 * Math.random());
    let houseX = A09_2_LuftfahrtClasses.canvasW * 0.6 + (A09_2_LuftfahrtClasses.canvasW * 0.05 * Math.random());
    let houseY = A09_2_LuftfahrtClasses.canvasH * 0.7 + (A09_2_LuftfahrtClasses.canvasH * 0.05 * Math.random());
    let backgroundData;
    A09_2_LuftfahrtClasses.allBalloons = [];
    A09_2_LuftfahrtClasses.allDragonflies = [];
    A09_2_LuftfahrtClasses.allPeople = [];
    A09_2_LuftfahrtClasses.allClimbers = [];
    let allBackgroundTrees = [];
    let allForegroundTrees = [];
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
        let cloudAmount = getRandomNumber(A09_2_LuftfahrtClasses.canvasW * 0.0125, A09_2_LuftfahrtClasses.canvasW * 0.005);
        // background
        drawBackground();
        // sun
        drawSun(A09_2_LuftfahrtClasses.canvasW * Math.random(), A09_2_LuftfahrtClasses.canvasH * Math.random() * 0.25);
        // clouds
        for (let i = 0; i < cloudAmount; i++) {
            drawCloud(A09_2_LuftfahrtClasses.canvasW * Math.random(), A09_2_LuftfahrtClasses.canvasH * Math.random() * 0.25, getRandomNumber(200, 75), getRandomNumber(75, 35));
        }
        // mountain range
        drawMountains(0, A09_2_LuftfahrtClasses.horizon, 150, 275, "lightgrey", "white", A09_2_LuftfahrtClasses.canvasW * 0.08, A09_2_LuftfahrtClasses.canvasW * 0.13);
        drawMountains(0, A09_2_LuftfahrtClasses.horizon, 125, 200, "grey", "white", A09_2_LuftfahrtClasses.canvasW * 0.04, A09_2_LuftfahrtClasses.canvasW * 0.07);
        drawMountains(0, A09_2_LuftfahrtClasses.horizon, 50, 150, "grey", "lightgrey", A09_2_LuftfahrtClasses.canvasW * 0.02, A09_2_LuftfahrtClasses.canvasW * 0.04);
        backgroundData = A09_2_LuftfahrtClasses.crc2.getImageData(0, 0, canvas.width, canvas.height);
        // reset animated features
        A09_2_LuftfahrtClasses.allBalloons = [];
        A09_2_LuftfahrtClasses.allDragonflies = [];
        A09_2_LuftfahrtClasses.allPeople = [];
        A09_2_LuftfahrtClasses.allClimbers = [];
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
        let treeAmount = getRandomNumber(A09_2_LuftfahrtClasses.canvasW * 0.01, A09_2_LuftfahrtClasses.canvasW * 0.0025);
        let houseHeight = A09_2_LuftfahrtClasses.canvasH * 0.7 + (A09_2_LuftfahrtClasses.canvasH * 0.05 * Math.random());
        for (let i = 0; i < treeAmount; i++) {
            let tree = new A09_2_LuftfahrtClasses.Tree(getRandomNumber(A09_2_LuftfahrtClasses.canvasW * 0.9, A09_2_LuftfahrtClasses.canvasW * 0.1), getRandomNumber(houseHeight - (A09_2_LuftfahrtClasses.canvasH * 0.1), golden + (A09_2_LuftfahrtClasses.canvasH * 0.57)), getRandomNumber(1.2, 0.8), i);
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
        let peopleAmount = getRandomNumber(10, 5);
        for (let i = 0; i < peopleAmount; i++) {
            drawNewPerson(getRandomNumber(A09_2_LuftfahrtClasses.canvasW * 0.95, A09_2_LuftfahrtClasses.canvasW * 0.05), getRandomNumber(A09_2_LuftfahrtClasses.canvasH * 0.95, A09_2_LuftfahrtClasses.horizon + (A09_2_LuftfahrtClasses.canvasH * 0.15)), i, true);
        }
        // foreground trees
        treeAmount = getRandomNumber(A09_2_LuftfahrtClasses.canvasW * 0.01, A09_2_LuftfahrtClasses.canvasW * 0.002);
        for (let i = 0; i < treeAmount; i++) {
            let tree = new A09_2_LuftfahrtClasses.Tree(getRandomNumber(A09_2_LuftfahrtClasses.canvasW * 0.9, A09_2_LuftfahrtClasses.canvasW * 0.1), getRandomNumber(A09_2_LuftfahrtClasses.canvasH * 0.9, houseHeight + (A09_2_LuftfahrtClasses.canvasH * 0.075)), getRandomNumber(1.5, 1), i);
            allForegroundTrees.push(tree);
            allForegroundTrees[i].drawTree();
        }
    }
    // draw initial animated stuff
    function drawInitialAnimation() {
        // initial hot air balloons
        for (let i = 0; i < 10; i++) {
            drawNewBalloon(getRandomNumber(A09_2_LuftfahrtClasses.canvasW * 0.95, A09_2_LuftfahrtClasses.canvasW * 0.05), getRandomNumber(A09_2_LuftfahrtClasses.canvasH * 0.55, A09_2_LuftfahrtClasses.canvasH * 0.1), i, true);
        }
        let dragonflyAmount = getRandomNumber(12, 6);
        // initial dragonflies
        for (let i = 0; i < dragonflyAmount; i++) {
            drawNewDragonfly(getRandomNumber(A09_2_LuftfahrtClasses.canvasW * 0.95, A09_2_LuftfahrtClasses.canvasW * 0.05), getRandomNumber(A09_2_LuftfahrtClasses.canvasH * 0.95, A09_2_LuftfahrtClasses.horizon - (A09_2_LuftfahrtClasses.canvasH * 0.05)), i, true);
        }
    }
    // draw foreground layers
    function drawForegroundLayers() {
        // climbers
        let climberCount = 0;
        A09_2_LuftfahrtClasses.allClimbers.forEach(function (e) {
            e.drawClimber();
            climberCount++;
        });
        // spawns new climbers if less than 2 are on screen or at random
        if (climberCount < 2 || Math.random() < 0.02) {
            let spawnPosX = houseX + (A09_2_LuftfahrtClasses.canvasW * 0.05 * Math.random());
            let spawnPosY = houseY - (A09_2_LuftfahrtClasses.canvasH * 0.1 * Math.random());
            drawNewClimber(spawnPosX, spawnPosY, A09_2_LuftfahrtClasses.allClimbers.length, false);
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
        A09_2_LuftfahrtClasses.allPeople.forEach(function (e) {
            e.drawPerson();
            peopleCount++;
        });
        // spawns new people if less than 3 are on screen or at random
        if (peopleCount < 3 && peopleCount < 12 || Math.random() < 0.03 && peopleCount < 12) {
            let spawnPosX = A09_2_LuftfahrtClasses.canvasW * (-0.1 * Math.random()) - 25;
            if (getRandomBool()) {
                spawnPosX = A09_2_LuftfahrtClasses.canvasW + (A09_2_LuftfahrtClasses.canvasW * 0.1 * Math.random()) + 25;
            }
            drawNewPerson(spawnPosX, getRandomNumber(A09_2_LuftfahrtClasses.canvasH * 0.95, A09_2_LuftfahrtClasses.horizon + (A09_2_LuftfahrtClasses.canvasH * 0.15)), A09_2_LuftfahrtClasses.allPeople.length, false);
        }
        // foreground trees
        allForegroundTrees.forEach(function (e) {
            e.drawTree();
        });
    }
    // draw animated stuff for interval
    function drawAnimated() {
        //console.log("Animation trigger");
        A09_2_LuftfahrtClasses.crc2.putImageData(backgroundData, 0, 0);
        drawForegroundLayers();
        // --- balloons ---
        let balloonCount = 0;
        A09_2_LuftfahrtClasses.allBalloons.forEach(function (e) {
            e.drawHotAirBalloon();
            balloonCount++;
        });
        // spawns new balloons if less than 10 are on screen or at random
        if (balloonCount < 10 && balloonCount < 15 || Math.random() < 0.05 && balloonCount < 15) {
            let spawnPosX = A09_2_LuftfahrtClasses.canvasW * (-0.1 * Math.random()) - 25;
            if (getRandomBool()) {
                spawnPosX = A09_2_LuftfahrtClasses.canvasW + (A09_2_LuftfahrtClasses.canvasW * 0.1 * Math.random()) + 25;
            }
            drawNewBalloon(spawnPosX, getRandomNumber(A09_2_LuftfahrtClasses.canvasH * 0.55, A09_2_LuftfahrtClasses.canvasH * 0.1), A09_2_LuftfahrtClasses.allBalloons.length, false);
        }
        //console.log("Balloon Count: " + balloonCount);
        // --- dragonflies ----
        let dragonflyCount = 0;
        A09_2_LuftfahrtClasses.allDragonflies.forEach(function (e) {
            e.drawDragonfly();
            dragonflyCount++;
        });
        // spawns new dragonflies if less than 5 are on screen or at random
        if (dragonflyCount < 5 || Math.random() < 0.05) {
            let spawnPosX = A09_2_LuftfahrtClasses.canvasW * (-0.1 * Math.random()) - 25;
            if (getRandomBool()) {
                spawnPosX = A09_2_LuftfahrtClasses.canvasW + (A09_2_LuftfahrtClasses.canvasW * 0.1 * Math.random()) + 25;
            }
            drawNewDragonfly(spawnPosX, getRandomNumber(A09_2_LuftfahrtClasses.canvasH * 0.95, A09_2_LuftfahrtClasses.horizon - (A09_2_LuftfahrtClasses.canvasH * 0.05)), A09_2_LuftfahrtClasses.allDragonflies.length, false);
        }
        //console.log("Dragonfly Count: " + dragonflyCount);
    }
    // draws new balloon
    function drawNewBalloon(_posX, _posY, _id, _starter) {
        let randomXspeed = A09_2_LuftfahrtClasses.canvasW * (0.004 * Math.random() + 0.002);
        let randomYspeed = A09_2_LuftfahrtClasses.canvasH * (0.004 * Math.random() + 0.002);
        if (_starter && getRandomBool() || !_starter && _posX > A09_2_LuftfahrtClasses.canvasW) {
            randomXspeed = -randomXspeed;
        }
        let balloon = new A09_2_LuftfahrtClasses.Balloon(_posX, _posY, randomXspeed, randomYspeed, getRandomColor(), getRandomColor(), _id, _starter);
        A09_2_LuftfahrtClasses.allBalloons.push(balloon);
        A09_2_LuftfahrtClasses.allBalloons[_id].drawHotAirBalloon();
        console.log("New Balloon X: " + Math.floor(_posX) + ", Y: " + Math.floor(_posY));
    }
    // draws new dragonfly
    function drawNewDragonfly(_posX, _posY, _id, _starter) {
        let randomXspeed = A09_2_LuftfahrtClasses.canvasW * (0.06 * Math.random() + 0.01);
        let randomYspeed = A09_2_LuftfahrtClasses.canvasH * (0.06 * Math.random() + 0.01);
        if (_starter && getRandomBool() || !_starter && _posX > A09_2_LuftfahrtClasses.canvasW) {
            randomXspeed = -randomXspeed;
        }
        let dragonfly = new A09_2_LuftfahrtClasses.Dragonfly(_posX, _posY, randomXspeed, randomYspeed, getRandomColor(), getRandomBool(), _id, _starter);
        A09_2_LuftfahrtClasses.allDragonflies.push(dragonfly);
        A09_2_LuftfahrtClasses.allDragonflies[_id].drawDragonfly();
        console.log("New Dragonfly X: " + Math.floor(_posX) + ", Y: " + Math.floor(_posY));
    }
    // draws new foreground person
    function drawNewPerson(_posX, _posY, _id, _starter) {
        let randomXspeed = A09_2_LuftfahrtClasses.canvasW * (0.005 * Math.random() + 0.0025);
        let randomYspeed = A09_2_LuftfahrtClasses.canvasH * (0.005 * Math.random() + 0.0025);
        if (_starter && getRandomBool() || !_starter && _posX > A09_2_LuftfahrtClasses.canvasW) {
            randomXspeed = -randomXspeed;
        }
        let person = new A09_2_LuftfahrtClasses.People(_posX, _posY, randomXspeed, randomYspeed, getRandomColor(), _id, _starter);
        A09_2_LuftfahrtClasses.allPeople.push(person);
        A09_2_LuftfahrtClasses.allPeople[_id].drawPerson();
        console.log("New Person X: " + Math.floor(_posX) + ", Y: " + Math.floor(_posY));
    }
    // draws new climber
    function drawNewClimber(_posX, _posY, _id, _starter) {
        let randomXspeed = -(A09_2_LuftfahrtClasses.canvasW * (0.02 * Math.random() + 0.0025));
        let randomYspeed = -(A09_2_LuftfahrtClasses.canvasH * (0.01 * Math.random() + 0.005));
        let climber = new A09_2_LuftfahrtClasses.Climber(_posX, _posY, randomXspeed, randomYspeed, getRandomColor(), _id, false);
        A09_2_LuftfahrtClasses.allClimbers.push(climber);
        A09_2_LuftfahrtClasses.allClimbers[_id].drawClimber();
        console.log("New Climber X: " + Math.floor(_posX) + ", Y: " + Math.floor(randomYspeed));
    }
    // creates new canvas if new window width is a lot smaller/bigger
    function widthChange() {
        newWindowW = window.innerWidth;
        // i know we were supposed to do this with css, but that just squeezes everything if it gets resized at runtime and doesn't look nice
        if (windowW - newWindowW > resizeW || windowW - newWindowW < -resizeW) {
            console.log("--- Canvas updated because of aspect ratio ---");
            windowW = window.innerWidth;
            A09_2_LuftfahrtClasses.crc2.clearRect(0, 0, A09_2_LuftfahrtClasses.canvasW, A09_2_LuftfahrtClasses.canvasH);
            A09_2_LuftfahrtClasses.crc2.canvas.height = window.innerHeight * 0.9;
            A09_2_LuftfahrtClasses.crc2.canvas.width = window.innerWidth * 0.9;
            A09_2_LuftfahrtClasses.canvasH = A09_2_LuftfahrtClasses.crc2.canvas.height;
            A09_2_LuftfahrtClasses.canvasW = A09_2_LuftfahrtClasses.crc2.canvas.width;
            A09_2_LuftfahrtClasses.horizon = A09_2_LuftfahrtClasses.canvasH * golden;
            landingX = A09_2_LuftfahrtClasses.canvasW * 0.15 + (A09_2_LuftfahrtClasses.canvasW * 0.05 * Math.random());
            landingY = A09_2_LuftfahrtClasses.canvasH * 0.75 + (A09_2_LuftfahrtClasses.canvasH * 0.05 * Math.random());
            houseX = A09_2_LuftfahrtClasses.canvasW * 0.6 + (A09_2_LuftfahrtClasses.canvasW * 0.05 * Math.random());
            houseY = A09_2_LuftfahrtClasses.canvasH * 0.7 + (A09_2_LuftfahrtClasses.canvasH * 0.05 * Math.random());
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
    A09_2_LuftfahrtClasses.getRandomColor = getRandomColor;
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
    A09_2_LuftfahrtClasses.getRandomBool = getRandomBool;
    // draw background with golden ratio
    function drawBackground() {
        console.log("Background");
        // adds background gradient with golden ratio
        let gradient = A09_2_LuftfahrtClasses.crc2.createLinearGradient(0, 0, 0, A09_2_LuftfahrtClasses.canvasH);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%");
        A09_2_LuftfahrtClasses.crc2.fillStyle = gradient;
        A09_2_LuftfahrtClasses.crc2.fillRect(0, 0, A09_2_LuftfahrtClasses.canvasW, A09_2_LuftfahrtClasses.canvasH);
    }
    // draws sun (can't use Vector (not found?))
    function drawSun(_posX, _posY) {
        console.log("Sun", _posX, _posY);
        // shine radius
        let r1 = 30;
        let r2 = 150;
        let gradient = A09_2_LuftfahrtClasses.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        // adds shine gradient
        gradient.addColorStop(0, "HSLA(40, 100%, 100%, 1)");
        gradient.addColorStop(1, "HSLA(50, 100%, 60%, 0)");
        A09_2_LuftfahrtClasses.crc2.save();
        A09_2_LuftfahrtClasses.crc2.translate(_posX, _posY);
        A09_2_LuftfahrtClasses.crc2.fillStyle = gradient;
        A09_2_LuftfahrtClasses.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        A09_2_LuftfahrtClasses.crc2.fill();
        A09_2_LuftfahrtClasses.crc2.restore();
    }
    // draws clouds
    function drawCloud(_posX, _posY, _sizeX, _sizeY) {
        console.log("Cloud", _posX, _posY, _sizeX, _sizeY);
        // generate particles
        let nParticles = _sizeX * 0.2;
        let radiusParticle = _sizeY * 0.6;
        let particle = new Path2D();
        let gradient = A09_2_LuftfahrtClasses.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        // add gradient to clouds
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.9");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0");
        A09_2_LuftfahrtClasses.crc2.save();
        A09_2_LuftfahrtClasses.crc2.translate(_posX, _posY);
        A09_2_LuftfahrtClasses.crc2.fillStyle = gradient;
        // draw cloud particles within size
        for (let drawn = 0; drawn < nParticles; drawn++) {
            A09_2_LuftfahrtClasses.crc2.save();
            let thisX = (Math.random() - 0.5) * _sizeX;
            let thisY = (Math.random() * _sizeY);
            A09_2_LuftfahrtClasses.crc2.translate(thisX, thisY);
            A09_2_LuftfahrtClasses.crc2.fill(particle);
            A09_2_LuftfahrtClasses.crc2.restore();
        }
        A09_2_LuftfahrtClasses.crc2.restore();
    }
    // draws mountain range
    function drawMountains(_posX, _posY, _min, _max, _colorLow, _colorHigh, _stepMin, _stepMax) {
        console.log("Mountains", _posX, _posY, _min, _max, _colorLow, _colorHigh);
        let thisX = 0;
        A09_2_LuftfahrtClasses.crc2.save();
        A09_2_LuftfahrtClasses.crc2.translate(_posX, _posY);
        A09_2_LuftfahrtClasses.crc2.beginPath();
        A09_2_LuftfahrtClasses.crc2.moveTo(0, 0);
        A09_2_LuftfahrtClasses.crc2.lineTo(0, -_max);
        // generate mountain peaks
        do {
            thisX += _stepMin + Math.random() * (_stepMax - _stepMin);
            //console.log(thisX);
            let thisY = -_min - Math.random() * (_max - _min);
            A09_2_LuftfahrtClasses.crc2.lineTo(thisX, thisY);
        } while (thisX < A09_2_LuftfahrtClasses.canvasW);
        A09_2_LuftfahrtClasses.crc2.lineTo(thisX, 0);
        A09_2_LuftfahrtClasses.crc2.closePath();
        // add mountain gradient color
        let gradient = A09_2_LuftfahrtClasses.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(1, _colorHigh);
        A09_2_LuftfahrtClasses.crc2.fillStyle = gradient;
        A09_2_LuftfahrtClasses.crc2.fill();
        A09_2_LuftfahrtClasses.crc2.restore();
    }
    // draws landing spot in foreground
    function drawLandingSpot(_posX, _posY) {
        //console.log("Landing Spot", _posX, _posY);
        A09_2_LuftfahrtClasses.crc2.save();
        A09_2_LuftfahrtClasses.crc2.translate(_posX, _posY);
        // add parallelogram for landing spot
        A09_2_LuftfahrtClasses.crc2.beginPath();
        //crc2.rect(0, 0, 30, 50);
        A09_2_LuftfahrtClasses.crc2.moveTo(0, 0);
        A09_2_LuftfahrtClasses.crc2.lineTo(-20, 50);
        A09_2_LuftfahrtClasses.crc2.lineTo(40, 50);
        A09_2_LuftfahrtClasses.crc2.lineTo(60, 0);
        A09_2_LuftfahrtClasses.crc2.lineTo(0, 0);
        A09_2_LuftfahrtClasses.crc2.closePath();
        let gradient = A09_2_LuftfahrtClasses.crc2.createLinearGradient(0, 0, 0, 60);
        gradient.addColorStop(0, "grey");
        gradient.addColorStop(1, "rgba(60, 60, 60, 1)");
        A09_2_LuftfahrtClasses.crc2.fillStyle = gradient;
        //crc2.strokeStyle = "black";
        //crc2.stroke();
        A09_2_LuftfahrtClasses.crc2.fill();
        // add ellipse for landing spot
        A09_2_LuftfahrtClasses.crc2.beginPath();
        A09_2_LuftfahrtClasses.crc2.ellipse(20, 25, 22, 20, Math.PI / 1.2, 0, 2 * Math.PI);
        A09_2_LuftfahrtClasses.crc2.strokeStyle = "white";
        A09_2_LuftfahrtClasses.crc2.lineWidth = 3;
        A09_2_LuftfahrtClasses.crc2.stroke();
        A09_2_LuftfahrtClasses.crc2.closePath();
        // add letter for landing spot
        A09_2_LuftfahrtClasses.crc2.fillStyle = "white";
        A09_2_LuftfahrtClasses.crc2.font = "italic 30px Arial";
        A09_2_LuftfahrtClasses.crc2.fillText("H", 8, 35);
        A09_2_LuftfahrtClasses.crc2.restore();
    }
    // draws windbag
    function drawWindbag(_posX, _posY) {
        //console.log("Windbag", _posX, _posY);
        A09_2_LuftfahrtClasses.crc2.save();
        A09_2_LuftfahrtClasses.crc2.translate(_posX, _posY);
        // add pole
        A09_2_LuftfahrtClasses.crc2.beginPath();
        A09_2_LuftfahrtClasses.crc2.rect(70, -20, 5, 50);
        A09_2_LuftfahrtClasses.crc2.closePath();
        A09_2_LuftfahrtClasses.crc2.fillStyle = "red";
        A09_2_LuftfahrtClasses.crc2.fill();
        // add windbag
        A09_2_LuftfahrtClasses.crc2.beginPath();
        A09_2_LuftfahrtClasses.crc2.bezierCurveTo(72, -14, 100, -40, 150, -25);
        A09_2_LuftfahrtClasses.crc2.lineTo(152, -55);
        A09_2_LuftfahrtClasses.crc2.bezierCurveTo(150, -55, 100, -80, 70, -55);
        A09_2_LuftfahrtClasses.crc2.fillStyle = "red";
        A09_2_LuftfahrtClasses.crc2.fill();
        A09_2_LuftfahrtClasses.crc2.closePath();
        A09_2_LuftfahrtClasses.crc2.beginPath();
        A09_2_LuftfahrtClasses.crc2.ellipse(150, -40, 5, 15, Math.PI, 0, 2 * Math.PI);
        A09_2_LuftfahrtClasses.crc2.closePath();
        A09_2_LuftfahrtClasses.crc2.fillStyle = "red";
        A09_2_LuftfahrtClasses.crc2.fill();
        A09_2_LuftfahrtClasses.crc2.beginPath();
        A09_2_LuftfahrtClasses.crc2.ellipse(72, -35, 8, 20, Math.PI, 0, 2 * Math.PI);
        A09_2_LuftfahrtClasses.crc2.fillStyle = "orange";
        A09_2_LuftfahrtClasses.crc2.fill();
        A09_2_LuftfahrtClasses.crc2.closePath();
        A09_2_LuftfahrtClasses.crc2.restore();
    }
    // draws house in foreground
    function drawHouse(_posX, _posY) {
        //console.log("House", _posX, _posY);
        A09_2_LuftfahrtClasses.crc2.save();
        A09_2_LuftfahrtClasses.crc2.translate(_posX, _posY);
        // adds rightside roof
        A09_2_LuftfahrtClasses.crc2.beginPath();
        A09_2_LuftfahrtClasses.crc2.moveTo(80, -70);
        A09_2_LuftfahrtClasses.crc2.lineTo(110, -40);
        A09_2_LuftfahrtClasses.crc2.lineTo(40, -40);
        A09_2_LuftfahrtClasses.crc2.fillStyle = "rgba(200, 80, 0, 1)";
        A09_2_LuftfahrtClasses.crc2.fill();
        A09_2_LuftfahrtClasses.crc2.closePath();
        // adds front
        A09_2_LuftfahrtClasses.crc2.beginPath();
        A09_2_LuftfahrtClasses.crc2.moveTo(40, 30);
        A09_2_LuftfahrtClasses.crc2.lineTo(100, 30);
        A09_2_LuftfahrtClasses.crc2.lineTo(100, -50);
        A09_2_LuftfahrtClasses.crc2.lineTo(80, -70);
        A09_2_LuftfahrtClasses.crc2.lineTo(40, -50);
        A09_2_LuftfahrtClasses.crc2.lineTo(40, 30);
        A09_2_LuftfahrtClasses.crc2.fillStyle = "rgba(255, 0, 0, 1)";
        A09_2_LuftfahrtClasses.crc2.fill();
        A09_2_LuftfahrtClasses.crc2.closePath();
        // adds side
        A09_2_LuftfahrtClasses.crc2.beginPath();
        A09_2_LuftfahrtClasses.crc2.moveTo(0, 0);
        A09_2_LuftfahrtClasses.crc2.lineTo(0, -80);
        A09_2_LuftfahrtClasses.crc2.lineTo(40, -50);
        A09_2_LuftfahrtClasses.crc2.lineTo(40, 30);
        A09_2_LuftfahrtClasses.crc2.fillStyle = "rgba(180, 0, 0, 1)";
        A09_2_LuftfahrtClasses.crc2.fill();
        A09_2_LuftfahrtClasses.crc2.closePath();
        // adds leftside roof
        A09_2_LuftfahrtClasses.crc2.beginPath();
        A09_2_LuftfahrtClasses.crc2.moveTo(-15, -70);
        A09_2_LuftfahrtClasses.crc2.lineTo(30, -100);
        A09_2_LuftfahrtClasses.crc2.lineTo(80, -70);
        A09_2_LuftfahrtClasses.crc2.lineTo(30, -40);
        A09_2_LuftfahrtClasses.crc2.lineTo(-15, -70);
        A09_2_LuftfahrtClasses.crc2.fillStyle = "rgba(255, 120, 30, 1)";
        A09_2_LuftfahrtClasses.crc2.fill();
        A09_2_LuftfahrtClasses.crc2.closePath();
        // adds window
        A09_2_LuftfahrtClasses.crc2.beginPath();
        A09_2_LuftfahrtClasses.crc2.moveTo(4, -20);
        A09_2_LuftfahrtClasses.crc2.lineTo(36, 0);
        A09_2_LuftfahrtClasses.crc2.lineTo(36, -30);
        A09_2_LuftfahrtClasses.crc2.lineTo(4, -50);
        let gradient = A09_2_LuftfahrtClasses.crc2.createLinearGradient(0, 0, 15, -35);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(1, "orange");
        A09_2_LuftfahrtClasses.crc2.fillStyle = gradient;
        A09_2_LuftfahrtClasses.crc2.fill();
        A09_2_LuftfahrtClasses.crc2.closePath();
        A09_2_LuftfahrtClasses.crc2.restore();
    }
})(A09_2_LuftfahrtClasses || (A09_2_LuftfahrtClasses = {}));
//# sourceMappingURL=script.js.map