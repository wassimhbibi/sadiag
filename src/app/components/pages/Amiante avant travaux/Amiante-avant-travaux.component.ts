import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partie-communes',
  templateUrl: './Amiante-avant-travaux.component.html',
  styleUrls: ['./Amiante-avant-travaux.component.scss']
})
export class AmianteavanttravauxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isOpen: { [key: string]: boolean } = {};

  toggleAnswer(questionId: string): void {
    this.isOpen[questionId] = !this.isOpen[questionId];
  }


}
