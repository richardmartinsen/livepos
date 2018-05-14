import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule, MdButtonModule, MdSnackBarModule} from '@angular/material';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Md2Module} from 'md2';

import {environment} from '../environments/environment';
import {routes} from './app.routes';
import 'hammerjs';

import {AppComponent} from './app.component';
import {AboutComponent} from './components/about/about.component';
import {PosRegComponent} from './components/pos/pos-reg.component';
import {CarListComponent} from './components/cars/car-list/car-list';
import {CarItemComponent} from './components/cars/car-list/car-item';
import {CarDetailComponent} from './components/cars/car-detail/car-detail.component';
import {PersonFirebaseService} from './services/person.firebase-service';
import {ProjectFirebaseService} from './services/project.firebase-service';
import {PosFirebaseService} from './services/pos.firebase-service';
import {CarFirebaseService} from './services/car.firebase-service';
import {FileService} from '../test/service/file.service';
import {ProjectsComponent} from './components/project/projects-component';
import {ProjectDetailComponent} from './components/project/project-detail/project-detail.component';
import {ProjectUserDetailComponent} from './components/project/project-user-detail/project-user-detail.component';
import {ProjectHolidayDetailComponent} from './components/project/project-holiday-detail/project-holiday-detail.component';
import {ProjectAdminListComponent} from './components/project/project-admin-list/project-admin-list';
import {ProjectAdminItemComponent} from './components/project/project-admin-list/project-admin-item';
import {ProjectUserListComponent} from './components/project/project-user-list/project-user-list';
import {ProjectUserItemComponent} from './components/project/project-user-list/project-user-item';
import {PersonDetailComponent} from './components/persons/person-detail/person-detail.component';
import {PersonItemComponent} from './components/persons/person-list/person-item';
import {PersonListComponent} from './components/persons/person-list/person-list';
import {PersonsComponent} from './components/persons/person-list/persons-component';
import {CarsComponent} from './components/cars/car-list/cars-component';
import {SignInComponent} from '../auth/components/sign-in.component';
import {AuthGuard} from '../auth/guards/auth-guard';
import {UnauthGuard} from '../auth/guards/unauth-guard';
import {AuthService} from '../auth/services/auth-service';
import {PersonSmsEmailService} from './services/person-sms-email-service';
import {UploadDetailComponent} from 'app/components/uploads/upload-detail/upload-detail.component';
import {UploadsListComponent} from './components/uploads/uploads-list/uploads-list.component';
import {UploadFormComponent} from './components/uploads/upload-form/upload-form.component';
import {ProjectReleaseComponent} from './components/project/project-release/project-release.component';
import {ConfirmationDialogComponent} from './common/confirmation-dialog';
import {ProjectAdminCalendarComponent} from './components/project/project-admin-calendar/project-admin-calendar';
import {UploadService} from './services/file-upload-service';
import {CalendarModule, CheckboxModule, ScheduleModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {ProjectUserCalendarComponent} from './components/project/project-user-calendar/project-user-calendar';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    PosRegComponent,
    CarsComponent,
    CarListComponent,
    CarDetailComponent,
    CarItemComponent,
    ConfirmationDialogComponent,
    PersonsComponent,
    PersonDetailComponent,
    PersonListComponent,
    PersonItemComponent,
    ProjectAdminItemComponent,
    ProjectAdminListComponent,
    ProjectUserItemComponent,
    ProjectUserListComponent,
    ProjectDetailComponent,
    ProjectUserDetailComponent,
    ProjectHolidayDetailComponent,
    ProjectReleaseComponent,
    ProjectsComponent,
    ProjectAdminCalendarComponent,
    ProjectUserCalendarComponent,
    SignInComponent,
    UploadFormComponent,
    UploadsListComponent,
    UploadDetailComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    FormsModule,
    MaterialModule,
    Md2Module,
    MdButtonModule,
    MdSnackBarModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ScheduleModule
  ],
  providers: [
    AngularFireDatabase,
    AngularFireAuth,
    AuthService,
    AuthGuard,
    PosFirebaseService,
    CarFirebaseService,
    FileService,
    PersonSmsEmailService,
    PersonFirebaseService,
    ProjectFirebaseService,
    UnauthGuard,
    UploadService
  ],
  entryComponents: [
    ProjectDetailComponent,
    ProjectUserDetailComponent,
    ProjectHolidayDetailComponent,
    PersonDetailComponent,
    ProjectReleaseComponent,
    CarDetailComponent,
    PosRegComponent,
    ConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
