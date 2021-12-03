import { Component, OnInit } from '@angular/core';
import {ServiceInventario} from '../../SERVICES/services_inventario/moduloInventario.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
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

 constructor(
  private serviceInventario:ServiceInventario, 
  private router:Router,
  private activatedRoute: ActivatedRoute,
  public formBuilder: FormBuilder ) {

    this.updateForm = this.formBuilder.group({
      cod_producto: '',
      cod_tip_producto:'',
      nombre_producto:'',
      precio:'', 
      fotografia:'', 
      vida_util:'',
      descripcion:'',
      pre_producto:'',
      fec_caducidad:''

      });

      this.createForm = this.formBuilder.group({
        cod_tip_producto: '',
        nombre_producto: '',
        precio: '',
        fotografia: '',
        vida_util: '',
        pre_producto: '',
        fec_caducidad: '',
        descripcion: ''
      });



   }


    ngOnInit(): void {
    this.MostrarDatos();
    
  }

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

   

}


