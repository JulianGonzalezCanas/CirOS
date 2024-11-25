import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import userModel from '../../../models/user.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  formReg: FormGroup;
  service: UserService
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.service = userService;
    this.formReg = this.formBuilder.group({
      nombre: '',
      apellido: '',
      mail: '',
      contra: '',
      direccion: '',
    });
  }

reg(){
  let existe = false; 
  
  this.service.getUsuarios().subscribe((data: any) => {
    data.users.forEach((user: any) => {
      if(user.email == this.formReg.get('mail')?.value){
        existe = true;
      }
    });
    
    if(!existe){
      this.service.addUsuario(userModel.newUser(0, this.formReg.get('nombre')?.value, this.formReg.get('apellido')?.value, this.formReg.get('mail')?.value, this.formReg.get('contra')?.value, this.formReg.get('direccion')?.value, true)).subscribe((data: any) => {
        this.router.navigateByUrl('/login');
      });  
    } else {
      alert('El email ya existe');
    }
  });
}
  
}
