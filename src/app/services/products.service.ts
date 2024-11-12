import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];
  ramOptions = ['4GB', '6GB', '8GB', '12GB', '16GB'];

  calcularPrecio(storage: string, ram:string, basePrice:number, cantidad:number): number{
    basePrice += this.storageOptions.indexOf(storage) * 30 + this.ramOptions.indexOf(ram) * 30; 
    return basePrice * cantidad;
  }
}
