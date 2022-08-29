import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'providers-info',
    templateUrl: './providers-info.component.html',
    styleUrls: ['./providers-info.component.scss'],
})
export class ProvidersInfoComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
        console.log('Info page');
    }
}
