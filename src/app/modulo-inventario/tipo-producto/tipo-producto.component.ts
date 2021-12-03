import { Component, OnInit } from '@angular/core';
import {ServiceInventario} from '../../SERVICES/services_inventario/moduloInventario.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css']
})
export class TipoProductoComponent implements OnInit {
  tipoProductos:any = [];
  updateForm: FormGroup;
  createForm: FormGroup;
  titulo: string ='';

  
   constructor(
     private serviceInventario:ServiceInventario, 
     private router:Router,
     private activatedRoute: ActivatedRoute,
     public formBuilder: FormBuilder) {

      this.updateForm = this.formBuilder.group({
        cod_tip_producto: '',
        tip_producto: '',
        des_tip_producto:''
  
        });

        this.createForm = this.formBuilder.group({
        tipo: '',
        descripcion:''
        });
  

      }


  ngOnInit(): void {
    this.ListarDatos();
      }

  ListarDatos(){
    this.serviceInventario.GetTipos().subscribe(res => {
      console.log(res)
      this.tipoProductos =<any>res;
    });

  }

  EditarTipoProducto(id:number){
    this.serviceInventario.GetTipoProducto(id).subscribe(res => {

      console.log(res)
      this.updateForm.setValue({
        cod_tip_producto: id,
        tip_producto: res['TIP_PRODUCTO'],
        des_tip_producto: res['DES_TIP_PRODUCTO']


      });
    });
  }

  onUpdate(): any {
    this.serviceInventario.updateTipoProducto(this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        Swal.fire('Se actualizo con exito',this.titulo,'success')
        this.ListarDatos()
        
      
      }, (err) => {
        console.log(err);
        Swal.fire('Ocurrio problema',this.titulo,'error')
    });
  }

  eliminarTipoProducto(id:any, i:number):any{
    if(window.confirm('Esta seguro de querer elimina el registro?')){
      this.serviceInventario.borrarTipoProducto(id).subscribe(res=>{
        if(res.affectedRows==1){
          console.log("Se elimino el registro");
          Swal.fire('Se elimino con exito',this.titulo,'success')

          this.tipoProductos.splice(i, 1);
        }else{
          console.log("No se pudo eliminar el registro o, no existe");
          window.alert("error")
        }
      }, (err) => {
        console.log(err);
        Swal.fire('Ocurrio problema',this.titulo,'error')
    });
    }
  }

  nuevoTipoProducto(): any {
    this.serviceInventario.crearTipoProducto( this.createForm.value).subscribe(() => {
        console.log('Data updated successfully!')
        Swal.fire('Se Inserto con exito',this.titulo,'success')
         this.ListarDatos();
         
      }, (err) => {
        console.log(err);
        Swal.fire('Ocurrio problema',this.titulo,'error')
    });
  }

  

}

