import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'general-info',
    templateUrl: './general-info.component.html',
    styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit {

    public title = 'Titulo'

    ngOnInit(): void {
        // Only trigger Application Insight tracking if we are running in production otherwise we'll get too many hits that are useless.
        
       
    }
}
