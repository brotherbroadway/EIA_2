"use strict";
var A08_1_GenerativeKunst;
(function (A08_1_GenerativeKunst) {
    /*
Aufgabe: L08_1_GenerativeKunst
Name: Jona Ruder
Matrikel: 265274
Datum: 05.05.2023
Quellen: -
*/
    let canvas = document.querySelector("canvas");
    let crc2 = canvas.getContext("2d");
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        // random background color
        crc2.fillStyle = getRandomColor();
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        // get random amounts
        let randomLineAmount = getRandomNumber(36, 6);
        let randomRectAmount = getRandomNumber(36, 6);
        let randomTriangleAmount = getRandomNumber(15, 3);
        let randomCircleAmount = getRandomNumber(36, 6);
        for (let i = 0; i < randomLineAmount; i++) {
            drawLine();
        }
        for (let i = 0; i < randomRectAmount; i++) {
            drawRect();
        }
        for (let i = 0; i < randomCircleAmount; i++) {
            drawCircle();
        }
        for (let i = 0; i < randomTriangleAmount; i++) {
            drawTriangle();
        }
    }
    // gets random rgb value with alpha
    function getRandomColor() {
        let redValue = Math.random() * 255;
        let greenValue = Math.random() * 255;
        let blueValue = Math.random() * 255;
        let alphaValue = Math.random();
        let randomColor = "rgba(" + redValue + ", " + greenValue + ", " + blueValue + ", " + alphaValue + ")";
        return randomColor;
    }
    // gets random random, optional minimum
    function getRandomNumber(_max, _min = 0) {
        return Math.floor(Math.random() * _max) + _min;
    }
    // get random true or false
    function getRandomBool() {
        return Boolean(Math.round(Math.random()));
    }
    // draws a line with random position, width and color
    function drawLine() {
        crc2.beginPath();
        crc2.moveTo(getRandomNumber(crc2.canvas.width), getRandomNumber(crc2.canvas.height));
        // draw straight line or bezier curve
        if (getRandomBool()) {
            crc2.lineTo(getRandomNumber(crc2.canvas.width), getRandomNumber(crc2.canvas.height));
        }
        else {
            crc2.bezierCurveTo(getRandomNumber(crc2.canvas.width), getRandomNumber(crc2.canvas.height), getRandomNumber(crc2.canvas.width), getRandomNumber(crc2.canvas.height), getRandomNumber(crc2.canvas.width), getRandomNumber(crc2.canvas.height));
        }
        crc2.strokeStyle = getRandomColor();
        crc2.lineWidth = getRandomNumber(10, 1);
        crc2.stroke();
        crc2.closePath();
    }
    // draws a rectangle with random pos, size and color
    function drawRect() {
        crc2.beginPath();
        let rectX0 = getRandomNumber(crc2.canvas.width);
        let rectY0 = getRandomNumber(crc2.canvas.height);
        let rectX1 = getRandomNumber(200, 10);
        let rectY1 = getRandomNumber(200, 10);
        crc2.rect(rectX0, rectY0, rectX1, rectY1);
        getFillStyle(rectX0, rectY0, rectX0 + rectX1, rectY0 + rectY1);
        crc2.fill();
    }
    // draws a triangle with random pos, size and color
    function drawTriangle() {
        crc2.beginPath();
        let triX0 = getRandomNumber(crc2.canvas.width);
        let triY0 = getRandomNumber(crc2.canvas.height);
        let triX1 = getRandomNumber(crc2.canvas.width);
        let triY1 = getRandomNumber(crc2.canvas.height);
        crc2.moveTo(getRandomNumber(triX0), getRandomNumber(triY0));
        crc2.lineTo(getRandomNumber(crc2.canvas.width), getRandomNumber(crc2.canvas.height));
        crc2.lineTo(triX1, triY1);
        getFillStyle(triX0, triY0, triX1, triY1);
        crc2.fill();
    }
    // draws a circle or ellipse with random pos, radius and color
    function drawCircle() {
        crc2.beginPath();
        // draw either circle or ellipse at random
        let circleX0 = getRandomNumber(crc2.canvas.width);
        let circleY0 = getRandomNumber(crc2.canvas.height);
        let circleRadiusX = getRandomNumber(150, 5);
        let circleRadiusY = circleRadiusX;
        if (getRandomBool()) {
            crc2.arc(circleX0, circleY0, circleRadiusX, 0, 2 * Math.PI);
        }
        else {
            circleRadiusX = getRandomNumber(75, 5);
            circleRadiusY = getRandomNumber(100, 5);
            crc2.ellipse(circleX0, circleY0, circleRadiusX, circleRadiusY, Math.PI / 4, 0, 2 * Math.PI, getRandomBool());
        }
        getFillStyle(circleX0, circleY0, circleX0 + circleRadiusX, circleY0 + circleRadiusY);
        crc2.fill();
    }
    // gets a random linear or radial gradient
    function getRandomGradient(_x0 = 0, _y0 = 0, _x1 = 0, _y1 = 0) {
        let gradient = crc2.createLinearGradient(_x0, _y0, _x1 + getRandomNumber(25), _y1 + getRandomNumber(25));
        if (getRandomBool()) {
            gradient = crc2.createRadialGradient(_x0, _y0, _x0 + getRandomNumber(500, 100), _x1, _y1, _y0 + getRandomNumber(500, 100));
        }
        gradient.addColorStop(0, getRandomColor());
        gradient.addColorStop(.5, getRandomColor());
        gradient.addColorStop(1, getRandomColor());
        return gradient;
    }
    // gets random pattern
    function getRandomPattern() {
        let pattern = document.createElement('canvas').getContext('2d');
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;
        pattern.fillStyle = getRandomColor();
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        if (getRandomBool()) {
            pattern.moveTo(0, 10);
            pattern.lineTo(getRandomNumber(20, 10), getRandomNumber(20, 10));
            pattern.lineTo(getRandomNumber(20, 10), getRandomNumber(10, 0));
            pattern.lineTo(getRandomNumber(30, 20), getRandomNumber(10, 0));
            pattern.lineTo(getRandomNumber(40, 30), getRandomNumber(20, 10));
            pattern.lineTo(getRandomNumber(40, 30), getRandomNumber(30, 20));
            pattern.lineTo(getRandomNumber(30, 20), getRandomNumber(30, 20));
            pattern.lineTo(getRandomNumber(20, 10), getRandomNumber(20, 10));
        }
        else {
            pattern.arc(0, 0, getRandomNumber(75, 25), 0, getRandomNumber(1, 0.25) * Math.PI, getRandomBool());
        }
        pattern.strokeStyle = getRandomColor();
        pattern.stroke();
        return pattern;
    }
    // gets either pattern or gradient fillstyle
    function getFillStyle(_x0 = 0, _y0 = 0, _x1 = 0, _y1 = 0) {
        if (getRandomBool()) {
            let pattern = getRandomPattern();
            crc2.fillStyle = crc2.createPattern(pattern.canvas, 'repeat');
        }
        else {
            crc2.fillStyle = getRandomGradient(_x0, _y1, _x1, _y1);
        }
    }
})(A08_1_GenerativeKunst || (A08_1_GenerativeKunst = {}));
//# sourceMappingURL=script.js.map