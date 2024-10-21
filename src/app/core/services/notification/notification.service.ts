import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { NotificationRefComponent } from "@core/components/notification/notification.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private matSnackBar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration: number = 5000;

  success(text: string): void {
    this.matSnackBar.openFromComponent(NotificationRefComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration,
    });
  }
}
