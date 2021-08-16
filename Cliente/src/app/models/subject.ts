export class Subject {
    _id?: number;
    name: string;
    year: number;
    subjects: any;
    quarter :number;
 
    

    constructor(name: string, year: number, subjects: any, quarter: number){
        this.name = name;
        this.year = year;
        this.subjects = subjects;
        this.quarter = quarter;
    }
}