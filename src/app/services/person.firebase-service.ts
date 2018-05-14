import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';

import { Injectable } from '@angular/core';
import {AuthLevels, IPerson} from '../model/person';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonFirebaseService {

  persons: FirebaseListObservable<IPerson[]>;

  private path = `/personell`;

  constructor(public af: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.persons = af.list(this.path);
  }

  create(person: IPerson, password: string): firebase.Promise<any> {
    if (!person) {
      throw Error('Person cannot be empty');
    }
    if (!password) {
      throw Error('Password cannot be empty');
    }
    if(password.length < 6){
      throw Error('Password must be longer than 6 characters')
    }
    if (!person.email) {
      throw Error('Person must have email');
    }
    
   this.af.list('/personell').subscribe(p => p.forEach(element => {
     if(element.email === person.email){
        throw Error('Email already exists');
     }
   }));
    
    person.email = person.email.toLowerCase();
    if (!person.authLevel) {
      person.authLevel = AuthLevels.Dirigent;
    }
    this.afAuth.auth.createUserWithEmailAndPassword(person.email, password);
    return this.persons.push(person);
  }

  remove(person: IPerson): firebase.Promise<any> {
    if (!person) {
      throw Error('Person cannot be empty');
    }
    return this.persons.remove(person.$key);
  }

  update(person: IPerson): firebase.Promise<any> {
    if (!person) {
      throw Error('Person cannot be empty');
    }
    return this.persons.update(person.$key, person);
  }

  query(email: string): Observable<IPerson[]> {

    return this.af.list('/personell', {
      query: {
        orderByChild: 'email',
        equalTo: email
      }

    });

  }

}
