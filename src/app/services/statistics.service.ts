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
import {AuthService} from "./auth.service";

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
                private exerciseService: ExerciseService,
                private authService: AuthService) {
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
        this.isFetching.next(true);
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

    getLabelsForExercisesAdmin(): string[] {
        return this.exercises.map(exercise => exercise.name);
    }

    getAverageSpeedForExercisesAdmin(): ChartDataset {
        return {
            label: 'Средняя скорость',
            data: this.exercises.map(exercise => {
                let averageSpeed = 0;
                this.solutions.forEach(solution => {
                    if (exercise.id === solution.exerciseId) {
                        averageSpeed = (averageSpeed + solution.averageSpeed) / 2;
                    }
                })
                return averageSpeed;
            }),
            borderWidth: 1,
        };
    }

    getErrorsForExercisesAdmin(): ChartDataset {
        return {
            label: 'Ошибки',
            data: this.exercises.map(exercise => {
                let errors = 0;
                this.solutions.forEach(solution => {
                    if (exercise.id === solution.exerciseId) {
                        errors = (errors + solution.errors) / 2;
                    }
                })
                return errors;
            }),
            borderWidth: 1,
        };
    }

    getLabelsForUsersAdmin(): string[] {
        return this.users.filter(user => user.id !== this.authService.getId()).map(user => user.login);
    }

    getAverageSpeedForUsersAdmin() {
        return {
            label: 'Средняя скорость',
            data: this.users.map(user => {
                let averageSpeed = 0;
                this.solutions.forEach(solution => {
                    if (user.id === solution.userId && user.id !== this.authService.getId()) {
                        averageSpeed = (averageSpeed + solution.averageSpeed) / 2;
                    }
                })
                return averageSpeed;
            }),
            borderWidth: 1,
        };
    }

    getErrorsForUsersAdmin() {
        return {
            label: 'Ошибки',
            data: this.users.map(user => {
                let errors = 0;
                this.solutions.forEach(solution => {
                    if (user.id === solution.userId && user.id !== this.authService.getId()) {
                        errors = (errors + solution.errors) / 2;
                    }
                })
                return errors;
            }),
            borderWidth: 1,
        };
    }
}
