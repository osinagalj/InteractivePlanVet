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
  checklist:any;
  checkedList:any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _subjectService: SubjectService,
              private aRouter: ActivatedRoute) { 
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
      
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');


    this.masterSelected = false;
    this.checklist = [
      {id:1,value:'Elenor Anderson',isSelected:false},
      {id:2,value:'Caden Kunze',isSelected:true},
      {id:3,value:'Ms. Hortense Zulauf',isSelected:true},
      {id:4,value:'Grady Reichert',isSelected:false},
      {id:5,value:'Dejon Olson',isSelected:false},
      {id:6,value:'Jamir Pfannerstill',isSelected:false},
      {id:7,value:'Aracely Renner DVM',isSelected:false},
      {id:8,value:'Genoveva Luettgen',isSelected:false}
    ];
    this.getCheckedItemList();

  }

    // Get List of Checked Items
    getCheckedItemList(){
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
    }
  
    // Check All Checkbox Checked
    isAllSelected() {
      this.masterSelected = this.checklist.every(function(item:any) {
          return item.isSelected == true;
        })
      this.getCheckedItemList();
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

  agregarProducto() {

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

/*     console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
      this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.productoForm.reset();
    }) */

  
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
