import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/product.model';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  productos: Producto[];
  constructor(){
    this.productos = [];
  }
  ngOnInit(): void {
    let prod;
    prod = JSON.parse(localStorage.getItem('productos')!)
    this.productos = prod;
    console.log(this.productos);  
  }

}
