namespace A09_2_LuftfahrtClasses {
    /*
Aufgabe: L09_2_LuftfahrtClasses
Name: Jona Ruder
Matrikel: 265274
Datum: 27.05.2023
Quellen: -
*/
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    export let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    crc2.canvas.height = window.innerHeight * 0.9;
    crc2.canvas.width = window.innerWidth * 0.9;
    export let canvasH: number = crc2.canvas.height;
    export let canvasW: number = crc2.canvas.width;
    let windowW: number = window.innerWidth;
    let newWindowW: number = window.innerWidth;
    let resizeW: number = 250;
    let golden: number = 0.62;
    export let horizon: number = canvasH * golden;
    let landingX: number = canvasW * 0.15 + (canvasW * 0.05 * Math.random());
    let landingY: number = canvasH * 0.75 + (canvasH * 0.05 * Math.random());
    let houseX: number = canvasW * 0.6 + (canvasW * 0.05 * Math.random());
    let houseY: number = canvasH * 0.7 + (canvasH * 0.05 * Math.random());

    let backgroundData: ImageData;
    export let allBalloons: Balloon[] = [];
    export let allDragonflies: Dragonfly[] = [];
    export let allPeople: People[] = [];
    export let allClimbers: Climber[] = [];
    let allBackgroundTrees: Tree[] = [];
    let allForegroundTrees: Tree[] = [];

    let animationInterval: any;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {

        windowW = window.innerWidth;

        window.addEventListener("resize", widthChange, false);

        drawEverything();
    }

    // draws everything
    function drawEverything(): void {
        if (animationInterval != null) {
            clearInterval(animationInterval);
            console.log("Interval cleared.");
        }

        let cloudAmount: number = getRandomNumber(canvasW * 0.0125, canvasW * 0.005);

        // background
        drawBackground();

        // sun
        drawSun(canvasW * Math.random(), canvasH * Math.random() * 0.25);

        // clouds
        for (let i: number = 0; i < cloudAmount; i++) {
            drawCloud(canvasW * Math.random(), canvasH * Math.random() * 0.25, getRandomNumber(200, 75), getRandomNumber(75, 35));
        }

        // mountain range
        drawMountains(0, horizon, 150, 275, "lightgrey", "white", canvasW * 0.08, canvasW * 0.13);
        drawMountains(0, horizon, 125, 200, "grey", "white", canvasW * 0.04, canvasW * 0.07);
        drawMountains(0, horizon, 50, 150, "grey", "lightgrey", canvasW * 0.02, canvasW * 0.04);

        backgroundData = crc2.getImageData(0, 0, canvas.width, canvas.height);

        // reset animated features
        allBalloons = [];
        allDragonflies = [];
        allPeople = [];
        allClimbers = [];
        allForegroundTrees = [];
        allBackgroundTrees = [];

        // draw initial frame
        drawInitialAnimation();

        drawInitialForeground();

        // THE ANIMATION
        animationInterval = setInterval(drawAnimated, 100);
    }

