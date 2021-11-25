import { Component, NgZone, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ServiceInventario} from '../../../SERVICES/services_inventario/moduloInventario.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-editar-tipo-producto',
  templateUrl: './editar-tipo-producto.component.html',
  styleUrls: ['./editar-tipo-producto.component.css']
})
export class EditarTipoProductoComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private  serviceInventario: ServiceInventario) {

      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.serviceInventario.GetTipoProducto(this.getId).subscribe(res => {

        console.log(res)
        this.updateForm.setValue({
          tipo: res['TIP_PRODUCTO'],
          descripcion: res['DES_TIP_PRODUCTO']


        });
      });

      this.updateForm = this.formBuilder.group({
        nombre: '',
        precio: '',
        descripcion: ''
      });

    
    
   }

  ngOnInit(): void {
  }

}

