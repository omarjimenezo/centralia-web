import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { IUser, IUserResponse } from 'src/app/common/models/user.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { DataService } from 'src/app/common/services/data.service';
import { IDialogData, ILoginRequest, ILoginResponse } from '../../models/auth.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public form: UntypedFormGroup;
    public loading: boolean = false;
    public hidePassword: boolean = true;

    constructor(
        private _fb: UntypedFormBuilder,
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
            };

            this._authService.login(loginRequest).subscribe(
                (response: ILoginResponse) => {
                    if (response) {
                        switch (response.codigo) {
                            case 0:
                                this._authService.setToken(response.data.token);
                                this.setUser(response.data.usuario);
                                this.dialogRef.close();
                                break;
                            case 1:
                                this._alertService.openAlert(
                                    this._global.ERROR_MESSAGES.WRONG_USER_PASS,
                                    1
                                );
                                break;
                            default:
                                this._alertService.openAlert(
                                    this._global.ERROR_MESSAGES.WRONG_USER_PASS,
                                    1
                                );
                                break;
                        }
                        this.loading = false;
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

    public setUser(user: IUser) {
                if (user) {
                    this._dataService.setUser(user);
                    (this.dialogData && this.dialogData.returnURL) ?
                    this._routerService.navigate([this.dialogData.returnURL]) :
                    this._authService.landingPage(user.rol);
                }
                this.loading = false;
    }

    public forgotPassword(): void {
        console.log('Olvidé mi contraseña');
    }
}
