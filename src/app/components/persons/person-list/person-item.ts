import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {MdDialog} from '@angular/material';
import {Person} from '../../../model/person';
import {PersonDetailComponent} from '../person-detail/person-detail.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'person-item',
  styleUrls: [ './person-item.scss' ],
  templateUrl: './person-item.html'
})

export class PersonItemComponent {

  @Input() person: Person;

  @Output() remove = new EventEmitter(false);

  title = '';

  constructor(private dialog: MdDialog) { }

  public showEdit(person: Person) {
    const dialogRef = this.dialog.open(PersonDetailComponent);
    dialogRef.componentInstance.setPerson(person);
  }

}
