import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import * as moment from 'moment';

import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { ProjectFirebaseService } from '../../../services/project.firebase-service';
import { IProject } from '../../../model/project';
import { DateUtils } from '../../../common/date-utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'project-admin-list',
  styleUrls: ['./project-admin-list.scss', './project-admin-item.scss'],
  templateUrl: './project-admin-list.html'
})

export class ProjectAdminListComponent implements OnInit {

  @Input() projects: Observable<IProject[]>;

  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);

  searchForm: FormGroup;

  weekSelected: boolean;

  constructor(private formBuilder: FormBuilder,
    private projectService: ProjectFirebaseService,
    private dialog: MdDialog) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: [''],
      dato: [''],
      uke: ['']
    });
    const searchDate = DateUtils.formatShort();
    const searchWeek = moment().format('w');
    this.searchForm.controls.dato.setValue(searchDate);
    this.searchForm.controls.uke.setValue(searchWeek);

    this.projects = this.projectService.projects.map(function (projects) {
      return projects.filter(function (project) {
        return moment(searchDate).isSameOrAfter(project.start) && moment(searchDate).isSameOrBefore(project.end);
      });
    });
  };

  public showCreate() {
    const dialogRef = this.dialog.open(ProjectDetailComponent);
    dialogRef.componentInstance.setProject(null);
  };

  public addDate() {
    const searchDate = DateUtils.formatShort(moment(this.searchForm.controls['dato'].value).add(1, 'd').toDate());
    this.searchForm.controls['dato'].setValue(searchDate);

    this.projects = this.projectService.projects.map(function (projects) {
      return projects.filter(function (project) {
        return moment(searchDate).isSameOrAfter(project.start) && moment(searchDate).isSameOrBefore(project.end);
      });
    });
  };

  public subtractDate() {
    const searchDate = DateUtils.formatShort(moment(this.searchForm.controls['dato'].value).subtract(1, 'd').toDate());
    this.searchForm.controls['dato'].setValue(searchDate);

    this.projects = this.projectService.projects.map(function (projects) {
      return projects.filter(function (project) {
        return moment(searchDate).isSameOrAfter(project.start) && moment(searchDate).isSameOrBefore(project.end);
      });
    });
  };

  public addWeek() {
    const searchWeek = parseInt(this.searchForm.controls['uke'].value, 10) + 1;
    this.searchForm.controls['uke'].setValue(searchWeek);
    const monday = moment().day('Monday').week(searchWeek);
    const sunday = moment(monday).add(6, 'd');

    this.projects = this.projectService.projects.map(function (projects) {
      return projects.filter(function (project) {
        return moment(project.start).isSameOrBefore(sunday) && moment(project.end).isSameOrAfter(monday);
      });
    });
  };

  public subtractWeek() {
    const searchWeek = parseInt(this.searchForm.controls['uke'].value, 10) - 1;
    this.searchForm.controls['uke'].setValue(searchWeek);
    const monday = moment().day('Monday').week(searchWeek);
    const sunday = moment(monday).add(6, 'd');

    this.projects = this.projectService.projects.map(function (projects) {
      return projects.filter(function (project) {
        return moment(project.start).isSameOrBefore(sunday) && moment(project.end).isSameOrAfter(monday);
      });
    });
  };

  public weekChanged() {
    if (this.weekSelected) {
      const searchWeek = parseInt(this.searchForm.controls['uke'].value, 10);
      const monday = moment().day('Monday').week(searchWeek);
      const sunday = moment(monday).add(6, 'd');

      this.projects = this.projectService.projects.map(function (projects) {
        return projects.filter(function (project) {
          return moment(project.start).isSameOrBefore(sunday) && moment(project.end).isSameOrAfter(monday);
        });
      });
    } else {
      const searchDate = DateUtils.formatShort(moment(this.searchForm.controls['dato'].value).toDate());
      this.projects = this.projectService.projects.map(function (projects) {
        return projects.filter(function (project) {
          return moment(searchDate).isSameOrAfter(project.start) && moment(searchDate).isSameOrBefore(project.end);
        });
      });
    }
  }

}
