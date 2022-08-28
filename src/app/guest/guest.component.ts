import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'guest',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnInit {
    public events: string[] = [];
    public opened: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    public menuOpen() {
        console.log('menuOpen');
    }
}
