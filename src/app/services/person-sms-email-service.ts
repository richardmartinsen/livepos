import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';

@Injectable()
export class PersonSmsEmailService {

  public sendEmail(message: string, adress: string, subject: string) {
    const request = new XMLHttpRequest();
    request.open('POST', 'https://hooks.zapier.com/hooks/catch/2362427/5u43kj/', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onload = function () {
      console.log('Email sent');
    };
    request.send('mail=' + adress + '&message=' + message + '&subject=' + subject);
  }

  public sendSms(message: string, number: string) {

    const url = 'https://sveve.no/SMS/SendMessage?user=cibernor&passwd=lvw91&to=' + number + '&msg=' + message;

    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        console.log('SMS sent');
      } else {
        console.error('Feil ved utsending av SMS. Status: ' + request.status);
      }
    };

    request.onerror = function (error) {
      console.error('Feil ved utsending av SMS!, error: ', error);
    };

    request.send();
  }

}
