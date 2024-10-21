import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatSnackBarRef } from "@angular/material/snack-bar";

@Component({
    selector: 'clean-notification',
    standalone: true,
    imports: [
        MatButtonModule,
        MatSnackBarLabel,
        MatSnackBarActions,
        MatSnackBarAction
    ],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss'
  })
  export class NotificationRefComponent {
    snackBarRef = inject(MatSnackBarRef);
  }