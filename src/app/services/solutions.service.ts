import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, take} from "rxjs";
import {Exercise, Solution} from "../model/data-interfaces";
import {API} from "../constants/api-routes";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Accept':'*/*'})
};

@Injectable({
    providedIn: 'root'
})
export class SolutionsService {

    constructor(private http: HttpClient) {
    }

    fetchSolutions(): Observable<Solution[]> {
        return this.http.get<Solution[]>(API.SOLUTIONS, httpOptions)
    }

    fetchSolutionById(solutionId: number): Observable<Solution> {
        return this.http.get<Solution>(API.SOLUTIONS + '/' + solutionId, httpOptions)
    }

    postSolution(solution: Solution): void {
        this.http.post(API.SOLUTIONS, JSON.stringify(solution), httpOptions).pipe(take(1)).subscribe((res=> console.log(res)));
    }
}
