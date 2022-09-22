import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'business-info',
    templateUrl: './business-info.component.html',
    styleUrls: ['./business-info.component.scss'],
})
export class BusinessInfoComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
        console.log('Info page');
    }
}
