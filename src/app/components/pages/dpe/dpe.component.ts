import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dpe',
  templateUrl: './dpe.component.html',
  styleUrls: ['./dpe.component.scss']
})
export class DpeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  routertodevis() {
    window.location.href = "/devis-gratuit";
     }
}
