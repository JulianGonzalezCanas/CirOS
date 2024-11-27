import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { Producto } from '../../../../models/product.model';

@Component({
  selector: 'app-buy-pad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './buy-pad.component.html',
  styleUrl: './buy-pad.component.css'
})
export class BuyPadComponent implements OnInit {

  precio : number = 1190

  configuracionForm!: FormGroup;

  // Opciones de configuraciones
  storageOptions = ['128GB', '256GB', '512GB', '1TB'];
  colorOptions = ['Negro', 'Blanco', 'Azul', 'Rojo'];
  ramOptions = ['8GB', '16GB'];


  constructor(private fb: FormBuilder, private router: Router, private productService: ProductsService) {
    this.router = inject(Router);
  }

  ngOnInit(): void {

    this.configuracionForm = this.fb.group({
      storage: ['128GB'],  // Valor inicial
      color: ['Negro'],    // Valor inicial
      ram: ['8GB'],        // Valor inicial
      quantity: [1],
      type: [3],
      price: this.precio,
      id:  0
    });

    this.configuracionForm.valueChanges.subscribe((formValues) => {

      const { storage, ram, color } = formValues;

      this.productService.productId("cPad", this.productService.convertToInteger(storage), color, this.productService.convertToInteger(ram)).subscribe(newId => {
        let id  = newId.id;
    
        this.productService.getProducto(id).subscribe((producto:Producto) => {
          this.configuracionForm.patchValue({ price: producto.precio }, { emitEvent: false });
        });
      });     

    });
  }

  uploadConfig(): void {
    this.productService.productId("cPad", this.productService.convertToInteger(this.configuracionForm.get('storage')?.value),  this.configuracionForm.get('color')?.value, this.productService.convertToInteger(this.configuracionForm.get('ram')?.value)).subscribe(newId => {
      this.configuracionForm.patchValue({ id: newId.id }, { emitEvent: false });
      this.productService.getProducto(newId.id).subscribe((producto) => {
        if(producto.stock == 0){
          alert("No hay stock disponible para este producto");
        } else {
          if (localStorage.getItem('productos')) {
            let productos = JSON.parse(localStorage.getItem("productos")!);
            productos.push(this.configuracionForm.value);
            localStorage.setItem('productos', JSON.stringify(productos));
          } else {
            let productos = [];
            productos.push(this.configuracionForm.value); 
            localStorage.setItem('productos', JSON.stringify(productos));
          }
          this.router.navigate(['/cart']);
        }
      });
    
    });

  }



}
