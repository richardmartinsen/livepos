import {Observable} from 'rxjs/Observable';
import {MdDialogRef} from '@angular/material';

import {IPerson, Person} from '../../../model/person';
import {Component, OnInit} from '@angular/core';
import {IProject} from '../../../model/project';

import {PersonSmsEmailService} from '../../../services/person-sms-email-service';

import {UploadService} from '../../../services/file-upload-service';
import {IUpload} from '../../../model/upload';
import {DateUtils} from '../../../common/date-utils';
import {ProjectFirebaseService} from '../../../services/project.firebase-service';

@Component({
  selector: 'app-dialog-project-release-dialog',
  templateUrl: './project-release.component.html',
})
export class ProjectReleaseComponent implements OnInit {

  persons: Observable<Person[]>;
  smsAlert: boolean;
  emailAlert: boolean;
  project: IProject;
  uploads: Observable<IUpload[]>;
  showSpinner = true;
  personToAlert: Person;
  errorMessage: String;

  constructor(private dialogRef: MdDialogRef<ProjectReleaseComponent>,
              private personSmsEmailService: PersonSmsEmailService,
              private projectFirebaseService: ProjectFirebaseService,
              private uploadService: UploadService) {
  }

  ngOnInit() {
    this.dialogRef.updateSize('600', '400');
    this.uploads = this.uploadService.get({limitToLast: 5}, this.project.title);
    this.uploads.subscribe(() => this.showSpinner = false);
  }

  setProject(project: IProject) {
    this.project = project;
  }

  setPersonToAlert(personToAlert: IPerson) {
    this.personToAlert = personToAlert;
  }

  send(): void {

    const message = ProjectReleaseComponent.getNotificationMessage(this.project);

    if (this.smsAlert) {
      this.personSmsEmailService.sendSms(message, this.personToAlert.phone);
    }

    if (this.emailAlert) {
      const subject = 'Tildelt prosjekt på ' + this.project.title;
      this.personSmsEmailService.sendEmail(message, this.personToAlert.email, subject);
    }

    this.project.notificationMessage = this.createNotificationMessage();

    this.projectFirebaseService.update(this.project);

  }

  private createNotificationMessage() {
    const preString = DateUtils.formatLong(new Date()) + ' til ' + this.personToAlert.email + ' med ';
    if (this.smsAlert && this.emailAlert) {
      return preString + 'SMS og E-mail';
    }
    if (this.smsAlert) {
      return preString + 'SMS';
    }
    if (this.emailAlert) {
      return preString + 'E-mail';
    }
  }

  private static getNotificationMessage(project: IProject) {
    return 'Du har blitt tildelt prosjektet: ' + project.title +
      '. Prosjektet har registrert adresse: ' + project.address +
      '. Det starter ' + project.start + ', og slutter ' + project.end +
      '. Bilen som skal tas i bruk er: ' + project.car[0];
  }

  public close(): void {
    this.dialogRef.close();
  }

}

