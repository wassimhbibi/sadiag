import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metrage',
  templateUrl: './metrage.component.html',
  styleUrls: ['./metrage.component.scss']
})
export class MetrageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  routertodevis() {
    window.location.href = "/devis-gratuit";
     }
}
