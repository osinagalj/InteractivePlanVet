export class Subject {
    _id?: number;
    name: string;
    year: string;
    subjects: any;
    subjectsNext: any;
    

    constructor(name: string, year: string, subjects: any, subjectsNext: any){
        this.name = name;
        this.year = year;
        this.subjects = subjects;
        this.subjectsNext = subjectsNext;
       
    }
}