import { OverlayContainer } from "@angular/cdk/overlay";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ThemeToggleService {
  isDarkTheme = false;

  constructor(private overlayContainer: OverlayContainer) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.isDarkTheme = savedTheme === 'dark';
    this.toggleTheme(this.isDarkTheme);
  }

  toggleTheme(isDark: boolean) {
    this.isDarkTheme = isDark;

    const bodyClass = document.body.classList;
    const overlayClass = this.overlayContainer.getContainerElement().classList;

    if (isDark) {
      bodyClass.add('dark-theme');
      overlayClass.add('dark-theme');
      bodyClass.remove('light-theme');
      overlayClass.remove('light-theme');
    } else {
      bodyClass.add('light-theme');
      overlayClass.add('light-theme');
      bodyClass.remove('dark-theme');
      overlayClass.remove('dark-theme');
    }

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}