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
  i : Number = 7;

  odd : Number = 8;
  even : Number = 9;

  public SUBJECT: Subject = {
    name: "All",
    order: 0,
    year: 1,
    subjects: null,
    subjects2: null,
    subjects3: null,
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
  subjectWIthCheckBox2 : any = [{id:1,value:'All',isSelected:false,subject:this.SUBJECT}];
  subjectWIthCheckBox3 : any = [{id:1,value:'All',isSelected:false,subject:this.SUBJECT}];

  subjectWIthCheckBoxFinalesFinales : any = [{id:1,value:'All',isSelected:false,subject:this.SUBJECT}];
 /*  */

tamanio : Number = 0;
selectedData: any = []; //{ id: 1, header:"1º año",data:this.subjectWIthCheckBox}

selectedData2: any = []; 

selectedData3: any = []; 

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _subjectService: SubjectService,
              private aRouter: ActivatedRoute) { 
    this.productoForm = this.fb.group({
      subjectName: ['', Validators.required],
      subjectYear: ['', Validators.required],
      radioYear: ['Primer cuatrimestre', Validators.required],
      radioType: ['Cuatrimestral', Validators.required],
      order : ['', Validators.required],
      
    })

    this.id = this.aRouter.snapshot.paramMap.get('id');

    this.masterSelected = false;
    
    //this.getCheckedItemList();

  }




  ngOnInit(): void {
    this.obtenerProductos();
    
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
      this.esEditar();
      
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
      this.subjectWIthCheckBox.push({ id:i1,value:val.name,isSelected:false,subject:val});
      this.subjectWIthCheckBox2.push({id:i1,value:val.name,isSelected:false,subject:val});
      this.subjectWIthCheckBox3.push({id:i1,value:val.name,isSelected:false,subject:val});

    }
    //this.subjectWIthCheckBox2 =this.subjectWIthCheckBox;
    //this.subjectWIthCheckBox3 =this.subjectWIthCheckBox;
    
    for (var i = 0; i < size +1; i++) {
      this.selectedData.push({ id: 0, header: i +"º año",data:this.subjectWIthCheckBox});

      
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
          order: 0,
          year: 1,
          subjects: null,
          subjects2: null,
          subjects3: null,
          quarter:1
        }
        lista.push(SUBJECT);
      }
    }
  }

  agregarProducto() {

    let subjectSeleccionadas: Subject[] = [];
    let subjectSeleccionadas2: Subject[] = [];
    let subjectSeleccionadas3: Subject[] = [];


    console.log("----------EL radioData");
    console.log(this.productoForm.get('radioYear')?.value);
    //console.log(this.subjects1);


    this.addSubjectsToSend(subjectSeleccionadas,this.subjectWIthCheckBox); 
    this.addSubjectsToSend(subjectSeleccionadas2,this.subjectWIthCheckBox2); 
    this.addSubjectsToSend(subjectSeleccionadas3,this.subjectWIthCheckBox3);  


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
      order: this.productoForm.get('order')?.value,
      year: year,
      subjects: subjectSeleccionadas,
      subjects2: subjectSeleccionadas2,
      subjects3: subjectSeleccionadas3,
      quarter: quarter
      
    }

    console.log("MATERIA A AGREGAR");
    console.log(SUBJECT);

    if(this.id !== null){
      var num = new Number(this.id); 
      //SUBJECT._id = num;
      console.log("NUMERO DE ID AL EDITAR");
      console.log(this.id);
      this._subjectService.updateProducto(SUBJECT,this.id).subscribe(data => {
        this.toastr.success('El producto fue actualizado con exito!', 'Producto Registrado!');
        this.router.navigate(['/subjects']);
      }, error => {
        this.toastr.error('El producto no se ha podido registrar', 'Producto NO Registrado!');
        console.log(error);
        this.productoForm.reset();
      }) 
    }else{
      this._subjectService.guardarProducto(SUBJECT).subscribe(data => {
        this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
        //this.router.navigate(['/subjects']);
      }, error => {
        this.toastr.error('El producto no se ha podido registrar', 'Producto NO Registrado!');
        console.log(error);
        this.productoForm.reset();
      }) 
    }


  
  }


  esEditar() {

    //no incluir la materia a agregar en la edicion
    if(this.id !== null) {
      this.titulo = 'Editar Materia';
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
          radioYear: quarter,
          radioType: 'Anual',
          order: data.order
        })

        console.log("QUE MIERDA HAY dataa");
        console.log(data.subjects );

        console.log("QUE MIERDA HAY ya caragada");
        console.log(this.subjectWIthCheckBox );

        console.log("FORRRRRRRRRRRRRRRR - ---------------");

        for (var i = 0; i < data.subjects.length; i++) {
          console.log(data.subjects[i]);
          for (var j = 0; j < this.subjectWIthCheckBox.length; j++) {
            console.log( this.subjectWIthCheckBox[j].subject.name + " == " + data.subjects[i].name);
            if(data.subjects[i].name == this.subjectWIthCheckBox[j].subject.name){
              console.log("hay un select = true");
              this.subjectWIthCheckBox[j].isSelected = true;
            }
          }
        }
        console.log("YA SEETIE LAS CHECK PRIMERR CHECK");
        console.log(this.subjectWIthCheckBox );

        for (var i = 0; i < data.subjects2.length; i++) {
         // console.log(data.subjects2[i]);
          for (var j = 0; j < this.subjectWIthCheckBox2.length; j++) {
            
            if(data.subjects2[i].name == this.subjectWIthCheckBox2[j].subject.name){
              this.subjectWIthCheckBox2[j].isSelected = true;
            }
          }
        }

        for (var i = 0; i < data.subjects3.length; i++) {
         // console.log(data.subjects3[i]);
          for (var j = 0; j < this.subjectWIthCheckBox3.length; j++) {
            
            if(data.subjects3[i].name == this.subjectWIthCheckBox3[j].subject.name){
              this.subjectWIthCheckBox3[j].isSelected = true;
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