import { Component, computed, inject, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { AuthService } from "@core/auth/auth.service";

@Component({
  selector: 'clean-rsa-public-key',
  standalone: true,
  imports:[
    MatCardModule,
  ],
  template: `
      <mat-card class="dashboard-card">
        <mat-card-header>
          <mat-card-title>
            Public key
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          {{publicKey}}
        </mat-card-content>
      </mat-card>
    `,
    styles: `\
      :host {
        display: flex;
        justify-content: center;
      }
      mat-card {
        width:570px;
      }
      mat-card-content {
        white-space: pre-wrap;
      }
      mat-card-header {
        align-self: center;
      }
    `
})
export class RsaPublicKeyComponent implements OnInit {
  private authService = inject(AuthService);

  publicKey: string = '';

  ngOnInit(): void {
    this.authService.getPublicKey().subscribe({
      next: (value) => this.publicKey = value
    })
  }
}