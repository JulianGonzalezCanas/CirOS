import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSpecs } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})



export class ProductsService {
  

  private BASE_URL = 'http://172.16.4.249:8081/producto'; 

  constructor(private http: HttpClient) { }



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

  
  actualizarStock(id: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/updateStock`, {id: id,  quantity: quantity});
  }
  
}
