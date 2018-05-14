import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef, MdSnackBar} from '@angular/material';

import {StringUtils} from 'app/common/string-utils';

import {AppComponent} from 'app/app.component';
import {Car, ICar} from '../../../model/car';

import {CarFirebaseService} from '../../../services/car.firebase-service';

@Component({
  templateUrl: './car-detail.component.html',
})
export class CarDetailComponent {

  carForm: FormGroup;
  title: string;

  private car: ICar;

  public errorMessage = '';

  constructor(private dialogRef: MdDialogRef<CarDetailComponent>, public fb: FormBuilder,
              private carFirebaseService: CarFirebaseService,
              private snackBar: MdSnackBar) {

    this.carForm = this.fb.group({
      licence: [ '' , Validators.required ],
      brand: ''
    });

  }

  setCar(car: ICar) {
    this.car = car;
    if (car) {
      this.title = 'Endre bil';
    } else {
      this.title = 'Registrer ny bil';
    }

    this.carForm = this.fb.group({
      licence: [ car.licence , Validators.required ],
      brand: car.brand,

    });

  }

  getCar(): ICar {
    if (!this.car) {
      return null;
    }
    var geopos = navigator.geolocation.getCurrentPosition(this.showPosition);
    console.log('Etter kall til geo');
    console.log(geopos);
    this.car.licence = this.carForm.value.licence;
    this.car.brand = this.carForm.value.brand;
    return this.car;
  }

  showPosition(position) {
    console.log('henter pos : ' + position.coords.latitude);
    console.log('og : '+ position.coords.longitude);
    this.car.lat = position.coords.latitude;
    this.car.long = position.coords.longitude;
  }

  public save(): void {

    this.checkForm();

    if (this.errorMessage !== '') {
      return;
    }

    const car = this.getCar();
    if (!car) {
      return null;
    }
    if (car.$key) {
      this.carFirebaseService.update(car).
      then( () => this.showSnackbarSaveOkMessage(car.licence)).
      catch(error => this.errorMessage = error.message);
    } else {
      this.carFirebaseService.create(car).
      then( () => this.showSnackbarSaveOkMessage(car.licence)).
      catch(error => {
        this.errorMessage = error.message;
      });
      this.close();
    }

  }

  private showSnackbarSaveOkMessage(message: string) {
    this.snackBar.open('Lagret \'' + message + '\'', null, {
      duration: AppComponent.SNACK_BAR_TIMEOUT,
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public checkForm(): void {

    this.errorMessage = '';

    if (!this.car) {
      this.errorMessage = AppComponent.NO_DATA_ERR_MSG;
      return;
    }

    if (StringUtils.isEmptyOrBlank(this.carForm.value.licence)) {
      this.errorMessage = AppComponent.LICENCE_MISSING;
      return;
    }


  }
}
