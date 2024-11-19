import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(public authService: AuthService, private route : Router){
    this.authService.loggedIn();
  }

  ngOnInit(): void {
    this.authService.loggedIn();
  }

  login() {
    this.route.navigate(["/login"]);
  }
}
