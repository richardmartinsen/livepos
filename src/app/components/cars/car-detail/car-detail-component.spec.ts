import { TestBed, async } from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MdDialog, MdDialogContainer, MdDialogRef, Overlay, OverlayContainer, OverlayRef, OverlayState,
  ScrollDispatcher
} from '@angular/material';
import {OVERLAY_PROVIDERS, Platform} from '@angular/material';

import {CarFirebaseService} from '../../../services/car.firebase-service';
import {CarDetailComponent} from './car-detail.component';

// PersonFirebaseService mock
export class CarFirebaseServiceMock {
  /* No calls made yet in testing so no methods */
}

describe('CarDetailComponent', () => {

  const carFirebaseServiceMock = new CarFirebaseServiceMock();

  // Mocking a dialogRef for when we open our Md dialog with a button
  const container = new MdDialogContainer(null, null, null, null);
  const overlayRef = new OverlayRef(null, null, new OverlayState(), null, null);
  const mockDialogRef = new MdDialogRef(overlayRef, container );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CarDetailComponent
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA],
      imports : [ FormsModule, ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: CarFirebaseService, useValue: carFirebaseServiceMock },
        { provide: ScrollDispatcher, useClass: ScrollDispatcher },
        { provide: Platform, useClass: Platform },
        { provide: MdDialogRef, useValue: mockDialogRef },
        RouterModule, MdDialog, Overlay, OverlayContainer, OVERLAY_PROVIDERS
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(CarDetailComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

  }));

  it('should show error on save with empty fields', async(() => {
    const fixture = TestBed.createComponent(CarDetailComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

    app.save();

  }));

});
