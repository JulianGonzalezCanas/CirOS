import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-buy-phone',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buy-phone.component.html',
  styleUrls: ['./buy-phone.component.css']
})
export class BuyPhoneComponent implements OnInit {

  configuracionForm!: FormGroup;

  // Opciones de configuraciones
  storageOptions = ['64GB', '128GB', '256GB', '512GB'];
  colorOptions = ['Negro', 'Blanco', 'Azul', 'Rojo'];
  ramOptions = ['4GB', '6GB', '8GB', '12GB'];

  // Mapeo de colores a IDs
  colorToIdMap: { [key: string]: number } = {
    'Negro': 1,
    'Blanco': 2,
    'Azul': 3,
    'Rojo': 4
  };

  constructor(private fb: FormBuilder, private router: Router, private service: ProductsService) {
    this.router = inject(Router);
  }

  ngOnInit(): void {
    this.configuracionForm = this.fb.group({
      storage: ['64GB'],
      color: ['Negro'],
      ram: ['4GB'],
      quantity: [1],
      type: [1],
      price: [this.service.calcularPrecio('128GB', '8GB', 800, 1)],
      id: [this.colorToIdMap['Negro']]  // Valor inicial de ID basado en el color
    });

    this.configuracionForm.valueChanges.subscribe((formValues) => {
      const { storage, ram, quantity, color } = formValues;

      // Calcula el precio en base a las configuraciones
      const price = this.service.calcularPrecio(storage, ram, 800, quantity);
      this.configuracionForm.patchValue({ price }, { emitEvent: false });

      // Actualiza el ID en base al color seleccionado
      const newId = this.colorToIdMap[color];
      this.configuracionForm.patchValue({ id: newId }, { emitEvent: false });
    });
  }

  uploadConfig(): void {
    if(localStorage.getItem('productos')){
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
