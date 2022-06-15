import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'business',
    templateUrl: './business.component.html',
    styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
    public events: string[] = [];
    public opened: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    public menuOpen() {
        console.log('menuOpen');
    }
}
