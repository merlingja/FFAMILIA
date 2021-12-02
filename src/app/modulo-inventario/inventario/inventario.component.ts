import { Component, OnInit } from '@angular/core';
import {ServiceInventario} from '../../SERVICES/services_inventario/moduloInventario.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  inv:any = [];
  productos:any = [];
  updateForm: FormGroup;
  createForm: FormGroup;
  titulo: string ='';

  constructor(private serviceInventario:ServiceInventario, 
    private router:Router,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder) {

      this.updateForm = this.formBuilder.group({
        cod_producto: '',
        can_existencia: '',
        //tip_transaccion: ''
                
  
        });

        this.createForm = this.formBuilder.group({
          cod_producto: '',
          can_existencia: '',
          fec_introduccion:''
          
        });

     }

  
  ngOnInit(): void {
    this.ListarInventario();

    
  }
  ListarInventario(){
    this.serviceInventario.GetInventarios().subscribe(res => {
      console.log(res)
      this.inv =<any>res;
    });
}

//trae los tipos de productos
ListarProducto(){
  this.serviceInventario.GetProductos().subscribe(res => {
    console.log(res)
    this.productos =<any>res;
  });

}

EditarInventario(id:number){
  this.serviceInventario.GetInventario(id).subscribe(res => {

    console.log(res)
    this.updateForm.setValue({
      cod_producto:res['COD_PRODUCTO'],
      can_existencia: res['CAN_EXISTENCIA'],
      //tip_transaccion: res['']
      
    });
  });
}

onUpdate(): any {
  this.serviceInventario.updateInventory(this.updateForm.value)
  .subscribe(() => {
      console.log('Data updated successfully!')
      Swal.fire('Se actualizo con exito',this.titulo,'success')
      this.ListarInventario()
      
    
    }, (err) => {
      console.log(err);
      Swal.fire('Ocurrio problema',this.titulo,'error')
  });
}

nuevoProductoInventario(): any {
  this.serviceInventario.crearProductoInventario( this.createForm.value)
  .subscribe(() => {
      console.log('Data updated successfully!')
      Swal.fire('Se Inserto con exito',this.titulo,'success')
       this.ListarInventario();
       
    }, (err) => {
      console.log(err);
      Swal.fire('Ocurrio problema',this.titulo,'error')
  });
}

nuevoProdInventarioModal(){
  this.ListarProducto();
}



}




  
  

  