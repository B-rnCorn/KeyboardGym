import {Injectable} from "@angular/core";
import {ComplexityService} from "./complexity.service";
import {ZONES} from "../constants/constants";

@Injectable({
    providedIn: 'root'
})
export class ExerciseCreationService {

    constructor(private complexityService: ComplexityService) {
    }

    generateText(includedZones: {1: boolean, 2: boolean, 3: boolean, 4: boolean}, length: number): string {
        console.log(includedZones);
        let dictionary: string[] = [];
        const tempText: string[] = [];
        if (includedZones["1"]) dictionary = dictionary.concat(ZONES["1"]);
        if (includedZones["2"]) dictionary = dictionary.concat(ZONES["2"]);
        if (includedZones["3"]) dictionary = dictionary.concat(ZONES["3"]);
        if (includedZones["4"]) dictionary = dictionary.concat(ZONES["4"]);
        console.log(dictionary);
        for (let i = 0; i<=length; i++) {
            tempText.push(dictionary[Math.trunc(Math.random() * (dictionary.length-1))]);
        }
        console.log(tempText);
        return tempText.join('');
    }
}
