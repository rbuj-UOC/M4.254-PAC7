import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  public message = '';
  constructor(private authService: AuthService) {}

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.authService.login(this.username.value, this.password.value).subscribe(
      (resp) => {
        console.log('Successfully logged in');
        this.message = resp.msg;
      },
      (err) => {
        console.error('Error logging in', err);
        this.message = err.error.msg;
      }
    );
  }
}
