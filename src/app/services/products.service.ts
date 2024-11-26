import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto, ProductSpecs } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})



export class ProductsService {
  

  private BASE_URL = 'http://localhost:3000/producto'; 

  constructor(private http: HttpClient) { }

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };



  storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];
  ramOptions = ['4GB', '6GB', '8GB', '12GB', '16GB'];

  calcularPrecio(storage: string, ram:string, basePrice:number, cantidad:number): number{
    basePrice += this.storageOptions.indexOf(storage) * 30 + this.ramOptions.indexOf(ram) * 30; 
    return basePrice * cantidad;
  }

  productId(nombre: string, storage: number, color: string, ram: number){
    console.log(nombre, storage, color, ram);
    return this.http.put<any>(`${this.BASE_URL}/idBySpecs`, {nombre: nombre, storage: storage, color: color, ram: ram});
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<any>(`${this.BASE_URL}` + `/${id}`, this.httpOptions);
  }

  
  actualizarStock(id: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/updateStock`, {id: id,  quantity: quantity});
  }
  
}
