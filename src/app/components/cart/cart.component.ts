import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  productos: Producto[];
  constructor(private cartService: CartService, private router: Router, private authService: AuthService) {
    this.productos = [];
  }

  generarPago(){

    const id = this.authService.getData();
    this.cartService.genPago(JSON.stringify({ items: this.productos, id: id })).subscribe({
    next: (res: any) => {
      window.location.href = res.url;
    },
    error: (res) =>{
      console.log(res);
    }});
  }

  ngOnInit(): void {
    let prod;
    prod = JSON.parse(localStorage.getItem('productos')!)
    this.productos = prod;
    console.log(this.productos);  
  }

  getImageAlt(type: number): string {
    switch (type) {
      case 1:
        return 'Imagen de producto tipo 1'; // Cambiar el alt según el tipo
      case 2:
        return 'Imagen de producto tipo 2';
        case 3:
        return 'Imagen de producto tipo 3';
      default:
        return 'Imagen del producto';
    }
  }
 
  // Función para obtener el src de la imagen según el tipo
  getImageSrc(type: number): string {
    switch (type) {
      case 1:
        return 'https://mac-center.com/cdn/shop/files/IMG-14858921_432431a4-87f0-4924-9f21-037dfe197fde.jpg?v=1726245792&width=823'; // Ruta de la imagen para el tipo 1
      case 2:
        return 'https://www.imagineonline.store/cdn/shop/files/Apple_Watch_Series_9_LTE_45mm_Starlight_Aluminium_Starlight_Sport_Band_PDP_Image_Position-1__en-IN.jpg?v=1698865470&width=823'; // Ruta de la imagen para el tipo 2
      case 3:
        return 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-finish-select-gallery-202211-purple-wifi_FMT_WHH?wid=640&hei=360&fmt=jpeg&qlt=95&.v=1670631639153';
      default:
        return 'assets/default.jpg'; // Ruta de imagen por defecto
    }
  }


}

