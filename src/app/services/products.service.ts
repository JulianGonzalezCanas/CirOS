import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto, ProductSpecs } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})



export class ProductsService {
  

  private BASE_URL = 'http://172.16.4.249:8081/producto'; 

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

  getProducto(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}` + `/${id}`);
  }

  
  actualizarStock(id: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/updateStock`, {id: id,  quantity: quantity});
  }

  convertToInteger(value: string): number {
    if (value.endsWith('GB' )) {
      return parseInt(value.replace('GB', ''), 10);  // Eliminar 'GB' y convertir a número
    }
    if (value.endsWith('TB' )) {
      return parseInt(value.replace('TB', ''), 10) * 1024;  // Eliminar 'GB' y convertir a número
    }
    return 0;  // Si el valor no es válido, retornamos 0 (puedes ajustar esto si es necesario)
    
  }
  
}