    // draws foreground stuff (mostly unanimated, but just so it layers correctly)
    function drawInitialForeground(): void {
        // background trees
        let treeAmount: number = getRandomNumber(canvasW * 0.01, canvasW * 0.0025);
        let houseHeight: number = canvasH * 0.7 + (canvasH * 0.05 * Math.random());

        for (let i: number = 0; i < treeAmount; i++) {
            let tree: Tree = new Tree(getRandomNumber(canvasW * 0.9, canvasW * 0.1), getRandomNumber(houseHeight - (canvasH * 0.1), golden + (canvasH * 0.57)), getRandomNumber(1.2, 0.8), i);
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
        let peopleAmount: number = getRandomNumber(10, 5);

        for (let i: number = 0; i < peopleAmount; i++) {
            drawNewPerson(getRandomNumber(canvasW * 0.95, canvasW * 0.05), getRandomNumber(canvasH * 0.95, horizon + (canvasH * 0.15)), i, true);
        }

        // foreground trees
        treeAmount = getRandomNumber(canvasW * 0.01, canvasW * 0.002);

        for (let i: number = 0; i < treeAmount; i++) {
            let tree: Tree = new Tree(getRandomNumber(canvasW * 0.9, canvasW * 0.1), getRandomNumber(canvasH * 0.9, houseHeight + (canvasH * 0.075)), getRandomNumber(1.5, 1), i);
            allForegroundTrees.push(tree);
            allForegroundTrees[i].drawTree();
        }
    }

    // draw initial animated stuff
    function drawInitialAnimation(): void {
        // initial hot air balloons
        for (let i: number = 0; i < 10; i++) {
            drawNewBalloon(getRandomNumber(canvasW * 0.95, canvasW * 0.05), getRandomNumber(canvasH * 0.55, canvasH * 0.1), i, true);
        }

        let dragonflyAmount: number = getRandomNumber(12, 6);

        // initial dragonflies
        for (let i: number = 0; i < dragonflyAmount; i++) {
            drawNewDragonfly(getRandomNumber(canvasW * 0.95, canvasW * 0.05), getRandomNumber(canvasH * 0.95, horizon - (canvasH * 0.05)), i, true);
        }
    }

    // draw foreground layers
    function drawForegroundLayers(): void {
        // climbers
        let climberCount: number = 0;

        allClimbers.forEach(function(e) {
            e.drawClimber();
            climberCount++;
        });

        // spawns new climbers if less than 2 are on screen or at random
        if (climberCount < 2 || Math.random() < 0.02) {
            let spawnPosX: number = houseX + (canvasW * 0.05 * Math.random());
            let spawnPosY: number = houseY - (canvasH * 0.1 * Math.random());

            drawNewClimber(spawnPosX, spawnPosY, allClimbers.length, false);
        }

        // background trees
        allBackgroundTrees.forEach(function(e) {
            e.drawTree();
        });

        // house
        drawHouse(houseX, houseY);

        // landing spot
        drawLandingSpot(landingX, landingY);

        // windbag
        drawWindbag(landingX, landingY);

        // people
        let peopleCount: number = 0;

        allPeople.forEach(function(e) {
            e.drawPerson();
            peopleCount++;
        });

        // spawns new people if less than 3 are on screen or at random
        if (peopleCount < 3 && peopleCount < 12 || Math.random() < 0.03 && peopleCount < 12) {
            let spawnPosX: number = canvasW * (-0.1 * Math.random()) - 25;

            if (getRandomBool()) {
                spawnPosX = canvasW + (canvasW * 0.1 * Math.random()) + 25;
            }

            drawNewPerson(spawnPosX, getRandomNumber(canvasH * 0.95, horizon + (canvasH * 0.15)), allPeople.length, false);
        }

        // foreground trees
        allForegroundTrees.forEach(function(e) {
            e.drawTree();
        });
    }

    // draw animated stuff for interval
    function drawAnimated(): void {
        //console.log("Animation trigger");

        crc2.putImageData(backgroundData, 0, 0);

        drawForegroundLayers();

        // --- balloons ---
        let balloonCount: number = 0;

        allBalloons.forEach(function(e) {
            e.drawHotAirBalloon();
            balloonCount++;
        });

        // spawns new balloons if less than 10 are on screen or at random
        if (balloonCount < 10 && balloonCount < 15 || Math.random() < 0.05 && balloonCount < 15) {
            let spawnPosX: number = canvasW * (-0.1 * Math.random()) - 25;

            if (getRandomBool()) {
                spawnPosX = canvasW + (canvasW * 0.1 * Math.random()) + 25;
            }

            drawNewBalloon(spawnPosX, getRandomNumber(canvasH * 0.55, canvasH * 0.1), allBalloons.length, false);
        }

        //console.log("Balloon Count: " + balloonCount);

        // --- dragonflies ----
        let dragonflyCount: number = 0;

        allDragonflies.forEach(function(e) {
            e.drawDragonfly();
            dragonflyCount++;
        });

        // spawns new dragonflies if less than 5 are on screen or at random
        if (dragonflyCount < 5 || Math.random() < 0.05) {
            let spawnPosX: number = canvasW * (-0.1 * Math.random()) - 25;

            if (getRandomBool()) {
                spawnPosX = canvasW + (canvasW * 0.1 * Math.random()) + 25;
            }

            drawNewDragonfly(spawnPosX, getRandomNumber(canvasH * 0.95, horizon - (canvasH * 0.05)), allDragonflies.length, false);
        }

        //console.log("Dragonfly Count: " + dragonflyCount);
    }

    // draws new balloon
    function drawNewBalloon(_posX: number, _posY: number, _id: number, _starter: boolean): void {
        let randomXspeed: number = canvasW * (0.004 * Math.random() + 0.002);
        let randomYspeed: number = canvasH * (0.004 * Math.random() + 0.002);

        if (_starter && getRandomBool() || !_starter && _posX > canvasW) {
            randomXspeed = -randomXspeed;
        }

        let balloon: Balloon = new Balloon(_posX, _posY, randomXspeed, randomYspeed, getRandomColor(), getRandomColor(), _id, _starter);

        allBalloons.push(balloon);
        allBalloons[_id].drawHotAirBalloon();

        console.log("New Balloon X: " + Math.floor(_posX) + ", Y: " + Math.floor(_posY))
    }

    // draws new dragonfly
    function drawNewDragonfly(_posX: number, _posY: number, _id: number, _starter: boolean): void {
        let randomXspeed: number = canvasW * (0.06 * Math.random() + 0.01);
        let randomYspeed: number = canvasH * (0.06 * Math.random() + 0.01);

        if (_starter && getRandomBool() || !_starter && _posX > canvasW) {
            randomXspeed = -randomXspeed;
        }

        let dragonfly: Dragonfly = new Dragonfly(_posX, _posY, randomXspeed, randomYspeed, getRandomColor(), getRandomBool(), _id, _starter);

        allDragonflies.push(dragonfly);
        allDragonflies[_id].drawDragonfly();

        console.log("New Dragonfly X: " + Math.floor(_posX) + ", Y: " + Math.floor(_posY))
    }

    // draws new foreground person
    function drawNewPerson(_posX: number, _posY: number, _id: number, _starter: boolean): void {
        let randomXspeed: number = canvasW * (0.005 * Math.random() + 0.0025);
        let randomYspeed: number = canvasH * (0.005 * Math.random() + 0.0025);

        if (_starter && getRandomBool() || !_starter && _posX > canvasW) {
            randomXspeed = -randomXspeed;
        }

        let person: People = new People(_posX, _posY, randomXspeed, randomYspeed, getRandomColor(), _id, _starter);

        allPeople.push(person);
        allPeople[_id].drawPerson();

        console.log("New Person X: " + Math.floor(_posX) + ", Y: " + Math.floor(_posY))
    }

    // draws new climber
    function drawNewClimber(_posX: number, _posY: number, _id: number, _starter: boolean): void {
        let randomXspeed: number = -(canvasW * (0.02 * Math.random() + 0.0025));
        let randomYspeed: number = -(canvasH * (0.01 * Math.random() + 0.005));

        let climber: Climber = new Climber(_posX, _posY, randomXspeed, randomYspeed, getRandomColor(), _id, false);

        allClimbers.push(climber);
        allClimbers[_id].drawClimber();

        console.log("New Climber X: " + Math.floor(_posX) + ", Y: " + Math.floor(randomYspeed))
    }

    // creates new canvas if new window width is a lot smaller/bigger
    function widthChange(): void {
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
            landingX = canvasW * 0.15 + (canvasW * 0.05 * Math.random());
            landingY = canvasH * 0.75 + (canvasH * 0.05 * Math.random());
            houseX = canvasW * 0.6 + (canvasW * 0.05 * Math.random());
            houseY = canvasH * 0.7 + (canvasH * 0.05 * Math.random());
    
            drawEverything();
        }
    }

