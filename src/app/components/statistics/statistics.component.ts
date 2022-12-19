import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartItem, registerables} from "chart.js";
import {SolutionsService} from "../../services/solutions.service";
import {StatisticsService} from "../../services/statistics.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, AfterViewInit {


    constructor(private statisticsService: StatisticsService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        const statsChart = document.getElementById('statsChart');
        console.log(this.statisticsService.getLabelsForExercises(this.authService.getId()));
        console.log([this.statisticsService.getAverageSpeedForExercise(this.authService.getId()),
            this.statisticsService.getErrorsForExercise(this.authService.getId())])
        Chart.register(...registerables);
        if (statsChart)
        { // @ts-ignore
            new Chart(document.getElementById('statsChart'), {
                        type: 'bar',
                        data: {
                            labels: this.statisticsService.getLabelsForExercises(this.authService.getId()),
                            datasets: [this.statisticsService.getAverageSpeedForExercise(this.authService.getId()),
                                this.statisticsService.getErrorsForExercise(this.authService.getId())]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
        }
    }

}
