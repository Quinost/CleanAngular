import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'clean-login-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template: `
  <div class="login-container">
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrl: './login-layout.component.scss'
})
export class LoginLayoutComponent {

}
