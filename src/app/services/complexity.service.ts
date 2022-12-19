import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Complexity} from "../model/data-interfaces";

@Injectable({
    providedIn: 'root'
})
export class ComplexityService {
    get complexity(): Complexity[] {
        return this._complexity;
    }

    set complexity(value: Complexity[]) {
        this._complexity = value;
    }

    private _complexity: Complexity[] = [
        {
            id: 0,
            minTime: 60,
            maxTime: 300,
            minLength: 30,
            maxLength: 200,
            maxErrors: 5,
            zones: {
                1: true,
                2: false,
                3: false,
                4: false,
            }
        },
        {
            id: 1,
            minTime: 60,
            maxTime: 300,
            minLength: 30,
            maxLength: 200,
            maxErrors: 5,
            zones: {
                1: true,
                2: true,
                3: false,
                4: false,
            }
        },
        {
            id: 2,
            minTime: 60,
            maxTime: 300,
            minLength: 30,
            maxLength: 200,
            maxErrors: 5,
            zones: {
                1: true,
                2: true,
                3: true,
                4: true,
            }
        }
    ]

    constructor() {
    }
}
