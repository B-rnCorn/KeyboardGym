import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {take} from "rxjs";
import {ALERTS_CONTENT} from "../../constants/constants";
import {RoleEnum} from "../../model/data-interfaces";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    showPassword = false;
    isSubmitClicked = false;
    isAlertActive = false;
    alertText = '';

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

    constructor(private userService: UserService, private router: Router) {
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
        if (validatorStateInvalid && (this.registrationForm.controls[formControlName].touched || this.isSubmitClicked)) {
            return 'danger';
        } else {
            return 'basic';
        }
    }
    onCloseAlert() {
        this.isAlertActive = false;
    }

    onSubmit() {
        this.isAlertActive = false;
        this.alertText = '';
        this.userService.fetchUsers().pipe(take(1)).subscribe(users => {
            if (users.find(user => user.login === this.registrationForm.controls['login'].value)) {
                this.isAlertActive = true;
                this.alertText = this.alertText + ALERTS_CONTENT.REGISTRATION.LOGIN_UNIQUE;
            } else if (users.find(user => user.email === this.registrationForm.controls['email'].value)) {
                this.isAlertActive = true;
                this.alertText = this.alertText + ALERTS_CONTENT.REGISTRATION.EMAIL_UNIQUE;
            } else {
                this.userService.postUser({
                    id: (users[users.length - 1].id + 1) ?? 0,
                    email: this.registrationForm.controls['email'].value,
                    login: this.registrationForm.controls['login'].value,
                    password: this.registrationForm.controls['password'].value,
                    role: RoleEnum.USER,
                });
                this.router.navigate(['login']);
            }
        });
    }
}
