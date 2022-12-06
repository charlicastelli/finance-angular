import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'Entrada':
        return 'arrow_upwards';
      case 'Saída':
        return 'arrow_downward';
    }
    return 'trending_up';
  }
}
