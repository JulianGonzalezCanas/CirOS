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
      price: this.precio,
      id:  0


    });


    this.configuracionForm.valueChanges.subscribe((formValues) => {

      const { storage, ram, quantity, color } = formValues;

       
      // Calcula el precio en base a las configuraciones
     /* const price = this.service.calcularPrecio(storage, ram, 1100, quantity);
      this.configuracionForm.patchValue({ price }, { emitEvent: false });
      */

      // Actualiza el ID en base al color seleccionado
      this.service.productId("cPad", this.convertToInteger(storage), color, this.convertToInteger(ram)).subscribe(newId => {
        this.configuracionForm.patchValue({ id: newId }, { emitEvent: false });
        let id  = newId.id;
    
        this.service.getProducto(id).subscribe((producto:Producto) => {
          this.configuracionForm.patchValue({ price: producto.precio }, { emitEvent: false });
        });

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
    if (value.endsWith('GB' )) {
      return parseInt(value.replace('GB', ''), 10);  // Eliminar 'GB' y convertir a número
    }
    if (value.endsWith('TB' )) {
      return parseInt(value.replace('TB', ''), 10);  // Eliminar 'GB' y convertir a número
    }
    return 0;  // Si el valor no es válido, retornamos 0 (puedes ajustar esto si es necesario)
    
  }

}
