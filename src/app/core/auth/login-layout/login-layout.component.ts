import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleService } from '../../services/theme-toggle/theme-toggle.service';

@Component({
  selector: 'clean-login-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav-content>
        <div class="login-container">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: './login-layout.component.scss'
})
export class LoginLayoutComponent {
  constructor(private themeService: ThemeToggleService) {}
}
