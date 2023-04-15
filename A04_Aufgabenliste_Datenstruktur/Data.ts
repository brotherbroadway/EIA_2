namespace A04_Aufgabenliste_Datenstruktur {
    /*
Aufgabe: L04_Aufgabenliste_Datenstruktur
Name: Jona Ruder
Matrikel: 265274
Datum: 15.04.2023
Quellen: -
*/

    export interface TaskItem {
        owner: number;
        title: string;
        deadline: string;
        desc: string;
        comments: string[];
        completion: number;
    }

    export interface AllTasks {
        [name: string]: TaskItem[];
    }

    export let allTheTasks: AllTasks = {
        thisList: [
            {
                owner: 0,
                title: "The Dishes",
                deadline: "15.04.2023",
                desc: "Do the dishes pls",
                comments: ["Can't someone else do it?", "No, you do it"],
                completion: 0
            },
            {
                owner: 1,
                title: "Dust",
                deadline: "02.06.2023",
                desc: "Please dust off your shelves :)",
                comments: ["They are already clean :)"],
                completion: 2
            },
            {
                owner: 1,
                title: "Trash",
                deadline: "20.04.2023",
                desc: "Take out the trash!",
                comments: ["Will do soon™"],
                completion: 1
            },
        ]
    };
}