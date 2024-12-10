import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plomb',
  templateUrl: './plomb.component.html',
  styleUrls: ['./plomb.component.scss']
})
export class PlombComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  routertodevis() {
    window.location.href = "/devis-gratuit";
     }
}
