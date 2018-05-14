import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { ICar } from '../model/car';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class CarFirebaseService {

  cars: FirebaseListObservable<ICar[]>;

  private path = `/car`;

  constructor(public af: AngularFireDatabase) {

    this.cars = af.list(this.path);

  }

  create(car: ICar): firebase.Promise<any> {
    return this.cars.push(car);
  }

  remove(car: ICar): firebase.Promise<any> {
    return this.cars.remove(car.$key);
  }

  update(car: ICar): firebase.Promise<any> {
    return this.cars.update(car.$key, car);
  }

}
