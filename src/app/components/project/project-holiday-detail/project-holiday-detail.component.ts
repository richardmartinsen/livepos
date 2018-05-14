import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

import {StringUtils} from '../../../common/string-utils';
import {DateUtils} from '../../../common/date-utils';

import {AppComponent} from '../../../app.component';
// import {Car} from '../../../model/car';
import {Person, IPerson} from '../../../model/person';
import {IProject, Project} from '../../../model/project';
// import {IUpload} from '../../../model/upload';
// import {ProjectReleaseComponent} from '../project-release/project-release.component';

import {ProjectFirebaseService} from '../../../services/project.firebase-service';
// import {CarFirebaseService} from '../../../services/car.firebase-service';
import {PersonFirebaseService} from '../../../services/person.firebase-service';
// import {UploadService} from '../../../services/file-upload-service';
import {AuthService} from '../../../../auth/services/auth-service';

@Component({
  styleUrls: ['./project-holiday-detail.component.scss'],
  templateUrl: './project-holiday-detail.component.html',
})
export class ProjectHolidayDetailComponent implements OnInit {

  projectForm: FormGroup;
  title: string;
  editMode: boolean;

  // Brukes av datepicker for å sette type
  datePickerType = 'datetime';

  persons: Observable<Person[]>;
  startDate: Date = new Date(Date.now());
  endDate: Date = new Date(Date.now());
  personsStr: any[] = [];
  project: Project;

  public errorMessage = '';

  constructor(private fb: FormBuilder,
              private dialogRef: MdDialogRef<ProjectHolidayDetailComponent>,
              private projectFirebaseService: ProjectFirebaseService,
              private personFirebaseService: PersonFirebaseService,
              public authService: AuthService,
              private dialog: MdDialog,
              private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.dialogRef.updateSize('600', '400');
    this.personsStr.push(this.authService.getEmail());
    this.persons = this.personFirebaseService.persons;
  }

  setProject(project: IProject) {

    if (project) {
      this.project = project;
      this.project.id = project.$key;
      this.title = '--- Endre fravær ---';
      this.editMode = true;
      this.startDate = new Date(this.project.start);
      this.endDate = new Date(this.project.end);
    } else {
      this.project = new Project();
      this.title = '-  Registrere Fravær  -';
      this.editMode = false;
      this.startDate.setHours(7);
      this.startDate.setMinutes(0);
      this.endDate.setHours(15);
      this.endDate.setMinutes(0);
    }

    this.projectForm = this.fb.group({
      project: [ this.project.title , Validators.required ],
    });

  }

  getProject(): IProject {
    this.project.title = "Fri";
    this.project.numberStaff = 1;
    this.project.start = DateUtils.formatLong(this.startDate);
    this.project.end = DateUtils.formatLong(this.endDate);
    this.project.staff = this.personsStr ? this.personsStr : [];
    this.project.released = true;
    this.project.holiday = true;
    return this.project;
  }

  public save(): void {

    this.checkForm();

    if (this.errorMessage !== '') {
      return;
    }


    const project = this.getProject();
    if (project.$key) {
      this.projectFirebaseService.update(project).
      then( () => this.showSnackbarSaveOkMessage(project.address)).
      catch(error => this.errorMessage = error.message);
    } else {
      this.projectFirebaseService.create(project).
      then( () => this.showSnackbarSaveOkMessage(project.address)).
      catch(error => this.errorMessage = error.message);
      this.close();
    }

  }

  private showSnackbarSaveOkMessage(message: string) {
    this.snackBar.open('Lagret \'' + message + '\'', null, {
      duration: AppComponent.SNACK_BAR_TIMEOUT,
    });
  }

  public checkForm(): void {

    this.errorMessage = '';

    if (!this.project) {
      this.errorMessage = AppComponent.NO_DATA_ERR_MSG;
      return;
    }

    if (!moment(this.startDate).isBefore(this.endDate)) {
      this.errorMessage = AppComponent.DATE_RANGE_ERR_MSG;
      return;
    }

    //Måtte lage const av disse for å ikke få undefined...
    const start = this.startDate;
    const end = this.endDate;
    const key = this.project.id;
    const staff = this.personsStr ? this.personsStr : [];
    const personer = this.persons;
    let msg = '';
    this.projectFirebaseService.projects.forEach(function(proj) {
      proj.map(function (p) {
        if (p.$key != key) {
          let ProjectStartInEvent = moment(p.start).isSameOrAfter(start) && moment(p.start).isSameOrBefore(end);
          let ProjectEndInEvent = moment(p.end).isSameOrAfter(start) && moment(p.end).isSameOrBefore(end);
          let ProjectAroundEvent = moment(p.start).isSameOrBefore(start) && moment(p.end).isSameOrAfter(end);
          let DateCheck = ProjectStartInEvent || ProjectEndInEvent || ProjectAroundEvent;

          if (DateCheck) {
            staff.forEach(mail => {
              p.staff.forEach(function (m) {
                if (m === mail) {
                  let pers: Person = null;
                  //Denne bør skrive om. Ikke vits i å sjekke mot alle personer når vi vet at det bare er oss selv på holiday..
                  personer.forEach(function (persons) {
                    pers = persons.filter(function (person) {
                      return person.email === mail;
                    })[0];
                    if ( pers ) {
                      msg += pers.first_name + ' ' + pers.last_name + ' er opptatt i ' + p.title + '\n';
                    }
                  });
                };
              });
            });
          };
        };
      });

    });
    this.errorMessage = msg;
  }

  setStart(date) {
    this.startDate = date;
    this.endDate = date;
  }

  public close(): void {
    this.dialogRef.close();
  }

}

