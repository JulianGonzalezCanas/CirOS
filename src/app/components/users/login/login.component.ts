import { Component, NgModule } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLog: FormGroup;
  service: AuthService;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.service = authService;
    this.formLog = this.formBuilder.group({
      mail: '',
      contra: ''
    });
  }

log(){
  this.service.logUser(this.formLog.get('mail')?.value, this.formLog.get('contra')?.value).subscribe((res: any) => {
    localStorage.setItem('token', res.token);
    this.router.navigateByUrl('/');
  });
}

}
