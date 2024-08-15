import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    token: string = '';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  private BASE_URL = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  logUser(email: string, contrasenia: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}`, JSON.stringify({email, contrasenia}), this.httpOptions);
  }
}