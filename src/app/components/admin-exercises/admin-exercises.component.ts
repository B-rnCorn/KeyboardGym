import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../model/data-interfaces";
import {take} from "rxjs";
import {ExerciseService} from "../../services/exercise.service";

@Component({
    selector: 'app-admin-exercises',
    templateUrl: './admin-exercises.component.html',
    styleUrls: ['./admin-exercises.component.scss']
})
export class AdminExercisesComponent implements OnInit {
    exercises: Array<Exercise & { toggled: boolean, buttonText: string, hovered: boolean }> = [];

    constructor(private exerciseService: ExerciseService) {
    }

    ngOnInit(): void {
        this.exerciseService.fetchExercises().pipe(take(1)).subscribe(exercises => {
            this.exercises = exercises.map(exercise => {
                return {...exercise, ...{toggled: false, buttonText: 'Показать текст', hovered: false}};
            });
        });
    }

    showDeleteButton(exerciseId: number, isMouseEnter: boolean) {
        this.exercises = this.exercises.map(exercise => {
            return exercise.id === exerciseId ?
                {...exercise, ...{toggled: false, buttonText: 'Показать текст', hovered: isMouseEnter} }:
                {...exercise, ...{toggled: false, buttonText: 'Показать текст', hovered: false} };
        });
    }

    deleteExercise(exerciseId: number) {
        console.log('DELETE');
        this.exerciseService.deleteExercise(exerciseId).pipe(take(1)).subscribe(() => {
            this.exerciseService.fetchExercises().pipe(take(1)).subscribe(exercises => {
                this.exercises = exercises.map(exercise => {
                    return {...exercise, ...{toggled: false, buttonText: 'Показать текст', hovered: false}};
                });
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
        //this.router.navigate(['task', {id: exerciseId}]);
    }
}
