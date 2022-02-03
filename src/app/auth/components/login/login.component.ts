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
  public hidePassword: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    ) {
    this.form = this._fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public ngOnInit(): void {}

  public login(): void {
    if (this.form.valid) {
      console.log(this.form);
      const user = this.form.value.user;
      const password = this.form.value.password;

      (user === 'client' && password === 'Test123!')
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
      this._router.navigate(['client/products']);
    }, 5000)
  }

  public showError(message: string) {
    this._snackBar.open(message, 'X');
    this.form.reset();
  }
}
