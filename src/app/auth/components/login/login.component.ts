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

    public ngOnInit(): void {
        let users: IUser[] = [
            {
                id: 0,
                type: 0,
                name: 'Abarrotera el Pinar',
                address: 'Dirección particular',
                img: './assets/img/profile/abarrotera.jpeg',
            },
            {
                id: 1,
                type: 1,
                name: 'Vendedor 1',
                address: 'Dirección particular',
                img: './assets/img/profile/vendedor.png',
            },
            {
                id: 2,
                type: 1,
                name: 'Vendedor 2',
                address: 'Dirección particular',
                img: './assets/img/profile/vendedor2.png',
            },
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }

    public login(): void {
        if (this.form.valid) {
            console.log(this.form);
            const user = this.form.value.user;
            const password = this.form.value.password;

            user === 'vendedor1' && password === '123'
                ? this.confirmLogin(1)
                : user === 'vendedor2' && password === '123'
                ? this.confirmLogin(2)
                : user === 'pinar' && password === '123'
                ? this.confirmLogin(0)
                : this.showError('Usuario y/o Contraseña incorrectos');
        }
    }

    public forgotPassword(): void {
        console.log('Olvidé mi contraseña');
    }

    public confirmLogin(id: number): void {
        this.loading = true;
        const users: IUser[] = JSON.parse(localStorage.getItem('users')!);
        if (users.length > 0) {
            const user: IUser = users.find((user: IUser) => user.id === id)!;
            this._authService.setUser(user);
            this.loading = false;
            this._router.navigate(['vendedor/pedidos']);
        } else {
            this.showError('Usuario y/o Contraseña incorrectos');
        }
    }

    public showError(message: string) {
        this._snackBar.open(message, 'X');
        this.form.reset();
    }
}
