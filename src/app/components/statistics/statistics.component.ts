import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Chart, ChartDataset, registerables} from "chart.js";
import {StatisticsService} from "../../services/statistics.service";
import {AuthService} from "../../services/auth.service";
import {RoleEnum} from "../../model/data-interfaces";
import {STATISTIC_TYPES} from "../../constants/constants";

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, AfterViewInit {

    private statsType: STATISTIC_TYPES = STATISTIC_TYPES.USERS;
    private chart: Chart | null = null;

    constructor(private statisticsService: StatisticsService,
                private authService: AuthService) {
        statisticsService.fetchData();
    }

    ngOnInit(): void {
    }

    onTabChange(event: any) {
        if (event.tabTitle === 'Статистика по упражнениям') {
            this.statsType = STATISTIC_TYPES.EXERCISES;
            this.statisticsService.fetchData();
        } else {
            this.statsType = STATISTIC_TYPES.USERS;
            this.statisticsService.fetchData();
        }
    }

    isAdmin(): boolean {
        return this.authService.getRoleId() === RoleEnum.ADMIN;
    }

    ngAfterViewInit(): void {
        Chart.register(...registerables);
        this.statisticsService.isFetching.subscribe(value => {
            if (!value) {
                const statsChart = document.getElementById('statsChart');
                console.log(this.statisticsService.getLabelsForExercises(this.authService.getId()));
                console.log([this.statisticsService.getAverageSpeedForExercise(this.authService.getId()),
                    this.statisticsService.getErrorsForExercise(this.authService.getId())])
                if (statsChart) {
                    if (this.chart) this.chart.destroy();
                    // @ts-ignore
                    this.chart = new Chart(document.getElementById('statsChart'), {
                        type: 'bar',
                        data: {
                            labels: this.getLabels(),
                            datasets: this.getDatasets(),
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
        });
    }

    getLabels(): string[] {
        if (!this.isAdmin()) {
            return this.statisticsService.getLabelsForExercises(this.authService.getId())
        } else {
            if (this.statsType === STATISTIC_TYPES.USERS) {
                return this.statisticsService.getLabelsForUsersAdmin();
            } else {
                return this.statisticsService.getLabelsForExercisesAdmin();
            }
        }
    }

    getDatasets(): ChartDataset[] {
        if (!this.isAdmin()) {
            return [this.statisticsService.getAverageSpeedForExercise(this.authService.getId()),
                this.statisticsService.getErrorsForExercise(this.authService.getId())]
        } else {
            if (this.statsType === STATISTIC_TYPES.USERS) {
                return [this.statisticsService.getAverageSpeedForUsersAdmin(), this.statisticsService.getErrorsForUsersAdmin()]
            } else {
                return [this.statisticsService.getAverageSpeedForExercisesAdmin(),
                    this.statisticsService.getErrorsForExercisesAdmin()]
            }
        }
    }
}
