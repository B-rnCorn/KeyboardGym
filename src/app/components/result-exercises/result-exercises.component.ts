import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SolutionsService} from "../../services/solutions.service";
import {Solution} from "../../model/data-interfaces";
import {take} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-result-exercises',
    templateUrl: './result-exercises.component.html',
    styleUrls: ['./result-exercises.component.scss']
})
export class ResultExercisesComponent implements OnInit, AfterViewInit {

    @Input()
    isFailed: boolean = false;
    @Input()
    spentTime: number = 0;
    @Input()
    errorsNumber: number = 0;
    @Input()
    tryCount: number = 0;
    @Input()
    averageSpeed: number = 0;
    @Input()
    exerciseId: number | undefined;

    solutions: Solution[] = [];

    constructor(private solutionsService: SolutionsService,
                private authService: AuthService,
                private router: Router) {
        solutionsService.fetchSolutions().pipe(take(1)).subscribe(solutions => {
            this.solutions = solutions;
        })
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        console.log(this.exerciseId);
        if (this.exerciseId)
            this.solutionsService.postSolution({
                id: this.solutions[this.solutions.length - 1].id + 1,
                userId: this.authService.getId(),
                exerciseId: this.exerciseId,
                time: this.spentTime,
                errors: this.errorsNumber,
                averageSpeed: this.averageSpeed,
                isSuccess: !this.isFailed
            });
    }

    onClickOkButton(): void {
        console.log(this.exerciseId);
        if (this.exerciseId != undefined)
            this.solutionsService.postSolution({
                id: this.solutions[this.solutions.length - 1].id + 1,
                userId: this.authService.getId(),
                exerciseId: this.exerciseId,
                time: this.spentTime,
                errors: this.errorsNumber,
                averageSpeed: this.averageSpeed,
                isSuccess: !this.isFailed
            });
        this.router.navigate(['user-exercises']);
    }

    onClickRetry(): void {
        console.log(this.exerciseId);
        if (this.exerciseId != undefined) {
            this.solutionsService.postSolution({
                id: this.solutions[this.solutions.length - 1].id + 1,
                userId: this.authService.getId(),
                exerciseId: this.exerciseId,
                time: this.spentTime,
                errors: this.errorsNumber,
                averageSpeed: this.averageSpeed,
                isSuccess: this.isFailed
            });
            document.location.reload();
        }
    }

}
