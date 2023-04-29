namespace A06_DatabaseServer {
    /*
Aufgabe: L06_DatabaseServer
Name: Jona Ruder
Matrikel: 265274
Datum: 29.04.2023
Quellen: -
*/

    window.addEventListener("load", handleLoad);

    // get number of users (will also get updated when adding new users)
    let userCount: number = 0;

    // get number of tasks (will also get updated when adding new tasks)
    let taskCount: number = 0;

    let editingID: number = -1;

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

    let myUrl: string = "https://webuser.hs-furtwangen.de/~ruderjon/Database/?";
    var taskTest;
    let taskID: number[] = [];

    interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }

    async function handleLoad(): Promise<void> {
        // testing server
        let responseTest: Response = await fetch(myUrl + "command=show");
        let taskResponseTest: string = await responseTest.text();
        console.log("Server says: " + taskResponseTest);
        taskTest = JSON.parse(taskResponseTest);
        let taskTestlist: string[] = taskTest["data"];
        let taskTestBool: boolean = false;

        console.log(taskTestlist);

        // finding correct collection
        for (let i: number = 0; i < taskTestlist.length; i++) {
            if(taskTestlist[i] == "Tasks")
            {
                taskTestBool = true;
                console.log("Found Tasks Collection");
            }
        }

        // creating new Tasks Collection if none was found
        if (!taskTestBool) {
            console.log("Tasks Collection NOT found, creating new one...");
            let query: URLSearchParams = new URLSearchParams();
            query.set("command", "create");
            query.set("collection", "Tasks")
            await fetch(myUrl + query.toString());
        }

        // generate content from server data
        generateContent(await getServerResponse());

        // update number of users (will also get updated when adding new users)
        userCount = document.getElementsByClassName("user").length;

        //updateLiveData();

        // add listeners to remove user- and add task buttons
        for (let i: number = 0; i < userCount; i++) {
            allAddTaskButtons[i].addEventListener("click", function () {
                showAddTaskform(i, false);
            });
            allSubmitTaskButtons[i].addEventListener("click", function () {
                submitNewTask(i, taskID[i]);
            });
        }
    }

    // updates live data that was modified
    export function updateLiveData(): void {
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
        for (let i: number = 0; i < taskCount; i++) {
            let sliderOutput: HTMLInputElement = <HTMLInputElement>allSliders[i];
            let sliderID: string = sliderOutput.id;
            sliderID = sliderID.replace(/\D/g,'');
            taskID.push(parseInt(sliderID));
            allSliders[i]
            sliderChange(i, taskID[i]);

            allSliders[i].addEventListener("input", function () {
                sliderChange(i, taskID[i]);
            });
            allCommentButtons[i].addEventListener("click", function () {
                makeComment(i, taskID[i]);
            })
            allRemoveTaskButtons[i].addEventListener("click", function () {
                removeTask(i, taskID[i]);
            })
            allEditTaskButtons[i].addEventListener("click", function () {
                showAddTaskform(jsonAllTasks.thisList[taskID[i]].owner, true, taskID[i]);
            })
        }
    }

    // changes status when slider gets updated
    async function sliderChange(_queryID: number, _id: number): Promise<void> {
        // get slider values
        let thisSlider: HTMLInputElement = <HTMLInputElement>allSliders[_queryID];
        //let thisSlider: HTMLInputElement = <HTMLInputElement>document.getElementById("taskslider" + _id);
        let sliderValue: number = thisSlider.valueAsNumber;
        // get output span
        let output: HTMLSpanElement = <HTMLSpanElement>document.getElementById("slider" + _id);
        let sliderText: string = "";

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
                    sliderText = "..."
                    output.style.color = "red";
                    break;
            }

            jsonAllTasks.thisList[_id].completion = sliderValue;

            output.innerHTML = sliderText;

            let formData: FormData = new FormData();
            formData.append("completion", JSON.stringify(jsonAllTasks.thisList[_id].completion));

            let json: FormDataJSON = {};
            
            // convert formData into url-useable format
            for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }

            // send updated completion to server
            let query: URLSearchParams = new URLSearchParams();
            query.set("command", "update");
            query.set("collection", "Tasks");
            query.set("id", jsonIDs[_id]);
            query.set("data", "" + JSON.stringify(json));
            console.log("completion: " + JSON.stringify(json));
            //console.log("ID: " + jsonIDs[_id] + " QUERY: " + query.toString());
            await fetch(myUrl + query.toString());
        }

        console.log("Task#" + _id + " progress updated to " + sliderText);
    }

    // shows when changes has been made to a comment input field
    async function makeComment(_queryID: number, _id: number): Promise<void> {
        // get comment field
        let thisComment: HTMLInputElement = <HTMLInputElement>allCommentFields[_queryID];
        let commentValue: string = thisComment.value;

        // only accept comment if field isn't empty
        if (commentValue != "") {
            // create new paragraph for comment
            let commentParagraph = document.createElement("p");
            commentParagraph.classList.add("commentary");
            commentParagraph.innerHTML = '"' + commentValue + '"';
            allCommentDivs[_queryID].appendChild(commentParagraph);
            thisComment.value = "";

            let theseComments: string[] = JSON.parse(jsonAllTasks.thisList[_id].comments);

            theseComments.push(commentValue);
            console.log(theseComments);
            jsonAllTasks.thisList[_id].comments = JSON.stringify(theseComments);
            console.log(jsonAllTasks.thisList[_id].comments);

            // checking if it submitted properly
            //console.log("Comment '" + commentValue + "' submitted.");
            let allComments: string[] = JSON.parse(jsonAllTasks.thisList[_id].comments);

            // send form data prototype
            let formData: FormData = new FormData();
            formData.append("comments", jsonAllTasks.thisList[_id].comments);
            console.log(formData.getAll("comments"));

            let json: FormDataJSON = {};
            
            // convert formData into url-useable format
            for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }

            // send updated comments to server
            let query: URLSearchParams = new URLSearchParams();
            query.set("command", "update");
            query.set("collection", "Tasks");
            query.set("id", jsonIDs[_id]);
            query.set("data", "" + JSON.stringify(json));
            console.log("thiscomment: " + JSON.stringify(json));
            console.log("ID: " + jsonIDs[_id] + " QUERY: " + query.toString());
            await fetch(myUrl + query.toString());

            let thisTaskname: string | undefined = document.getElementById("taskname" + _id)?.innerHTML;

            console.log("--- All Comments of '" + thisTaskname + "' ---");
            for (let i: number = 0; i < allComments.length; i++) {
                console.log('Comment#' + (i + 1) + ': "' + allComments[i] + '"');
            }
            console.log("---");
        } else {
            alert("Please write something before trying to comment.");
        }
    }

    // removes this task
    async function removeTask(_queryID: number, _id: number): Promise<void> {
        let thisTaskname: string | undefined = document.getElementById("taskname" + _id)?.innerHTML;

        if (confirm("This will remove " + thisTaskname + "! Are you sure?")) {
            // remove content, splice out this task, make new content, update data
            removeContent(jsonAllTasks);

            // remove task from server
            let query: URLSearchParams = new URLSearchParams();
            query.set("command", "delete");
            query.set("collection", "Tasks");
            query.set("id", jsonIDs[_id]);
            console.log(query.toString());
            await fetch(myUrl + query.toString());

            console.log("Task: " + jsonAllTasks.thisList[_id].title + "; jsonID: " + jsonIDs[_id]);

            jsonAllTasks.thisList.splice(_id, 1);
            jsonIDs.splice(_id, 1);

            generateContent(await getServerResponse());

            //updateLiveData();

            console.log("Removed task '" + thisTaskname + "'!");
        } else {
            console.log("Task#" + (_id + 1) + " deletion cancelled.");
        }
    }

    // will also open new div to enter deadline, name and description
    async function submitNewTask(_queryID: number, _id: number): Promise<void> {
        let thisCheckbox: HTMLInputElement = <HTMLInputElement>allEditCheckboxes[_queryID];

        // get input of input fields
        let thisFieldName: HTMLInputElement = <HTMLInputElement>allSubmitNames[_queryID];
        let thisName: string = thisFieldName.value;

        let thisFieldDate: HTMLInputElement = <HTMLInputElement>allSubmitDates[_queryID];
        let thisDate: Date = <Date>thisFieldDate.valueAsDate;

        let thisFieldDesc: HTMLInputElement = <HTMLInputElement>allSubmitDescs[_queryID];
        let thisDesc: string = thisFieldDesc.value;

        console.log("Taskname: " + thisName);
        console.log("Deadline: " + thisDate);
        console.log("Description: " + thisDesc);
        console.log("Adding new task to user#" + (_queryID) + "...");

        if (thisName != "" && thisDate != null && thisDesc != "") {
            // recycle content
            removeContent(jsonAllTasks);
            let thisTaskItem: TaskItem = {
                owner: _queryID,
                title: thisName,
                deadline: thisDate,
                desc: thisDesc,
                comments: "[]",
                completion: 0
            };

            // set up form data
            let thisForm: HTMLFormElement = <HTMLFormElement>document.getElementById("form" + _queryID);
            let formData: FormData = new FormData(thisForm);
            formData.append("owner", "" + _queryID);
            formData.delete("editingCheck");

            let query: URLSearchParams = new URLSearchParams();

            // checks if editing is enabled
            if (!thisCheckbox.checked) {
                formData.append("comments", "[]");
                formData.append("completion", "" + 0);
                jsonAllTasks.thisList.push(thisTaskItem);
                query.set("command", "insert");
                query.set("collection", "Tasks");

            } else {
                // overrides previous entry if editing is enabled
                formData.append("comments", jsonAllTasks.thisList[editingID].comments);
                thisTaskItem.comments = jsonAllTasks.thisList[editingID].comments;
                formData.append("completion", "" + jsonAllTasks.thisList[editingID].completion);
                thisTaskItem.completion = jsonAllTasks.thisList[editingID].completion;
                jsonAllTasks.thisList[editingID] = thisTaskItem;
                thisCheckbox.checked = false;
                query.set("command", "update");
                query.set("collection", "Tasks");
                query.set("id", jsonIDs[editingID]);
            }

            let json: FormDataJSON = {};
            
            // convert formData into url-useable format
            for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }

            // send new task to server
            query.set("data", "" + JSON.stringify(json));
            console.log("QUERY: " + query.toString() + "; FORMDATA: " + JSON.stringify(json));
            await fetch(myUrl + query.toString());

            // hide submit task div
            let thisTaskform: HTMLElement | null = document.getElementById("addtaskbox" + _queryID);

            thisTaskform?.setAttribute("style", "display: none");

            // get new content
            generateContent(await getServerResponse());

            // update live data with the new stuff
            //updateLiveData();

            thisFieldName.value = "";
            thisFieldDate.value = "";
            thisFieldDesc.value = "";

            console.log("Data successfully sent!")
        } else {
            alert("Please fill out all fields to create a new task.");

            console.log("Failure...")
        }
    }

    // opens add task form
    function showAddTaskform(_id: number, _editing: boolean, _editID: number = 0): void {
        // get taskform, checkbox and label
        //console.log("OwnerID: " + jsonAllTasks.thisList[taskID[_id]].owner);
        let thisTaskform: HTMLElement | null = document.getElementById("addtaskbox" + _id);
        let thisCheckbox: HTMLInputElement = <HTMLInputElement>allEditCheckboxes[_id];
        let thisLabel: HTMLElement | null = document.getElementById("checklabel" + _id);

        //console.log("ID: " + _id + ", Editing?: " + _editing + ", EditID: " + _editID);

        // check if accessed through edit button
        if (_editing) {
            // make sure checkbox is checked
            thisCheckbox.checked = true;
            editingID = _editID;

            console.log("EditID: " + _editID);
            
            // show checkbox and label
            thisCheckbox.setAttribute("style", "display: inline-block");
            thisLabel?.setAttribute("style", "display: inline-block");

            // insert editing task name, deadline and description
            let thisFieldName: HTMLInputElement = <HTMLInputElement>allSubmitNames[_id];
            console.log(jsonAllTasks.thisList[_editID].title);
            thisFieldName.value = jsonAllTasks.thisList[_editID].title;

            let thisFieldDate: HTMLInputElement = <HTMLInputElement>allSubmitDates[_id];
            let thisDate: Date = new Date(jsonAllTasks.thisList[_editID].deadline);
            thisDate = new Date("" + (thisDate.getMonth() + 1) // date doesn't add 1 to day or month otherwise
                + " " + (thisDate.getDate() + 1)
                + ", " + thisDate.getFullYear());
            thisFieldDate.valueAsDate = thisDate;

            let thisFieldDesc: HTMLInputElement = <HTMLInputElement>allSubmitDescs[_id];
            thisFieldDesc.value = jsonAllTasks.thisList[_editID].desc;
        } else {
            // make sure checkbox is unchecked, hide checkbox and label
            thisCheckbox.checked = false;
            thisCheckbox.setAttribute("style", "display: none");
            thisLabel?.setAttribute("style", "display: none");
        }

        // show taskform
        thisTaskform?.setAttribute("style", "display: block");
    }

    async function getServerResponse(): Promise<string> {
        let responseQuery: URLSearchParams = new URLSearchParams();
        responseQuery.set("command", "find");
        responseQuery.set("collection", "Tasks");
        let responseServe: Response = await fetch(myUrl + responseQuery.toString());
        let taskResponseServe: string = await responseServe.text();
        return taskResponseServe;
    }
}