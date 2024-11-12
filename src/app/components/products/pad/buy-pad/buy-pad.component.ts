import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-buy-pad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buy-pad.component.html',
  styleUrl: './buy-pad.component.css'
})
export class BuyPadComponent implements OnInit {
  configuracionForm!: FormGroup;

  // Opciones de configuraciones
  storageOptions = ['128GB', '256GB', '512GB', '1TB'];
  colorOptions = ['Negro', 'Blanco', 'Azul', 'Rojo'];
  ramOptions = ['8GB', '16GB'];

  // Mapeo de colores a IDs
  colorToIdMap: { [key: string]: number } = {
    'Negro': 9,
    'Blanco': 10,
    'Azul': 11,
    'Rojo': 12
  };

  constructor(private fb: FormBuilder, private router: Router, private service: ProductsService) {
    this.router = inject(Router);
  }

  ngOnInit(): void {
    this.configuracionForm = this.fb.group({
      storage: ['128GB'],  // Valor inicial
      color: ['Negro'],    // Valor inicial
      ram: ['8GB'],        // Valor inicial
      quantity: [1],
      type: [3],
      price: [this.service.calcularPrecio('128GB', '8GB', 1100, 1)],
      id: [this.colorToIdMap['Negro']]  // Valor inicial de ID basado en el color
    });

    this.configuracionForm.valueChanges.subscribe((formValues) => {
      const { storage, ram, quantity, color } = formValues;

      // Calcula el precio en base a las configuraciones
      const price = this.service.calcularPrecio(storage, ram, 1100, quantity);
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
