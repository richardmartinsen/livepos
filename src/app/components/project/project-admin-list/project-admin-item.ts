import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { MdDialog } from '@angular/material';
import { Project } from '../../../model/project';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'project-admin-item',
  styleUrls: [ './project-admin-item.scss', ],
  templateUrl: './project-admin-item.html'
})

export class ProjectAdminItemComponent {

  @Input() project: Project;

  @Output() remove = new EventEmitter(false);

  title = '';

  constructor(private dialog: MdDialog) { }

  public showEdit(project: Project) {
    const dialogRef = this.dialog.open(ProjectDetailComponent);
    dialogRef.componentInstance.setProject(project);
  }

}
