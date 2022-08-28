import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-add',
    templateUrl: './user-add.component.html',
    styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {

    public loading: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}
