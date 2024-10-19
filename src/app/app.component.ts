import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './core/navigation/navigation.component';
import { ThemeToggleService } from './core/navigation/theme-toggle/theme-toggle.service';

@Component({
  selector: 'clean-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CleanAngular';
}

//   pages/
//  └── users/
//      └── list/
//          └── [id]/
//               └── details/