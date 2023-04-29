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
Datum: 29.04.2023
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
    let myUrl = "https://webuser.hs-furtwangen.de/~ruderjon/Database/?";
    var taskTest;
    let taskID = [];
    function handleLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            // testing server
            let responseTest = yield fetch(myUrl + "command=show");
            let taskResponseTest = yield responseTest.text();
            console.log("Server says: " + taskResponseTest);
            taskTest = JSON.parse(taskResponseTest);
            let taskTestlist = taskTest["data"];
            let taskTestBool = false;
            console.log(taskTestlist);
            // finding correct collection
            for (let i = 0; i < taskTestlist.length; i++) {
                if (taskTestlist[i] == "Tasks") {
                    taskTestBool = true;
                    console.log("Found Tasks Collection");
                }
            }
            // creating new Tasks Collection if none was found
            if (!taskTestBool) {
                console.log("Tasks Collection NOT found, creating new one...");
                let query = new URLSearchParams();
                query.set("command", "create");
                query.set("collection", "Tasks");
                yield fetch(myUrl + query.toString());
            }
            // generate content from server data
            A06_DatabaseServer.generateContent(yield getServerResponse());
            // update number of users (will also get updated when adding new users)
            userCount = document.getElementsByClassName("user").length;
            //updateLiveData();
            // add listeners to remove user- and add task buttons
            for (let i = 0; i < userCount; i++) {
                allAddTaskButtons[i].addEventListener("click", function () {
                    showAddTaskform(i, false);
                });
                allSubmitTaskButtons[i].addEventListener("click", function () {
                    submitNewTask(i, taskID[i]);
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
        taskID = [];
        // add listeners to comments, sliders and remove task buttons
        for (let i = 0; i < taskCount; i++) {
            let sliderOutput = allSliders[i];
            let sliderID = sliderOutput.id;
            sliderID = sliderID.replace(/\D/g, '');
            taskID.push(parseInt(sliderID));
            allSliders[i];
            sliderChange(i, taskID[i]);
            allSliders[i].addEventListener("input", function () {
                sliderChange(i, taskID[i]);
            });
            allCommentButtons[i].addEventListener("click", function () {
                makeComment(i, taskID[i]);
            });
            allRemoveTaskButtons[i].addEventListener("click", function () {
                removeTask(i, taskID[i]);
            });
            allEditTaskButtons[i].addEventListener("click", function () {
                showAddTaskform(A06_DatabaseServer.jsonAllTasks.thisList[taskID[i]].owner, true, taskID[i]);
            });
        }
    }
    A06_DatabaseServer.updateLiveData = updateLiveData;
    // changes status when slider gets updated
    function sliderChange(_queryID, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            // get slider values
            let thisSlider = allSliders[_queryID];
            //let thisSlider: HTMLInputElement = <HTMLInputElement>document.getElementById("taskslider" + _id);
            let sliderValue = thisSlider.valueAsNumber;
            // get output span
            let output = document.getElementById("slider" + _id);
            let sliderText = "";
            if (sliderValue != null && output != null) {
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
                A06_DatabaseServer.jsonAllTasks.thisList[_id].completion = sliderValue;
                output.innerHTML = sliderText;
                let formData = new FormData();
                formData.append("completion", JSON.stringify(A06_DatabaseServer.jsonAllTasks.thisList[_id].completion));
                let json = {};
                // convert formData into url-useable format
                for (let key of formData.keys())
                    if (!json[key]) {
                        let values = formData.getAll(key);
                        json[key] = values.length > 1 ? values : values[0];
                    }
                // send updated completion to server
                let query = new URLSearchParams();
                query.set("command", "update");
                query.set("collection", "Tasks");
                query.set("id", A06_DatabaseServer.jsonIDs[_id]);
                query.set("data", "" + JSON.stringify(json));
                console.log("completion: " + JSON.stringify(json));
                //console.log("ID: " + jsonIDs[_id] + " QUERY: " + query.toString());
                yield fetch(myUrl + query.toString());
            }
            console.log("Task#" + _id + " progress updated to " + sliderText);
        });
    }
    // shows when changes has been made to a comment input field
    function makeComment(_queryID, _id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // get comment field
            let thisComment = allCommentFields[_queryID];
            let commentValue = thisComment.value;
            // only accept comment if field isn't empty
            if (commentValue != "") {
                // create new paragraph for comment
                let commentParagraph = document.createElement("p");
                commentParagraph.classList.add("commentary");
                commentParagraph.innerHTML = '"' + commentValue + '"';
                allCommentDivs[_queryID].appendChild(commentParagraph);
                thisComment.value = "";
                let theseComments = JSON.parse(A06_DatabaseServer.jsonAllTasks.thisList[_id].comments);
                theseComments.push(commentValue);
                console.log(theseComments);
                A06_DatabaseServer.jsonAllTasks.thisList[_id].comments = JSON.stringify(theseComments);
                console.log(A06_DatabaseServer.jsonAllTasks.thisList[_id].comments);
                // checking if it submitted properly
                //console.log("Comment '" + commentValue + "' submitted.");
                let allComments = JSON.parse(A06_DatabaseServer.jsonAllTasks.thisList[_id].comments);
                // send form data prototype
                let formData = new FormData();
                formData.append("comments", A06_DatabaseServer.jsonAllTasks.thisList[_id].comments);
                console.log(formData.getAll("comments"));
                let json = {};
                // convert formData into url-useable format
                for (let key of formData.keys())
                    if (!json[key]) {
                        let values = formData.getAll(key);
                        json[key] = values.length > 1 ? values : values[0];
                    }
                // send updated comments to server
                let query = new URLSearchParams();
                query.set("command", "update");
                query.set("collection", "Tasks");
                query.set("id", A06_DatabaseServer.jsonIDs[_id]);
                query.set("data", "" + JSON.stringify(json));
                console.log("thiscomment: " + JSON.stringify(json));
                console.log("ID: " + A06_DatabaseServer.jsonIDs[_id] + " QUERY: " + query.toString());
                yield fetch(myUrl + query.toString());
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
    function removeTask(_queryID, _id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let thisTaskname = (_a = document.getElementById("taskname" + _id)) === null || _a === void 0 ? void 0 : _a.innerHTML;
            if (confirm("This will remove " + thisTaskname + "! Are you sure?")) {
                // remove content, splice out this task, make new content, update data
                A06_DatabaseServer.removeContent(A06_DatabaseServer.jsonAllTasks);
                // remove task from server
                let query = new URLSearchParams();
                query.set("command", "delete");
                query.set("collection", "Tasks");
                query.set("id", A06_DatabaseServer.jsonIDs[_id]);
                console.log(query.toString());
                yield fetch(myUrl + query.toString());
                console.log("Task: " + A06_DatabaseServer.jsonAllTasks.thisList[_id].title + "; jsonID: " + A06_DatabaseServer.jsonIDs[_id]);
                A06_DatabaseServer.jsonAllTasks.thisList.splice(_id, 1);
                A06_DatabaseServer.jsonIDs.splice(_id, 1);
                A06_DatabaseServer.generateContent(yield getServerResponse());
                //updateLiveData();
                console.log("Removed task '" + thisTaskname + "'!");
            }
            else {
                console.log("Task#" + (_id + 1) + " deletion cancelled.");
            }
        });
    }
    // will also open new div to enter deadline, name and description
    function submitNewTask(_queryID, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            let thisCheckbox = allEditCheckboxes[_queryID];
            // get input of input fields
            let thisFieldName = allSubmitNames[_queryID];
            let thisName = thisFieldName.value;
            let thisFieldDate = allSubmitDates[_queryID];
            let thisDate = thisFieldDate.valueAsDate;
            let thisFieldDesc = allSubmitDescs[_queryID];
            let thisDesc = thisFieldDesc.value;
            console.log("Taskname: " + thisName);
            console.log("Deadline: " + thisDate);
            console.log("Description: " + thisDesc);
            console.log("Adding new task to user#" + (_queryID) + "...");
            if (thisName != "" && thisDate != null && thisDesc != "") {
                // recycle content
                A06_DatabaseServer.removeContent(A06_DatabaseServer.jsonAllTasks);
                let thisTaskItem = {
                    owner: _queryID,
                    title: thisName,
                    deadline: thisDate,
                    desc: thisDesc,
                    comments: "[]",
                    completion: 0
                };
                // set up form data
                let thisForm = document.getElementById("form" + _queryID);
                let formData = new FormData(thisForm);
                formData.append("owner", "" + _queryID);
                formData.delete("editingCheck");
                let query = new URLSearchParams();
                // checks if editing is enabled
                if (!thisCheckbox.checked) {
                    formData.append("comments", "[]");
                    formData.append("completion", "" + 0);
                    A06_DatabaseServer.jsonAllTasks.thisList.push(thisTaskItem);
                    query.set("command", "insert");
                    query.set("collection", "Tasks");
                }
                else {
                    // overrides previous entry if editing is enabled
                    formData.append("comments", A06_DatabaseServer.jsonAllTasks.thisList[editingID].comments);
                    thisTaskItem.comments = A06_DatabaseServer.jsonAllTasks.thisList[editingID].comments;
                    formData.append("completion", "" + A06_DatabaseServer.jsonAllTasks.thisList[editingID].completion);
                    thisTaskItem.completion = A06_DatabaseServer.jsonAllTasks.thisList[editingID].completion;
                    A06_DatabaseServer.jsonAllTasks.thisList[editingID] = thisTaskItem;
                    thisCheckbox.checked = false;
                    query.set("command", "update");
                    query.set("collection", "Tasks");
                    query.set("id", A06_DatabaseServer.jsonIDs[editingID]);
                }
                let json = {};
                // convert formData into url-useable format
                for (let key of formData.keys())
                    if (!json[key]) {
                        let values = formData.getAll(key);
                        json[key] = values.length > 1 ? values : values[0];
                    }
                // send new task to server
                query.set("data", "" + JSON.stringify(json));
                console.log("QUERY: " + query.toString() + "; FORMDATA: " + JSON.stringify(json));
                yield fetch(myUrl + query.toString());
                // hide submit task div
                let thisTaskform = document.getElementById("addtaskbox" + _queryID);
                thisTaskform === null || thisTaskform === void 0 ? void 0 : thisTaskform.setAttribute("style", "display: none");
                // get new content
                A06_DatabaseServer.generateContent(yield getServerResponse());
                // update live data with the new stuff
                //updateLiveData();
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
    function showAddTaskform(_id, _editing, _editID = 0) {
        // get taskform, checkbox and label
        //console.log("OwnerID: " + jsonAllTasks.thisList[taskID[_id]].owner);
        let thisTaskform = document.getElementById("addtaskbox" + _id);
        let thisCheckbox = allEditCheckboxes[_id];
        let thisLabel = document.getElementById("checklabel" + _id);
        //console.log("ID: " + _id + ", Editing?: " + _editing + ", EditID: " + _editID);
        // check if accessed through edit button
        if (_editing) {
            // make sure checkbox is checked
            thisCheckbox.checked = true;
            editingID = _editID;
            console.log("EditID: " + _editID);
            // show checkbox and label
            thisCheckbox.setAttribute("style", "display: inline-block");
            thisLabel === null || thisLabel === void 0 ? void 0 : thisLabel.setAttribute("style", "display: inline-block");
            // insert editing task name, deadline and description
            let thisFieldName = allSubmitNames[_id];
            console.log(A06_DatabaseServer.jsonAllTasks.thisList[_editID].title);
            thisFieldName.value = A06_DatabaseServer.jsonAllTasks.thisList[_editID].title;
            let thisFieldDate = allSubmitDates[_id];
            let thisDate = new Date(A06_DatabaseServer.jsonAllTasks.thisList[_editID].deadline);
            thisDate = new Date("" + (thisDate.getMonth() + 1) // date doesn't add 1 to day or month otherwise
                + " " + (thisDate.getDate() + 1)
                + ", " + thisDate.getFullYear());
            thisFieldDate.valueAsDate = thisDate;
            let thisFieldDesc = allSubmitDescs[_id];
            thisFieldDesc.value = A06_DatabaseServer.jsonAllTasks.thisList[_editID].desc;
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
    function getServerResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            let responseQuery = new URLSearchParams();
            responseQuery.set("command", "find");
            responseQuery.set("collection", "Tasks");
            let responseServe = yield fetch(myUrl + responseQuery.toString());
            let taskResponseServe = yield responseServe.text();
            return taskResponseServe;
        });
    }
})(A06_DatabaseServer || (A06_DatabaseServer = {}));
//# sourceMappingURL=script.js.map