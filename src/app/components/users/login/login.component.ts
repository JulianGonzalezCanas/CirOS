import { Component, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLog: FormGroup;
  service: UserService;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.service = userService;
    this.formLog = this.formBuilder.group({
      mail: '',
      contra: ''
    });
  }

log(){
  
}

}
