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
  

  changeColorList(list:any,subjectPick:String){
      //Seteo en verde las materias anteriores
      list.forEach(function (value:any) {
        let form = document.getElementById(value.name)
        if(form != null){
          form.style.background = '#03ad11'; //anteriores
        }
      });

      //para todas las materias, la pinto de rojo si la que sleeccione esta en la lista de depednencias
      for (var varr of this.listSubjectsDB) { 
          for(var correlativa of varr.subjects){ //para cada materia correlativa
              if(correlativa.name == subjectPick){
                let form = document.getElementById(varr.name)
                if(form != null){
                  form.style.background = 'red'; //anteriores
                }
              }
          }
      }
  }

  changeColor(subject:any) {

    //alert(this.productoForm.get('radioYear')?.value);


    //alert('ENTRO EN CAMBIANDO COLOR');
    let form = document.getElementById(subject.name)
    if(form != null){

      //Selected subject 
      form.style.background = '#7adaeb';

      if(this.productoForm.get('radioYear')?.value == "1"){
        this.changeColorList(subject.subjects,subject.name);
      }
      if(this.productoForm.get('radioYear')?.value == "2"){
        this.changeColorList(subject.subjects2,subject.name);
      }
      if(this.productoForm.get('radioYear')?.value == "3"){
        this.changeColorList(subject.subjects3,subject.name);
      }
      

    }
  

  }


  

}



//  }