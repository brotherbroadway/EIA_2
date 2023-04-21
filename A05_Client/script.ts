namespace A05_Client {
    /*
Aufgabe: L05_Client
Name: Jona Ruder
Matrikel: 265274
Datum: 21.04.2023
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

    let allTheTasks: AllTasks;

    async function handleLoad(): Promise<void> {
        let response: Response = await fetch("Data.json");
        let taskResponse: string = await response.text();
        allTheTasks = JSON.parse(taskResponse);

        // generate content from data
        generateContent(allTheTasks);

        // update number of users (will also get updated when adding new users)
        userCount = document.getElementsByClassName("user").length;

        updateLiveData();

        // add listeners to remove user- and add task buttons
        for (let i: number = 0; i < userCount; i++) {
            allAddTaskButtons[i].addEventListener("click", function () {
                showAddTaskform(i, false, 0);
            });
            allSubmitTaskButtons[i].addEventListener("click", function () {
                submitNewTask(i);
            });
        }
    }

    // updates live data that was modified
    function updateLiveData(): void {
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
        for (let i: number = 0; i < taskCount; i++) {
            sliderChange(i);
        }

        // add listeners to comments, sliders and remove task buttons
        for (let i: number = 0; i < taskCount; i++) {
            allSliders[i].addEventListener("input", function () {
                sliderChange(i);
            });
            allCommentButtons[i].addEventListener("click", function () {
                makeComment(i);
            })
            allRemoveTaskButtons[i].addEventListener("click", function () {
                removeTask(i);
            })
            allEditTaskButtons[i].addEventListener("click", function () {
                showAddTaskform(allTheTasks.thisList[i].owner, true, i);
            })
        }
    }

    // changes status when slider gets updated
    function sliderChange(_id: number): void {
        // get slider values
        let thisSlider: HTMLInputElement = <HTMLInputElement>allSliders[_id];
        //let thisSlider: HTMLInputElement = <HTMLInputElement>document.getElementById("taskslider" + _id);
        let sliderValue: number = thisSlider.valueAsNumber;
        // get output span
        let output: HTMLSpanElement = <HTMLSpanElement>document.getElementById("slider" + _id);
        let sliderText: string = "";

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

        allTheTasks.thisList[_id].completion = sliderValue;

        output.innerHTML = sliderText;

        console.log("Task#" + (_id + 1) + " progress updated to " + sliderText);
    }

    // shows when changes has been made to a comment input field
    async function makeComment(_id: number): Promise<void> {
        // get comment field
        let thisComment: HTMLInputElement = <HTMLInputElement>allCommentFields[_id];
        let commentValue: string = thisComment.value;

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
            let allComments: string[] = allTheTasks.thisList[_id].comments;

            // send form data prototype
            let formData: FormData = new FormData();
            formData.append("comments", JSON.stringify(allTheTasks.thisList[_id].comments));
            //console.log(formData.getAll("comments"));
            let query: URLSearchParams = new URLSearchParams(<any>formData);
            await fetch("index.html?" + query.toString());

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
    function removeTask(_id: number): void {
        let thisTaskname: string | undefined = document.getElementById("taskname" + _id)?.innerHTML;

        if (confirm("This will remove " + thisTaskname + "! Are you sure?")) {
            // remove content, splice out this task, make new content, update data
            removeContent(allTheTasks);

            allTheTasks.thisList.splice(_id, 1);

            generateContent(allTheTasks);

            updateLiveData();

            console.log("Removed task '" + thisTaskname + "'!");
        } else {
            console.log("Task#" + (_id + 1) + " deletion cancelled.");
        }
    }

    // will also open new div to enter deadline, name and description
    async function submitNewTask(_id: number): Promise<void> {
        let thisCheckbox: HTMLInputElement = <HTMLInputElement>allEditCheckboxes[_id];

        // get input of input fields
        let thisFieldName: HTMLInputElement = <HTMLInputElement>allSubmitNames[_id];
        let thisName: string = thisFieldName.value;

        let thisFieldDate: HTMLInputElement = <HTMLInputElement>allSubmitDates[_id];
        let thisDate: Date = <Date>thisFieldDate.valueAsDate;

        let thisFieldDesc: HTMLInputElement = <HTMLInputElement>allSubmitDescs[_id];
        let thisDesc: string = thisFieldDesc.value;

        console.log("Taskname: " + thisName);
        console.log("Deadline: " + thisDate);
        console.log("Description: " + thisDesc);
        console.log("Adding new task to user#" + (_id) + "...");

        if (thisName != "" && thisDate != null && thisDesc != "") {
            // recycle content
            removeContent(allTheTasks);
            let thisTaskItem: TaskItem = {
                owner: _id,
                title: thisName,
                deadline: thisDate,
                desc: thisDesc,
                comments: [],
                completion: 0
            };

            // set up form data
            let thisForm: HTMLFormElement = <HTMLFormElement>document.getElementById("form" + _id);
            let formData: FormData = new FormData(thisForm);
            formData.append("owner", "" + _id);
            formData.delete("editingCheck");

            // checks if editing is enabled
            if (!thisCheckbox.checked) {
                formData.append("comments", "[]");
                formData.append("completion", "" + 0);
                allTheTasks.thisList.push(thisTaskItem);
            } else {
                // overrides previous entry if editing is enabled
                formData.append("comments", JSON.stringify(allTheTasks.thisList[editingID].comments));
                thisTaskItem.comments = allTheTasks.thisList[editingID].comments;
                formData.append("completion", "" + allTheTasks.thisList[editingID].completion);
                thisTaskItem.completion = allTheTasks.thisList[editingID].completion;
                allTheTasks.thisList[editingID] = thisTaskItem;
                thisCheckbox.checked = false;
            }

            // send form data
            let query: URLSearchParams = new URLSearchParams(<any>formData);
            await fetch("index.html?" + query.toString());

            // get new content
            generateContent(allTheTasks);

            // hide submit task div
            let thisTaskform: HTMLElement | null = document.getElementById("addtaskbox" + _id);

            thisTaskform?.setAttribute("style", "display: none");

            // update live data with the new stuff
            updateLiveData();

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
    function showAddTaskform(_id: number, _editing: boolean, _editID: number): void {
        // get taskform, checkbox and label
        let thisTaskform: HTMLElement | null = document.getElementById("addtaskbox" + _id);
        let thisCheckbox: HTMLInputElement = <HTMLInputElement>allEditCheckboxes[_id];
        let thisLabel: HTMLElement | null = document.getElementById("checklabel" + _id);

        //console.log("ID: " + _id + ", Editing?: " + _editing + ", EditID: " + _editID);

        // check if accessed through edit button
        if (_editing) {
            // make sure checkbox is checked
            thisCheckbox.checked = true;
            editingID = _editID;
            
            // show checkbox and label
            thisCheckbox.setAttribute("style", "display: inline-block");
            thisLabel?.setAttribute("style", "display: inline-block");

            // insert editing task name, deadline and description
            let thisFieldName: HTMLInputElement = <HTMLInputElement>allSubmitNames[_id];
            console.log(allTheTasks.thisList[_editID].title);
            thisFieldName.value = allTheTasks.thisList[_editID].title;

            let thisFieldDate: HTMLInputElement = <HTMLInputElement>allSubmitDates[_id];
            let thisDate: Date = new Date(allTheTasks.thisList[_editID].deadline);
            thisDate = new Date("" + (thisDate.getMonth() + 1) // date doesn't add 1 to day or month otherwise
                + " " + (thisDate.getDate() + 1)
                + ", " + thisDate.getFullYear());
            thisFieldDate.valueAsDate = thisDate;

            let thisFieldDesc: HTMLInputElement = <HTMLInputElement>allSubmitDescs[_id];
            thisFieldDesc.value = allTheTasks.thisList[_editID].desc;
        } else {
            // make sure checkbox is unchecked, hide checkbox and label
            thisCheckbox.checked = false;
            thisCheckbox.setAttribute("style", "display: none");
            thisLabel?.setAttribute("style", "display: none");
        }

        // show taskform
        thisTaskform?.setAttribute("style", "display: block");
    }
}