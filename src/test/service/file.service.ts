import { ICar } from '../../app/model/car';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IPerson } from '../../app/model/person';
import { IPos } from '../../app/model/pos';
import { Project } from '../../app/model/project';
import 'rxjs/add/operator/map';

import {personData, projectData, carData, posData} from '../test-data';

@Injectable()
export class FileService {

  persons: Observable<IPerson[]>;

  projects: Observable<Project[]>;

  cars: Observable<ICar[]>;

  listPos: Observable<IPos[]>;

  constructor() {

    const personsJSon = { persons: personData };
    const personsSubject = new BehaviorSubject(Object.assign({}, personsJSon).persons);
    this.persons = personsSubject.asObservable().map(persons => persons.map(person => person));

    const projectsJSon = { projects: projectData };
    const projectsSubject = new BehaviorSubject(Object.assign({}, projectsJSon).projects);
    this.projects = projectsSubject.asObservable().map(projects => projects.map(project => {
      const projectImpl: Project = new Project();
      projectImpl.title = project.title;
      projectImpl.start = project.start;
      projectImpl.end = project.end;
      projectImpl.car = project.car;
      projectImpl.address = project.address;
      projectImpl.staff = project.staff;
      projectImpl.released = project.released;
      return projectImpl;
    }));

    const carsJSon = { cars: carData };
    const carsSubject = new BehaviorSubject(Object.assign({}, carsJSon).cars);
    this.cars = carsSubject.asObservable().map(cars => cars.map(car => car));

    const posJSon = { listPos: posData };
    const posSubject = new BehaviorSubject(Object.assign({}, posJSon).listPos);
    this.listPos = posSubject.asObservable().map(lpos => lpos.map(pos => pos));

  }

}
