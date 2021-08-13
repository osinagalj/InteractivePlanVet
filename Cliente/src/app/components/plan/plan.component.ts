import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';
import * as $ from 'jquery'; // I faced issue in using jquery's popover
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {


  listSubjects: Subject[] = [];
  listSubjects2: Subject[] = [];
  listSubjects3: Subject[] = [];


  listSubjectsNext: Subject[] = [];
  listSubjectsAntes: Subject[] = [];

  listSubjectsDB: Subject[] = [];

  

  constructor(private _subjectService: SubjectService) {

/*     var $: any;
    $(document).ready(function()
    {
      $(document).on('click','.list-down-btn',function(event:any)
      {
        event.preventDefault();
        var target = $(document).attr('data-toggle');
        $(target).slideToggle();
        var clicked = event.target;
        $(clicked).toggleClass("glyphicon-chevron-down  glyphicon-chevron-up");
      });
    }); */
   }

  
  
   
   ShowForm(){
    $('#PriceForm').removeClass('HideMe');
  }

  
  

  ngOnInit(): void {
    this.setSubjects();
    this.obtenerProductos();
  }

  setQueques(){
    
    console.log ('variables db queque');
    for (var val of this.listSubjectsDB) {
      console.log (val);
      if(val.year == '1'){
        this.listSubjects.push(val);
      }
      if(val.year == '2'){
        this.listSubjects2.push(val);
      }
      if(val.year == '3'){
        this.listSubjects3.push(val);
      }
    }

  }

  obtenerProductos() {
    
    console.log("subjects = ");
    this._subjectService.getProductos().subscribe(data => {
      console.log("data = ");
      console.log(data);
      this.listSubjectsDB = data;
      console.log("dataDB = ");
      console.log(this.listSubjectsDB );
      this.setQueques();
    }, error => {
      console.log(error);
    })
  }

  resetColor() {
    for (var val of this.listSubjectsDB) {
      let form = document.getElementById(val.name)
      if(form != null){
        form.style.background = '#5a1361'; 
      }
    }

/* 
    let form = document.getElementById(subject.name)
    if(form != null){
      form.style.background = '#ffffff';
    } */
  }
  
  changeColor(subject:any) {
    console.log("subject");
    console.log(subject);
    
    let form = document.getElementById(subject.name)
    if(form != null){
      form.style.background = '#6b174e';
      
      console.log('SUBJECT QUE CLICKEO = ' );
      console.log(subject);
      
      for (var val of subject.subjectsNext) {
        
        this.changeColorRec(val);
      }
      

      subject.subjects.forEach(function (value:any) {
        console.log("LISTA DE DEPENDENCIAS ROJAS");
        let form = document.getElementById(value.name)
        if(form != null){
          form.style.background = '#c521ce'; //anteriores
        }
      });
    }
    

  
  }
  changeColorRec(subject:any){
    console.log('primer cambio de color' );
    if(subject != null){
      if(subject.length > 1){
        console.log('Subject que me vienen' );
        console.log(subject);
         for (var value of subject) {
          this.changeColorRec(value.subjectsNext); 
          let form = document.getElementById(subject.name)
          if(form != null){
            form.style.background = '#bb1313';  //posteriores
          }
        }
      }else{
        console.log('color unico' );

        let form = document.getElementById(subject.name)
        if(form != null){
          form.style.background = '#eb0c0c'; 
/*           for(var sub of this.listSubjectsDB){
            if(sub.name == )
          } */
          this.changeColorRec(subject.subjectsNext); 
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
