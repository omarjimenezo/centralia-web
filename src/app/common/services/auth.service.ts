import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAlertInfo } from 'src/app/client/models/alert.model';
import { IClient, IUser } from '../models/user.model';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public user: IUser;

    constructor(private _router: Router, private _alertService: AlertService) {}

    public setUser(user: IUser): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public getUser(): IUser {
        if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user')!);
        } else {
            let alertInfo: IAlertInfo = {
                screen: 'order',
                type: 'error'
            }
            this._router.navigate(['login']);
            this._alertService.openAlert('No ha iniciado sesión', alertInfo);
        }

        return this.user;
    }

    get getClient(): IClient {
        return <IClient>JSON.parse(localStorage.getItem('client')!);
    }
}
