import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.css']
})
export class ProgressDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { progress: number}) {
  }

  protected readonly Math = Math;
}
