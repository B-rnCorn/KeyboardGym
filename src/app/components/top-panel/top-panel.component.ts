import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {RoleEnum} from "../../model/data-interfaces";
import {Router} from "@angular/router";

@Component({
    selector: 'app-top-panel',
    templateUrl: './top-panel.component.html',
    styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
    }

    isLoggedIn(): boolean {
        return !!this.authService.loggedUser;
    }

    getBasedOnRoleRoute(): string[] {
        if (this.authService.loggedUser && this.authService.loggedUser.role === RoleEnum.ADMIN) {
            return ['admin-exercises']
        } else {
            return ['user-exercises']
        }
    }

    onLogoutClick() {
        this.authService.logout();
        this.router.navigate(['login']);
    }
}
