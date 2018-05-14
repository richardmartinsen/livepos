import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {CarDetailComponent} from '../car-detail/car-detail.component';
import {MdDialog} from '@angular/material';
import {Car} from '../../../model/car';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'car-item',
  styleUrls: [ './car-item.scss' ],
  templateUrl: './car-item.html'
})

export class CarItemComponent {

  @Input() car: Car;

  @Output() remove = new EventEmitter(false);

  title = '';

  constructor(private dialog: MdDialog) { }

  public showEdit(car: Car) {
    const dialogRef = this.dialog.open(CarDetailComponent);
    dialogRef.componentInstance.setCar(car);
  }

}
