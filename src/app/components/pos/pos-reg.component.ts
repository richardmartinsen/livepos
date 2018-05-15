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

  title: string;

  public errorMessage = '';

  constructor(public fb: FormBuilder,
              private posFirebaseService: PosFirebaseService,
              private snackBar: MdSnackBar) {

  }

  start() {

    var getPosition = function (options) {

      return new Promise(function (resolve, reject) {
    
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    
      });
    
    }
  
    var options = {timeout:60000};
    
    getPosition(options)
    
      .then((data) => {
        console.log(data);
        let pos = new Pos();
    
        let p = data;
        console.log(p);
        // console.log(data.coords.latitude);
        // pos.lat = position.Position.timestamp;
        // pos.long = position.coords.longitude;
        pos.email = 'test@test.no';

        console.log(pos);

        this.posFirebaseService.create(pos).
        then( () => this.showSnackbarSaveOkMessage('lagret')).
        catch(error => {
          this.errorMessage = error.message;
        });
    
      })
    
      .catch((err) => {
    
        console.error(err.message);
    
      });
    // navigator.geolocation.getCurrentPosition(this.showPosition);

  
  }



  // showPosition(position) {
  // resolve(position) {
  //   console.log('henter pos : ' + position.coords.latitude);
  //   console.log('og : '+ position.coords.longitude);

  //   // let pos = new Pos();
    

  //   // pos.email = 'test@test.no';

  //   // console.log(pos);

  //   // this.posFirebaseService.create(pos).
  //   // then( () => this.showSnackbarSaveOkMessage('lagret')).
  //   // catch(error => {
  //   //   this.errorMessage = error.message;
  //   // });
  // }

  private showSnackbarSaveOkMessage(message: string) {
    this.snackBar.open('Lagret \'' + message + '\'', null, {
      duration: AppComponent.SNACK_BAR_TIMEOUT,
    });
  }

}
