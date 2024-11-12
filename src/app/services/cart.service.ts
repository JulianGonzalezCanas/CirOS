import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class CartService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  private BASE_URL = 'http://localhost:3000/pagos';

  constructor(private http: HttpClient) { }

  genPago(paymentData: string): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}`, JSON.parse(paymentData), this.httpOptions);
  }

}
