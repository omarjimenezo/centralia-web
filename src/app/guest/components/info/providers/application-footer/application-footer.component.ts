import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-footer',
  templateUrl: './application-footer.component.html',
  styleUrls: ['./application-footer.component.css']
})
export class ApplicationFooterComponent implements OnInit {
  @Input() title: string;

  constructor() {}
  ngOnInit(): void {
  }
}
