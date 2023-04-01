"use strict";
var A02_EventInspector;
(function (A02_EventInspector) {
    /*
    Aufgabe: L02_EventInspector
    Name: Jona Ruder
    Matrikel: 265274
    Datum: 01.04.2023
    Quellen: -
    */
    window.addEventListener("load", handleLoad);
    // button and log counts, to keep better overview in console output
    let buttonClickCount = 0;
    let infoLogCount = 0;
    function handleLoad() {
        let div0 = document.getElementById("div0");
        let div1 = document.getElementById("div1");
        let button0 = document.getElementById("button0");
        // sets info box
        document.addEventListener("mousemove", setInfoBox);
        // sets button click // sets button custom event (not anymore)
        //button0.addEventListener("click", customEvent);
        button0.addEventListener("click", clickButton);
        // logInfo clicks & keyups
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        document.body.addEventListener("click", logInfo);
        document.body.addEventListener("keyup", logInfo);
        div0.addEventListener("click", logInfo);
        div0.addEventListener("keyup", logInfo);
        div1.addEventListener("click", logInfo);
        div1.addEventListener("keyup", logInfo);
    }
    function setInfoBox(_event) {
        let spanElement = document.getElementById("span0");
        // mouse position
        let mouseX = _event.clientX;
        let mouseY = _event.clientY;
        // offset of info box
        let offsetX = mouseX + 10;
        let offsetY = mouseY + 10;
        //console.log("Mouse X: " + mouseX + ", Y: " + mouseY);
        // outputs mouse position and target to info box
        spanElement.innerHTML = "MouseX: " + mouseX + ", MouseY: " + mouseY + ", Target: " + _event.target;
        // offsets the span element
        spanElement.style.left = offsetX + "px";
        spanElement.style.top = offsetY + "px";
    }
    function clickButton(_event) {
        // counts up button clicks :)
        buttonClickCount++;
        // proper grammar :P
        if (buttonClickCount > 1) {
            console.log("- - - - - " + buttonClickCount + " BUTTONS CLICKED! - - - - -");
        }
        else {
            console.log("- - - - - " + buttonClickCount + " BUTTON CLICKED! - - - - -");
        }
        // logs button path, don't need custom event?
        console.log("- Button Path -");
        console.log(_event.composedPath());
    }
    function customEvent(_event) {
        //console.log("Custom event triggered");
        let customPath = _event.composedPath();
        let eventCustom = new CustomEvent('showDOM', {
            bubbles: true,
            detail: {
                name: customPath
            },
        });
        document.getElementById("button0").dispatchEvent(eventCustom);
    }
    function logInfo(_event) {
        // to keep a better overview over the event logs
        infoLogCount++;
        // logs event, event type, event target and current target
        console.log("--- " + infoLogCount + " start ---");
        console.log("- Event -");
        console.log(_event);
        console.log("- Typ -");
        console.log(_event.type);
        console.log("- Target -");
        console.log(_event.target);
        console.log("- CurrentTarget -");
        console.log(_event.currentTarget);
        console.log("--- " + infoLogCount + " end ---");
    }
})(A02_EventInspector || (A02_EventInspector = {}));
