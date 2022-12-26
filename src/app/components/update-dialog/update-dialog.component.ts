import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {Exercise} from "../../model/data-interfaces";
import {FormControl, FormGroup} from "@angular/forms";
import {ExerciseService} from "../../services/exercise.service";

@Component({
    selector: 'app-update-dialog',
    templateUrl: './update-dialog.component.html',
    styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

    exercise: Exercise | null = null;

    exerciseForm = new FormGroup({
        name: new FormControl(''),
        time: new FormControl(''),
        text: new FormControl(''),
    });

    constructor(protected dialogRef: NbDialogRef<any>, private exerciseService: ExerciseService) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        if (this.exerciseForm.valid && this.exercise) {
            this.exercise.name = this.exerciseForm.controls['name'].value;
            this.exercise.text = this.exerciseForm.controls['text'].value;
            this.exercise.length = this.exercise.text.length;
            this.exercise.availableTime = this.exerciseForm.controls['time'].value;
            this.exerciseService.updateExercise(this.exercise);
        }
    }

    close() {
        this.dialogRef.close();
    }

    setExercise(exercise:Exercise):void {
        this.exercise = exercise;
        this.exerciseForm.controls['name'].setValue(exercise.name);
        this.exerciseForm.controls['text'].setValue(exercise.text);
        this.exerciseForm.controls['time'].setValue(exercise.availableTime);
    }
}
