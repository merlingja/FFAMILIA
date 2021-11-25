import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, rountingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {DashboarModule} from './dashboard/dashboard.module';
//import { EditarTipoProductoComponent } from './tipo-producto/editar-tipo-producto/editar-tipo-producto.component';




@NgModule({
  declarations: [
    AppComponent,
    rountingComponents,
    //EditarTipoProductoComponent
    
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    DashboarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
