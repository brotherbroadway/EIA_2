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
var A06_DatabaseServer;
(function (A06_DatabaseServer) {
    /*
Aufgabe: L06_DatabaseServer
Name: Jona Ruder
Matrikel: 265274
Datum: 27.04.2023
Quellen: -
*/
    window.addEventListener("load", handleLoad);
    // get number of users (will also get updated when adding new users)
    let userCount = 0;
    // get number of tasks (will also get updated when adding new tasks)
    let taskCount = 0;
    let editingID = -1;
    // get all sliders, comments & remove task buttons
    var allAddTaskButtons = document.querySelectorAll(".addtaskbutton");
    var allSliders = document.querySelectorAll(".taskslider");
    var allCommentDivs = document.querySelectorAll(".comments");
    var allCommentFields = document.querySelectorAll(".taskcommentinput");
    var allCommentButtons = document.querySelectorAll(".submitcommentbutton");
    var allRemoveTaskButtons = document.querySelectorAll(".removetaskbttn");
    var allEditTaskButtons = document.querySelectorAll(".edittaskbttn");
    var allEditCheckboxes = document.querySelectorAll(".editcheckbox");
    var allSubmitTaskButtons = document.querySelectorAll(".submittaskbutton");
    // get all submit fields
    var allSubmitNames = document.querySelectorAll(".addtaskname");
    var allSubmitDates = document.querySelectorAll(".addtaskdate");
    var allSubmitDescs = document.querySelectorAll(".addtaskdesc");
    let allTheTasks;
    let myUrl = "https://webuser.hs-furtwangen.de/~ruderjon/Database/?";
    var taskTest;
    function handleLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch("Data.json");
            let taskResponse = yield response.text();
            allTheTasks = JSON.parse(taskResponse);
            // testing server
            let responseTest = yield fetch(myUrl + "command=show");
            let taskResponseTest = yield responseTest.text();
            console.log("Server says: " + taskResponseTest);
            taskTest = JSON.parse(taskResponseTest);
            let taskTestlist = taskTest["data"];
            let taskTestBool = false;
            // finding correct collection
            for (let i = 0; i < taskTestlist.length; i++) {
                if (taskTestlist[i] == "Tasks") {
                    taskTestBool = true;
                    console.log("Found Tasks Collection");
                }
            }
            if (!taskTestBool) {
                console.log("Tasks Collection NOT found");
            }
            // generate content from data
            A06_DatabaseServer.generateContent(allTheTasks);
            // update number of users (will also get updated when adding new users)
            userCount = document.getElementsByClassName("user").length;
            updateLiveData();
            // add listeners to remove user- and add task buttons
            for (let i = 0; i < userCount; i++) {
                allAddTaskButtons[i].addEventListener("click", function () {
                    showAddTaskform(i, false, 0);
                });
                allSubmitTaskButtons[i].addEventListener("click", function () {
                    submitNewTask(i);
                });
            }
        });
    }
    // updates live data that was modified
    function updateLiveData() {
        // update number of tasks (will also get updated when adding new tasks)
        taskCount = document.getElementsByClassName("task").length;
        // update all sliders, comment fields & remove task buttons
        allSliders = document.querySelectorAll(".taskslider");
        allCommentDivs = document.querySelectorAll(".comments");
        allCommentFields = document.querySelectorAll(".taskcommentinput");
        allCommentButtons = document.querySelectorAll(".submitcommentbutton");
        allRemoveTaskButtons = document.querySelectorAll(".removetaskbttn");
        allEditTaskButtons = document.querySelectorAll(".edittaskbttn");
        allEditCheckboxes = document.querySelectorAll(".editcheckbox");
        // get initial slider status
        for (let i = 0; i < taskCount; i++) {
            sliderChange(i);
        }
        // add listeners to comments, sliders and remove task buttons
        for (let i = 0; i < taskCount; i++) {
            allSliders[i].addEventListener("input", function () {
                sliderChange(i);
            });
            allCommentButtons[i].addEventListener("click", function () {
                makeComment(i);
            });
            allRemoveTaskButtons[i].addEventListener("click", function () {
                removeTask(i);
            });
            allEditTaskButtons[i].addEventListener("click", function () {
                showAddTaskform(allTheTasks.thisList[i].owner, true, i);
            });
        }
    }
    // changes status when slider gets updated
    function sliderChange(_id) {
        // get slider values
        let thisSlider = allSliders[_id];
        //let thisSlider: HTMLInputElement = <HTMLInputElement>document.getElementById("taskslider" + _id);
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
        allTheTasks.thisList[_id].completion = sliderValue;
        output.innerHTML = sliderText;
        console.log("Task#" + (_id + 1) + " progress updated to " + sliderText);
    }
    // shows when changes has been made to a comment input field
    function makeComment(_id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // get comment field
            let thisComment = allCommentFields[_id];
            let commentValue = thisComment.value;
            // only accept comment if field isn't empty
            if (commentValue != "") {
                // create new paragraph for comment
                let commentParagraph = document.createElement("p");
                commentParagraph.classList.add("commentary");
                commentParagraph.innerHTML = '"' + commentValue + '"';
                allCommentDivs[_id].appendChild(commentParagraph);
                thisComment.value = "";
                allTheTasks.thisList[_id].comments.push(commentValue);
                // checking if it submitted properly
                //console.log("Comment '" + commentValue + "' submitted.");
                let allComments = allTheTasks.thisList[_id].comments;
                // send form data prototype
                let formData = new FormData();
                formData.append("comments", JSON.stringify(allTheTasks.thisList[_id].comments));
                //console.log(formData.getAll("comments"));
                let query = new URLSearchParams(formData);
                yield fetch("index.html?" + query.toString());
                let thisTaskname = (_a = document.getElementById("taskname" + _id)) === null || _a === void 0 ? void 0 : _a.innerHTML;
                console.log("--- All Comments of '" + thisTaskname + "' ---");
                for (let i = 0; i < allComments.length; i++) {
                    console.log('Comment#' + (i + 1) + ': "' + allComments[i] + '"');
                }
                console.log("---");
            }
            else {
                alert("Please write something before trying to comment.");
            }
        });
    }
    // removes this task
    function removeTask(_id) {
        var _a;
        let thisTaskname = (_a = document.getElementById("taskname" + _id)) === null || _a === void 0 ? void 0 : _a.innerHTML;
        if (confirm("This will remove " + thisTaskname + "! Are you sure?")) {
            // remove content, splice out this task, make new content, update data
            A06_DatabaseServer.removeContent(allTheTasks);
            allTheTasks.thisList.splice(_id, 1);
            A06_DatabaseServer.generateContent(allTheTasks);
            updateLiveData();
            console.log("Removed task '" + thisTaskname + "'!");
        }
        else {
            console.log("Task#" + (_id + 1) + " deletion cancelled.");
        }
    }
    // will also open new div to enter deadline, name and description
    function submitNewTask(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let thisCheckbox = allEditCheckboxes[_id];
            // get input of input fields
            let thisFieldName = allSubmitNames[_id];
            let thisName = thisFieldName.value;
            let thisFieldDate = allSubmitDates[_id];
            let thisDate = thisFieldDate.valueAsDate;
            let thisFieldDesc = allSubmitDescs[_id];
            let thisDesc = thisFieldDesc.value;
            console.log("Taskname: " + thisName);
            console.log("Deadline: " + thisDate);
            console.log("Description: " + thisDesc);
            console.log("Adding new task to user#" + (_id) + "...");
            if (thisName != "" && thisDate != null && thisDesc != "") {
                // recycle content
                A06_DatabaseServer.removeContent(allTheTasks);
                let thisTaskItem = {
                    owner: _id,
                    title: thisName,
                    deadline: thisDate,
                    desc: thisDesc,
                    comments: [],
                    completion: 0
                };
                // set up form data
                let thisForm = document.getElementById("form" + _id);
                let formData = new FormData(thisForm);
                formData.append("owner", "" + _id);
                formData.delete("editingCheck");
                // checks if editing is enabled
                if (!thisCheckbox.checked) {
                    formData.append("comments", "[]");
                    formData.append("completion", "" + 0);
                    allTheTasks.thisList.push(thisTaskItem);
                }
                else {
                    // overrides previous entry if editing is enabled
                    formData.append("comments", JSON.stringify(allTheTasks.thisList[editingID].comments));
                    thisTaskItem.comments = allTheTasks.thisList[editingID].comments;
                    formData.append("completion", "" + allTheTasks.thisList[editingID].completion);
                    thisTaskItem.completion = allTheTasks.thisList[editingID].completion;
                    allTheTasks.thisList[editingID] = thisTaskItem;
                    thisCheckbox.checked = false;
                }
                // send form data
                let query = new URLSearchParams(formData);
                yield fetch("index.html?" + query.toString());
                // get new content
                A06_DatabaseServer.generateContent(allTheTasks);
                // hide submit task div
                let thisTaskform = document.getElementById("addtaskbox" + _id);
                thisTaskform === null || thisTaskform === void 0 ? void 0 : thisTaskform.setAttribute("style", "display: none");
                // update live data with the new stuff
                updateLiveData();
                thisFieldName.value = "";
                thisFieldDate.value = "";
                thisFieldDesc.value = "";
                console.log("Data successfully sent!");
            }
            else {
                alert("Please fill out all fields to create a new task.");
                console.log("Failure...");
            }
        });
    }
    // opens add task form
    function showAddTaskform(_id, _editing, _editID) {
        // get taskform, checkbox and label
        let thisTaskform = document.getElementById("addtaskbox" + _id);
        let thisCheckbox = allEditCheckboxes[_id];
        let thisLabel = document.getElementById("checklabel" + _id);
        //console.log("ID: " + _id + ", Editing?: " + _editing + ", EditID: " + _editID);
        // check if accessed through edit button
        if (_editing) {
            // make sure checkbox is checked
            thisCheckbox.checked = true;
            editingID = _editID;
            // show checkbox and label
            thisCheckbox.setAttribute("style", "display: inline-block");
            thisLabel === null || thisLabel === void 0 ? void 0 : thisLabel.setAttribute("style", "display: inline-block");
            // insert editing task name, deadline and description
            let thisFieldName = allSubmitNames[_id];
            console.log(allTheTasks.thisList[_editID].title);
            thisFieldName.value = allTheTasks.thisList[_editID].title;
            let thisFieldDate = allSubmitDates[_id];
            let thisDate = new Date(allTheTasks.thisList[_editID].deadline);
            thisDate = new Date("" + (thisDate.getMonth() + 1) // date doesn't add 1 to day or month otherwise
                + " " + (thisDate.getDate() + 1)
                + ", " + thisDate.getFullYear());
            thisFieldDate.valueAsDate = thisDate;
            let thisFieldDesc = allSubmitDescs[_id];
            thisFieldDesc.value = allTheTasks.thisList[_editID].desc;
        }
        else {
            // make sure checkbox is unchecked, hide checkbox and label
            thisCheckbox.checked = false;
            thisCheckbox.setAttribute("style", "display: none");
            thisLabel === null || thisLabel === void 0 ? void 0 : thisLabel.setAttribute("style", "display: none");
        }
        // show taskform
        thisTaskform === null || thisTaskform === void 0 ? void 0 : thisTaskform.setAttribute("style", "display: block");
    }
})(A06_DatabaseServer || (A06_DatabaseServer = {}));
//# sourceMappingURL=script.js.map