import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.scss']
})
export class ContactformComponent implements OnInit {

  Formrappel: FormGroup;

  constructor(private fb: FormBuilder) { emailjs.init('f9AWPNj9CCvQhsYTE')}

  ngOnInit() {
    this.Formrappel = this.fb.group({
      projet: new FormControl('', [Validators.required]),
      typeBien: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email  // Ensure the email is in the correct format
      ]),
      telephone: new FormControl('', [Validators.required])
    });
  }

  get formControls() {
    return this.Formrappel.controls;
  }
  setActive(type: string) {
    this.selectedObjectives = type;
  
  }
  onSubmit() {
    if (this.Formrappel.valid) {
      console.log('Form Submitted!', this.Formrappel.value);
    } else {
      console.log('Form is invalid');
    }
  }
  selectedObjectives: any = {};
  onSelectionChange(event: Event): void {
    debugger
    const value = (event.target as HTMLSelectElement).value;
    this.selectedObjectives.local = value;
    console.log('Selected value:', this.selectedObjectives.local);
  }

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
      'Projet' :this.Formrappel.get('projet').value,
      'Type du bien' :this.Formrappel.get('typeBien').value,
      'Message' :this.Formrappel.get('message').value,
      'Prénom' :this.Formrappel.get('prenom').value,
      'Nom' :this.Formrappel.get('nom').value,
      'Email' :this.Formrappel.get('email').value,
      'Téléphone' :this.Formrappel.get('telephone').value,


    }
  
 
  
  
  const params = {
   
    Title:'Nouveau Message',

    Message: Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n'), 
  };
    
  
    emailjs.send('service_l2mbdwy', 'template_w4yatgs', params)
      .then((response) => {
        Swal.fire({
          title: 'Merci de nous avoir contactés.',
          text: 'Nous avons bien reçu votre demande de rappel. Nous allons vous contacter dans les plus brefs délais.',
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
