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

import {ProjectFirebaseService} from '../../../services/project.firebase-service';
import {ProjectDetailComponent} from './project-detail.component';
import {CarFirebaseService} from '../../../services/car.firebase-service';
import {PersonFirebaseService} from '../../../services/person.firebase-service';
import {AppComponent} from '../../../app.component';
import {Project} from '../../../model/project';

// CarFirebaseService mock
export class CarFirebaseServiceMock {
  /* No calls made yet in testing so no methods */
}

// ProjectFirebaseService mock
export class ProjectFirebaseServiceMock {
  /* No calls made yet in testing so no methods */
}

// PersonFirebaseService mock
export class PersonFirebaseServiceMock {
  /* No calls made yet in testing so no methods */
}

describe('ProjectReleaseComponent', () => {

  const projectFirebaseServiceMock = new ProjectFirebaseServiceMock();
  const carFirebaseServiceMock = new CarFirebaseServiceMock();
  const personFirebaseServiceMock = new PersonFirebaseServiceMock();

  // Mocking a dialogRef for when we open our Md dialog with a button
  const container = new MdDialogContainer(null, null, null, null);
  const overlayRef = new OverlayRef(null, null, new OverlayState(), null, null);
  const mockDialogRef = new MdDialogRef(overlayRef, container );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectDetailComponent
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA],
      imports : [ FormsModule, ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: ProjectFirebaseService, useValue: projectFirebaseServiceMock },
        { provide: CarFirebaseService, useValue: carFirebaseServiceMock },
        { provide: PersonFirebaseService, useValue: personFirebaseServiceMock },
        { provide: ScrollDispatcher, useClass: ScrollDispatcher },
        { provide: Platform, useClass: Platform },
        { provide: MdDialogRef, useValue: mockDialogRef },
        RouterModule, MdDialog, Overlay, OverlayContainer, OVERLAY_PROVIDERS
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(ProjectDetailComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should show error on save with empty project', async(() => {
    const fixture = TestBed.createComponent(ProjectDetailComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

    app.setProject(new Project());
    app.save();

    expect(app.errorMessage).toEqual(AppComponent.INVALID_CUSTOMER_NAME_ERR_MSG);

  }));

});
