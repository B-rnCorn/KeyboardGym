import {Component, OnInit} from '@angular/core';
import {ExerciseService} from "../../services/exercise.service";
import {Exercise} from "../../model/data-interfaces";
import {take} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-exercises',
    templateUrl: './user-exercises.component.html',
    styleUrls: ['./user-exercises.component.scss']
})
export class UserExercisesComponent implements OnInit {

    isShowText = false
    selectedItem = '1'
    buttonText = 'Показать текст'
    exercises: Array<Exercise & { toggled: boolean, buttonText: string }> = [];
    showedExercises: Array<Exercise & { toggled: boolean, buttonText: string }> = [];

    constructor(private exerciseService: ExerciseService, private  router: Router) {
    }

    ngOnInit(): void {
        this.exerciseService.fetchExercises().pipe(take(1)).subscribe(exercises => {
            this.exercises = exercises.map(exercise => {
                return {...exercise, ...{toggled: false, buttonText: 'Показать текст'}};
            });
        });
    }

    showText(exerciseId: number) {
        this.exercises = this.exercises.map(exercise => {
            if (exerciseId === exercise.id) {
                exercise.toggled = !exercise.toggled;
                if (exercise.toggled) {
                    exercise.buttonText = 'Скрыть текст';
                } else {
                    exercise.buttonText = 'Показать текст';
                }
            }
            return exercise;
        });
    }

    navigateToExercise(exerciseId: number) {
        this.router.navigate(['task', {id: exerciseId}]);
    }
}
