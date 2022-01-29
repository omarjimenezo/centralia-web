import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    ) {
    this.form = this._fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  public ngOnInit(): void {}

  public login(): void {
    if (this.form.valid) {
      console.log(this.form);
      const email = this.form.value.email;
      const password = this.form.value.password;

      (email === 'test@test.com' && password === 'Test123!')
        ? this.confirmLogin()
        : this.showError('Datos invalidos');
    }
  }

  public forgotPassword(): void {
    console.log('Olvidé mi contraseña');
  }

  public confirmLogin(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false
      this._router.navigate(['dashboard']);
    }, 5000)
  }

  public showError(message: string) {
    this._snackBar.open(message, 'X');
    this.form.reset();
  }
}
