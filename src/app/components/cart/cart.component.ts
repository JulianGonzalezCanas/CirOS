import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
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

    localStorage.removeItem('productos');
    
  }

  ngOnInit(): void {
    let prod;
    prod = JSON.parse(localStorage.getItem('productos')!)
    this.productos = prod;
    console.log(this.productos);  
  }

  getProductName(type: number): string {
    switch (type) {
      case 1:
        return 'cPhone';
      case 2:
        return 'cWatch';
      case 3:
        return 'cPad';
      default:
        return 'Unknown Product';
    }
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
        return 'https://preview.redd.it/iphone-16-pro-max-white-or-natural-v0-bk1fy3a2wazd1.jpg?width=640&crop=smart&auto=webp&s=eacc1ccd68681579e2278a02d3d1f1e3ad1b02ea'; // Ruta de la imagen para el tipo 1
      case 2:
        return 'https://www.hola.com/horizon/landscape/097a726e4b77-apple-watch-t.jpg?im=Resize=(640),type=downsize'; // Ruta de la imagen para el tipo 2
      case 3:
        return 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-11inch-purple-wificell_FMT_WHH?wid=640&hei=360&fmt=jpeg&qlt=95&.v=1713820065337';
      default:
        return 'assets/default.jpg'; // Ruta de imagen por defecto
    }
  }

  borrar(id:number){
    let productos = JSON.parse(localStorage.getItem('productos')!);
    productos = productos.filter((producto:Producto) => producto.id != id);
    localStorage.removeItem('productos');
    localStorage.setItem('productos', JSON.stringify(productos));
    this.ngOnInit();
  }


}
