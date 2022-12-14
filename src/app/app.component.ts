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

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.loadTheme();
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    //altera o tema
    document.body.classList.toggle('dark-theme');

    //salva o tema no localStorage
    let data = JSON.stringify(checked);
    localStorage.setItem('theme', data);
    
  }

  loadTheme() {
    let data = localStorage.getItem('theme');
    
    if (data === 'true') {
      let theme = JSON.parse(data!);
      this.toggleDarkTheme(theme);
      this.check = theme;
    }
  }
}
