import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  options = [
    { label: 'Diagnostics Vente & Location', image: "/assets/image/logo-diag.png", link: '/vente-et-location' },
    { label: 'Audit énergétique', image: "/assets/image/Form-audit-energitique.png", link: '/Audit-énergétique' },
    { label: 'Amiante Travaux', image: "/assets/image/amiante-aat.jpg", link: '/amiante-travaux-algorithme' },
    { label: 'Locaux Professionnels', image: "/assets/image/locaux.webp", link: '/locaux-professionnel' },
    { label: 'Copropriété', image: "/assets/image/Comment-reconnaitre-un-immeuble-haussmannien.jpg", link: '/Copropriete' },
    { label: 'Mise en Copropriété', image: "/assets/image/mise-en-copropriete.jpg", link: '/miseenCopropriete' },
    { label: 'Demande particulière', image: "/assets/image/demande-partic.png", link: '/Demandeparticulière' },
  ];
  
  selectedOptionIndex: number | null = null;
  
  selectOption(index: number): void {
    // Toggle selection: if already selected, deselect it; otherwise, select it
    if (this.selectedOptionIndex === index) {
      this.selectedOptionIndex = null;  // Deselect option
    } else {
      this.selectedOptionIndex = index;  // Select option
    }
  }
 mail() {
    window.location.href = 'mailto:contact@sadiag.com';
     }
  // This method returns the router link for the selected option
  getDynamicLink(): string {
    if (this.selectedOptionIndex === null) {
      return ''; // No link when no option is selected
    }
    return this.options[this.selectedOptionIndex].link;
  }
}