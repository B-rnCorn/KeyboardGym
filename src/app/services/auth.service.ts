import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {User} from "../model/data-interfaces";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    get loggedUser(): User | null {
        return this._loggedUser;
    }

    private _loggedUser: User | null = null;

    login(user: User) {
        this._loggedUser = user;
    }

    logout() {
        this._loggedUser = null;
    }
}
