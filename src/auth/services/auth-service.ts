import {Injectable, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';

import {AuthLevels, Person} from '../../app/model/person';
import { PersonFirebaseService } from '../../app/services/person.firebase-service';

@Injectable()
export class AuthService implements OnInit {

  authenticated: Observable<boolean>;
  public authLevel: AuthLevels = AuthLevels.Dirigent;

  private personObs: FirebaseObjectObservable<any>;

  constructor(private title: Title, public afAuth: AngularFireAuth, private afdb: AngularFireDatabase,
              private personService: PersonFirebaseService, private router: Router) {

    this.authenticated = afAuth.authState.map(user => !!user);

    if (this.getEmail()) {
      this.personObs = this.afdb.object('/personell/' + this.getKey());
      this.personService.query(this.getEmail()).subscribe(persons => {
        if (!persons[0]) {
          throw Error('No user found');
        }
        this.init(persons[0].email, persons[0].authLevel.toString(), persons[0].$key);
      });

    }

  }

  ngOnInit(): void {
    this.authLevelChanged().subscribe( newAuthLevel => {
      this.authLevel = newAuthLevel;
    });
  }

  public init(email: string, authLevel, key: string) {
    this.personObs = this.afdb.object('/personell/' + key);
    localStorage.setItem('key', key);
    localStorage.setItem('email', email);
    localStorage.setItem('authLevel', authLevel);
  }

  signIn(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(user =>

      this.personService.query(email).subscribe(persons => {
        if (!persons[0]) {
          throw Error('No user found');
        }
        this.init(persons[0].email, persons[0].authLevel.toString(), persons[0].$key);
        console.log('Vi fant : ' + persons[0].email);
        return this.router.navigate(['/projects']);
      })
    );

  }

  public getAuthLevel(): Observable<string> {
    if (!this.personObs) {
      return null;
    }
    return new Observable<string>((observer: Subscriber<string>) => {
      this.personObs.subscribe(person => {
        observer.next(Person.getAuthLevelName(person.authLevel));
      });
    });
  }

  public getIsAdminOnly(): Observable<boolean> {
    // return true;
    if (!this.personObs) {
      return null;
    }
    return new Observable<boolean>((observer: Subscriber<boolean>) => {
      this.personObs.subscribe(person => {
        observer.next(true);
        // observer.next(person.authLevel === AuthLevels.Admin);
      });
    });
  }

  public getIsAdmin(): Observable<boolean> {
    // return true;
    if (!this.personObs) {
      return null;
    }
    return new Observable<boolean>((observer: Subscriber<boolean>) => {
      this.personObs.subscribe(person => {
        observer.next(true);
        // observer.next(person.authLevel === AuthLevels.Admin || person.authLevel === AuthLevels.Superbruker);
      });
    });
  }

  public getIsSuperuser(): Observable<boolean> {
    // return true;
    if (!this.personObs) {
      return null;
    }
    return new Observable<boolean>((observer: Subscriber<boolean>) => {
      this.personObs.subscribe(person => {
        observer.next(true);
        // observer.next(person.authLevel === AuthLevels.Superbruker);
      });
    });
  }

  public getIsDirigentOnly(): Observable<boolean> {
    // console.log('Sjekk om dirigent');
    // return true;
    if (!this.personObs) {
      return null;
    }
    return new Observable<boolean>((observer: Subscriber<boolean>) => {
      this.personObs.subscribe(person => {
        observer.next(true);
        // observer.next(person.authLevel === AuthLevels.Dirigent);
      });
    });
  }

  public authLevelChanged(): Observable<AuthLevels> {
    if (!this.personObs) {
      return null;
    }
    return new Observable<AuthLevels>((observer: Subscriber<AuthLevels>) => {
      this.personObs.subscribe(person => {
        observer.next(person.authLevel);
      });
    });
  }

  signOut(): void {
    localStorage.clear();
    this.title.setTitle('');
    this.afAuth.auth.signOut();
  }

  getEmail(): string {
    return localStorage.getItem('email');
  }

  getKey(): string {
    return localStorage.getItem('key');
  }

}
