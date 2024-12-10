import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-termites',
  templateUrl: './termites.component.html',
  styleUrls: ['./termites.component.scss']
})
export class TermitesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  routertodevis() {
    window.location.href = "/devis-gratuit";
     }
}
