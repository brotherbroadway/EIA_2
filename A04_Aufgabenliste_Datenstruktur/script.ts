namespace A04_Aufgabenliste_Datenstruktur {
    /*
Aufgabe: L04_Aufgabenliste_Datenstruktur
Name: Jona Ruder
Matrikel: 265274
Datum: 15.04.2023
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

    function handleLoad(): void {
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
    function makeComment(_id: number): void {
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
    function submitNewTask(_id: number): void {
        let thisCheckbox: HTMLInputElement = <HTMLInputElement>allEditCheckboxes[_id];

        // get input of input fields
        let thisFieldName: HTMLInputElement = <HTMLInputElement>allSubmitNames[_id];
        let thisName: string = thisFieldName.value;

        let thisFieldDate: HTMLInputElement = <HTMLInputElement>allSubmitDates[_id];
        let thisDate: string = thisFieldDate.value;

        let thisFieldDesc: HTMLInputElement = <HTMLInputElement>allSubmitDescs[_id];
        let thisDesc: string = thisFieldDesc.value;

        console.log("Taskname: " + thisName);
        console.log("Deadline: " + thisDate);
        console.log("Description: " + thisDesc);
        console.log("Adding new task to user#" + (_id) + "...");

        if (thisName != "" && thisDate != "" && thisDesc != "") {
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

            // checks if editing is enabled
            if (!thisCheckbox.checked) {
                allTheTasks.thisList.push(thisTaskItem);
            } else {
                // overrides previous entry if editing is enabled
                thisTaskItem.comments = allTheTasks.thisList[editingID].comments;
                thisTaskItem.completion = allTheTasks.thisList[editingID].completion;
                allTheTasks.thisList[editingID] = thisTaskItem;
                thisCheckbox.checked = false;
            }

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

            console.log("Success!")
        } else {
            alert("Please fill out all fields to create a new task.");

            console.log("Failure...")
        }
    }

    // opens add task form
    function showAddTaskform(_id: number, _editing: boolean, _editID: number): void {
        let thisTaskform: HTMLElement | null = document.getElementById("addtaskbox" + _id);
        let thisCheckbox: HTMLInputElement = <HTMLInputElement>allEditCheckboxes[_id];
        let thisLabel: HTMLElement | null = document.getElementById("checklabel" + _id);

        console.log("ID: " + _id + ", Editing?: " + _editing + ", EditID: " + _editID);

        if (_editing) {
            thisCheckbox.checked = true;
            editingID = _editID;
            thisCheckbox.setAttribute("style", "display: inline-block");
            thisLabel?.setAttribute("style", "display: inline-block");

            let thisFieldName: HTMLInputElement = <HTMLInputElement>allSubmitNames[_id];
            console.log(allTheTasks.thisList[_editID].title);
            thisFieldName.value = allTheTasks.thisList[_editID].title;

            let thisFieldDate: HTMLInputElement = <HTMLInputElement>allSubmitDates[_id];
            thisFieldDate.value = allTheTasks.thisList[_editID].deadline;

            let thisFieldDesc: HTMLInputElement = <HTMLInputElement>allSubmitDescs[_id];
            thisFieldDesc.value = allTheTasks.thisList[_editID].desc;
        } else {
            thisCheckbox.checked = false;
            thisCheckbox.setAttribute("style", "display: none");
            thisLabel?.setAttribute("style", "display: none");
        }

        thisTaskform?.setAttribute("style", "display: block");
    }
}