import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef, MdSnackBar} from '@angular/material';

import {StringUtils} from '../../../common/string-utils';

import {AppComponent} from '../../../app.component';
import {Person, IPerson, AuthLevels} from '../../../model/person';
import {PersonFirebaseService} from '../../../services/person.firebase-service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AuthService} from '../../../../auth/services/auth-service';

@Component({
  templateUrl: './person-detail.component.html',
})
export class PersonDetailComponent implements OnInit {

  personForm: FormGroup;
  title: string;

  authLevel = AuthLevels[AuthLevels.Dirigent];
  authLevels: string[];

  person: IPerson;
  persons: FirebaseListObservable<IPerson[]>;
  
  public errorMessage = '';

  constructor(private fb: FormBuilder,
              private dialogRef: MdDialogRef<PersonDetailComponent>,
              private personService: PersonFirebaseService,
              public authService: AuthService,
              private snackBar: MdSnackBar,
              public af: AngularFireDatabase) {

    const options = Object.keys(AuthLevels);
    this.authLevels = options.slice(options.length / 2);

  }

  ngOnInit(): void {
    this.authService.authLevelChanged().subscribe( newAuthLevel => {
      if (newAuthLevel < this.authService.authLevel) {
        this.close();
      }
    });
  }

  setPerson(person: IPerson) {

    if (person) {
      this.person = person;
      this.title = 'Endre ansatt';
      this.authLevel = AuthLevels[person.authLevel];
    } else {
      this.person = new Person();
      this.title = 'Registrer ny ansatt';
      this.authLevel = AuthLevels[AuthLevels.Dirigent];
    }

    this.personForm = this.fb.group({
      first_name: [ this.person.first_name, Validators.required ],
      last_name: this.person.last_name,
      phone: this.person.phone,
      email: this.person.email,
      password: ''
    });

  }

  getPerson(): IPerson {
    this.person.first_name = this.personForm.value.first_name;
    this.person.last_name = this.personForm.value.last_name;
    this.person.phone = this.personForm.value.phone;
    this.person.email = this.personForm.value.email;
    this.person.authLevel = AuthLevels[this.authLevel];
    
    return this.person;
  }

  public save(): void {

    this.checkForm();

    if (this.errorMessage !== '') {
      return;
    }

    const person = this.getPerson();
    if (person.$key) {
      this.personService.update(person).
      then( () => this.showSnackbarSaveOkMessage(person.email)).
      catch(error => this.errorMessage = error.message);
    } else {
      person.email = this.personForm.value.email;
      this.personService.create(person, this.personForm.value.password).
      then( () => this.showSnackbarSaveOkMessage(person.email)).
      catch(error => this.errorMessage = error.message);
      this.close();
    }

  }

  private showSnackbarSaveOkMessage(message: string) {
    this.snackBar.open('Lagret \'' + message + '\'', null, {
      duration: AppComponent.SNACK_BAR_TIMEOUT,
    });
  }


  public checkForm(): void {

    this.errorMessage = '';

    if (!this.person) {
      this.errorMessage = AppComponent.NO_DATA_ERR_MSG;
      return;
    }

    if (StringUtils.isEmptyOrBlank(this.personForm.value.phone)) {
      this.errorMessage = AppComponent.PHONE_NUMBER_MISSING;
      return;
    }

    if (StringUtils.isEmptyOrBlank(this.personForm.value.email)) {
      this.errorMessage = AppComponent.EMAIL_ADDRESS_MISSING;
      return;
    } 

    if(this.personForm.value.password.length < 6) {
      this.errorMessage = AppComponent.PASSWORD_TOSHORT;
      return;
    }


    this.personService.query(this.personForm.value.email).subscribe(persons => {
        if (persons.length > 1) {
         this.errorMessage = AppComponent.EMAIL_IN_USE;
          return;
        }});    
   

    if (this.title === 'Registrer ny ansatt' && StringUtils.isEmptyOrBlank(this.personForm.value.password)) {
      this.errorMessage = AppComponent.PASSWORD_MISSING;
      return;
    }

  }

  public remove(): void {
    this.personService.remove(this.getPerson());
    this.close();
  }

  public close(): void {
    this.dialogRef.close();
  }

}
