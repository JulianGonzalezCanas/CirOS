import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';




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
  usuario: IUser;
  router: Router;

  constructor(private userService: UserService, private authService: AuthService) {
    this.router = inject(Router);
    this.usuario = {} as IUser;

    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasenia: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

    const id = this.authService.getData();
    this.userService.getOneUsuario(id).subscribe((usuario: IUser) => {
      this.usuario = usuario;
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
        direccion: this.formulario.get('direccion')?.value,
        isSuperUser: this.usuario.isSuperUser
      };
      this.userService.updateUsuario(usuarioActualizado).subscribe(() => {
        console.log('Perfil actualizado con éxito');
        this.modificar = false;
      });
    }
  }
}
