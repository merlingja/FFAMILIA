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
  updateForm: FormGroup;
  titulo: string ='';

  constructor(private serviceInventario:ServiceInventario, 
    private router:Router,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder) {

      this.updateForm = this.formBuilder.group({
        cod_producto: '',
        can_existencia: ''
        
  
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

EditarInventario(id:number){
  this.serviceInventario.GetInventario(id).subscribe(res => {

    console.log(res)
    this.updateForm.setValue({
      cod_producto:id,
      can_existencia: res['CAN_EXIXTENCIA']
      

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

}




  
  

  