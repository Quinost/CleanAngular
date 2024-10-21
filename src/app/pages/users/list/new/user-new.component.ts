import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { CleanErrorComponent } from "@core/components/error-footer/error-helper.component";
import { MatButtonModule } from "@angular/material/button";
import { NotificationService } from "@core/services/notification/notification.service";

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

  constructor(private fb: FormBuilder, private router: Router, private notificationService: NotificationService) {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
    });
  }

  onSave(): void {
    if(this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
    }
    this.notificationService.success("dupa");
  }
}
