import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { IPos } from '../model/pos';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class PosFirebaseService {

  posList: FirebaseListObservable<IPos[]>;

  private path = `/pos`;

  constructor(public af: AngularFireDatabase) {

    this.posList = af.list(this.path);

  }

  create(pos: IPos): firebase.Promise<any> {
    console.log('Vi skal kjøre Create');
    return this.posList.push(pos);
  }

  remove(pos: IPos): firebase.Promise<any> {
    return this.posList.remove(pos.$key);
  }

  update(pos: IPos): firebase.Promise<any> {
    return this.posList.update(pos.$key, pos);
  }

}
