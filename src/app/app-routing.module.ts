import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {KeyboardComponent} from "./components/keyboard/keyboard.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {AdminExercisesComponent} from "./components/admin-exercises/admin-exercises.component";
import {SettingsLevelComponent} from "./components/settings-level/settings-level.component";
import {CreateExercisesComponent} from "./components/create-exercises/create-exercises.component";
import {UserExercisesComponent} from "./components/user-exercises/user-exercises.component";
import {ResultExercisesComponent} from "./components/result-exercises/result-exercises.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {InfoComponent} from "./components/info/info.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";

const routes: Routes = [
    //TODO: rename
    {path: 'task', component: KeyboardComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'admin-exercises', component: AdminExercisesComponent},
    {path: 'create-exercises', component: CreateExercisesComponent},
    {path: 'settings-level', component: SettingsLevelComponent},
    {path: 'user-exercises', component: UserExercisesComponent},
    {path: 'result-exercises', component: ResultExercisesComponent},
    {path: 'statistics', component: StatisticsComponent},
    {path:'info', component: InfoComponent},
    {path: '', redirectTo:'registration', pathMatch: 'full'}
];

@NgModule({
    imports: [ CommonModule, BrowserModule,RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
