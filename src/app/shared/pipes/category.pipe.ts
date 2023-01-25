import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'Pagamento':
        return 'arrow_upwards';
    }
    return 'arrow_downward';
  }
}
