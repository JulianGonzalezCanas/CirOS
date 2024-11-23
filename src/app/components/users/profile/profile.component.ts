import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IUser } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule]  
})
export class PerfilComponent implements OnInit {
  
  modificar = false;
  formulario: FormGroup;
  StockForm!: FormGroup;
  usuario: IUser;
  router: Router;
  isAdmin: boolean = false;
  agregarStockVisible: boolean = false;  // Nueva variable para controlar la visibilidad del formulario de agregar stock

  // Opciones de configuraciones
  nombreOptions = ['cPhone', 'cWatch', 'cPad'];
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



  constructor(private userService: UserService, private authService: AuthService, private fb: FormBuilder,private productService: ProductsService ) {
    this.router = inject(Router);
    this.usuario = {} as IUser;

    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasenia: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required)
    });

    this.StockForm = this.fb.group({
      nombre: ['cPhone'],
      storage: ['64GB'],
      color: ['Negro'],
      ram: ['4GB'],
      quantity: [1],
      type: [1],
    });
  }

  ngOnInit(): void {
    const id = this.authService.getData();
    this.userService.getOneUsuario(id).subscribe((usuario: IUser) => {
      this.usuario = usuario;
      if(this.usuario.isSuperUser){
        this.isAdmin = true;
      }
    });

    this.formulario = new FormGroup({
      nombre: new FormControl(this.usuario.nombre, Validators.required),
      apellido: new FormControl(this.usuario.apellido, Validators.required),
      email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
      contrasenia: new FormControl(this.usuario.contrasenia, Validators.required),
      direccion: new FormControl(this.usuario.direccion, Validators.required)
    });
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }

  eliminarPerfil(): void {
    this.userService.deleteUsuario(this.usuario.idUsuario).subscribe(() => {
      console.log('Perfil eliminado con éxito');
    });
    this.authService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }

  toggleModificarPerfil() {
    this.modificar = !this.modificar;
  }

  

  cancelar(): void {
    this.modificar = false;
  }

  guardar(): void {
    if (this.formulario) {
      const usuarioActualizado: IUser = {
        idUsuario: this.usuario.idUsuario,
        nombre: this.formulario.get('nombre')?.value,
        apellido: this.formulario.get('apellido')?.value,
        email: this.formulario.get('email')?.value,
        contrasenia: this.formulario.get('contrasenia')?.value,
        direccion: this.formulario.get('direccion')?.value,
        isSuperUser: this.usuario.isSuperUser
      };
      this.userService.updateUsuario(usuarioActualizado).subscribe(() => {
        console.log('Perfil actualizado con éxito');
        this.modificar = false;
      });
    }
  }


  convertToInteger(value: string): number {
    if (value.endsWith('GB')) {
      return parseInt(value.replace('GB', ''), 10);  // Eliminar 'GB' y convertir a número
    }
    return 0;  // Si el valor no es válido, retornamos 0 (puedes ajustar esto si es necesario)
  }

  enviarFormulario() {
    console.log("ENTRE");
  
    // Obtener los valores del formulario
    const { nombre, storage, color, ram, quantity } = this.StockForm.value;
  
    // Convertir los valores de 'storage' y 'ram' a enteros
    const storageInt = this.convertToInteger(storage);  // Convierte '64GB' -> 64
    const ramInt = this.convertToInteger(ram);  // Convierte '4GB' -> 4
  
    // Llamar al servicio para obtener el ID del producto, pasando los valores convertidos
    this.productService.getProductIdBySpecs(nombre, storageInt, color.toLowerCase(), ramInt).subscribe(
      response => {
        console.log('ID del producto:', response.idProducto);
        // Aquí puedes manejar el ID del producto obtenido, como asignarlo a una variable
      },
      error => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }
  

  // Método que alterna la visibilidad del formulario
  mostrarFormularioAgregarStock(): void {
    this.agregarStockVisible = !this.agregarStockVisible;
  }
  
}
