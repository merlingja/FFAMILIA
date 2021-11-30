import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicePeople {

  // Node/Express API
  //REST_API: string = 'http://localhost:3000/API';
 REST_API:string='http://localhost:3000/API';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor (private httpClient: HttpClient) { }

  // mostrar personas
  GetPersonaa () {
    let API_URL = `${this.REST_API}/people`;
    return this.httpClient.get(API_URL , { headers: this.httpHeaders });

  }


  // Obtener un solo objeto
  GetUnaPersona(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/peopleid/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res[0] || {}
      }),
        catchError(this.handleError)
      )
  }

  // Update
  updatePersona ( data: any): Observable<any> {
    let API_URL = `${this.REST_API}/actpersona`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
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
