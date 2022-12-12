import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule, NbCheckboxModule,
    NbFormFieldModule,
    NbIconModule, NbInputModule,
    NbLayoutModule, NbOptionModule, NbSelectModule,
    NbThemeModule
} from "@nebular/theme";
import {KeyboardComponent} from "./components/keyboard/keyboard.component";
import {AppRoutingModule} from "./app-routing.module";
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { LoginComponent } from './components/login/login.component';
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {ReactiveFormsModule} from "@angular/forms";
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminExercisesComponent } from './components/admin-exercises/admin-exercises.component';
import { SettingsLevelComponent } from './components/settings-level/settings-level.component';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import { CreateExercisesComponent } from './components/create-exercises/create-exercises.component';
import { UserExercisesComponent } from './components/user-exercises/user-exercises.component';
import { ResultExercisesComponent } from './components/result-exercises/result-exercises.component';

@NgModule({
    declarations: [
        AppComponent,
        KeyboardComponent,
        TopPanelComponent,
        LoginComponent,
        RegistrationComponent,
        AdminExercisesComponent,
        SettingsLevelComponent,
        CreateExercisesComponent,
        UserExercisesComponent,
        ResultExercisesComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        NbThemeModule.forRoot({name: 'corporate'}),
        NbLayoutModule,
        NbButtonModule,
        NbCardModule,
        NbFormFieldModule,
        NbIconModule,
        NbInputModule,
        NbEvaIconsModule,
        ReactiveFormsModule,
        NbAlertModule,
        NgxSliderModule,
        NbCheckboxModule,
        NbOptionModule,
        NbSelectModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
