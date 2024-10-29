import { Component, Inject, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatSnackBarRef, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

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
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
  }