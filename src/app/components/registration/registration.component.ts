import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    showPassword = false;
    isSubmitClicked = false;
    isAlertActive = false;

    registrationForm = new FormGroup({
        login: new FormControl('', [Validators.required,
            Validators.pattern('[a-z0-9_-]{3,15}'),
            Validators.minLength(5),
            Validators.maxLength(50)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required,
            Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}'),
        ]),
    });
  constructor() { }

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
        if (validatorStateInvalid && (this.registrationForm.controls[formControlName].touched || this.isSubmitClicked))
        {
            return 'danger';
        } else {
            return 'basic';
        }
    }
    onSubmit(){

    }
}
