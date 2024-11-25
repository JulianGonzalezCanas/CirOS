import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  private BASE_URL = 'http://172.16.4.249:8081/usuario';

  constructor(private http: HttpClient) { }

  getOneUsuario(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}` + `/${id}`, this.httpOptions);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`, this.httpOptions);
  }

  addUsuario(usuario: IUser): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}`, JSON.stringify(usuario), this.httpOptions);
  }

  updateUsuario(usuario: IUser): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${usuario.idUsuario}`, JSON.stringify(usuario), this.httpOptions);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }
}