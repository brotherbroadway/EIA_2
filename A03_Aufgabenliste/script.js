"use strict";
var A03_Aufgabenliste;
(function (A03_Aufgabenliste) {
    /*
Aufgabe: L02_EventInspector
Name: Jona Ruder
Matrikel: 265274
Datum: 01.04.2023
Quellen: -
*/
    window.addEventListener("load", handleLoad);
    // get number of users (will also get updated when adding new users)
    let userCount = document.getElementsByClassName("user").length;
    // get number of tasks (will also get updated when adding new tasks)
    let taskCount = document.getElementsByClassName("task").length;
    // get all sliders, comment fields & remove task buttons
    var allRemoveUserButtons = document.querySelectorAll(".removeuserbttn");
    var allAddTaskButtons = document.querySelectorAll(".addtask");
    var allSliders = document.querySelectorAll(".taskslider");
    var allCommentFields = document.querySelectorAll(".taskcommentinput");
    var allRemoveTaskButtons = document.querySelectorAll(".removetaskbttn");
    let adduserBttn = document.getElementById("adduserbutton");
    function handleLoad() {
        // add listener to add user button
        adduserBttn.addEventListener("click", addUser);
        // add listeners to remove user- and add task buttons
        for (let i = 0; i < userCount; i++) {
            allRemoveUserButtons[i].addEventListener("click", function () {
                removeUser(i);
            });
            allAddTaskButtons[i].addEventListener("click", function () {
                addTask(i);
            });
        }
        // add listeners to comments, sliders and remove task buttons
        for (let i = 0; i < taskCount; i++) {
            allSliders[i].addEventListener("input", function () {
                sliderChange(i);
            });
            allCommentFields[i].addEventListener("input", function () {
                makeComment(i);
            });
            allRemoveTaskButtons[i].addEventListener("click", function () {
                removeTask(i);
            });
        }
    }
    // changes status when slider gets updated
    function sliderChange(_id) {
        // get slider values
        let thisSlider = allSliders[_id];
        let sliderValue = thisSlider.valueAsNumber;
        // get output span
        let output = document.getElementById("slider" + _id);
        let sliderText = "";
        // assign outputs
        switch (sliderValue) {
            case 1:
                sliderText = "WIP";
                output.style.color = "orange";
                break;
            case 2:
                sliderText = "Done!";
                output.style.color = "#00ddff";
                break;
            default:
                sliderText = "...";
                output.style.color = "red";
                break;
        }
        output.innerHTML = sliderText;
        console.log("Task#" + (_id + 1) + " progress updated to " + sliderText);
    }
    // shows when changes has been made to a comment input field
    function makeComment(_id) {
        let thisComment = allCommentFields[_id];
        let commentValue = thisComment.value;
        // Keeping track of comment
        console.log("Typing '" + commentValue + "' as comment for task#" + (_id + 1) + "...");
    }
    // removes this task
    function removeTask(_id) {
        if (confirm("This will remove task#" + (_id + 1) + "! Are you sure?")) {
            console.log("Removing task#" + (_id + 1) + "...");
        }
        else {
            console.log("Task#" + (_id + 1) + " deletion cancelled.");
        }
    }
    // removes this user
    function removeUser(_id) {
        let thisUser = document.getElementById("username" + _id);
        let username = thisUser.innerText;
        if (confirm("This will remove " + username + "! Are you sure?")) {
            console.log("Removing " + username + "...");
        }
        else {
            console.log("Deletion of " + username + " cancelled.");
        }
    }
    // will also open new div to enter deadline, name and description
    function addTask(_id) {
        console.log("Adding new task to user#" + (_id + 1) + "...");
    }
    // adds new user with entered username
    function addUser(_event) {
        // get entered username
        let thisUserinput = document.getElementById("addusername");
        let newUsername = thisUserinput.value;
        // don't add new user if name hasn't been entered correctly
        if (newUsername.length > 0) {
            console.log("Adding new user '" + newUsername + "'...");
        }
        else {
            console.log("Cannot add new user! Please enter a name first.");
        }
    }
})(A03_Aufgabenliste || (A03_Aufgabenliste = {}));
//# sourceMappingURL=script.js.map