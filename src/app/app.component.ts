import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'centralia';

  public events: string[] = [];
    public opened: boolean = false;

    constructor() {}

    public menuOpen() {
        console.log('menuOpen');
    }
}
