import { Component, OnInit } from '@angular/core';
import { ProjectFirebaseService } from 'app/services/project.firebase-service';
import { PersonFirebaseService } from '../../../services/person.firebase-service';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { MdDialog, MdSnackBar } from '@angular/material';
import { IProject } from '../../../model/project';
import { Person, IPerson } from '../../../model/person';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'project-admin-calendar',
  templateUrl: './project-admin-calendar.html'
})
export class ProjectAdminCalendarComponent implements OnInit {

  events: CalendarEvent[] = [];
  projects: Observable<IProject[]>;
  persons: Observable<Person[]>;

  header: any;

  defaultDate = Date.now();

  constructor(private projectService: ProjectFirebaseService,
    private projectFirebaseService: ProjectFirebaseService,
    private personFirebaseService: PersonFirebaseService,
    private dialog: MdDialog,
    private snackBar: MdSnackBar) { }

  ngOnInit() {

    this.projects = this.projectService.projects;
    this.persons = this.personFirebaseService.persons;

    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };

    this.projectService.projects.subscribe(projects => {
      // Her burde man kanskje bare behandle de som synes i kalenderen. F.eks
      // aktuell måned, sånn for ytelsens skyld. Da slipper vi å behandle mange
      // år med data etterhvert...
      projects.forEach(project => {
        const index = this.find(project.$key);
        if (index > -1) {
          this.events.splice(index, 1);
        }
        project.id = project.$key;
        const event = ProjectAdminCalendarComponent.project2Event(project);
        this.events.push(event);
      });
    });
  }

  private static project2Event(project: IProject): CalendarEvent {
    const event = new CalendarEvent();
    event.end = project.end;
    event.start = project.start;
    event.id = project.id;
    event.allDay = false;
    event.title = project.title + ' - ' + project.address;
    event.numberStaff = project.numberStaff;
    if (project.staff) {
      event.staff = project.staff;
    }
    event.color = ProjectAdminCalendarComponent.getColor(project);
    return event;
  }

  private static getColor(project: IProject): string {
    if (project.holiday) {
      return 'gray';
    } else {
      if (project.staff) {
        if (project.staff.length >= project.numberStaff) {
          return 'green';
        } else {
          return 'GoldenRod';
        }
      } else {
        return 'red';
      }
    }
  }

  create(event) {
    const dialogRef = this.dialog.open(ProjectDetailComponent);
    dialogRef.componentInstance.setProject(null);
    dialogRef.componentInstance.setStart(event.date);
  }

  edit(event) {
    const dialogRef = this.dialog.open(ProjectDetailComponent);
    const project: IProject = this.getProject(event.calEvent.id);
    dialogRef.componentInstance.setProject(project);
  }

  eventRender(event, element, view) {
    var occ = 0;
    if (event.staff) {
      occ = event.staff.length;
    }

    for (var j = event.numberStaff; j >= 1; j--) {
      var s = document.createElement('span');
      s.className = 'fa';
      var i = document.createElement('i');
      if (j <= occ) {
        i.className = 'fa fa-user';
      } else {
        i.className = 'fa fa-user-o';
      }

      s.appendChild(i);
      element.find('div.fc-content').prepend(s);
    }
  }

  eventDropped(event) {
    const e: CalendarEvent = this.findByKey(event.event.id);
    let Occ = this.events.filter(function (ev) {
      let ProjectStartInEvent = moment(ev.start).isSameOrAfter(e.start) && moment(ev.start).isSameOrBefore(e.end);
      let ProjectEndInEvent = moment(ev.end).isSameOrAfter(e.start) && moment(ev.end).isSameOrBefore(e.end);
      let ProjectAroundEvent = moment(ev.start).isSameOrBefore(e.start) && moment(ev.end).isSameOrAfter(e.end);
      let DateCheck = ProjectStartInEvent || ProjectEndInEvent || ProjectAroundEvent;
      if (!ev.staff || !e.staff) {
        return false;
      }
      return ev.id != event.event.id &&
        ev.staff.some(mail => e.staff.indexOf(mail) > -1) &&
        DateCheck;
    });

    if (Occ.length > 0) {
      let msg = "";
      Occ.forEach(element => {
        const mails = element.staff.filter(e => event.event.staff.includes(e));
        mails.forEach(element => {
          let pers: Person = null;
          this.persons.forEach(function (persons) {
            pers = persons.filter(function (person) {
              return person.email === element;
            })[0];
            msg += pers.first_name + ' ' + pers.last_name + '  ';
          });

        });
        msg += ' er opptatt i ' + element.title;
      });
      this.showSnackbarErrorMessage(msg);
      event.revertFunc();
      var eventIndex = this.events.findIndex(x => x.id == event.event.id);
      this.events[eventIndex].start = moment(event.event.start).toISOString();
      this.events[eventIndex].end = moment(event.event.end).toISOString();
    } else {
      const project: IProject = this.getProject(event.event.id);
      project.start = e.start;
      project.end = e.end;
      this.projectFirebaseService.update(project);
    }
  }

  private getProject(key: string): IProject {
    let projectToGet: IProject = null;
    this.projects.forEach(function (projects) {
      projectToGet = projects.filter(function (project) {
        return project.$key === key;
      })[0];
    });
    return projectToGet;
  }

  findByKey(key: string): CalendarEvent {
    for (let index = 0; index < this.events.length; index++) {
      if (key === this.events[index].id) {
        return this.events[index];
      }
    }
    return null;
  }

  find(key: string): number {
    for (let index = 0; index < this.events.length; index++) {
      if (key === this.events[index].id) {
        return index;
      }
    }
    return -1;
  }

  private showSnackbarErrorMessage(message: string) {
    this.snackBar.open(message, null, {
      duration: 10000, //satte litt høyere verdi da den forsvant litt raskt... message er litt komplisert...
    });
  }

}

export class CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay = false;
  color: string;
  staff: any[];
  numberStaff: number;
}
