import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
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

    getLabelsForExercises(userId: number): string[] {
        const exerciseIdsWithSolution = this.solutions.filter(solution => (userId === solution.userId)).map(item => item.exerciseId);
        return this.exercises.filter(exercise => exerciseIdsWithSolution.includes(exercise.id)).map(item => item.name);
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
