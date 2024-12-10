import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digital-agency-two',
  templateUrl: './digital-agency-two.component.html',
  styleUrls: ['./digital-agency-two.component.scss']
})
export class DigitalAgencyTwoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  sendemail() {
 window.location.href = 'mailto:contact@sadiag.com';
  }
  sendphone() {
    window.location.href = 'tel:01 59 38 01 80';
     }
}
