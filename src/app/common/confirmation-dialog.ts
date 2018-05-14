import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialogComponent {

  title: string;
  message: string;

  constructor(public dialogRef: MdDialogRef<ConfirmationDialogComponent>) {
  }

}
