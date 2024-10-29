import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { CleanErrorComponent } from "@core/components/error-footer/error-helper.component";
import { NotificationService } from "@core/services/notification/notification.service";
import { RolesService } from "@core/services/roles/roles.service";

@Component({
  selector: 'clean-role-new',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CleanErrorComponent
  ],
  templateUrl: '../../pages/role-details.component.html',
  styleUrl: './role-new.component.scss'
})
export class RoleNewComponent {
  formGroup: FormGroup;
  fb = inject(FormBuilder);
  notificationService = inject(NotificationService);
  rolesService = inject(RolesService);
  router = inject(Router);

  constructor() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  onSave(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.rolesService.add(this.formGroup.getRawValue());
  }

  onBack(): void {
    this.router.navigate(['/roles']);
  }
}
