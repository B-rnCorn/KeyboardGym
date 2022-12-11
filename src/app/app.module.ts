import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NbButtonModule, NbLayoutModule, NbThemeModule} from "@nebular/theme";
import {KeyboardComponent} from "./components/keyboard/keyboard.component";
import {AppRoutingModule} from "./app-routing.module";
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        KeyboardComponent,
        TopPanelComponent,
        LoginComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        NbThemeModule.forRoot({name: 'corporate'}),
        NbLayoutModule,
        NbButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
