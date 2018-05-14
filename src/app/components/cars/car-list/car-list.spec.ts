import { TestBed, async } from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CarListComponent} from './car-list';
import {MdDialog, Overlay, OverlayContainer, ScrollDispatcher} from '@angular/material';
import {OVERLAY_PROVIDERS, Platform} from '@angular/material';
import {CarFirebaseService} from '../../../services/car.firebase-service';
import {Car, ICar} from '../../../model/car';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

// CarFirebaseService mock
export class CarFirebaseServiceMock implements OnInit {

  carArray: ICar[] = [];

  cars: Observable<ICar[]>;

  ngOnInit(): void {

    for (let i = 0; i < 5; i++) {
      const newCar = new Car();
      newCar.licence = 'BR' + i;
      this.carArray.push(newCar);
    }

    this.cars = new BehaviorSubject(this.carArray);

  }

}

describe('CarListComponent', () => {

  const carFirebaseServiceMock = new CarFirebaseServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CarListComponent
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA],
      imports : [ FormsModule, ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: CarFirebaseService, useValue: carFirebaseServiceMock },
        { provide: ScrollDispatcher, useClass: ScrollDispatcher },
        { provide: Platform, useClass: Platform },
        RouterModule, MdDialog, Overlay, OverlayContainer, OVERLAY_PROVIDERS
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(CarListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should do something', async(() => {
    const fixture = TestBed.createComponent(CarListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

    expect(app.cars).toEqual(this.carArray);

    app.searchForm.controls.search.setValue('bil');
    expect(app.cars).toEqual(this.carArray);

  }));

});
