import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idNumber'
})
export class IdNumberPipe implements PipeTransform {

  transform(value: any) {
    return value.length > 5 ? value.slice(0, 5) + 'XXXXXXX' : value;
  }

}
