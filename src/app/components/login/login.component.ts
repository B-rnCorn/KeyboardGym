import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    showPassword = false;

    loginForm = new FormGroup({
        login: new FormControl('', [Validators.required,
            Validators.pattern('[a-z0-9_-]{3,15}'),
            Validators.minLength(5),
            Validators.maxLength(50)]),
        password: new FormControl('', [Validators.required,
            Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}'),
        ]),
    });
   isSubmitClicked = false;
    constructor() {
    }

    ngOnInit(): void {
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }
    getInputType() {
        if (this.showPassword) {
            return 'text';
        }
        return 'password';
    }
    changeInputStatus(formControlName: string, validatorStateInvalid: boolean): string {
        if (validatorStateInvalid && (this.loginForm.controls[formControlName].touched || this.isSubmitClicked))
        {
            return 'danger';
        } else {
            return 'basic';
        }
    }
    onSubmit(){

    }
}
