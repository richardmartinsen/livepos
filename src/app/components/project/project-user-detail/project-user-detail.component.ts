import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

import {StringUtils} from '../../../common/string-utils';
import {DateUtils} from '../../../common/date-utils';

import {AppComponent} from '../../../app.component';
import {Car} from '../../../model/car';
import {Person, IPerson} from '../../../model/person';
import {IProject, Project} from '../../../model/project';
import {IUpload} from '../../../model/upload';
import {ProjectReleaseComponent} from '../project-release/project-release.component';

import {ProjectFirebaseService} from '../../../services/project.firebase-service';
import {CarFirebaseService} from '../../../services/car.firebase-service';
import {PersonFirebaseService} from '../../../services/person.firebase-service';
import {UploadService} from '../../../services/file-upload-service';
import {AuthService} from '../../../../auth/services/auth-service';

@Component({
  styleUrls: ['./project-user-detail.component.scss'],
  templateUrl: './project-user-detail.component.html',
})
export class ProjectUserDetailComponent implements OnInit {

  projectForm: FormGroup;
  title: string;
  editMode: boolean;
  address: string;
  tittel: string;
  start: string;
  end: string;

  // Brukes av datepicker for å sette type
  datePickerType = 'datetime';

  // cars: Observable<Car[]>;
  persons: Observable<Person[]>;
  // startDate: Date = new Date(Date.now());
  // endDate: Date = new Date(Date.now());
  attendanceTime: string;

  personsStr: any;
  carStr: any;

  project: Project;

  uploads: Observable<IUpload[]>;
  showSpinner = true;

  public errorMessage = '';

  constructor(private fb: FormBuilder,
              private dialogRef: MdDialogRef<ProjectUserDetailComponent>,
              private projectFirebaseService: ProjectFirebaseService,
              private carFirebaseService: CarFirebaseService,
              private personFirebaseService: PersonFirebaseService,
              private uploadService: UploadService,
              public authService: AuthService,
              private dialog: MdDialog,
              private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.dialogRef.updateSize('600', '400');
    // this.cars = this.carFirebaseService.cars;
    this.persons = this.personFirebaseService.persons;
    this.persons = this.personFirebaseService.persons;
    this.uploads = this.uploadService.get({limitToLast: 5}, this.project.title);
    this.uploads.subscribe(() => this.showSpinner = false);
  }

  public showRelaseDialog() {
    const dialogRef = this.dialog.open(ProjectReleaseComponent);
    dialogRef.componentInstance.setProject(this.project);
    dialogRef.componentInstance.setPersonToAlert(this.getPersonToAlert(this.project));
  };

  private getPersonToAlert(project: IProject): IPerson {
    let personToAlert: Person = null;
    this.persons.forEach(function (persons) {
      personToAlert = persons.filter(function (person) {
        return person.email === project.staff[0];
      })[0];
    });
    return personToAlert;
  }

  setProject(project: IProject) {

    if (project) {
      this.project = project;
      this.project.id = project.$key;
      this.title = 'Detaljer oppdrag';
      this.editMode = true;
      // this.startDate = new Date(this.project.start);
      // this.endDate = new Date(this.project.end);
    } else {
      this.project = new Project();
      this.title = 'Registrer user nytt oppdrag';
      this.editMode = false;
    }
    this.attendanceTime = this.project.attendanceTime;
    this.personsStr = this.project.staff;
    this.carStr = this.project.car;
    this.address = this.project.address;
    this.tittel = this.project.title;
    this.start = this.project.start;
    this.end= this.project.end;

    this.projectForm = this.fb.group({
      project: [ this.project.title , Validators.required ],
      address: this.project.address,
      numberStaff: this.project.numberStaff,
      attendancePlace: this.project.attendancePlace,
      sign: this.project.sign,
      start: this.project.start,
      end: this.project.end,
      // cars: this.carStr,
      tramCourse: this.project.tramCourse,
      responsible: this.project.responsible,
      customer: this.project.customer,
      description: this.project.description
    });

  }

