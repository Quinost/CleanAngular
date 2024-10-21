import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { CleanErrorComponent } from '../../components/error-footer/error-helper.component';

@Component({
  selector: 'clean-login',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CleanErrorComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup : FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor(){
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onDefaultClick(): void {
    this.formGroup.patchValue({
      username: 'DefaultUser',
      password: 'securePass'
    })
  }

  onLoginClick(): void {
    this.authService.login(this.formGroup.value.username, this.formGroup.value.password);
  }
}
