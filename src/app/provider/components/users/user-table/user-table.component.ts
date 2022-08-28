import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {

    public loading: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}
