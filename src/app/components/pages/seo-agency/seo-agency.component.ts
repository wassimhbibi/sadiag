import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seo-agency',
  templateUrl: './seo-agency.component.html',
  styleUrls: ['./seo-agency.component.scss']
})
export class SeoAgencyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 
  isOpen: { [key: string]: boolean } = {};

  toggleAnswer(questionId: string): void {
    this.isOpen[questionId] = !this.isOpen[questionId];
  }
  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
