import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import {IPerson, Person} from '../../../model/person';
import {PersonFirebaseService} from '../../../services/person.firebase-service';
import {PersonDetailComponent} from '../person-detail/person-detail.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'person-list',
  styleUrls: [ './person-list.scss', './person-item.scss' ],
  templateUrl: './person-list.html'
})

export class PersonListComponent implements OnInit {

  @Input() persons: Observable<IPerson[]>;

  @Output() remove = new EventEmitter(false);
  @Output() update = new EventEmitter(false);

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private personService: PersonFirebaseService,
              private dialog: MdDialog) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });

    this.persons = this.personService.persons.switchMap(person =>
      this.searchForm.controls['search'].valueChanges
        .map(value => this.search(person, value.toLowerCase()))
        .startWith(person));

  }

  private search(persons: Person[], value: string) {
    return persons.filter(person => value.toLowerCase()
      ? person.first_name.toLowerCase().includes(value)
      || person.last_name.toLowerCase().includes(value)
      || person.email.toLowerCase().includes(value)
      : persons );
  }

  public showCreate() {
    const dialogRef = this.dialog.open(PersonDetailComponent);
    dialogRef.componentInstance.setPerson(null);
  }

}
