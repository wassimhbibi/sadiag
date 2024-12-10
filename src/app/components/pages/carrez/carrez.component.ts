import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrez',
  templateUrl: './carrez.component.html',
  styleUrls: ['./carrez.component.scss']
})
export class CarrezComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  routertodevis() {
    window.location.href = "/devis-gratuit";
     }
}
