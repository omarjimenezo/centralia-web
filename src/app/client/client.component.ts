import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
    public events: string[] = [];
    public opened: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    public menuOpen() {
        console.log('menuOpen');
    }
}
