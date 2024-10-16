import { Component } from "@angular/core";

@Component({
    selector: 'notfound',
    template:
    `
    <div class="container">
        <h1>404</h1>
    </div>
    `,
    styles: `
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }`,
    standalone: true,
})
export class NotFoundComponent {}