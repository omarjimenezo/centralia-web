import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUser, IUserResponse } from 'src/app/common/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ILoginRequest, ILoginResponse } from '../../models/auth.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { IAlertInfo } from 'src/app/business/models/alert.model';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { DataService } from 'src/app/common/services/data.service';

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
        private _routerService: Router,
        private _authService: AuthService,
        private _dataService: DataService,
        private _alertService: AlertService,
        private _cookieService: CookieService,
        private _global: GlobalConstants
    ) {}

    public ngOnInit(): void {
        this.form = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });

        if(this._authService.isAuthenticated()) {
            if (this._dataService.getUserInfo()) {
                let userInfo: IUser = this._dataService.getUserInfo();
                this.confirmLogin(userInfo.id);
                this._authService.landingPage(this._dataService.getUserRole())
            }
        }
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
                    if (response) {
                        switch (response.code) {
                            case 0:
                                this._authService.setToken(response.token);
                                this.confirmLogin(response.user_id);
                                break;
                            default:
                                this._alertService.openAlert(
                                    this._global.ERROR_MESSAGES.WRONG_USER_PASS,
                                    1
                                );
                                this.loading = false;
                                break;
                        }
                    } else {
                        this._alertService.openAlert(
                            this._global.ERROR_MESSAGES.WRONG_USER_PASS,
                            1
                        );
                        this.loading = false;
                    }
                },
                (error) => {
                    this._alertService.openAlert(
                        this._global.ERROR_MESSAGES.CONNECTION_ERROR,
                        1
                    );
                    console.error(error);
                    this.loading = false;
                }
            );
        }
    }

    public confirmLogin(userId: string): void {
        this.getUser(userId);
        this._dataService.getOrderStatusCatalog();
    }

    public getUser(userId: string) {
        this._dataService.getUser(userId).subscribe(
            (user: IUserResponse) => {
                if (user && user.data) {
                    this._dataService.setUser(user.data);
                    this._authService.landingPage(user.data.user_type);
                }
                this.loading = false;
            },
            (error) => {
                this._alertService.openAlert(
                    this._global.ERROR_MESSAGES.CONNECTION_ERROR,
                    1
                );
                console.error(error);
                this.loading = false;
            }
        );
    }

    public forgotPassword(): void {
        console.log('Olvidé mi contraseña');
    }
}
