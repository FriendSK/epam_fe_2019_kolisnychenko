import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationConvert'
})
export class DurationConvertPipe implements PipeTransform {

    transform(time: number): string {
        return `${time / 60 < 1 ? '' : `${time / 60 | 0}h`} ${time % 60 === 0 ?  '' : `${time % 60}min`}`
    }
}
