import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeConvert'
})
export class TimeConvertPipe implements PipeTransform {

    transform(time: number): string {
        return `${time / 60 | 0}h ${time % 60}min`
    }
}