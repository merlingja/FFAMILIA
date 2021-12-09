import { Component, OnInit } from '@angular/core';
import {ServiceInventario} from '../../SERVICES/services_inventario/moduloInventario.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})


export class ProductosComponent implements OnInit {
    products:any = [];
    tipoProductos:any = [];
    updateForm: FormGroup;
    createForm: FormGroup;
    titulo: string ='';
    submitted = false;

 constructor(
  private serviceInventario:ServiceInventario, 
  private router:Router,
  private activatedRoute: ActivatedRoute,
  public formBuilder: FormBuilder ) {

    this.updateForm = this.formBuilder.group({
      cod_producto: '',
      cod_tip_producto: ['', [Validators.required]],
        nombre_producto: ['', [Validators.required,Validators.minLength(6),
         Validators.maxLength(20)]],
        precio: ['', [Validators.required,Validators.maxLength(5)]],
        vida_util: ['', [Validators.required,Validators.maxLength(5)]],
        pre_producto: ['', [Validators.required,Validators.maxLength(30)]],
        fotografia:'',
        fec_caducidad: ['', [Validators.required]],
        descripcion: ['', [Validators.required,Validators.minLength(10),
            Validators.maxLength(50)]],

      });

      this.createForm = this.formBuilder.group({
        cod_tip_producto: ['', [Validators.required]],
        nombre_producto: ['', 
        [Validators.required,
         Validators.minLength(6),
         Validators.maxLength(20)]],
        precio: ['', [
         Validators.required,
         Validators.maxLength(5)]],
        vida_util: ['', 
        [Validators.required,
        Validators.maxLength(5)]],
        pre_producto: ['', 
        [Validators.required,
        Validators.maxLength(30)]],
        fec_caducidad: ['', 
        [Validators.required]],
        descripcion: ['', 
        [Validators.required,
         Validators.minLength(10),
         Validators.maxLength(50)]],
      });



   }


    ngOnInit(): void {
    this.MostrarDatos();
    
  }
  //---------
  get f(): { [key: string]: AbstractControl } {
    return this.createForm.controls;
  }

  get fu(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
  }
//-------
  MostrarDatos(){
    this.serviceInventario.GetProductos().subscribe(res => {
      console.log(res)
      this.products =<any>res;
    });

  }
//trae los tipos de productos
  tiposProductos(){
    this.serviceInventario.GetTipos().subscribe(res => {
      console.log(res)
      this.tipoProductos =<any>res;
    });

  }

  EditarProducto(id:number){
    this.tiposProductos();
    this.serviceInventario.GetProducto(id).subscribe(res => {

      console.log(res)
      this.updateForm.setValue({
      cod_producto: id,
      cod_tip_producto: res['COD_TIP_PRODUCTO'],
      nombre_producto: res ['NOMBRE_PRODUCTO'],
      precio: res ['PRECIO'], 
      fotografia: res ['FOTOGRAFIA'],  
      vida_util: res ['VIDA_UTIL'], 
      descripcion: res ['DESCRIPCION'], 
      pre_producto: res ['PRE_PRODUCTO'], 
      fec_caducidad: res ['FEC_CADUCIDAD']

      });
    });
  }

  onUpdate(): any {
    this.submitted = true;

    if (this.updateForm.invalid) {
      return;
    }
    this.serviceInventario.updateProductos(this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        Swal.fire('Se actualizo con exito',this.titulo,'success')
        this.MostrarDatos()
        
      
      }, (err) => {
        console.log(err);
        Swal.fire('Ocurrio problema',this.titulo,'error')
    });
  }

  eliminarProducto(id:any, i:number):any{
    if(window.confirm('Esta seguro de querer elimina el registro?')){
      this.serviceInventario.borrarProducto(id).subscribe(res=>{
        if(res.affectedRows==1){
          console.log("Se elimino el registro");
          Swal.fire('Se elimino con exito',this.titulo,'success')
          this.products.splice(i, 1);
        }else{
          console.log("No se pudo eliminar el registro o, no existe");
          window.alert("error")
        }
      }, (err) => {
        console.log(err);
        Swal.fire('No se puede eliminar registro',this.titulo,'error')
    });
    }
  }

  nuevoProducto(): any {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }
    this.serviceInventario.crearProducto( this.createForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        Swal.fire('Se Inserto con exito',this.titulo,'success')
         this.MostrarDatos();
         
      }, (err) => {
        console.log(err);
        Swal.fire('Ocurrio problema',this.titulo,'error')
    });
  }

 nuevoProductoModal(){
    this.tiposProductos();
  }
  onReset(): void {
    this.submitted = false;
    this.createForm.reset();
  }
   

}


