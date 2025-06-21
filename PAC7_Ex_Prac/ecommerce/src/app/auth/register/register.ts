import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private authService = inject(AuthService);

  public registerForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  public message = '';

  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }

  register() {
    this.authService
      .register(this.username.value, this.password.value)
      .subscribe(
        (resp) => {
          console.log('Successfully registered');
          this.message = resp.msg;
        },
        (err) => {
          console.error('Error registering', err);
          this.message = err.error.msg;
        }
      );
  }
}
