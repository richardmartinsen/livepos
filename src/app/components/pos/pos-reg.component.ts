import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef, MdSnackBar, getMdTooltipInvalidPositionError} from '@angular/material';

import {StringUtils} from 'app/common/string-utils';

import {AppComponent} from 'app/app.component';
import {Pos, IPos} from '../../model/pos';

import {PosFirebaseService} from '../../services/pos.firebase-service';

@Component({
  templateUrl: './pos-reg.component.html',
})
export class PosRegComponent {

  // carForm: FormGroup;
  title: string;
  ipos: IPos;
  // private pos: Pos;

  public errorMessage = '';

  constructor(public fb: FormBuilder,
              private posFirebaseService: PosFirebaseService,
              private snackBar: MdSnackBar) {


    // this.carForm = this.fb.group({
    //   licence: [ '' , Validators.required ],
    //   brand: ''
    // });

  }

  start() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  // getPos(posisjon: IPos) {
  //   this.pos = new Pos();
  //   this.pos.email = posisjon.email;
  //   this.pos.lat = posisjon.lat;
  //   this.pos.long = posisjon.long;
  //   return this.pos;
  // }
  

  // getCar(): ICar {
  //   if (!this.car) {
  //     return null;
  //   }
  //   var geopos = navigator.geolocation.getCurrentPosition(this.showPosition);
  //   console.log('Etter kall til geo');
  //   console.log(geopos);
  //   this.car.licence = this.carForm.value.licence;
  //   this.car.brand = this.carForm.value.brand;
  //   return this.car;
  // }


  showPosition(position) {
    console.log('henter pos : ' + position.coords.latitude);
    console.log('og : '+ position.coords.longitude);

    let pos = new Pos();
    
    pos.lat = position.coords.latitude;
    pos.long = position.coords.longitude;
    pos.email = 'test@test.no';
    this.ipos = pos;
    // const poss = this.getPos(pos);
    this.posFirebaseService.create(this.ipos).
    then( () => this.showSnackbarSaveOkMessage('lagret')).
    catch(error => {
      this.errorMessage = error.message;
    });
  }

  // public save(): void {

  //   this.checkForm();

  //   if (this.errorMessage !== '') {
  //     return;
  //   }

  //   const car = this.getCar();
  //   if (!car) {
  //     return null;
  //   }
  //   if (car.$key) {
  //     this.carFirebaseService.update(car).
  //     then( () => this.showSnackbarSaveOkMessage(car.licence)).
  //     catch(error => this.errorMessage = error.message);
  //   } else {
  //     this.carFirebaseService.create(car).
  //     then( () => this.showSnackbarSaveOkMessage(car.licence)).
  //     catch(error => {
  //       this.errorMessage = error.message;
  //     });
  //     this.close();
  //   }

  // }

  private showSnackbarSaveOkMessage(message: string) {
    this.snackBar.open('Lagret \'' + message + '\'', null, {
      duration: AppComponent.SNACK_BAR_TIMEOUT,
    });
  }

  // public close(): void {
  //   this.dialogRef.close();
  // }

  // public checkForm(): void {

  //   this.errorMessage = '';

  //   if (!this.car) {
  //     this.errorMessage = AppComponent.NO_DATA_ERR_MSG;
  //     return;
  //   }

  //   if (StringUtils.isEmptyOrBlank(this.carForm.value.licence)) {
  //     this.errorMessage = AppComponent.LICENCE_MISSING;
  //     return;
  //   }


  // }
}
