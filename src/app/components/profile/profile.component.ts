import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../models/user.model';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './profile.component.html',  // Asegúrate de que la ruta y el nombre del archivo sean correctos
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]  
})
export class PerfilComponent implements OnInit {
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
