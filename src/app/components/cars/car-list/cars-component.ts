import { Component } from '@angular/core';
import { CarFirebaseService } from '../../../services/car.firebase-service';
import { Title } from '@angular/platform-browser';
import { ICar } from '../../../model/car';
import { ConfirmationDialogComponent } from '../../../common/confirmation-dialog';
import { MdDialog } from '@angular/material';

@Component({
  template: `
    <div class="g-row">
      <div class="g-col">
        <car-list
          [cars]="carService.cars"
          (remove)="remove($event)">
        </car-list>
      </div>
    </div>
  `
})

export class CarsComponent {
  constructor(private title: Title, public carService: CarFirebaseService, public dialog: MdDialog) {
    this.title.setTitle('Biler');
  }

  remove(car: ICar) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.title = 'Sletting av bil';
    dialogRef.componentInstance.message = 'Er du sikker på du vil slette \'' + car.licence + '\'?';
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        return this.carService.remove(car);
      }
    });
  }

}
