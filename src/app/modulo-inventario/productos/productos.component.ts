import { Component, OnInit } from '@angular/core';
import {ServiceInventario} from '../../SERVICES/services_inventario/moduloInventario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})


export class ProductosComponent implements OnInit {
    products:any = [];

 constructor(private serviceInventario:ServiceInventario, private router:Router) { }


  ngOnInit(): void {
    this.serviceInventario.GetProductos().subscribe(res => {
      console.log(res)
      this.products =<any>res;
    });
    
  }

  modalEditar(id:number){
    console.log(id)
    return this.router.navigate(['/panel',{outlets:{outlet_modal_editar:['editar-producto',id]}}]);
  }

}


