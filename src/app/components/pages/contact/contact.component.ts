import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }
  options = [
    { label: 'Contactez-nous', image: "/assets/image/contactez-nous.png", routerLink: '/contactez-nous' },
    { label: 'Rappelez-moi', image: "/assets/image/rappelez-moi.png",routerLink:'/rappelez-moi'},
    { label: 'Une question ?', image: "/assets/image/une-question.png",routerLink:"/une-question" },
  ];
  selectedOptionIndex: number | null = null;

  selectOption(index: number): void {
    // Toggle selection
    if (this.selectedOptionIndex === index) {
      this.selectedOptionIndex = null; // Deselect option
    } else {
      this.selectedOptionIndex = index; // Select option
    }
  }

  navigateToRoute(): void {
    // Navigate only when a valid option is selected
    if (this.selectedOptionIndex !== null) {
      const selectedOption = this.options[this.selectedOptionIndex];
      if (selectedOption.routerLink) {
        this.router.navigate([selectedOption.routerLink]);
      }
    } else {
      alert('Please select an option first!');
    }
  }
  mail() {
    window.location.href = 'mailto:contact@sadiag.com';
     }
}
