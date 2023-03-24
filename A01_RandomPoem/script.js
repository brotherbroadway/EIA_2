"use strict";
var A01_RandomPoem;
(function (A01_RandomPoem) {
    /*
Aufgabe: L01_Zufallsgedicht
Name: Jona Ruder
Matrikel: 265274
Datum: 24.03.2023
Quellen: -
*/
    let subjects = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let predicates = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let objects = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    //console.log(subjects);
    //console.log(predicates);
    //console.log(objects);
    for (let i = 6; i > 0; i--) {
        //console.log(i);
        console.log(getVerse(subjects, predicates, objects));
    }
    function getVerse(_subjects, _predicates, _objects) {
        let thisSubject = Math.floor(Math.random() * _subjects.length);
        let subjectSpliced = _subjects.splice(thisSubject, 1)[0];
        //console.log("Subject: " + thisSubject);
        let thisPredicate = Math.floor(Math.random() * _predicates.length);
        let predicateSpliced = _predicates.splice(thisPredicate, 1)[0];
        //console.log("Predicate: " + thisPredicate);
        let thisObject = Math.floor(Math.random() * _objects.length);
        let objectSpliced = _objects.splice(thisObject, 1)[0];
        //console.log("Objects: " + thisObject);
        // Puts the string together
        let output = subjectSpliced + " " + predicateSpliced + " " + objectSpliced;
        return output;
    }
})(A01_RandomPoem || (A01_RandomPoem = {}));
