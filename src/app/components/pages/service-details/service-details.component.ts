import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  Formrappel: FormGroup;

  constructor(private fb: FormBuilder) { emailjs.init('f9AWPNj9CCvQhsYTE');}

  ngOnInit() {
    this.Formrappel = this.fb.group({
      projet: new FormControl('', [Validators.required]),
      typeBien: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required])
    });
  }

  get formControls() {
    return this.Formrappel.controls;
  }

  onSubmit() {
    if (this.Formrappel.valid) {
      console.log('Form Submitted!', this.Formrappel.value);
    } else {
      console.log('Form is invalid');
    }
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
    'Question' :this.Formrappel.get('message').value,
    'Prénom' :this.Formrappel.get('prenom').value,
    'Nom' :this.Formrappel.get('nom').value,
    'Téléphone' :this.Formrappel.get('telephone').value,


  }




const params = {
 
  Title:'Nouveau Question',

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
}}
