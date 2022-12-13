import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'timer'})
export class TimerPipe implements PipeTransform {
    transform(value: number): string {
        let minutes = (value - value % 60) / 60;
        return '' + minutes + ':' + (value - minutes * 60);
    }
}
