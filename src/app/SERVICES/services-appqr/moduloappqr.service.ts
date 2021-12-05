
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceAppQr {

  // Node/Express API
  //REST_API: string = 'http://localhost:3000/API';
  REST_API:string='http://localhost:3000/API';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor (private httpClient: HttpClient) { }

  // -----------------------Plantas-----------------
  //obtener todos los datos de las plantas
  GetPlantass () {
    let API_URL = `${this.REST_API}/plantas`;
    return this.httpClient.get(API_URL , { headers: this.httpHeaders });
    
  }
  // Obtener una sola planta
  GetPlanta (id: any): Observable<any> {
    let API_URL = `${this.REST_API}/plantas/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  //------------------------------condigo qr------------------------------------
  GetCodigoss() {
    let API_URL = `${this.REST_API}/codigo_qr`;
    return this.httpClient.get(API_URL , { headers: this.httpHeaders });

  }

  // Obtener un solo codigo
  GetCodigoQR (id: any): Observable<any> {
    let API_URL = `${this.REST_API}/codigo_qr/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res[0] || {}
      }),
        catchError(this.handleError)
      )
  }

  // Update Planta
  updatePlantass( data: any): Observable<any> {
    let API_URL = `${this.REST_API}/actualizar-planta`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
 // Update Codigo
  updateCodigoss( data: any): Observable<any> {
    let API_URL = `${this.REST_API}/actualizar-codigoqr`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
  // ELiminacion de registros de plantas
  borrarPlantass (id: any): Observable<any> {
    let API_URL = `${this.REST_API}/borrar-planta/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        console.log(res.affectedRows)
        return res;
      }),
        catchError(this.handleError)
      )
  }
  // ELiminacion de registros de codigo qr
  borrarCodigoss (id: any): Observable<any> {
    let API_URL = `${this.REST_API}/borrar-codigoqr/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        console.log(res.affectedRows)
        return res;
      }),
        catchError(this.handleError)
      )
  }
  // Creacion de registros
  crearPlantass (data: any): Observable<any> {
    let API_URL = `${this.REST_API}/insertar-planta`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        console.log(res)
        return res;
      }),
        catchError(this.handleError)
      )
  }

  crearCodigoss (data: any): Observable<any> {
    let API_URL = `${this.REST_API}/insertar-codigoqr`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        console.log(res)
        return res;
      }),
        catchError(this.handleError)
      )
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
