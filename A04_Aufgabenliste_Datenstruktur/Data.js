"use strict";
var A04_Aufgabenliste_Datenstruktur;
(function (A04_Aufgabenliste_Datenstruktur) {
    /*
Aufgabe: L04_Aufgabenliste_Datenstruktur
Name: Jona Ruder
Matrikel: 265274
Datum: 15.04.2023
Quellen: -
*/
    A04_Aufgabenliste_Datenstruktur.allTheTasks = {
        thisList: [
            {
                owner: 0,
                title: "The Dishes",
                deadline: new Date("2023.04.15"),
                desc: "Do the dishes pls",
                comments: ["Can't someone else do it?", "No, you do it"],
                completion: 0
            },
            {
                owner: 1,
                title: "Dust",
                deadline: new Date("2023-06-02"),
                desc: "Please dust off your shelves :)",
                comments: ["They are already clean :)"],
                completion: 2
            },
            {
                owner: 1,
                title: "Trash",
                deadline: new Date("2023-04-20"),
                desc: "Take out the trash!",
                comments: ["Will do soon™"],
                completion: 1
            },
        ]
    };
})(A04_Aufgabenliste_Datenstruktur || (A04_Aufgabenliste_Datenstruktur = {}));
//# sourceMappingURL=Data.js.map