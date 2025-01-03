import { Component, inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CleanErrorComponent } from "@core/components/error-footer/error-helper.component";
import { MatButtonModule } from "@angular/material/button";
import { NotificationService } from "@core/services/notification/notification.service";
import { UsersService } from "@core/services/users/users.service";
import { Router } from "@angular/router";

@Component({
  selector: 'clean-user-new',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CleanErrorComponent
  ],
  templateUrl: '../../pages/user-details.component.html',
  styleUrl: './user-new.component.scss'
})
export class UserNewComponent {
  formGroup: FormGroup;
  
  fb = inject(FormBuilder);
  notificationService = inject(NotificationService);
  usersService = inject(UsersService);
  router = inject(Router);

  constructor() {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roleId: ['f3f533fd-41c4-44f1-a67e-8062e6d207a6']
    });
  }

  onSave(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.usersService.add(this.formGroup.getRawValue());
  }

  onBack(): void {
    this.router.navigate(['/users']);
  }
}
