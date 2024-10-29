import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeToggleService } from '@core/services/theme-toggle/theme-toggle.service';

@Component({
  selector: 'clean-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  imports: [
    MatSlideToggleModule
  ]
})
export class ThemeToggleComponent {
  isDarkTheme = false;

  constructor(private themeService: ThemeToggleService) {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleTheme(isDark: boolean) {
    this.isDarkTheme = isDark;
    this.themeService.toggleTheme(isDark);
  }
}