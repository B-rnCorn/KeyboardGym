import { Component, OnInit } from '@angular/core';
import {LabelType, Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-settings-level',
  templateUrl: './settings-level.component.html',
  styleUrls: ['./settings-level.component.scss']
})
export class SettingsLevelComponent implements OnInit {
    minValueTime: number = 60;
    maxValueTime: number =300;
    minValueTime2: number = 60;
    maxValueTime2: number =300;
    minValueTime3: number = 60;
    maxValueTime3: number =300;
    minLength:number =30;
    maxLength:number=200;
    minLength2:number =30;
    maxLength2:number=200;
    minLength3:number =30;
    maxLength3:number=200;
    timeLevelOne: Options = {
        floor: 60,
        ceil: 300,
        step:5,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return "<b>Минимальное время:</b> " + value;
                case LabelType.High:
                    return "<b>Максимальное время:</b> " + value;
                default:
                    return  value + " секунд ";
            }
        }
    };
    timeLevelTwo: Options = {
        floor: 60,
        ceil: 300,
        step:5,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return "<b>Минимальное время:</b> " + value;
                case LabelType.High:
                    return "<b>Максимальное время:</b> " + value;
                default:
                    return  value + " секунд ";
            }
        }
    };
    timeLevelThree: Options = {
        floor: 60,
        ceil: 300,
        step:5,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return "<b>Минимальное время:</b> " + value;
                case LabelType.High:
                    return "<b>Максимальное время:</b> " + value;
                default:
                    return  value + " секунд ";
            }
        }
    };
    lengthLevelOne: Options = {
        floor: 30,
        ceil: 200,
        step:1,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return "<b>Минимальная длина:</b> " + value;
                case LabelType.High:
                    return "<b>Максимальная длина:</b> " + value;
                default:
                    return  value + " символов ";
            }
        }
    };
    lengthLevelTwo: Options = {
        floor: 30,
        ceil: 200,
        step:1,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return "<b>Минимальная длина:</b> " + value;
                case LabelType.High:
                    return "<b>Максимальная длина:</b> " + value;
                default:
                    return  value + " символов ";
            }
        }
    };
    lengthLevelThree: Options = {
        floor: 30,
        ceil: 200,
        step:1,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return "<b>Минимальная длина:</b> " + value;
                case LabelType.High:
                    return "<b>Максимальная длина:</b> " + value;
                default:
                    return  value + " символов ";
            }
        }
    };
  constructor() { }

  ngOnInit(): void {
  }

}
