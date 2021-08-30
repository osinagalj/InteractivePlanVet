export class Subject {
    _id?: Number;
    order: Number;
    name: string;
    year: number;
    subjects: any;
    subjects2: any;
    subjects3: any;
    quarter :number;
 
    constructor(name: string, order: number, year: number, subjects: any, subjects2: any, subjects3: any, quarter: number){
        this.name = name;
        this.order = order;
        this.year = year;
        this.subjects = subjects;
        this.subjects2 = subjects2;
        this.subjects3 = subjects3;
        this.quarter = quarter;
    }
}