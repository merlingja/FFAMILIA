import { Component, NgZone, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ServiceInventario} from '../../../SERVICES/services_inventario/moduloInventario.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-tipo-producto',
  templateUrl: './editar-tipo-producto.component.html',
  styleUrls: ['./editar-tipo-producto.component.css']
})
export class EditarTipoProductoComponent implements OnInit {
  titulo: string ='';

  getId: any;
  updateForm: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private  serviceInventario: ServiceInventario,
    private  location: Location) {

      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.serviceInventario.GetTipoProducto(this.getId).subscribe(res => {

        console.log(res)
        this.updateForm.setValue({
          cod_tip_producto: this.getId,
          tip_producto: res['TIP_PRODUCTO'],
          des_tip_producto: res['DES_TIP_PRODUCTO']


        });
      });

     this.updateForm = this.formBuilder.group({
      cod_tip_producto: '',
      tip_producto: '',
      des_tip_producto:''

      });

    
    
   }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.serviceInventario.updateTipoProducto(this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        Swal.fire('Se actualizo con exito',this.titulo,'success')
        //this.ngZone.run(() => this.router.navigateByUrl('/panel/tipo-productos'))
        this.location.back()
      }, (err) => {
        console.log(err);
    });
  }

}

