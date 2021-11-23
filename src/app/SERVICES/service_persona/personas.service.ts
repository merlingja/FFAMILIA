import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Servicepeople {

  // Node/Express API
  //REST_API: string = 'http://localhost:3000/API';
  REST_API:string='http://localhost:3000/API';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor (private httpClient: HttpClient) { }

  // mostrar personas
  GetPersona () {
    let API_URL = `${this.REST_API}/people`;
    return this.httpClient.get(API_URL , { headers: this.httpHeaders });

  }

}
