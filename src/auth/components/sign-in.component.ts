import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  styleUrls: [ './sign-in.component.scss' ],
  templateUrl: './sign-in.component.html'
})

export class SignInComponent {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthService) {

    this.loginForm = this.fb.group({
        email: [ '' , Validators.required ],
        password: [ '' , Validators.required ]
    });

  }

  signIn(): void {

    this.errorMessage = '';

    this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then( user => {
        if (!user) {
          this.errorMessage = 'The password is invalid or the user does not have a pass';
          return;
        }
      }).catch(error => {
        this.errorMessage = error.message;
      });
  }

}
