namespace A06_DatabaseServer {
    /*
Aufgabe: L06_DatabaseServer
Name: Jona Ruder
Matrikel: 265274
Datum: 29.04.2023
Quellen: -
*/
    export interface TaskItem {
        owner: number;
        title: string;
        deadline: Date;
        desc: string;
        comments: string;
        completion: number;
    }

    export interface AllTasks {
        [name: string]: TaskItem[];
    }
    
    export let jsonAllTasks: AllTasks;
    export let jsonIDs: string[];

    // create live tasks on website
    export function generateContent(_taskResponse: string = ""): void {
        // get different user's task divs
        let taskDiv0: HTMLElement = <HTMLElement>document.getElementById("tasks0");
        let taskDiv1: HTMLElement = <HTMLElement>document.getElementById("tasks1");
        let taskDiv2: HTMLElement = <HTMLElement>document.getElementById("tasks2");

        let taskAmount: number;

        if (_taskResponse != "") {
            let serverTasks = JSON.parse(_taskResponse)["data"];
            let jsonTask: TaskItem;
    
            jsonAllTasks = {"thisList": []};
            jsonIDs = [];
    
            for (let i: number = 0; i < Object.keys(serverTasks).length; i++) {
                jsonTask = serverTasks[Object.keys(serverTasks)[i]];
                console.log(jsonTask);
                jsonAllTasks.thisList.push(jsonTask);
            }
            
            //console.log("Title of Task#0: " + allServerTasks[id0][title]);
    
            console.log("Testing of Task#0: " + Object.keys(serverTasks)[0]);

            taskAmount = jsonAllTasks.thisList.length;

            for (let i: number = 0; i < taskAmount; i++) {
                jsonIDs.push(Object.keys(serverTasks)[i]);
            }
        }

        taskAmount = jsonAllTasks.thisList.length;

        /*jsonAllTasks.thisList.sort((a, b) => {
            return a.owner - b.owner;
        });*/

        // add all tasks to task divs
        for (let i: number = 0; i < taskAmount; i++) {
            // get owner id
            let ownerString: string = "" + jsonAllTasks.thisList[i].owner;
            let taskOwner: number = parseInt(ownerString);

            // create div for this task
            let thisTask = document.createElement("div");
            thisTask.classList.add("task");
            thisTask.setAttribute("id", "task" + i);
            console.log("TASKNAME: " + jsonAllTasks.thisList[i].title + "; OWNER: " + taskOwner);
            // add to correct owner
            switch (taskOwner) {
                case 1: 
                    taskDiv1.appendChild(thisTask);
                    break;
                case 2:
                    taskDiv2.appendChild(thisTask);
                    break;
                default:
                    taskDiv0.appendChild(thisTask);
                    break;
            }

            // add task remove button
            let thisRemoveBttn = document.createElement("button");
            thisRemoveBttn.classList.add("removetaskbttn");
            thisRemoveBttn.setAttribute("id", "removetaskbutton" + i);
            thisRemoveBttn.innerHTML = "X";
            thisTask.appendChild(thisRemoveBttn);

            // add task edit button
            let thisEditBttn = document.createElement("button");
            thisEditBttn.classList.add("edittaskbttn");
            thisEditBttn.setAttribute("id", "edittaskbttn" + i);
            thisEditBttn.innerHTML = "Edit";
            thisTask.appendChild(thisEditBttn);

            // add task name
            let thisName = document.createElement("h3");
            thisName.classList.add("taskname");
            thisName.setAttribute("id", "taskname" + i);
            thisName.innerHTML = jsonAllTasks.thisList[i].title;
            thisTask.appendChild(thisName);

            // add task deadline
            let thisDeadline = document.createElement("p");
            thisDeadline.classList.add("deadlinetask");
            thisDeadline.setAttribute("id", "deadlinetask" + i);
            let thisDate: Date = new Date(jsonAllTasks.thisList[i].deadline);
            thisDeadline.innerHTML = addZeroToDayOrMonth(thisDate.getDate())
                + "." + addZeroToDayOrMonth(thisDate.getMonth() + 1)
                + "." + thisDate.getFullYear();
            thisTask.appendChild(thisDeadline);

            // add task description
            let thisDesc = document.createElement("p");
            thisDesc.classList.add("desc");
            thisDesc.setAttribute("id", "desc" + i);
            thisDesc.innerHTML = jsonAllTasks.thisList[i].desc;
            thisTask.appendChild(thisDesc);

            // add comments div
            let theseComments = document.createElement("div");
            theseComments.classList.add("comments");
            theseComments.setAttribute("id", "comments" + i);
            thisTask.appendChild(theseComments);

            // add input comment field
            let thisCommentInput = document.createElement("input");
            thisCommentInput.classList.add("taskcommentinput");
            thisCommentInput.setAttribute("type", "text");
            thisCommentInput.setAttribute("id", "task" + i + "commentinput");
            thisCommentInput.setAttribute("name", "task" + i + "commentinput");
            thisCommentInput.setAttribute("placeholder", "Comment here");
            theseComments.appendChild(thisCommentInput);

            // add submit comment button
            let thisCommentBttn = document.createElement("button");
            thisCommentBttn.classList.add("submitcommentbutton");
            thisCommentBttn.setAttribute("id", "submitcommentbutton" + i);
            thisCommentBttn.innerHTML = "Submit";
            theseComments.appendChild(thisCommentBttn);

            // add comments that have already been made
            let madeComments: string[] = JSON.parse(jsonAllTasks.thisList[i].comments);
            for (let thatComment in madeComments) {
                let thisComment = document.createElement("p");
                thisComment.classList.add("commentary");
                thisComment.innerHTML = '"' + madeComments[thatComment] + '"';
                theseComments.appendChild(thisComment);
            }

            // add slider container
            let thisSliderContainer = document.createElement("div");
            thisSliderContainer.classList.add("slidercontainer");
            thisTask.appendChild(thisSliderContainer);

            // add task slider
            let sliderCompletion: number = jsonAllTasks.thisList[i].completion;
            // idk when this would happen, but better safe than sorry
            if (sliderCompletion > 2) {
                jsonAllTasks.thisList[i].completion = 2;
                sliderCompletion = 2;
            }
            let thisSlider = document.createElement("input");
            thisSlider.classList.add("taskslider");
            thisSlider.setAttribute("type", "range");
            thisSlider.setAttribute("min", "0");
            thisSlider.setAttribute("max", "2");
            thisSlider.setAttribute("value", "" + sliderCompletion);
            thisSlider.setAttribute("id", "taskslider" + i);
            thisSliderContainer.appendChild(thisSlider);

            // add p for slider's span
            let thisSpanParagraph = document.createElement("p");
            thisSliderContainer.appendChild(thisSpanParagraph);

            // add span for slider
            let thisSpan = document.createElement("span");
            thisSpan.classList.add("sliderspan");
            thisSpan.setAttribute("id", "slider" + i);
            thisSpan.innerHTML = "...";
            thisSpanParagraph.appendChild(thisSpan);
        }

        // so it loads in order
        updateLiveData();
    }

    // removes all live created content
    export function removeContent(jsonAllTasks: AllTasks): void {
        let taskAmount: number = jsonAllTasks.thisList.length;

        for (let i: number = 0; i < taskAmount; i++) {
            let thisTask: HTMLElement | null = document.getElementById("task" + i);
            thisTask?.remove();
        }
    }

    // adds leading zero to deadline display if day or month is less than 10
    function addZeroToDayOrMonth(_date: number): string {
        let dateString: string = "" + _date;
        if (_date < 10) {
            dateString = "0" + dateString;
        }
        return dateString;
    }
}