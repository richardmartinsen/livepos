import { TestBed, async } from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdDialog, Overlay, OverlayContainer, ScrollDispatcher} from '@angular/material';
import {OVERLAY_PROVIDERS, Platform} from '@angular/material';
import {ProjectFirebaseService} from '../../../services/project.firebase-service';
import {ProjectUserListComponent} from './project-user-list';
import {AuthService} from 'auth/services/auth-service';

// CarFirebaseService mock
export class ProjectFirebaseServiceMock {

  /* No calls made yet in testing so no methods */

}

export class AuthServiceMock {

  /* No calls made yet in testing so no methods */

}

describe('ProjectUserListComponent', () => {

  const projectFirebaseServiceMock = new ProjectFirebaseServiceMock();
  const authServiceMock = new AuthServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectUserListComponent
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA],
      imports : [ FormsModule, ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: ProjectFirebaseService, useValue: projectFirebaseServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ScrollDispatcher, useClass: ScrollDispatcher },
        { provide: Platform, useClass: Platform },
        RouterModule, MdDialog, Overlay, OverlayContainer, OVERLAY_PROVIDERS
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(ProjectUserListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
