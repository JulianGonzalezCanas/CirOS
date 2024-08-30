import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-perfil',
  templateUrl: './profile.component.html',  
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]  
})
export class PerfilComponent implements OnInit {
  //Lo que deberiamos hacer es obtener un usuario solo
  // mediante los datos del payload, asi ademas de asegurarnos 
  // de que el usuario es quien dice ser, evitamos que se pueda
  // modificar el id del usuario y acceder a otro perfil
  



  
  usuario = {
    idUsuario: 1,
    nombre: "Jorge",
    apellido: "Cañas",
    email: "sadsasdadsa@gmail.com",
    contrasenia: "wasasa",
    direccion: "masdwas 234"
  };
  modificar = false;
  formulario: FormGroup;

  constructor(private userService: UserService) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasenia: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    // Inicializa el formulario con los datos del usuario
    this.formulario = new FormGroup({
      nombre: new FormControl(this.usuario.nombre, Validators.required),
      apellido: new FormControl(this.usuario.apellido, Validators.required),
      email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
      contrasenia: new FormControl(this.usuario.contrasenia, Validators.required),
      direccion: new FormControl(this.usuario.direccion, Validators.required)
    });
  }

  eliminarPerfil(): void {
    this.userService.deleteUsuario(this.usuario.idUsuario).subscribe(() => {
      console.log('Perfil eliminado con éxito');
    });
  }

  modificarPerfil(): void {
    this.modificar = true;
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
        direccion: this.formulario.get('direccion')?.value
      };
      this.userService.updateUsuario(usuarioActualizado).subscribe(() => {
        console.log('Perfil actualizado con éxito');
        this.modificar = false;
      });
    }
  }
}
