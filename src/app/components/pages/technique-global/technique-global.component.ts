import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-technique-global',
  templateUrl: './technique-global.component.html',
  styleUrls: ['./technique-global.component.scss']
})
export class TechniqueGlobalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  routertodevis() {
    window.location.href = "/devis-gratuit";
     }
}
