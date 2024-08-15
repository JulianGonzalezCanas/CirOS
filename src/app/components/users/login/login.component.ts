import { Component, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLog: FormGroup;
  service: UserService;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.service = userService;
    this.formLog = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      contra: ['', Validators.required]
    });
    }
    

log(){
  if (this.formLog.valid) {
    // Obtén los valores del formulario
    const { mail, contra } = this.formLog.value;
    console.log(mail, contra);

  }
  else {
      // Muestra errores si el formulario no es válido
      console.log('Formulario inválido');
      this.formLog.markAllAsTouched();
    }

     

  }


}
