import { Component, OnInit } from '@angular/core';
import {ServiceInventario} from '../../SERVICES/services_inventario/moduloInventario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css']
})
export class TipoProductoComponent implements OnInit {
  tipoProductos:any = [];
  
   constructor(private serviceInventario:ServiceInventario, private router:Router) { }


  ngOnInit(): void {
    this.serviceInventario.GetTipos().subscribe(res => {
      console.log(res)
      this.tipoProductos =<any>res;
    });
    
  }

  modalEditar(id:number){
    console.log(id)
    return this.router.navigate(['/panel',{outlets:{outlet_modal_editar:['editar-tipo-producto',id]}}]);
  }

}

