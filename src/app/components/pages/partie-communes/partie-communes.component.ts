import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partie-communes',
  templateUrl: './partie-communes.component.html',
  styleUrls: ['./partie-communes.component.scss']
})
export class PartieCommunesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isOpen: { [key: string]: boolean } = {};

  toggleAnswer(questionId: string): void {
    this.isOpen[questionId] = !this.isOpen[questionId];
  }


}
