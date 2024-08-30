import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { SigninComponent } from './components/users/signin/signin.component';
import { AuthGuard } from './services/auth.guard';
import { PerfilComponent } from './components/users/profile/profile.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: SigninComponent},
    {path:'profile', component: PerfilComponent},
    
    {
        path:"",
        canActivate: [AuthGuard],
        children: [
            {path:'profile', component: PerfilComponent},
        ],
    },
];
