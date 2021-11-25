import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './modulo-seguridad/login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TipoProductoComponent } from './modulo-inventario/tipo-producto/tipo-producto.component';
import { ProductosComponent } from './modulo-inventario/productos/productos.component';
import { InventarioComponent } from './modulo-inventario/inventario/inventario.component';
import { EditarTipoProductoComponent } from '././modulo-inventario/tipo-producto/editar-tipo-producto/editar-tipo-producto.component';

import { PlantasComponent } from './modulo-Appqr/Plantas/plantas.component';
import { CodigoQrComponent } from './modulo-Appqr/CodigoQr/codigoqr.component';

import {PersonaComponent} from './modulo-persona/persona/persona.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent},
  { path: 'panel',component: DashboardComponent,

   children:[
     { path: 'tipo-productos', component: TipoProductoComponent },
     { path: 'productos', component: ProductosComponent },
     {path: 'inventario', component: InventarioComponent },
     {path:'editar-tipo-producto/:id',component:EditarTipoProductoComponent,outlet:"outlet_modal_editar"},

     {path: 'plantas', component: PlantasComponent },
     {path: 'codigoqr', component: CodigoQrComponent },

    { path: 'personas', component: PersonaComponent }

  ],
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const rountingComponents=[
  TipoProductoComponent,
  ProductosComponent,
  InventarioComponent,
  EditarTipoProductoComponent,
  
  PlantasComponent,
  CodigoQrComponent,

  PersonaComponent ]

