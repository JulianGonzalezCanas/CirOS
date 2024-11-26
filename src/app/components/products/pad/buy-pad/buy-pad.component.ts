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

  id :number = 1;
  precio : number = 1.190

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
      price:0, 
      id:  0


    });


    this.configuracionForm.valueChanges.subscribe((formValues) => {
      const { storage, ram, quantity, color } = formValues;

       
      // Calcula el precio en base a las configuraciones
      const price = this.service.calcularPrecio(storage, ram, 1100, quantity);
      this.configuracionForm.patchValue({ price }, { emitEvent: false });

      // Actualiza el ID en base al color seleccionado
      this.service.productId("cPad", this.convertToInteger(storage), color.toLowerCase(), this.convertToInteger(ram)).subscribe(newId => {
        this.configuracionForm.patchValue({ id: newId }, { emitEvent: false });
        this.id = newId;
      });
    
      this.service.getProducto(this.id).subscribe((producto:Producto) => {
         this.precio = producto.price;
         console.log(this.precio);
      });
    
    
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

  convertToInteger(value: string): number {
    if (value.endsWith('GB')) {
      return parseInt(value.replace('GB', ''), 10);  // Eliminar 'GB' y convertir a número
    }
    return 0;  // Si el valor no es válido, retornamos 0 (puedes ajustar esto si es necesario)
    
  }

}
