import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef, MdSnackBar, getMdTooltipInvalidPositionError} from '@angular/material';

import {StringUtils} from 'app/common/string-utils';

import {AppComponent} from 'app/app.component';
import {Pos, IPos} from '../../model/pos';

import {PosFirebaseService} from '../../services/pos.firebase-service';
import {AuthService} from '../../../auth/services/auth-service';

@Component({
  templateUrl: './pos-reg.component.html',
})
export class PosRegComponent {

  title: string;

  public errorMessage = '';

  constructor(public fb: FormBuilder,
              private posFirebaseService: PosFirebaseService,
              private authService: AuthService,
              private snackBar: MdSnackBar) {
  }

  mapPosition(position) { 
      const p = new Pos;
      p.lat = position.coords.latitude;
      p.long = position.coords.longitude;
      p.email = this.authService.getEmail();
      return p;
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
        // let pos = new Pos();
        // pos.email = 'test@test.no';
        // pos = this.mapPosition(data);    
        this.posFirebaseService.create(this.mapPosition(data)).
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

  private showSnackbarSaveOkMessage(message: string) {
    this.snackBar.open('Lagret \'' + message + '\'', null, {
      duration: AppComponent.SNACK_BAR_TIMEOUT,
    });
  }

}
