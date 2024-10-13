import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup : FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
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
    //this.router.navigate(["/"]);
  }
}
