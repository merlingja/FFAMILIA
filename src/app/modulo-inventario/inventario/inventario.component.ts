import { Component, OnInit } from '@angular/core';
import {ServiceInventario} from '../../SERVICES/services_inventario/moduloInventario.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  productos:any = [];
  inv:any = [];
  pro_inv:any = [];
  prodinv:any = [];
  borrarInv:any = [];
  updateForm: FormGroup;
  createForm: FormGroup;
  titulo: string ='';
  submitted = false;

  download(){
    const element = document.getElementById('ListaInventario')
    ;

   var opt = {

   margin:       0.82,
   filename:     'registro de empleados.pdf',
   image:        { type: 'jpeg', quality: 100 },
   html2canvas:  { scale: 10 },
   jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }



  };



  html2pdf().from(element).set(opt).save();
  }

  constructor(private serviceInventario:ServiceInventario, 
    private router:Router,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder) {

      this.updateForm = this.formBuilder.group({
        cod_producto: ['', [Validators.required]],
        can_existencia: ['', [Validators.required]],
        tip_transaccion: ['', [Validators.required]],
                
  
        });
        this.createForm = this.formBuilder.group({
          cod_producto: ['', [Validators.required]],
          can_existencia: '',
          fec_introduccion:['', [Validators.required]],
          
        });

     }

  
  ngOnInit(): void {
    this.ListarInventario();

    
  }
  get f(): { [key: string]: AbstractControl } {
    return this.createForm.controls;
  }
  get fu(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
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
      can_existencia: '',
      tip_transaccion: ''      
    });
    this.pro_inv =res;
  });
}

onUpdate(): any {
  this.submitted = true;

    if (this.updateForm.invalid) {
      return;
    }
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
  this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }
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
  this.serviceInventario.GetProductosNoIventariados().subscribe(res => {
    console.log(res)
    this.prodinv =<any>res;
  });
  
}

eliminarProductoInventario(id:any, i:number):any{
  if(window.confirm('Esta seguro de querer elimina el registro?')){
    this.serviceInventario.borrarProductoInventario(id).subscribe(res=>{
      if(res.affectedRows==1){
        console.log("Se elimino el registro");
        Swal.fire('Se elimino con exito',this.titulo,'success')

        this.borrarInv.splice(i, 1);
      }else{
        console.log("No se pudo eliminar el registro o, no existe");
        window.alert("error")
        
      }
    }, (err) => {
      console.log(err);
      Swal.fire('Ocurrio problema',this.titulo,'error')
  }
  
  );
  }
}

onReset(): void {
  this.submitted = false;
  this.createForm.reset();
}

}




  
  

  