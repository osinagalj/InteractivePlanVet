import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/models/subject';
@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;

  titulo = 'Crear Materia';
  id: string | null;

  title = 'Select/ Unselect All Checkboxes in Angular - FreakyJolly.com';
  masterSelected:boolean;

  checkedList:any;

  //this.subjects1.push({id:i1,value:val.name,isSelected:false});

  public radioData: any; 


  oneAtATime : Boolean = true;
  isCustomHeaderOpen: Boolean =  false;
  isFirstOpen: Boolean = true;
  isFirstDisabled:Boolean = false;

  public SUBJECT: Subject = {
    name: "All",
    year: 1,
    subjects: null,
    quarter: 1
    
  }

  groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  items = ['Item 1', 'Item 2', 'Item 3'];

  addItem(): void {
    var newItemNo = this.items.length + 1;
    this.items.push('Item ' + newItemNo);
  }


  subjectWIthCheckBox : any = [{id:1,value:'All',isSelected:false,subject:this.SUBJECT}];
 /*  */

tamanio : Number = 0;
selectedData: any = []; //{ id: 1, header:"1º año",data:this.subjectWIthCheckBox}

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _subjectService: SubjectService,
              private aRouter: ActivatedRoute) { 
    this.productoForm = this.fb.group({
      subjectName: ['', Validators.required],
      subjectYear: ['', Validators.required],
      radioYear: ['Primer cuatrimestre', Validators.required],
      
    })

    this.id = this.aRouter.snapshot.paramMap.get('id');

    this.masterSelected = false;
    
    //this.getCheckedItemList();

  }




  ngOnInit(): void {
    this.obtenerProductos();
    this.esEditar();
  }
  listSubjectsDB: Subject[] = [];
  listSubjects: Subject[] = [];
  listSubjects2: Subject[] = [];
  listSubjects3: Subject[] = [];

  test : Number = 1;
  test2: Number = 2;

  obtenerProductos() {
    


    //("subjects = ");
    this._subjectService.getProductos().subscribe(data => {
      //console.log("data = ");
    //  console.log(data);
      this.listSubjectsDB = data;
    //  console.log("dataDB = ");
     // console.log(this.listSubjectsDB );
      this.setQueques();
      
    }, error => {
      console.log(error);
    })
  }

  setQueques(){
    
    let i1 = 2;
    let size = 0;
    for (var val of this.listSubjectsDB) {
      console.log (val);
      if(val.year > size){
        size =val.year ;
      }
      this.subjectWIthCheckBox.push({id:i1,value:val.name,isSelected:false,subject:val});
    }
    this.selectedData.pop;

    for (var i = 1; i < size + 1; i++) {
      this.selectedData.push({ id: 1, header: i +"º año",data:this.subjectWIthCheckBox});
    }
    console.log("tamanioo : " + size);
    
      

  }

  setCheck(e:any) {
    if(e.isSelected)
      e.isSelected = false;
    else{
      e.isSelected = true;
    }
  }

  addSubjectsToSend(lista:any, CheckList: any){
    for (var val of CheckList) {
      if(val.isSelected == true){
        const SUBJECT: Subject = {
          name: val.value,
          year: 1,
          subjects: null,
          quarter:1
        }
        lista.push(SUBJECT);
      }
    }
  }

  agregarProducto() {

    let subjectSeleccionadas: Subject[] = [];
    let subjectSeleccionadas2: Subject[] = [];


    console.log("----------EL radioData");
    console.log(this.productoForm.get('radioYear')?.value);
    //console.log(this.subjects1);


    this.addSubjectsToSend(subjectSeleccionadas,this.subjectWIthCheckBox);  
/*     this.addSubjectsToSend(subjectSeleccionadas,this.subjects2);
    this.addSubjectsToSend(subjectSeleccionadas,this.subjects3);
    this.addSubjectsToSend(subjectSeleccionadas,this.subjects4);
    this.addSubjectsToSend(subjectSeleccionadas,this.subjects5); */


    let year = this.productoForm.get('subjectYear')?.value;
    let quarter;
    if(this.productoForm.get('radioYear')?.value == "Segundo cuatrimestre"){
      
      quarter = 2;
    }else{
      quarter = 1;
    }

    //let year = 
    const SUBJECT: Subject = {
      name: this.productoForm.get('subjectName')?.value,
      year: year,
      subjects: subjectSeleccionadas,
      quarter: quarter
      
    }

    console.log("MATERIA A AGREGAR");
    console.log(SUBJECT);

    if(this.id !== null){
      var num = new Number(this.id); 
      //SUBJECT._id = num;
      this._subjectService.updateProducto(SUBJECT,this.id).subscribe(data => {
        this.toastr.success('El producto fue actualizado con exito!', 'Producto Registrado!');
        this.router.navigate(['/crear-producto']);
      }, error => {
        this.toastr.error('El producto no se ha podido registrar', 'Producto NO Registrado!');
        console.log(error);
        this.productoForm.reset();
      }) 
    }else{
      this._subjectService.guardarProducto(SUBJECT).subscribe(data => {
        this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
        this.router.navigate(['/crear-producto']);
      }, error => {
        this.toastr.error('El producto no se ha podido registrar', 'Producto NO Registrado!');
        console.log(error);
        this.productoForm.reset();
      }) 
    }


  
  }


  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar producto';
      this._subjectService.obtenerProducto(this.id).subscribe(data => {
        let quarter;
        if(data.quarter == 1){
          quarter = "Primer cuatrimestre";
        }else{
          quarter = "Segundo cuatrimestre";
        }
        this.productoForm.setValue({


          subjectName: data.name,
          subjectYear: data.year,
          radioYear: quarter
        })

        console.log("QUE MIERDA HAY dataa");
        console.log(data.subjects );

        console.log("QUE MIERDA HAY ya caragada");
        console.log(this.subjectWIthCheckBox );

        console.log("FORRRRRRRRRRRRRRRR - ---------------");

        for (var i = 0; i < data.subjects.length; i++) {
          console.log(data.subjects[i]);
          for (var j = 0; j < this.subjectWIthCheckBox.length; j++) {
            
            if(data.subjects[i].name == this.subjectWIthCheckBox[j].subject.name){
              this.subjectWIthCheckBox[j].isSelected = true;
            }
          }
        }

        console.log("YA SEETIE LAS CHECK");
        console.log(this.subjectWIthCheckBox );

/*         for(var subject2 in data.subjects){
          for(var sb in this.subjectWIthCheckBox){
            console.log(subject2);
          }
        } */

      })
    }
  }

}



    // Get List of Checked Items
/*     getCheckedItemList(){
      this.checkedList = [];
      for (var i = 0; i < this.checklist.length; i++) {
        if(this.checklist[i].isSelected)
        this.checkedList.push(this.checklist[i]);
      }
      this.checkedList = JSON.stringify(this.checkedList);
    }
    checkUncheckAll() {
      for (var i = 0; i < this.checklist.length; i++) {
        this.checklist[i].isSelected = this.masterSelected;
      }
      this.getCheckedItemList();
    } */
  
    // Check All Checkbox Checked
/*     isAllSelected() {
      this.masterSelected = this.checklist.every(function(item:any) {
          return item.isSelected == true;
        })
      this.getCheckedItemList();
    } */