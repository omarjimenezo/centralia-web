import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

    public loading: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}
