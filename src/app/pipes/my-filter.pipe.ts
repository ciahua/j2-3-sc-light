
import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter'
})
@Injectable()
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        return items.filter(item => item.isOutput === args);
    }
}
