import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PersonFirebaseService } from '../../services/person.firebase-service';
import { FileService } from '../../../test/service/file.service';
import { ProjectFirebaseService } from '../../services/project.firebase-service';
import { CarFirebaseService } from '../../services/car.firebase-service';
import { PosFirebaseService } from '../../services/pos.firebase-service';
import { AuthService } from '../../../auth/services/auth-service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {

  constructor(private title: Title,
              private fileService: FileService,
              private personService: PersonFirebaseService,
              private projectService: ProjectFirebaseService,
              private carService: CarFirebaseService,
              private posService: PosFirebaseService,
              public authService: AuthService) {
    this.title.setTitle('Om');
  }

  deleteProjects() {
    this.projectService.projects.subscribe(projects => {
      projects.forEach(project => {
        console.log('Sletter prosjekt: ', project);
        this.projectService.remove(project);
      });
    });
  }

  initProjects() {
    this.fileService.projects.subscribe(projects => {
      projects.forEach(project => {
        console.log('Legger inn prosjekt: ', project);
        this.projectService.create(project);
      });
    });

  }

  deletePersons() {
    this.personService.persons.subscribe(persons => {
      persons.forEach(person => {
        console.log('Sletter person: ', person);
        this.personService.remove(person);
      });
    });
  }

  initPersons() {
    this.fileService.persons.subscribe(persons => {
      persons.forEach(person => {
        console.log('Legger inn person: ', person);
        this.personService.create(person, '123123123') ;
      });
    });

  }
  deleteCars() {
    this.carService.cars.subscribe(cars => {
      cars.forEach(car => {
        console.log('Sletter car: ', car);
        this.carService.remove(car);
      });
    });
  }

  initCars() {
    this.fileService.cars.subscribe(cars => {
      cars.forEach(car => {
        console.log('Legger inn car: ', car);
        this.carService.create(car);
      });
    });

  }

  deletePos() {
    this.posService.posList.subscribe(lpos => {
      lpos.forEach(pos => {
        console.log('Sletter pos: ', pos);
        this.posService.remove(pos);
      });
    });
  }

  initPos() {
    this.fileService.listPos.subscribe(lpos => {
      lpos.forEach(pos => {
        console.log('Legger inn pos: ', pos);
        this.posService.create(pos);
      });
    });

  }

}
