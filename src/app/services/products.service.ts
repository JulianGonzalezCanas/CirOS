import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  

  private BASE_URL = 'http://localhost:3000/producto'; 

  constructor(private http: HttpClient) { }



  storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];
  ramOptions = ['4GB', '6GB', '8GB', '12GB', '16GB'];

  calcularPrecio(storage: string, ram:string, basePrice:number, cantidad:number): number{
    basePrice += this.storageOptions.indexOf(storage) * 30 + this.ramOptions.indexOf(ram) * 30; 
    return basePrice * cantidad;
  }


  getProductIdBySpecs(nombre: string, storage: number, color: string, ram: number): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/getProductBySpecs`, {
      nombre:nombre,
      storage: storage,
      color: color,
      ram: ram
    });
  }
  
}
