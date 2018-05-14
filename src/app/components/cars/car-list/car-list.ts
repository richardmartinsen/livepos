import { ICar, Car } from '../../../model/car';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { CarFirebaseService } from '../../../services/car.firebase-service';
import { CarDetailComponent } from '../car-detail/car-detail.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'car-list',
  styleUrls: [ './car-list.scss', './car-item.scss' ],
  templateUrl: './car-list.html'
})

export class CarListComponent implements OnInit {

  @Input() cars: Observable<ICar[]>;

  @Output() remove = new EventEmitter(false);

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private carService: CarFirebaseService,
              private dialog: MdDialog) {

    this.searchForm = this.formBuilder.group({
      search: ['']
    });

  }

  ngOnInit() {

    this.cars = this.carService.cars.switchMap(cars =>
      this.searchForm.controls['search'].valueChanges
        .map(value => this.search(cars, value))
        .startWith(cars));
  }

  private search(cars: Car[], value: string) {
    return cars.filter(car => value ? car.licence.toLowerCase().includes(value.toLowerCase()) : cars);
  }

  public showCreate(): any {
    const dialogRef = this.dialog.open(CarDetailComponent);
    dialogRef.componentInstance.setCar(new Car());  // setCar eller init?
  }

}
