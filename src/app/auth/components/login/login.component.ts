import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from 'src/app/common/models/user.model';
import { AuthService } from 'src/app/common/services/auth.service';

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
        private _authService: AuthService
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

            user === 'vendedor' && password === '123'
                ? this.confirmLogin(
                      2,
                      'Vendedor',
                      './assets/img/profile/vendedor.png'
                  )
                : user === 'pinar' && password === '123'
                ? this.confirmLogin(
                      1,
                      'Abarrotera el Pinar',
                      './assets/img/profile/abarrotera.jpeg'
                  )
                : this.showError('Datos invalidos');
        }
    }

    public forgotPassword(): void {
        console.log('Olvidé mi contraseña');
    }

    public confirmLogin(id: number, name: string, picture: string): void {
        this.loading = true;
        let user: IUser = { id: id, name: name, picture: picture };
        this._authService.setUser(user);
        this.loading = false;
        this._router.navigate(['vendedor/pedidos']);
    }

    public showError(message: string) {
        this._snackBar.open(message, 'X');
        this.form.reset();
    }
}
