import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'providers-info',
    templateUrl: './providers-info.component.html',
    styleUrls: ['./providers-info.component.scss'],
})
export class ProvidersInfoComponent implements OnInit {

    public title = 'Titulo'

    ngOnInit(): void {
        // Only trigger Application Insight tracking if we are running in production otherwise we'll get too many hits that are useless.
        
       
    }
}
