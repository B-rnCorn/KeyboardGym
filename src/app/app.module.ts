import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule, NbCheckboxModule, NbDialogModule, NbDialogService,
    NbFormFieldModule,
    NbIconModule, NbInputModule,
    NbLayoutModule, NbOptionModule, NbSelectModule, NbTabsetModule,
    NbThemeModule
} from "@nebular/theme";
import {KeyboardComponent} from "./components/keyboard/keyboard.component";
import {AppRoutingModule} from "./app-routing.module";
import {TopPanelComponent} from './components/top-panel/top-panel.component';
import {LoginComponent} from './components/login/login.component';
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {ReactiveFormsModule} from "@angular/forms";
import {RegistrationComponent} from './components/registration/registration.component';
import {AdminExercisesComponent} from './components/admin-exercises/admin-exercises.component';
import {SettingsLevelComponent} from './components/settings-level/settings-level.component';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {CreateExercisesComponent} from './components/create-exercises/create-exercises.component';
import {UserExercisesComponent} from './components/user-exercises/user-exercises.component';
import {ResultExercisesComponent} from './components/result-exercises/result-exercises.component';
import {TimerPipe} from "./pipes/timer.pipe";
import {ExerciseValidationService} from "./services/excercise-validation.service";
import {UserService} from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {CommonModule} from "@angular/common";
import {InfoComponent} from './components/info/info.component';
import {ComplexityService} from "./services/complexity.service";
import {ExerciseService} from "./services/exercise.service";
import {ExerciseCreationService} from "./services/exercise-creation.service";
import {StatisticsComponent} from './components/statistics/statistics.component';
import {StatisticsService} from "./services/statistics.service";
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';

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
        ResultExercisesComponent,
        TimerPipe,
        InfoComponent,
        StatisticsComponent,
        UpdateDialogComponent,
    ],
    imports: [
        AppRoutingModule,
        HttpClientModule,
        BrowserModule,
        CommonModule,
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
        NbSelectModule,
        NbDialogModule.forRoot(),
        NbTabsetModule,


    ],
    providers: [
        ExerciseValidationService,
        UserService,
        ComplexityService,
        ExerciseService,
        ExerciseCreationService,
        AuthService,
        StatisticsService,
        NbDialogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
