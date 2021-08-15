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




  oneAtATime : Boolean = true;
  isCustomHeaderOpen: Boolean =  false;
  isFirstOpen: Boolean = true;
  isFirstDisabled:Boolean = false;

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




  subjects1 = [
    {id:1,value:'All',isSelected:false}
 ];

 subjects2 = [
  {id:1,value:'All',isSelected:false}
];

subjects3 = [
  {id:1,value:'All',isSelected:false}
];
subjects4 = [
  {id:1,value:'All',isSelected:false}
];

subjects5 = [
  {id:1,value:'All',isSelected:false}
];

selectedData = [{ id: 1, header:"1º",data:this.subjects1},
                { id: 2, header:"2º",data:this.subjects2},
                { id: 3, header:"3º",data:this.subjects3},
                { id: 4, header:"4º",data:this.subjects4},
                { id: 5, header:"5º",data:this.subjects5}
];

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _subjectService: SubjectService,
              private aRouter: ActivatedRoute) { 
    this.productoForm = this.fb.group({
      subjectName: ['', Validators.required],
      subjectYear: ['', Validators.required],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id');

    this.masterSelected = false;

    //this.getCheckedItemList();

  }




  ngOnInit(): void {
    this.esEditar();
    this.obtenerProductos();
  }
  listSubjectsDB: Subject[] = [];
  listSubjects: Subject[] = [];
  listSubjects2: Subject[] = [];
  listSubjects3: Subject[] = [];



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

  setQueques(){
    
    let i1 = 2;
    let i2 = 2;
    let i3 = 2;
    let i4 = 2;
    let i5 = 2;
    console.log ('variables db queque');


    for (var val of this.listSubjectsDB) {
      console.log (val);
      if(val.year == 1){
        this.subjects1.push({id:i1,value:val.name,isSelected:false});
        i1 = i1+ 1;
      }
      if(val.year == 2){
        this.subjects2.push({id:i2,value:val.name,isSelected:false});
        i1 = i2+ 1;
      }
      if(val.year == 3){
        this.subjects3.push({id:i3,value:val.name,isSelected:false});
        i3 = i3+ 1;
      }
      if(val.year == 4){
        this.subjects4.push({id:i4,value:val.name,isSelected:false});
        i4 = i4+ 1;
      }
      if(val.year == 5){
        this.subjects5.push({id:i5,value:val.name,isSelected:false});
        i5 = i5+ 1;
      }
    }

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
          subjects: null
        }
        lista.push(SUBJECT);
      }
    }
  }

  agregarProducto() {

    let subjectSeleccionadas: Subject[] = [];
    let subjectSeleccionadas2: Subject[] = [];

    console.log(this.subjects1);
    this.addSubjectsToSend(subjectSeleccionadas,this.subjects1);  
    this.addSubjectsToSend(subjectSeleccionadas,this.subjects2);
    this.addSubjectsToSend(subjectSeleccionadas,this.subjects3);
    this.addSubjectsToSend(subjectSeleccionadas,this.subjects4);
    this.addSubjectsToSend(subjectSeleccionadas,this.subjects5);



    const SUBJECT: Subject = {
      name: this.productoForm.get('subjectName')?.value,
      year: this.productoForm.get('subjectYear')?.value,
      subjects: subjectSeleccionadas
      
    }

    console.log("MATERIA A AGREGAR");
    console.log(SUBJECT);
    this._subjectService.guardarProducto(SUBJECT).subscribe(data => {
      this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
      //this.router.navigate(['/']);
    }, error => {
      this.toastr.error('El producto no se ha podido registrar', 'Producto NO Registrado!');
      console.log(error);
      this.productoForm.reset();
    }) 

  
  }


  esEditar() {

/*     if(this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        })
      })
    } */
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