import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elec',
  templateUrl: './elec.component.html',
  styleUrls: ['./elec.component.scss']
})
export class ElecComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  routertodevis() {
    window.location.href = "/devis-gratuit";
     }
}
