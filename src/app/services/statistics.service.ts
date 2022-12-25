import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    BehaviorSubject,
    combineLatestAll,
    combineLatestWith,
    forkJoin,
    map,
    Observable,
    pipe,
    Subject,
    take
} from "rxjs";
import {Exercise, Solution, User} from "../model/data-interfaces";
import {API} from "../constants/api-routes";
import {SolutionsService} from "./solutions.service";
import {UserService} from "./user.service";
import {ExerciseService} from "./exercise.service";
import {ChartDataset} from "../constants/types";

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {

    solutions: Solution[] = [];
    users: User[] = [];
    exercises: Exercise[] = [];
    isFetching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(private solutionsService: SolutionsService,
                private userService: UserService,
                private exerciseService: ExerciseService) {
        solutionsService.fetchSolutions().pipe(take(1)).subscribe(solutions => {
            this.solutions = solutions;
        });
        userService.fetchUsers().pipe(take(1)).subscribe(users => {
            this.users = users;
        })
        exerciseService.fetchExercises().pipe(take(1)).subscribe(exercises => {
            this.exercises = exercises;
        })
    }

    fetchData() {
        forkJoin(
            [this.solutionsService.fetchSolutions(), this.userService.fetchUsers(), this.exerciseService.fetchExercises()]).pipe(take(1)).subscribe((observer) => {
            this.solutions = observer[0];
            this.users = observer[1];
            this.exercises = observer[2];
            this.isFetching.next(false);
        })
    }

    getLabelsForExercises(userId: number): string[] {
        const exerciseIdsWithSolution = this.solutions.filter(solution => (userId === solution.userId)).map(item => item.exerciseId);
        console.log('exerciseIdsWithSolution', exerciseIdsWithSolution, this.solutions);
        return this.solutions.filter(solution => exerciseIdsWithSolution.includes(solution.exerciseId)).map(item => {
            return this.exercises.find(exercise => exercise.id === item.exerciseId && item.userId === userId)?.name ?? ''
        }).filter(item => item !== undefined && item !== '');
    }

    getAverageSpeedForExercise(userId: number): ChartDataset {
        return {
            label: 'Средняя скорость',
            data: this.solutions.filter(solution => (userId === solution.userId)).map(item => item.averageSpeed),
            borderWidth: 1,
        };
    }

    getErrorsForExercise(userId: number): ChartDataset {
        return {
            label: 'Ошибки',
            data: this.solutions.filter(solution => (userId === solution.userId)).map(item => item.errors),
            borderWidth: 1,
        };
    }


}