    // gets random rgb value
    export function getRandomColor(): string {
        let redValue: number = Math.random() * 255;
        let greenValue: number = Math.random() * 255;
        let blueValue: number = Math.random() * 255;
        //let alphaValue: number = Math.random();

        let randomColor: string = "rgba(" + redValue + ", " + greenValue + ", " + blueValue + ", " + 1 + ")";

        return randomColor;
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

    // get random true or false
    export function getRandomBool(): boolean {
        return Boolean(Math.round(Math.random()));
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

    // draws mountain range
    function drawMountains(_posX: number, _posY: number, _min: number, _max: number, _colorLow: string, _colorHigh: string, _stepMin: number, _stepMax: number): void {
        console.log("Mountains", _posX, _posY, _min, _max, _colorLow, _colorHigh);

        let thisX: number = 0;

        crc2.save();
        crc2.translate(_posX, _posY);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        // generate mountain peaks
        do {
            thisX += _stepMin + Math.random() * (_stepMax - _stepMin);
            //console.log(thisX);
            let thisY: number = -_min - Math.random() * (_max - _min);

            crc2.lineTo(thisX, thisY);
        } while (thisX < canvasW);

        crc2.lineTo(thisX, 0);
        crc2.closePath();

        // add mountain gradient color
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(1, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }
    
    // draws landing spot in foreground
    function drawLandingSpot(_posX: number, _posY: number): void {
        //console.log("Landing Spot", _posX, _posY);
        crc2.save();
        crc2.translate(_posX, _posY);

        // add parallelogram for landing spot
        crc2.beginPath();
        //crc2.rect(0, 0, 30, 50);
        crc2.moveTo(0, 0);
        crc2.lineTo(-20, 50);
        crc2.lineTo(40, 50);
        crc2.lineTo(60, 0);
        crc2.lineTo(0, 0,);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 60);
        gradient.addColorStop(0, "grey");
        gradient.addColorStop(1, "rgba(60, 60, 60, 1)");

        crc2.fillStyle = gradient;
        //crc2.strokeStyle = "black";
        //crc2.stroke();
        crc2.fill();

        // add ellipse for landing spot
        crc2.beginPath();
        crc2.ellipse(20, 25, 22, 20, Math.PI / 1.2, 0, 2* Math.PI);
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
    function drawWindbag(_posX: number, _posY: number): void {
        //console.log("Windbag", _posX, _posY);
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
        crc2.ellipse(150, -40, 5, 15, Math.PI, 0, 2* Math.PI);
        crc2.closePath();
        crc2.fillStyle = "red";
        crc2.fill();

        crc2.beginPath();
        crc2.ellipse(72, -35, 8, 20, Math.PI, 0, 2* Math.PI);
        crc2.fillStyle = "orange";
        crc2.fill();
        crc2.closePath();

        crc2.restore();
    }

    // draws house in foreground
    function drawHouse(_posX: number, _posY: number): void {
        //console.log("House", _posX, _posY);
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

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 15, -35);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(1, "orange");

        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.closePath();
        
        crc2.restore();
    }
}