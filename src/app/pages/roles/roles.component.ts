import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'clean-roles',
    template: `<router-outlet></router-outlet>`,
    standalone: true,
    imports: [
        RouterModule
    ]
})
export class RolesComponent {}