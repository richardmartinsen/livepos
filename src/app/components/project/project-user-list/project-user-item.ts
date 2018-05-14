import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProjectUserDetailComponent } from '../project-user-detail/project-user-detail.component';
import { MdDialog } from '@angular/material';
import { Project } from '../../../model/project';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'project-user-item',
  styleUrls: [ './project-user-item.scss', ],
  templateUrl: './project-user-item.html'
})

export class ProjectUserItemComponent {

  @Input() project: Project;

  title = '';

  constructor(private dialog: MdDialog) { }

  public showEdit(project: Project) {
    const dialogRef = this.dialog.open(ProjectUserDetailComponent);
    dialogRef.componentInstance.setProject(project);
  }

}
