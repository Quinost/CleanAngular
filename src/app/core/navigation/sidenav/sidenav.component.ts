import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';

type NavItem = {
  name: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'clean-sidenav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  navList: NavItem[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "home"
    },
    {
      name: "Users",
      path: "/users",
      icon: "group"
    },
    {
      name: "Roles",
      path: "/roles",
      icon: "manage_accounts"
    },
    {
      name: "Public key",
      path: "/publicKey",
      icon: "key"
    }
  ];
}
