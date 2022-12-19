import {Component, OnInit} from '@angular/core';
import {LabelType, Options} from "@angular-slider/ngx-slider";
import {ComplexityService} from "../../services/complexity.service";
import {Complexity} from "../../model/data-interfaces";

@Component({
    selector: 'app-settings-level',
    templateUrl: './settings-level.component.html',
    styleUrls: ['./settings-level.component.scss']
})
export class SettingsLevelComponent implements OnInit {
    complexity: Complexity[] = [];
    minValueTime: number = 60;
    maxValueTime: number = 300;
    minValueTime2: number = 60;
    maxValueTime2: number = 300;
    minValueTime3: number = 60;
    maxValueTime3: number = 300;
    minLength: number = 30;
    maxLength: number = 200;
    minLength2: number = 30;
    maxLength2: number = 200;
    minLength3: number = 30;
    maxLength3: number = 200;
    timeLevelOne: Options;
    timeLevelTwo: Options;
    timeLevelThree: Options;
    lengthLevelOne: Options;
    lengthLevelTwo: Options;
    lengthLevelThree: Options;

    constructor(private complexityService: ComplexityService) {
        this.complexity = this.complexityService.complexity;
        this.timeLevelOne = {
            floor: this.complexity[0].minTime,
            ceil: this.complexity[0].maxTime,
            step: 5,
            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Low:
                        return "<b>Минимальное время:</b> " + value;
                    case LabelType.High:
                        return "<b>Максимальное время:</b> " + value;
                    default:
                        return value + " секунд ";
                }
            }
        };
        this.timeLevelTwo = {
            floor: this.complexity[1].minTime,
            ceil: this.complexity[1].maxTime,
            step: 5,
            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Low:
                        return "<b>Минимальное время:</b> " + value;
                    case LabelType.High:
                        return "<b>Максимальное время:</b> " + value;
                    default:
                        return value + " секунд ";
                }
            }
        };
        this.timeLevelThree = {
            floor: this.complexity[2].minTime,
            ceil: this.complexity[2].maxTime,
            step: 5,
            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Low:
                        return "<b>Минимальное время:</b> " + value;
                    case LabelType.High:
                        return "<b>Максимальное время:</b> " + value;
                    default:
                        return value + " секунд ";
                }
            }
        };
        this.lengthLevelOne = {
            floor: this.complexity[0].minLength,
            ceil: this.complexity[0].maxLength,
            step: 1,
            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Low:
                        return "<b>Минимальная длина:</b> " + value;
                    case LabelType.High:
                        return "<b>Максимальная длина:</b> " + value;
                    default:
                        return value + " символов ";
                }
            }
        };
        this.lengthLevelTwo = {
            floor: this.complexity[1].minLength,
            ceil: this.complexity[1].maxLength,
            step: 1,
            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Low:
                        return "<b>Минимальная длина:</b> " + value;
                    case LabelType.High:
                        return "<b>Максимальная длина:</b> " + value;
                    default:
                        return value + " символов ";
                }
            }
        };
        this.lengthLevelThree = {
            floor: this.complexity[2].minLength,
            ceil: this.complexity[2].maxLength,
            step: 1,
            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Low:
                        return "<b>Минимальная длина:</b> " + value;
                    case LabelType.High:
                        return "<b>Максимальная длина:</b> " + value;
                    default:
                        return value + " символов ";
                }
            }
        };
    }

    ngOnInit(): void {
    }

    onZoneCheckboxCLick(level: number, zoneNum: "1" | "2" | "3" | "4", event: boolean) {
        this.complexity[level].zones[zoneNum] = event;
    }

    onSaveData() {
        this.complexityService.complexity = this.complexity;
    }

}
