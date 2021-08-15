export class Subject {
    _id?: number;
    name: string;
    year: number;
    subjects: any;
 
    

    constructor(name: string, year: number, subjects: any){
        this.name = name;
        this.year = year;
        this.subjects = subjects;
    }
}