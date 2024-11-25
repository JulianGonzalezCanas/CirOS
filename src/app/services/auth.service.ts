import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnInit{
  token: string = '';
  verified: boolean = false;


  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  private BASE_URL = 'http://172.16.4.249:3000/auth';

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.loggedIn();
  }

  getData(){
    const token = localStorage.getItem('token');
    if(token){
      const data = atob(token.split('.')[1]);
      console.log(data);
      return JSON.parse(data).data;
    } else {
      return null;
    }
  }

  logUser(email: string, contrasenia: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}`, JSON.stringify({email, contrasenia}), this.httpOptions);
  }

  getTruthness(){
    return this.verified;
  }

  loggedIn() {
    if (typeof window !== 'undefined' && window.localStorage) {
      
      const token = localStorage.getItem('token');
      this.http.post(`${this.BASE_URL}/verify`, {token}, this.httpOptions).subscribe({
        next: (res: any) => {
          if(res.message == "Token verified"){
            this.verified = true;
          }
        },
        error: (res) =>{
          this.verified = false;
        }
      });

    }
  }

  logout(){
    localStorage.removeItem('token');
    window.location.reload();
    this.router.navigate(['/']);

  }

}