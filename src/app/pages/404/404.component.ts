import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterModule } from "@angular/router";

@Component({
    selector: 'notfound',
    template:
    `
    <div class="container">
        <h1>404</h1>

        <button mat-raised-button routerLink="/dashboard">
            <mat-icon>keyboard_return</mat-icon>
            Back
        </button>
    </div>
    `,
    styles: `
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
        h1 {
            font-size: 20vh;
        }
    }`,
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        RouterModule
    ]
})
export class NotFoundComponent {}