import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {ProjectFirebaseService} from '../../services/project.firebase-service';
import {AuthService} from '../../../auth/services/auth-service';
import {IProject} from '../../model/project';
import {MdDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../common/confirmation-dialog';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectHolidayDetailComponent } from './project-holiday-detail/project-holiday-detail.component';

@Component({
  templateUrl: './projects-component.html'
})

export class ProjectsComponent {

  constructor(private title: Title, public projectService: ProjectFirebaseService,
              public authService: AuthService, public dialog: MdDialog) {

    this.title.setTitle('Oppdrag');

  }

  remove(project: IProject) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.title = 'Sletting av prosjekt';
    dialogRef.componentInstance.message = 'Er du sikker på du vil slette \'' + project.title + '\'?';
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        return this.projectService.remove(project);
      }
    });
  }

  showCreate(){
    const dialogRef = this.dialog.open(ProjectDetailComponent);
    dialogRef.componentInstance.setProject(null);
  }

  showCreateUser(){
    const dialogRef = this.dialog.open(ProjectHolidayDetailComponent);
    dialogRef.componentInstance.setProject(null);
  }
}
