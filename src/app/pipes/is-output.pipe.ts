import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isOutput'
})
export class IsOutputPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === args) {
      return value;
    }
    return null;
  }

}
