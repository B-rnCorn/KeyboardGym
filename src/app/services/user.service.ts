import {Injectable} from "@angular/core";
import {Observable, Subject, take} from "rxjs";
import {User} from "../model/data-interfaces";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API} from "../constants/api-routes";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Accept':'*/*'})
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    fetchUsers(): Observable<User[]> {
        return this.http.get<User[]>(API.USERS, httpOptions)
    }

    fetchUserById(userId: number): Observable<User> {
        return this.http.get<User>(API.USERS + '/' + userId, httpOptions)
    }

    postUser(user: User): void {
        this.http.post(API.USERS, JSON.stringify(user), httpOptions).pipe(take(1)).subscribe((res=> console.log(res)));
    }
}
