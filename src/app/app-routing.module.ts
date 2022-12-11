import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {KeyboardComponent} from "./components/keyboard/keyboard.component";

const routes: Routes = [
    { path: '', component: KeyboardComponent},
    /*{ path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'map', component: MapComponent},
    { path: 'incident', component: CreateIncidentComponent},
    {path: 'view-incident', component: ViewIncidentComponent},
    { path: '**', component: PageNotFoundComponent },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
