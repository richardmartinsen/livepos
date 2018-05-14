import {Title} from '@angular/platform-browser';
import {MdDialog} from '@angular/material';
import {Component} from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import {PersonFirebaseService} from '../../../services/person.firebase-service';
import {IPerson} from '../../../model/person';
import {ConfirmationDialogComponent} from '../../../common/confirmation-dialog';

@Component({
  template: `
    <div class="g-row">
      <div class="g-col">
        <person-list
          [persons]="personService.persons"
          (remove)="remove($event)">
        </person-list>
      </div>
    </div>
  `
})
export class PersonsComponent {

  constructor(private title: Title, public personService: PersonFirebaseService, public dialog: MdDialog) {
    this.title.setTitle('Ansatte');
  }

  remove(person: IPerson) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.title = 'Sletting av ansatt';
    dialogRef.componentInstance.message =
      'Er du sikker på du vil slette \'' + person.first_name + ' ' + person.last_name + '\'?';
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        return this.personService.remove(person);
      }
    });
  }

}
