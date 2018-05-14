import { TestBed, async } from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdDialog, Overlay, OverlayContainer, ScrollDispatcher} from '@angular/material';
import {OVERLAY_PROVIDERS, Platform} from '@angular/material';
import {PersonListComponent} from 'app/components/persons/person-list/person-list';
import {PersonFirebaseService} from '../../../services/person.firebase-service';

// CarFirebaseService mock
export class PersonFirebaseServiceMock {

  /* No calls made yet in testing so no methods */

}

describe('PersonListComponent', () => {

  const personFirebaseServiceMock = new PersonFirebaseServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonListComponent
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA],
      imports : [ FormsModule, ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: PersonFirebaseService, useValue: personFirebaseServiceMock },
        { provide: ScrollDispatcher, useClass: ScrollDispatcher },
        { provide: Platform, useClass: Platform },
        RouterModule, MdDialog, Overlay, OverlayContainer, OVERLAY_PROVIDERS
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(PersonListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
