import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUser, IUserResponse } from 'src/app/common/models/user.model';
import { AuthService } from 'src/app/auth/components/services/auth.service';
import { ILoginRequest, ILoginResponse } from '../../models/auth.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { IAlertInfo } from 'src/app/client/models/alert.model';
import { GlobalConstants } from 'src/app/common/models/global.constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    public loading: boolean = false;
    public hidePassword: boolean = true;

    private alertInfo: IAlertInfo = {
        screen: 'auth',
        type: 'error',
    };

    constructor(
        private _fb: FormBuilder,
        private _snackBar: MatSnackBar,
        private _routerService: Router,
        private _authService: AuthService,
        private _alertService: AlertService,
        private _cookieService: CookieService,
        private _global: GlobalConstants
    ) {}

    public ngOnInit(): void {
        this.form = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    public login(): void {
        if (this.form.valid) {
            this.loading = true;

            const loginRequest: ILoginRequest = {
                email: this.form.value.email,
                password: this.form.value.password,
                name: 'Chrome',
            };

            this._authService.login(loginRequest).subscribe(
                (response: ILoginResponse) => {
                    if (
                        response &&
                        response.message === this._global.API_MESSAGES.SUCCESS
                    ) {
                        this._cookieService.set('tokenAuth', response.token);
                        this.confirmLogin(response.user_id);
                    } else {
                        this._alertService.openAlert(
                            this._global.ERROR_MESSAGES.WRONG_USER_PASS,
                            this.alertInfo
                        );
                    }
                },
                (error) => {
                    this._alertService.openAlert(
                        this._global.ERROR_MESSAGES.CONNECTION_ERROR,
                        this.alertInfo
                    );
                    console.error(error);
                }
            );
        }
    }

    public confirmLogin(userId: string): void {
        this._authService.getUser(userId).subscribe(
            (user: IUserResponse) => {
                if (user && user.data) {
                    this._authService.setUser(user.data);
                    this.nextPage(user.data.type);
                }
                this.loading = false;
            },
            (error) => {
                this._alertService.openAlert(
                    this._global.ERROR_MESSAGES.CONNECTION_ERROR,
                    this.alertInfo
                );
                console.error(error);
                this.loading = false;
            }
        );
    }

    public nextPage(userType: string): void {
        switch (userType) {
            case this._global.USER_TYPES.PROVIDER:
                this._routerService.navigate(['vendedor/pedidos']);
                break;
            case this._global.USER_TYPES.USER:
                this._routerService.navigate(['cliente/proveedores']);
                break;
        }
    }

    public forgotPassword(): void {
        console.log('Olvidé mi contraseña');
    }
}
