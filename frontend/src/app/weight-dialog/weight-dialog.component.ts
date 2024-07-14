import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { Weight } from '../models/weight.model';

@Component({
  selector: 'app-weight-dialog',
  templateUrl: './weight-dialog.component.html',
  styleUrl: './weight-dialog.component.css'
})
export class WeightDialogComponent {
  constructor(@Inject(DIALOG_DATA) public data: Weight) {}
}
