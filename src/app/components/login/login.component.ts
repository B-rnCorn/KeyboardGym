import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {ALERTS_CONTENT} from "../../constants/constants";
import {AuthService} from "../../services/auth.service";
import {RoleEnum} from "../../model/data-interfaces";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    showPassword = false;
    isAlertActive = false;
    alertText = '';

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

    constructor(private userService: UserService, private router: Router, private authService: AuthService) {
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
        if (validatorStateInvalid && (this.loginForm.controls[formControlName].touched || this.isSubmitClicked)) {
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
            if (!users.find(user => user.login === this.loginForm.controls['login'].value)) {
                this.isAlertActive = true;
                this.alertText = ALERTS_CONTENT.LOGIN.WRONG_EMAIL_OR_PASSWORD;
            } else if (!users.find(user => user.password === this.loginForm.controls['password'].value)) {
                this.isAlertActive = true;
                this.alertText = ALERTS_CONTENT.LOGIN.WRONG_EMAIL_OR_PASSWORD;
            } else {
                const loggedUser = users.find(user => user.login === this.loginForm.controls['login'].value);
                if (loggedUser) {
                    this.authService.login(loggedUser);
                    loggedUser.role === RoleEnum.USER ? this.router.navigate(['user-exercises']) : this.router.navigate(['admin-exercises']);
                }
            }
        });
    }
}
