import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './components/core/services/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDarkTheme!: Observable<boolean>;
  check!: boolean;
  
  
  constructor(
    private themeService: ThemeService,
    ) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    document.body.classList.toggle('dark-theme');

  }

  toggleDarkThemeDark(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    document.body.classList.toggle('dark-theme');
  }

}
