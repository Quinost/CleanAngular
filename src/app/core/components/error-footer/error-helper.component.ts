import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { ControlContainer, FormControl } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: '[clean-error]',
  template: `
    <ng-container *ngIf="control.hasError('required')">This field is required</ng-container>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule
  ],
})
export class CleanErrorComponent {
  @Input() controlName!: string;

  controlContainer = inject(ControlContainer);

  get control(): FormControl {
    return this.controlContainer.control?.get(this.controlName) as FormControl;
  }

  get isInvalid() {
    return this.control && this.control.invalid;
  }
}