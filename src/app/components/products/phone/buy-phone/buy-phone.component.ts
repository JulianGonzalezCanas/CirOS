import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importamos CommonModule en lugar de BrowserModule
import { Router } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-buy-phone',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Usamos CommonModule aquí
  templateUrl: './buy-phone.component.html',
  styleUrls: ['./buy-phone.component.css']
})
export class BuyPhoneComponent implements OnInit {

  configuracionForm!: FormGroup;

  // Opciones de configuraciones
  storageOptions = ['64GB', '128GB', '256GB', '512GB'];
  colorOptions = ['Negro', 'Blanco', 'Azul', 'Rojo'];
  ramOptions = ['4GB', '6GB', '8GB', '12GB'];

  constructor(private fb: FormBuilder, private router: Router, private service: ProductsService) {
    this.router = inject(Router);
   }

  ngOnInit(): void {
    this.configuracionForm = this.fb.group({
      storage: ['64GB'],  // Valor inicial
      color: ['Negro'],   // Valor inicial
      ram: ['4GB'],        // Valor inicial
      quantity: [1],
      type: [1],
      price: [this.service.calcularPrecio('128GB', '8GB', 800, 1)]
    });

    this.configuracionForm.valueChanges.subscribe((formValues) => {
      const { storage, ram, quantity } = formValues;
      const price = this.service.calcularPrecio(storage, ram, 800, quantity);
      this.configuracionForm.patchValue({ price });
    });
  }

  uploadConfig(): void {
    if(localStorage.getItem('productos')){
      let productos = JSON.parse(localStorage.getItem("productos")!);
      productos.push(this.configuracionForm.value)
      localStorage.setItem('productos', JSON.stringify(productos))
    } else {
      let productos = [];
      productos.push(this.configuracionForm.value); 
      localStorage.setItem('productos', JSON.stringify(productos));
    }
    this.router.navigate(['/cart']);
  }
}
