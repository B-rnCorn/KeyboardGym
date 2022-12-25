import {Component, OnInit} from '@angular/core';
import {ComplexityService} from "../../services/complexity.service";
import {Complexity} from "../../model/data-interfaces";
import {ExerciseService} from "../../services/exercise.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs";
import {ExerciseCreationService} from "../../services/exercise-creation.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-create-exercises',
    templateUrl: './create-exercises.component.html',
    styleUrls: ['./create-exercises.component.scss']
})
export class CreateExercisesComponent implements OnInit {

    isManualGeneration: boolean = true;
    complexity: Complexity[];
    selectedComplexityId: number = 0;
    availableTime: string = '';
    length: string = '';
    name: string = '';
    text: string = '';

    createExerciseForm = new FormGroup({
        /*login: new FormControl('', [Validators.required,
            Validators.pattern('[a-z0-9_-]{3,15}'),
            Validators.minLength(5),
            Validators.maxLength(50)]),
        password: new FormControl('', [Validators.required,
            Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}'),
        ]),*/
        name: new FormControl('',[Validators.required]),
        time: new FormControl('',[Validators.required]),
        length: new FormControl('',[Validators.required]),
        text: new FormControl('',[Validators.required]),
    });

    constructor(private complexityService: ComplexityService,
                private exerciseService: ExerciseService,
                private exerciseCreationService: ExerciseCreationService,
                private router: Router) {
        this.complexity = complexityService.complexity;
    }

    ngOnInit(): void {
    }

    creationTypeChecked(event: boolean) {
        this.isManualGeneration = event;
    }

    onChangeComplexity(event: number) {
        this.selectedComplexityId = event - 1;
    }

    onInputTime(event: any) {
        console.log(event);
        if (event.data) this.availableTime = this.availableTime.concat(event.data);
        else this.availableTime = this.availableTime.slice(0, this.availableTime.length - 1);
    }

    onInputLength(event: any) {
        console.log(event, this.length);
        if (event.data) this.length = this.length.concat(event.data);
        else this.length = this.length.slice(0, this.length.length - 1);
    }

    onInputName(event: any) {
        if (event.data) this.name = this.name.concat(event.data);
        else this.name = this.name.slice(0, this.name.length - 1);
    }

    onInputText(event: any) {
        if (event.data) this.text = this.text.concat(event.data);
        else this.text = this.text.slice(0, this.text.length - 1);
    }

    onSubmit() {
        const currentDate = new Date();
        !this.isManualGeneration && this.createExerciseForm.controls['text'].patchValue(this.exerciseCreationService.generateText(this.complexity[this.selectedComplexityId].zones, Number(this.createExerciseForm.controls['length'].value)));
        this.exerciseService.fetchExercises().pipe(take(1)).subscribe(exercises => {
            console.log(exercises, this.isManualGeneration);
            this.exerciseService.postExercise({
                id: exercises[exercises.length - 1].id + 1,
                name: this.createExerciseForm.controls['name'].value,
                complexity: this.selectedComplexityId,
                availableTime: Number(this.availableTime),
                availableErrors: Math.trunc(this.complexity[this.selectedComplexityId].maxErrors * (Number(this.createExerciseForm.controls['length'].value) / 100)),
                text: this.createExerciseForm.controls['text'].value,
                length: this.isManualGeneration ? this.text.length : Number(this.length),
                creationDate: '' + currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getFullYear(),
            });
            this.router.navigate(['admin-exercises']);
        })
    }
}