  getProject(): IProject {
    this.project.title = this.projectForm.value.project;
    this.project.address = this.projectForm.value.address;
    this.project.numberStaff = this.projectForm.value.numberStaff;
    this.project.attendancePlace = this.projectForm.value.attendancePlace;
    // this.project.attendanceTime = DateUtils.formatShort(this.attendanceTime);
    // this.project.start = DateUtils.formatLong(this.startDate);
    // this.project.end = DateUtils.formatLong(this.endDate);
    this.project.sign = this.projectForm.value.sign;
    this.project.tramCourse = this.projectForm.value.tramCourse;
    this.project.responsible = this.projectForm.value.responsible;
    // this.project.car = this.carStr ? this.carStr : [];
    this.project.staff = this.personsStr ? this.personsStr : [];
    this.project.customer = this.projectForm.value.customer;
    this.project.description = this.projectForm.value.description;
    return this.project;
  }

  public save(): void {

    // this.checkForm();

    if (this.errorMessage !== '') {
      return;
    }


    const project = this.getProject();
    if (project.$key) {
      this.projectFirebaseService.update(project).
      then( () => this.showSnackbarSaveOkMessage(project.address)).
      catch(error => this.errorMessage = error.message);
    } else {
      project.holiday = true;
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

  // public checkForm(): void {

  //   this.errorMessage = '';

  //   if (!this.project) {
  //     this.errorMessage = AppComponent.NO_DATA_ERR_MSG;
  //     return;
  //   }

  //   if (StringUtils.isEmptyOrBlank(this.projectForm.value.project)) {
  //     this.errorMessage = AppComponent.INVALID_CUSTOMER_NAME_ERR_MSG;
  //     return;
  //   }

  //   // if (!moment(this.startDate).isBefore(this.endDate)) {
  //   //   this.errorMessage = AppComponent.DATE_RANGE_ERR_MSG;
  //   //   return;
  //   // }

  //   //Måtte lage const av disse for å ikke få undefined...
  //   // const start = this.startDate;
  //   // const end = this.endDate;
  //   const key = this.project.id;
  //   const staff = this.personsStr ? this.personsStr : [];
  //   const personer = this.persons;
  //   let msg = '';
  //   this.projectFirebaseService.projects.forEach(function(proj) {
  //     proj.map(function (p) {
  //       if (p.$key != key) {
  //         let ProjectStartInEvent = moment(p.start).isSameOrAfter(start) && moment(p.start).isSameOrBefore(end);
  //         let ProjectEndInEvent = moment(p.end).isSameOrAfter(start) && moment(p.end).isSameOrBefore(end);
  //         let ProjectAroundEvent = moment(p.start).isSameOrBefore(start) && moment(p.end).isSameOrAfter(end);
  //         let DateCheck = ProjectStartInEvent || ProjectEndInEvent || ProjectAroundEvent;

  //         if (DateCheck) {
  //           staff.forEach(mail => {
  //             p.staff.forEach(function (m) {
  //               if (m === mail) {
  //                 let pers: Person = null;
  //                 personer.forEach(function (persons) {
  //                   pers = persons.filter(function (person) {
  //                     return person.email === mail;
  //                   })[0];
  //                   if ( pers ) {
  //                     msg += pers.first_name + ' ' + pers.last_name + ' er opptatt i ' + p.title + '\n';
  //                   }
  //                 });
  //               };
  //             });
  //           });
  //         };
  //       };
  //     });

  //   });
  //   this.errorMessage = msg;
  // }

  complete() {
    return this.personsStr ? this.personsStr.length >= this.projectForm.value.numberStaff : false;
  }

  // setStart(date) {
  //   this.startDate = date;
  //   this.endDate = date;
  // }

  public close(): void {
    this.dialogRef.close();
  }

}

