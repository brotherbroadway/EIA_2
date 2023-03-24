namespace A01_RandomPoem {
    /*
Aufgabe: L01_Zufallsgedicht
Name: Jona Ruder
Matrikel: 265274
Datum: 24.03.2023
Quellen: -
*/

    let subjects: string[] = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let predicates: string[] = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let objects: string[] = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];

    //console.log(subjects);
    //console.log(predicates);
    //console.log(objects);

    for (let i: number = 6; i > 0; i--) {
        //console.log(i);
        console.log(getVerse(subjects, predicates, objects));
    }

    function getVerse(_subjects: string[], _predicates: string[], _objects: string[]): string {
        let thisSubject: number = Math.floor(Math.random() * _subjects.length);
        let subjectSpliced: string = _subjects.splice(thisSubject, 1)[0];
        //console.log("Subject: " + thisSubject);

        let thisPredicate: number = Math.floor(Math.random() * _predicates.length);
        let predicateSpliced: string = _predicates.splice(thisPredicate, 1)[0];
        //console.log("Predicate: " + thisPredicate);

        let thisObject: number = Math.floor(Math.random() * _objects.length);
        let objectSpliced: string = _objects.splice(thisObject, 1)[0];
        //console.log("Objects: " + thisObject);

        // Puts the string together
        let output: string = subjectSpliced + " " + predicateSpliced + " " + objectSpliced;

        return output;
    }
}