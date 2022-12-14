import {Injectable} from "@angular/core";
import {Observable, Subject, take} from "rxjs";
import {Exercise, User} from "../model/data-interfaces";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API} from "../constants/api-routes";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': '*/*'})
};

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {

    constructor(private http: HttpClient) {
    }

    fetchExercises(): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(API.EXERCISES, httpOptions)
    }

    fetchExerciseById(exerciseId: number): Observable<Exercise> {
        return this.http.get<Exercise>(API.EXERCISES + '/' + exerciseId, httpOptions)
    }

    postExercise(exercise: Exercise): void {
        console.log('Exercise', exercise);
        this.http.post(API.EXERCISES, JSON.stringify(exercise), httpOptions).pipe(take(1)).subscribe((res => console.log(res)));
    }

    deleteExercise(exerciseId: number): Observable<any> {
        return this.http.delete(API.EXERCISES + '/' + exerciseId);
    }

    updateExercise(exercise: Exercise): void {
        this.http.patch(API.EXERCISES + '/' + exercise.id, {
            name: exercise.name,
            text: exercise.text,
            availableTime: exercise.availableTime
        }).pipe(take(1)).subscribe((res) => console.log(res));
    }
}
