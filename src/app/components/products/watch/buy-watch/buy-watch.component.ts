import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-buy-watch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buy-watch.component.html',
  styleUrl: './buy-watch.component.css'
})
export class BuyWatchComponent implements OnInit {

  configuracionForm!: FormGroup;

  // Opciones de configuraciones
  storageOptions = ['64GB', '128GB'];
  colorOptions = ['Negro', 'Blanco', 'Azul', 'Rojo'];
  ramOptions = ['4GB', '6GB'];

  // Mapeo de colores a IDs
  colorToIdMap: { [key: string]: number } = {
    'Negro': 5,
    'Blanco': 6,
    'Azul': 7,
    'Rojo': 8
  };

  constructor(private fb: FormBuilder, private router: Router, private service: ProductsService) {
    this.router = inject(Router);
  }

  ngOnInit(): void {
    this.configuracionForm = this.fb.group({
      storage: ['64GB'],  // Valor inicial
      color: ['Negro'],   // Valor inicial
      ram: ['4GB'],       // Valor inicial
      quantity: [1],
      type: [2],
      price: [this.service.calcularPrecio('128GB', '8GB', 400, 1)],
      id: [this.colorToIdMap['Negro']]  // Valor inicial de ID basado en el color
    });

    this.configuracionForm.valueChanges.subscribe((formValues) => {
      const { storage, ram, quantity, color } = formValues;

      // Calcula el precio en base a las configuraciones
      const price = this.service.calcularPrecio(storage, ram, 400, quantity);
      this.configuracionForm.patchValue({ price }, { emitEvent: false });

      // Actualiza el ID en base al color seleccionado
      const newId = this.colorToIdMap[color];
      this.configuracionForm.patchValue({ id: newId }, { emitEvent: false });
    });
  }

  uploadConfig(): void {
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
}
