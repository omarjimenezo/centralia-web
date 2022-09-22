import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { IUserResponse } from 'src/app/common/models/user.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { DataService } from 'src/app/common/services/data.service';
import { IDialogData, ILoginRequest, ILoginResponse } from '../../models/auth.model';

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
        private _authService: AuthService,
        private _dataService: DataService,
        private _alertService: AlertService,
        private _global: GlobalConstants,
        private _routerService: Router,
        public dialogRef: MatDialogRef<LoginComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: IDialogData,
    ) { }

    public ngOnInit(): void {
        this.form = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });

        // if (this._authService.isAuthenticated()) {
        //     if (this._dataService.getUserInfo()) {
        //         let userInfo: IUser = this._dataService.getUserInfo();
        //         this.confirmLogin(userInfo.id);
        //         this._authService.landingPage(this._dataService.getUserRole())
        //     }
        // }
    }

    onNoClick(): void {
        this.dialogRef.close();
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
                                this.dialogRef.close();
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
                    (this.dialogData && this.dialogData.returnURL) ? 
                    this._routerService.navigate([this.dialogData.returnURL]) :
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
