import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../auth/services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  public static INVALID_CUSTOMER_NAME_ERR_MSG = 'Kunde må fylles inn.';

  public static PHONE_NUMBER_MISSING = 'Mobilnummer må fylles inn';

  public static EMAIL_ADDRESS_MISSING = 'E-mail må fylles inn.';

  public static PASSWORD_TOSHORT = "Passord må inneholde minst 6 tegn";

  public static DATE_RANGE_ERR_MSG = 'Sluttdato må være etter start-dato.';

  public static PASSWORD_MISSING = 'Passord må fylles inn';

  public static EMAIL_IN_USE = "E-mail er allerede i bruk."

  public static LICENCE_MISSING = 'Kjennemerke må fylles inn';

  public static NO_DATA_ERR_MSG = 'System fei ved lagring: ingen data';

  public static SNACK_BAR_TIMEOUT = 3000;

  constructor(public title: Title, public authService: AuthService) {
    this.title.setTitle('Oppdrag');
  }

}
