import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeToggleService } from './theme-toggle.service';

@Component({
  selector: 'app-theme-toggle',
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