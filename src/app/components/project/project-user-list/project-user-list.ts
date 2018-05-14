import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import * as moment from 'moment';

import { ProjectFirebaseService } from '../../../services/project.firebase-service';
import { IProject } from '../../../model/project';
import { AuthService } from '../../../../auth/services/auth-service';
import { DateUtils } from '../../../common/date-utils';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'project-user-list',
  styleUrls: [ './project-user-list.scss', './project-user-item.scss' ],
  templateUrl: './project-user-list.html'
})

export class ProjectUserListComponent implements OnInit {

  @Input() projects: Observable<IProject[]>;

  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectFirebaseService,
              private authService: AuthService,
              private dialog: MdDialog) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: [''],
      dato: ['']
    });

    const userEmail = this.authService.getEmail();

    this.projects = this.projectService.projects.map(function (projects) {
      return projects.filter(function (project: IProject) {
        if (!project.released) { return false; }
        const nowDate = DateUtils.formatShort();
        if ( moment(project.end).isBefore(nowDate) ) { return false; }
        return project.staff && project.staff.some(email => email.toLowerCase() === userEmail.toLowerCase() );
      });
    });

  }

}
