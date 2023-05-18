"use strict";
var A08_2_Luftfahrt;
(function (A08_2_Luftfahrt) {
    /*
Aufgabe: L08_2_Luftfahrt
Name: Jona Ruder
Matrikel: 265274
Datum: 18.05.2023
Quellen: -
*/
    let canvas = document.querySelector("canvas");
    let crc2 = canvas.getContext("2d");
    crc2.canvas.height = window.innerHeight * 0.9;
    crc2.canvas.width = window.innerWidth * 0.9;
    let canvasH = crc2.canvas.height;
    let canvasW = crc2.canvas.width;
    let windowW = window.innerWidth;
    let newWindowW = window.innerWidth;
    let resizeW = 250;
    let golden = 0.62;
    let horizon = canvasH * golden;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        windowW = window.innerWidth;
        window.addEventListener("resize", widthChange, false);
        drawEverything();
    }
    // draws everything
    function drawEverything() {
        let cloudAmount = getRandomNumber(canvasW * 0.0125, canvasW * 0.005);
        let treeAmount = getRandomNumber(canvasW * 0.01, canvasW * 0.0025);
        let dragonflyAmount = getRandomNumber(12, 6);
        // background
        drawBackground();
        // sun
        drawSun(canvasW * Math.random(), canvasH * Math.random() * 0.25);
        // clouds
        for (let i = 0; i < cloudAmount; i++) {
            drawCloud(canvasW * Math.random(), canvasH * Math.random() * 0.25, getRandomNumber(200, 75), getRandomNumber(75, 35));
        }
        // mountain range
        drawMountains(0, horizon, 150, 275, "lightgrey", "white", canvasW * 0.08, canvasW * 0.13);
        drawMountains(0, horizon, 125, 200, "grey", "white", canvasW * 0.04, canvasW * 0.07);
        drawMountains(0, horizon, 50, 150, "grey", "lightgrey", canvasW * 0.02, canvasW * 0.04);
        // landing spot
        let landingX = canvasW * 0.15 + (canvasW * 0.05 * Math.random());
        let landingY = canvasH * 0.75 + (canvasH * 0.05 * Math.random());
        drawLandingSpot(landingX, landingY);
        // hot air balloons
        for (let i = 0; i < 10; i++) {
            drawHotAirBalloon(getRandomNumber(canvasW * 0.95, canvasW * 0.05), getRandomNumber(canvasH * 0.55, canvasH * 0.1));
        }
        // background trees
        let houseHeight = canvasH * 0.7 + (canvasH * 0.05 * Math.random());
        for (let i = 0; i < treeAmount; i++) {
            drawTree(getRandomNumber(canvasW * 0.9, canvasW * 0.1), getRandomNumber(houseHeight - (canvasH * 0.1), golden + (canvasH * 0.57)), getRandomNumber(1.2, 0.8));
        }
        // house
        drawHouse(canvasW * 0.6 + (canvasW * 0.05 * Math.random()), canvasH * 0.7 + (canvasH * 0.05 * Math.random()));
        // windbag
        drawWindbag(landingX, landingY);
        // foreground trees
        treeAmount = getRandomNumber(canvasW * 0.01, canvasW * 0.002);
        for (let i = 0; i < treeAmount; i++) {
            drawTree(getRandomNumber(canvasW * 0.9, canvasW * 0.1), getRandomNumber(canvasH * 0.9, houseHeight + (canvasH * 0.075)), getRandomNumber(1.5, 1));
        }
        // dragonflies
        for (let i = 0; i < dragonflyAmount; i++) {
            drawDragonfly(getRandomNumber(canvasW * 0.95, canvasW * 0.05), getRandomNumber(canvasH * 0.95, horizon - (canvasH * 0.05)));
        }
    }
    // creates new canvas if new window width is a lot smaller/bigger
    function widthChange() {
        newWindowW = window.innerWidth;
        // i know we were supposed to do this with css, but that just squeezes everything if it gets resized at runtime and doesn't look nice
        if (windowW - newWindowW > resizeW || windowW - newWindowW < -resizeW) {
            console.log("--- Canvas updated because of aspect ratio ---");
            windowW = window.innerWidth;
            crc2.clearRect(0, 0, canvasW, canvasH);
            crc2.canvas.height = window.innerHeight * 0.9;
            crc2.canvas.width = window.innerWidth * 0.9;
            canvasH = crc2.canvas.height;
            canvasW = crc2.canvas.width;
            horizon = canvasH * golden;
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
    // draw background with golden ratio
    function drawBackground() {
        console.log("Background");
        // adds background gradient with golden ratio
        let gradient = crc2.createLinearGradient(0, 0, 0, canvasH);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, canvasW, canvasH);
    }
    // draws sun (can't use Vector (not found?))
    function drawSun(_posX, _posY) {
        console.log("Sun", _posX, _posY);
        // shine radius
        let r1 = 30;
        let r2 = 150;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
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
    function drawCloud(_posX, _posY, _sizeX, _sizeY) {
        console.log("Cloud", _posX, _posY, _sizeX, _sizeY);
        // generate particles
        let nParticles = _sizeX * 0.2;
        let radiusParticle = _sizeY * 0.6;
        let particle = new Path2D();
        let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        // add gradient to clouds
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.9");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0");
        crc2.save();
        crc2.translate(_posX, _posY);
        crc2.fillStyle = gradient;
        // draw cloud particles within size
        for (let drawn = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let thisX = (Math.random() - 0.5) * _sizeX;
            let thisY = (Math.random() * _sizeY);
            crc2.translate(thisX, thisY);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }
    // draws mountain range
    function drawMountains(_posX, _posY, _min, _max, _colorLow, _colorHigh, _stepMin, _stepMax) {
        console.log("Mountains", _posX, _posY, _min, _max, _colorLow, _colorHigh);
        let thisX = 0;
        crc2.save();
        crc2.translate(_posX, _posY);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);
        // generate mountain peaks
        do {
            thisX += _stepMin + Math.random() * (_stepMax - _stepMin);
            //console.log(thisX);
            let thisY = -_min - Math.random() * (_max - _min);
            crc2.lineTo(thisX, thisY);
        } while (thisX < canvasW);
        crc2.lineTo(thisX, 0);
        crc2.closePath();
        // add mountain gradient color
        let gradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(1, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    // draws landing spot in foreground
    function drawLandingSpot(_posX, _posY) {
        console.log("Landing Spot", _posX, _posY);
        crc2.save();
        crc2.translate(_posX, _posY);
        // add parallelogram for landing spot
        crc2.beginPath();
        //crc2.rect(0, 0, 30, 50);
        crc2.moveTo(0, 0);
        crc2.lineTo(-20, 50);
        crc2.lineTo(40, 50);
        crc2.lineTo(60, 0);
        crc2.lineTo(0, 0);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, 60);
        gradient.addColorStop(0, "grey");
        gradient.addColorStop(1, "rgba(60, 60, 60, 1)");
        crc2.fillStyle = gradient;
        //crc2.strokeStyle = "black";
        //crc2.stroke();
        crc2.fill();
        // add ellipse for landing spot
        crc2.beginPath();
        crc2.ellipse(20, 25, 22, 20, Math.PI / 1.2, 0, 2 * Math.PI);
        crc2.strokeStyle = "white";
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.closePath();
        // add letter for landing spot
        crc2.fillStyle = "white";
        crc2.font = "italic 30px Arial";
        crc2.fillText("H", 8, 35);
        crc2.restore();
    }
    // draws windbag
    function drawWindbag(_posX, _posY) {
        console.log("Windbag", _posX, _posY);
        crc2.save();
        crc2.translate(_posX, _posY);
        // add pole
        crc2.beginPath();
        crc2.rect(70, -20, 5, 50);
        crc2.closePath();
        crc2.fillStyle = "red";
        crc2.fill();
        // add windbag
        crc2.beginPath();
        crc2.bezierCurveTo(72, -14, 100, -40, 150, -25);
        crc2.lineTo(152, -55);
        crc2.bezierCurveTo(150, -55, 100, -80, 70, -55);
        crc2.fillStyle = "red";
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.ellipse(150, -40, 5, 15, Math.PI, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fillStyle = "red";
        crc2.fill();
        crc2.beginPath();
        crc2.ellipse(72, -35, 8, 20, Math.PI, 0, 2 * Math.PI);
        crc2.fillStyle = "orange";
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }
    // draws house in foreground
    function drawHouse(_posX, _posY) {
        console.log("House", _posX, _posY);
        crc2.save();
        crc2.translate(_posX, _posY);
        // adds rightside roof
        crc2.beginPath();
        crc2.moveTo(80, -70);
        crc2.lineTo(110, -40);
        crc2.lineTo(40, -40);
        crc2.fillStyle = "rgba(200, 80, 0, 1)";
        crc2.fill();
        crc2.closePath();
        // adds front
        crc2.beginPath();
        crc2.moveTo(40, 30);
        crc2.lineTo(100, 30);
        crc2.lineTo(100, -50);
        crc2.lineTo(80, -70);
        crc2.lineTo(40, -50);
        crc2.lineTo(40, 30);
        crc2.fillStyle = "rgba(255, 0, 0, 1)";
        crc2.fill();
        crc2.closePath();
        // adds side
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -80);
        crc2.lineTo(40, -50);
        crc2.lineTo(40, 30);
        crc2.fillStyle = "rgba(180, 0, 0, 1)";
        crc2.fill();
        crc2.closePath();
        // adds leftside roof
        crc2.beginPath();
        crc2.moveTo(-15, -70);
        crc2.lineTo(30, -100);
        crc2.lineTo(80, -70);
        crc2.lineTo(30, -40);
        crc2.lineTo(-15, -70);
        crc2.fillStyle = "rgba(255, 120, 30, 1)";
        crc2.fill();
        crc2.closePath();
        // adds window
        crc2.beginPath();
        crc2.moveTo(4, -20);
        crc2.lineTo(36, 0);
        crc2.lineTo(36, -30);
        crc2.lineTo(4, -50);
        let gradient = crc2.createLinearGradient(0, 0, 15, -35);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(1, "orange");
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }
    function drawTree(_posX, _posY, _height) {
        console.log("Tree", _posX, _posY);
        crc2.save();
        crc2.translate(_posX, _posY);
        // adds stump
        crc2.beginPath();
        crc2.rect(0, 0, _posY * 0.04, _posY * 0.1);
        crc2.fillStyle = "rgba(100, 20, 20, 1)";
        crc2.fill();
        // adds "leaves"
        crc2.beginPath();
        crc2.moveTo(-(_posY * 0.025), -(_posY * 0.1) * _height);
        crc2.lineTo(_posY * 0.065, -(_posY * 0.1) * _height);
        crc2.lineTo(_posY * 0.02, -(_posY * 0.2) * _height);
        //crc2.fillStyle = "rgba(0, 200, 0, 1)";
        //crc2.fill();
        //crc2.closePath();
        //crc2.beginPath();
        crc2.moveTo(-(_posY * 0.035), -(_posY * 0.035) * _height);
        crc2.lineTo(_posY * 0.075, -(_posY * 0.035) * _height);
        crc2.lineTo(_posY * 0.02, -(_posY * 0.2) * _height);
        //crc2.fillStyle = "rgba(0, 140, 0, 1)";
        //crc2.fill();
        //crc2.closePath();
        //crc2.beginPath();
        crc2.moveTo(-(_posY * 0.04), _posY * 0.03 * _height);
        crc2.lineTo(_posY * 0.08, _posY * 0.03 * _height);
        crc2.lineTo(_posY * 0.02, -(_posY * 0.2) * _height);
        let gradient = crc2.createLinearGradient(0, 0, 0, -(_posY * 0.1) * _height);
        gradient.addColorStop(0, "rgba(0, 120, 0, 1)");
        gradient.addColorStop(1, "rgba(0, 60, 0, 1)");
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }
    // draws hot air balloon with passenger
    function drawHotAirBalloon(_posX, _posY) {
        console.log("HotAirBalloon", _posX, _posY);
        let size = canvasW * 0.02;
        crc2.save();
        crc2.translate(_posX, _posY);
        // adds basket inside
        crc2.beginPath();
        crc2.moveTo(0, -(size * 0.6) - (size * 0.6));
        crc2.lineTo(size * 1.5, -(size * 0.6) - (size * 0.6));
        crc2.lineTo(size * 2.5, -(size * 0.6));
        crc2.lineTo(size, -(size * 0.6));
        crc2.fillStyle = "rgba(60, 00, 00, 1)";
        crc2.fill();
        crc2.closePath();
        // adds back strings
        crc2.beginPath();
        crc2.moveTo(1, -(size * 0.6) - (size * 0.6));
        crc2.lineTo(1, -(size * 2.6));
        crc2.moveTo(size * 1.5, -(size * 0.6) - (size * 0.6));
        crc2.lineTo(size * 1.5, -(size * 2.6));
        crc2.strokeStyle = "white";
        crc2.lineWidth = size * 0.08;
        crc2.stroke();
        crc2.closePath();
        // adds stickperson
        crc2.beginPath();
        crc2.moveTo(size * 1.3, -(size * 1.5));
        crc2.lineTo(size * 1.3, -(size * 0.2));
        crc2.moveTo(size * 1.3, -(size));
        crc2.lineTo(size * 0.7, -(size * 1.3));
        crc2.moveTo(size * 1.3, -(size));
        crc2.lineTo(size * 1.9, -(size * 1.2));
        crc2.strokeStyle = "black";
        crc2.lineWidth = size * 0.06;
        crc2.stroke();
        crc2.fillStyle = getRandomColor();
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(size * 1.3, -(size * 1.6), size * 0.3, 0, 2 * Math.PI);
        crc2.strokeStyle = "black";
        crc2.lineWidth = size * 0.12;
        crc2.stroke();
        crc2.fillStyle = getRandomColor();
        crc2.fill();
        crc2.closePath();
        // adds basket side
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(size, size * 0.6);
        crc2.lineTo(size, -(size * 0.6));
        crc2.lineTo(0, -(size * 0.6) - (size * 0.6));
        crc2.fillStyle = "rgba(100, 20, 20, 1)";
        crc2.fill();
        crc2.closePath();
        // adds basket front
        crc2.beginPath();
        crc2.moveTo(size, size * 0.6);
        crc2.lineTo(size * 2.5, size * 0.6);
        crc2.lineTo(size * 2.5, -(size * 0.6));
        crc2.lineTo(size, -(size * 0.6));
        crc2.fillStyle = "brown";
        crc2.fill();
        crc2.closePath();
        // adds front strings
        crc2.beginPath();
        crc2.moveTo(size, -(size * 0.6));
        crc2.lineTo(size, -(size * 2.2));
        crc2.moveTo(size * 2.4, -(size * 0.6));
        crc2.lineTo(size * 2.4, -(size * 2.2));
        crc2.strokeStyle = "white";
        crc2.lineWidth = size * 0.08;
        crc2.stroke();
        crc2.closePath();
        // adds balloon
        crc2.beginPath();
        /*crc2.moveTo(1, -(size * 2.6));
        crc2.lineTo(size, -(size * 2.2));
        crc2.lineTo(size * 2.4, -(size * 2.2));
        crc2.lineTo(size * 1.5, -(size * 2.6));

        crc2.closePath();*/
        crc2.moveTo(size * 2.4, -(size * 2.2));
        crc2.bezierCurveTo((size * 7), -(size * 8), -(size * 4), -(size * 8), 1, -(size * 2.6));
        crc2.lineTo(size, -(size * 2.2));
        crc2.closePath();
        let gradient = crc2.createRadialGradient(size * 6, -(size * 15), size * 0.5, -(size * 1), size * 2, size * 4);
        // adds smol gradient
        gradient.addColorStop(0, "white");
        gradient.addColorStop(1, getRandomColor());
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
    // adds dragonflies in foreground
    function drawDragonfly(_posX, _posY) {
        console.log("Dragonfly", _posX, _posY);
        let size = canvasW * 0.02;
        crc2.save();
        crc2.translate(_posX, _posY);
        // adds right eye
        crc2.beginPath();
        crc2.arc(-(size * 0.8), size * 0.3, size * 0.1, 0, 2 * Math.PI);
        crc2.strokeStyle = "darkred";
        crc2.lineWidth = size * 0.08;
        crc2.stroke();
        crc2.fillStyle = "red";
        crc2.fill();
        crc2.closePath();
        // adds right legs
        crc2.beginPath();
        crc2.moveTo(size * 0.2, -(size * 0.2));
        crc2.lineTo(-(size * 0.3), -(size * 0.4));
        crc2.lineTo(-(size * 0.4), 0);
        crc2.moveTo(-(size * 0.1), size * 0.1);
        crc2.lineTo(-(size * 0.5), -(size * 0.2));
        crc2.lineTo(-(size * 0.6), size * 0.2);
        crc2.moveTo(size * 0.6, -(size * 0.5));
        crc2.lineTo(0, -(size * 0.8));
        crc2.lineTo(-(size * 0.1), -(size * 0.4));
        crc2.strokeStyle = "rgba(160, 0, 0, 1)";
        crc2.lineWidth = size * 0.08;
        crc2.stroke();
        // adds right wing
        crc2.beginPath();
        crc2.ellipse(size * 0.2, -(size * 0.6), size * 0.2, size, Math.PI / 0.85, 0, 2 * Math.PI);
        crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
        crc2.fill();
        crc2.closePath();
        // adds body
        crc2.beginPath();
        crc2.ellipse(0, 0, size * 0.15, size, Math.PI / 4, 0, 2 * Math.PI);
        crc2.arc(-(size * 0.6), size * 0.5, size * 0.3, 0, 2 * Math.PI);
        crc2.fillStyle = getRandomColor();
        crc2.fill();
        crc2.closePath();
        // adds left eye
        crc2.beginPath();
        crc2.arc(-(size * 0.5), size * 0.45, size * 0.1, 0, 2 * Math.PI);
        crc2.strokeStyle = "darkred";
        crc2.lineWidth = size * 0.08;
        crc2.stroke();
        crc2.fillStyle = "red";
        crc2.fill();
        crc2.closePath();
        // adds left legs
        crc2.beginPath();
        crc2.moveTo(size * 0.4, -(size * 0.2));
        crc2.lineTo(size * 0.6, size * 0.1);
        crc2.lineTo(size * 0.3, size * 0.4);
        crc2.moveTo(-(size * 0.1), size * 0.1);
        crc2.lineTo(size * 0.2, size * 0.4);
        crc2.lineTo(-(size * 0.1), size * 0.7);
        crc2.moveTo(size * 0.7, -(size * 0.5));
        crc2.lineTo(size * 1, -(size * 0.2));
        crc2.lineTo(size * 0.7, size * 0.15);
        crc2.strokeStyle = "rgba(160, 0, 0, 1)";
        crc2.lineWidth = size * 0.08;
        crc2.stroke();
        // adds left wing
        crc2.beginPath();
        crc2.ellipse(size * 0.8, -(size * 0.25), size * 0.25, size, Math.PI / 2.8, 0, 2 * Math.PI);
        crc2.fillStyle = "rgba(255, 255, 255, 0.8)";
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }
})(A08_2_Luftfahrt || (A08_2_Luftfahrt = {}));
//# sourceMappingURL=script.js.map