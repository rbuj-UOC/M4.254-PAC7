import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  public message = '';
  constructor(private authService: AuthService) {}

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
