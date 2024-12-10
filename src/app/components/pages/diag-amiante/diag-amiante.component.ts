import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diag-amiante',
  templateUrl: './diag-amiante.component.html',
  styleUrls: ['./diag-amiante.component.scss']
})
export class DiagAmianteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  routertodevis() {
    window.location.href = "/devis-gratuit";
     }
}
