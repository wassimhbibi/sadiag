import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';


@Component({
  selector: 'app-Demande particulière',
  templateUrl: './Demande particulière.component.html',
  styleUrls: ['./Demande particulière.component.scss']
})
export class DemandeparticulièreComponent implements OnInit {

  Formrappel: FormGroup;

  constructor(private fb: FormBuilder) {  emailjs.init('f9AWPNj9CCvQhsYTE');}

  ngOnInit() { this.Formrappel = this.fb.group({
    message:['', Validators.required],
    prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      nom_societe: ['',Validators.required] // Initially not required
    });
  }

  // Getter for form controls
  get formControls() {
    return this.Formrappel.controls;
  }

  // Set dynamic validators based on selected objective (Oui/Non)
  setActive(objective: string) {
    this.selectedObjective = objective;

    if (objective === 'Oui') {
      this.Formrappel.controls['nom_societe'].setValidators(Validators.required); // Make nom_societe required
    } else {
      this.Formrappel.controls['nom_societe'].clearValidators(); // Remove validators for nom_societe
    }

    this.Formrappel.controls['nom_societe'].updateValueAndValidity(); // Update form control state
  }

  // Custom form validation
  validateForm(): boolean {
    // Mark all fields as touched to trigger validation errors
    Object.keys(this.Formrappel.controls).forEach((key) => {
      this.Formrappel.controls[key].markAsTouched();
    });

    // Check if form is invalid
    if (this.Formrappel.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  // Send function with validation logic
  send() {
    if (!this.validateForm()) {
      console.log('Form validation failed.');
      return;
    }

    if (this.selectedObjective === 'Oui' && !this.Formrappel.controls['nom_societe'].value) {
      this.errorMessage = 'Veuillez saisir le nom de la société.';
      console.log('Company name is required when "Oui" is selected.');
      return;
    }

    console.log('Form validation passed. Proceeding to send mail.');
    this.sendMail();
  }


  options = [
    { label: 'Diagnostics Vente & Location',image: "/assets/image/logo-diag.png"},
    { label: 'Audit énergétique', image: "/assets/image/Form-audit-energitique.png" },
    { label: 'Amiante Travaux', image: "/assets/image/amiante-aat.jpg"},
    { label: 'Locaux Professionnels', image: "/assets/image/locaux.webp" },
    { label: 'Copropriété', image: "/assets/image/Comment-reconnaitre-un-immeuble-haussmannien.jpg"},
    { label: 'Mise en Copropriété', image: "/assets/image/mise-en-copropriete.jpg"},
    { label: 'Demande particulière', image: "/assets/image/demande-partic.png" },
  ];


  selectedObjective: string = '';
  selectedPropertyType: string = '';



  setPropertyType(type: string) {
    this.selectedPropertyType = type;
  }


  onSubmit() {
    if (this.Formrappel.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.errorMessage = '';
    alert('Form submitted successfully!');
  }
  requiredFields: string[] = [];

  errorMessage: string = '';

  sendMail() {


  
    Swal.fire({
      title: 'Envoi en cours...',
      text: 'Veuillez patienter pendant l\'envoi de votre email.',
      icon: 'info',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();  
      }
    });
  
    const obj ={
      'Objet de demande' :this.Formrappel.get('message').value,
      'Prénom' :this.Formrappel.get('prenom').value,
      'Nom' :this.Formrappel.get('nom').value,
      'Email' :this.Formrappel.get('email').value,
      'Téléphone' :this.Formrappel.get('telephone').value,
      'Êtes-vous une société ?':this.selectedObjective


    }
  
    if(this.selectedObjective==='Oui'){
      obj['Nom de la société'] = this.Formrappel.get('nom_societe').value;
    }
  
  
  const params = {
   
    Type:'Demande de Particuliére',
    Title1:'Informations personnelle :',
    

    selectedObjectives: Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n'),
  
   
  
    
  };
    
  
    emailjs.send('service_l2mbdwy', 'template_epnik3m', params)
      .then((response) => {
        Swal.fire({
          title: 'Nous accusons bonne réception de votre demande de devis',
          text: 'Notre équipe sengage à vous transmettre un devis détaillé dans les meilleurs délais. Si nécessaire, nous vous contacterons afin dobtenir davantage dinformations.',
          icon: 'success',
          confirmButtonText: 'OK'
      });
        
      })
      .catch((error) => {
        Swal.fire({
          icon: 'warning',
          text: 'Une erreur est survenue : ' + error,
      });
       
      });
  }


}