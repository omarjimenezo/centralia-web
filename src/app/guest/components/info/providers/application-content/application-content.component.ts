import { Component, Input, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-application-content',
  templateUrl: './application-content.component.html',
  styleUrls: ['./application-content.component.css']
})
export class ApplicationContentComponent implements OnInit {
  @Input() title: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  showModal(): void {
    $('.ui.modal').modal('show');
  }
}
