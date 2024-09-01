import { Component, NgModule } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
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
  service: AuthService;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.service = authService;
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
  
  this.service.logUser(this.formLog.get('mail')?.value, this.formLog.get('contra')?.value).subscribe((res: any) => {
    localStorage.setItem('token', res.token);
    window.location.reload();
    this.router.navigate(['/']);
  });


}




}
