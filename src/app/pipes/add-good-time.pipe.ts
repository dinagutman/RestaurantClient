import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addGoodTime'
})
export class AddGoodTimePipe implements PipeTransform {

  transform(value: any, prefix: string = 'Good'): unknown {
    return `${prefix}  ${value} `;
  }
}
