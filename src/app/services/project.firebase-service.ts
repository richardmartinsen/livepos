import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import {IProject} from '../model/project';

@Injectable()
export class ProjectFirebaseService {

  projects: FirebaseListObservable<IProject[]>;

  private path = `/projects`;

  constructor(public af: AngularFireDatabase) {

    this.projects = af.list(this.path);

  }

  create(project: IProject): firebase.Promise<any> {
    return this.projects.push(project);
  }

  remove(project: IProject): firebase.Promise<any> {
    return this.projects.remove(project.$key);
  }

  update(project: IProject): firebase.Promise<any> {
    return this.projects.update(project.$key, project);
  }

}
