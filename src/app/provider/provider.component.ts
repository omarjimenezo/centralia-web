import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'provider',
    templateUrl: './provider.component.html',
    styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent implements OnInit {
    public events: string[] = [];
    public opened: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    public menuOpen() {
        console.log('menuOpen');
    }
}
