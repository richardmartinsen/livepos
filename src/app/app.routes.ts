import {Routes} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {AuthGuard} from '../auth/guards/auth-guard';
import {SignInComponent} from '../auth/components/sign-in.component';
import {UnauthGuard} from '../auth/guards/unauth-guard';
import {ProjectsComponent} from './components/project/projects-component';
import {CarsComponent} from './components/cars/car-list/cars-component';
import {PersonsComponent} from './components/persons/person-list/persons-component';
import {PosRegComponent} from './components/pos/pos-reg.component';

export const routes: Routes = [
  { path: 'login', component: SignInComponent, canActivate: [UnauthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'persons', component: PersonsComponent, canActivate: [AuthGuard] },
  { path: 'cars', component: CarsComponent, canActivate: [AuthGuard] },
  { path: 'pos', component: PosRegComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full'}, // On empty URL, redirect to login page
  { path: '**', redirectTo: '/login', pathMatch: 'full'}, // On unknown URL, redirect to login page
];
