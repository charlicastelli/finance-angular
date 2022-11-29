import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'Entrada': return 'trending_up';
      case 'Saída': return 'trending_down'
    }
    return 'trending_up';
  }

}
