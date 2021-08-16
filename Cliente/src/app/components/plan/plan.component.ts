import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery'; // I faced issue in using jquery's popover
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  
  listSubjectsNext: Subject[] = [];
  listSubjectsAntes: Subject[] = [];

  listSubjectsDB: Subject[] = [];

  years : Number = 0;


  productoForm: FormGroup;
  tamanio : Number = 0;
  selectedData: any = []; //{ id: 1, header:"1º año",data:this.subjectWIthCheckBox}
  



  constructor(private _subjectService: SubjectService,private fb: FormBuilder,) {
    this.productoForm = this.fb.group({
      radioYear: ['1', Validators.required],
    })
  }

  ngOnInit(): void {
    this.setSubjects();
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._subjectService.getProductos().subscribe(data => {
      this.listSubjectsDB = data;
      //Total of years
      var two : number = 2;
      var one : number = 1;
      var onee : number = 1;
      for (var subject of this.listSubjectsDB) {
          if(subject.year > this.years){
            
          }
      }
     // this.years = this.years * two + one; //1 es el ingreso y 2 por los cuatrimestres
      this.years = + 7;
      //this.years = this.years + Number(1);
    }, error => {
      console.log(error);
    })
  }

  resetColor() {
    for (var val of this.listSubjectsDB) {
      let form = document.getElementById(val.name)
      if(form != null){
        form.style.background = '#389FB1';  //color original
      }
    }
  }
  
  changeColor(subject:any) {

    let form = document.getElementById(subject.name)
    if(form != null){

      //Selected subject 
      form.style.background = '#7adaeb';

      //Seteo en verde las materias anteriores
      subject.subjects.forEach(function (value:any) {
        let form = document.getElementById(value.name)
        if(form != null){
          form.style.background = '#03ad11'; //anteriores
        }
      });

      //para todas las materias, la pinto de rojo si la que sleeccione esta en la lista de depednencias
      for (var varr of this.listSubjectsDB) { 
          for(var correlativa of varr.subjects){ //para cada materia correlativa
              if(correlativa.name == subject.name){
                let form = document.getElementById(varr.name)
                if(form != null){
                  form.style.background = 'red'; //anteriores
                }
              }
          }
      }
    }

  }




  setSubjects() {
    /*
    const SUBJECT: Subject = {
      name: 'Anatomia I',
      year: '2',
      subjects: null,
      subjectsNext: null
    }

    this.listSubjectsNext.push(SUBJECT);

    const SUBJECT2: Subject = {
      name: 'Quimica',
      year: '2',
      subjects: null,
      subjectsNext: this.listSubjectsNext
    }
    const SUBJECT3: Subject = {
      name: 'Biologia',
      year: '2',
      subjects: null,
      subjectsNext: this.listSubjectsNext
    }

    this.listSubjects.push(SUBJECT);
    this.listSubjects.push(SUBJECT2);
    this.listSubjects.push(SUBJECT3);

    //2do
    const SUBJECT4: Subject = {
      name: 'Anatomia 2',
      year: '3',
      subjects: null,
      subjectsNext: this.listSubjectsNext
    }

   //3ero
   const SUBJECT6: Subject = {
    name: 'Anatomia 9',
    year: '3',
    subjects: null,
    subjectsNext: this.listSubjectsNext
  }



    this.listSubjects2.push(SUBJECT4);
    

    this.listSubjectsAntes.push(SUBJECT6);

    const SUBJECT5: Subject = {
      name: 'MATERIA 5',
      year: '3',
      subjects: this.listSubjectsAntes,
      subjectsNext: this.listSubjectsNext
    }
    this.listSubjects2.push(SUBJECT5);


    const SUBJECT7: Subject = {
      name: 'MATERIA 10',
      year: '3',
      subjects: null,
      subjectsNext: this.listSubjectsNext
    }
    const SUBJECT8: Subject = {
      name: 'MATERIA 11',
      year: '3',
      subjects: null,
      subjectsNext: this.listSubjectsNext
    }

    this.listSubjects3.push(SUBJECT6);
    this.listSubjects3.push(SUBJECT7);
    this.listSubjects3.push(SUBJECT8);
*/
  }


  

}



/*   setQueques(){
    
    console.log ('variables db queque');
    for (var val of this.listSubjectsDB) {
      console.log (val);
      if(val.year == 1){
        this.listSubjects.push(val);
      }
      if(val.year == '2'){
        this.listSubjects2.push(val);
      }
      if(val.year == '3'){
        this.listSubjects3.push(val);
      }
      if(val.year == '4'){
        this.listSubjects4.push(val);
      }
      if(val.year == '5'){
        this.listSubjects5.push(val);
      }
    } */

//  }