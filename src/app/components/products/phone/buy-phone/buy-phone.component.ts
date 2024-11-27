import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-buy-phone',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './buy-phone.component.html',
  styleUrls: ['./buy-phone.component.css']
})
export class BuyPhoneComponent implements OnInit {

  configuracionForm!: FormGroup;

  // Opciones de configuraciones
  storageOptions = ['64GB', '128GB', '256GB', '512GB'];
  colorOptions = ['Negro', 'Blanco', 'Azul', 'Rojo'];
  ramOptions = ['4GB', '6GB', '8GB', '12GB'];



  constructor(private fb: FormBuilder, private router: Router, private productService: ProductsService) {
    this.router = inject(Router);
  }

  ngOnInit(): void {
    this.configuracionForm = this.fb.group({
      storage: ['64GB'],
      color: ['Negro'],
      ram: ['4GB'],
      quantity: [1],
      type: [1],
      price: [this.productService.calcularPrecio('128GB', '8GB', 800, 1)],
      id: 0
    });

    this.configuracionForm.valueChanges.subscribe((formValues) => {
      const { storage, ram, quantity, color } = formValues;

      // Calcula el precio en base a las configuraciones
      const price = this.productService.calcularPrecio(storage, ram, 800, quantity);
      this.configuracionForm.patchValue({ price }, { emitEvent: false });

    });
  }

  uploadConfig(): void {
    this.productService.productId("cPhone", this.productService.convertToInteger(this.configuracionForm.get('storage')?.value),  this.configuracionForm.get('color')?.value, this.productService.convertToInteger(this.configuracionForm.get('ram')?.value)).subscribe(newId => {
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
