import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'Pagamento':
        return 'arrow_upwards';
      // case 'Moradia':
      //   return 'arrow_downward';
    }
    return 'arrow_downward';
  }
}
