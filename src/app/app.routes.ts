import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { SigninComponent } from './components/users/signin/signin.component';
import { AuthGuard } from './services/auth.guard';
import { PerfilComponent } from './components/users/profile/profile.component';
import { CPhoneComponent } from './components/products/phone/c-phone/c-phone.component';
import { CartComponent } from './components/cart/cart.component';
import { BuyPhoneComponent } from './components/products/phone/buy-phone/buy-phone.component';
import { BuyWatchComponent } from './components/products/watch/buy-watch/buy-watch.component';
import { CWatchComponent } from './components/products/watch/c-watch/c-watch.component';
import { CPadComponent } from './components/products/pad/c-pad/c-pad.component';
import { BuyPadComponent } from './components/products/pad/buy-pad/buy-pad.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: SigninComponent},
    {path:'cPhone', component: CPhoneComponent},
    {path:'cWatch', component:CWatchComponent},
    {path:'cPad', component:CPadComponent},
    
    {
        path:'',
        canActivate: [AuthGuard],
        children: [
            {path:'profile', component: PerfilComponent},
            {path:'cart', component:CartComponent},
            {path:'buyPhone', component:BuyPhoneComponent},
            {path:'buyWatch', component:BuyWatchComponent},
            {path:'buyPad', component:BuyPadComponent}
        ],
    },

];
