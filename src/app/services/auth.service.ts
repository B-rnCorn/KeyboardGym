import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {User} from "../model/data-interfaces";
import {USER_KEYS} from "../constants/constants";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    getLoggedUser(): User | null {
        const id = this.getId();
        const login = this.getLogin();
        const email = this.getEmail();
        const password = this.getPassword();
        const roleId = this.getRoleId();
        if (id>=0 && !!login && !!email && !!password && roleId>=0) {
            return {
                email: email,
                id: id,
                login: login,
                password: password,
                role: roleId,
            }
        }
        return null;
    }

    login(user: User) {
        this.setId(user.id);
        this.setLogin(user.login);
        this.setEmail(user.email);
        this.setPassword(user.password);
        this.setRoleId(user.role);
    }

    logout() {
        window.sessionStorage.clear();
    }

    getId(): number {
        return Number(window.sessionStorage.getItem(USER_KEYS.ID));
    }

    setId(id: number): void {
        window.sessionStorage.removeItem(USER_KEYS.ID);
        window.sessionStorage.setItem(USER_KEYS.ID, id.toString());
    }

    getLogin(): string | null {
        return window.sessionStorage.getItem(USER_KEYS.LOGIN);
    }

    setLogin(login: string): void {
        window.sessionStorage.removeItem(USER_KEYS.LOGIN);
        window.sessionStorage.setItem(USER_KEYS.LOGIN, login);
    }

    getPassword(): string | null {
        return window.sessionStorage.getItem(USER_KEYS.PASSWORD);
    }

    setPassword(password: string): void {
        window.sessionStorage.removeItem(USER_KEYS.PASSWORD);
        window.sessionStorage.setItem(USER_KEYS.PASSWORD, password)
    }

    getEmail(): string | null {
        return window.sessionStorage.getItem(USER_KEYS.EMAIL);
    }

    setEmail(email: string): void {
        window.sessionStorage.removeItem(USER_KEYS.EMAIL);
        window.sessionStorage.setItem(USER_KEYS.EMAIL, email);
    }

    getRoleId(): number {
        return Number(window.sessionStorage.getItem(USER_KEYS.ROLE_ID));
    }

    setRoleId(roleId: number): void {
        window.sessionStorage.removeItem(USER_KEYS.ROLE_ID);
        window.sessionStorage.setItem(USER_KEYS.ROLE_ID, roleId.toString());
    }

}
