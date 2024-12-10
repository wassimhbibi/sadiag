import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-dpe',
  templateUrl: './performance-dpe.component.html',
  styleUrls: ['./performance-dpe.component.scss']
})
export class PerformanceDPEComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  routertodevis() {
    window.location.href = "/devis-gratuit";
     }
}
