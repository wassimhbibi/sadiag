import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gaz',
  templateUrl: './gaz.component.html',
  styleUrls: ['./gaz.component.scss']
})
export class GazComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  routertodevis() {
    window.location.href = "/devis-gratuit";
     }
}
