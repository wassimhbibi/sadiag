import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geometre',
  templateUrl: './geometre.component.html',
  styleUrls: ['./geometre.component.scss']
})
export class GeometreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  routertodevis() {
    window.location.href = "/devis-gratuit";
     }
}
