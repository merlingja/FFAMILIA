
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceInventario {

  // Node/Express API
  //REST_API: string = 'http://localhost:3000/API';
  REST_API:string='http://localhost:3000/API';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor (private httpClient: HttpClient) { }

  // -----------------------TIPOS DE PRODUCTOS-----------------
  //obtener todos los tipos de productos
  GetTipos () {
    let API_URL = `${this.REST_API}/tipo-productos`;
    return this.httpClient.get(API_URL , { headers: this.httpHeaders });
    
  }
  // Obtener un solo objeto
  GetTipoProducto (id: any): Observable<any> {
    let API_URL = `${this.REST_API}/tipo-producto/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res[0] || {}
      }),
        catchError(this.handleError)
      )
  }
  

  // Update
  updateTipoProducto ( data: any): Observable<any> {
    let API_URL = `${this.REST_API}/actualizar-tipo-producto`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
  //------------------------------PRODUCTOS------------------------------------
  GetProductos() {
    let API_URL = `${this.REST_API}/lista-productos`;
    return this.httpClient.get(API_URL , { headers: this.httpHeaders });

  }

 //-------------------------------INVENTARIO------------------------------------
 GetInventarios() {
  let API_URL = `${this.REST_API}/todo_inventario`;
  return this.httpClient.get(API_URL , { headers: this.httpHeaders });

}


handleError (error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Handle client error
    errorMessage = error.error.message;
  } else {
    // Handle server error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}

  }

 

  
  

  



