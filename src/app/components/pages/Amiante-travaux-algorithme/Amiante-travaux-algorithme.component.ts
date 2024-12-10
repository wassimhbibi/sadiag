import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';



@Component({
  selector: 'app-Amiante-travaux-algorithme',
  templateUrl: './Amiante-travaux-algorithme.component.html',
  styleUrls: ['./Amiante-travaux-algorithme.component.scss']
})
export class AmiantetravauxalgorithmeComponent implements OnInit {

  selectedObjectives: any = {};
  selectedObjectives2: any = {};

  step=1


  Formrappel: FormGroup;

  constructor(private fb: FormBuilder) {
    emailjs.init('f9AWPNj9CCvQhsYTE'); }

  ngOnInit() { this.Formrappel = this.fb.group({
    projet: new FormControl('', [Validators.required]),
    typeBien: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email  
    ]),
    telephone: new FormControl('', [Validators.required])
  });

  console.log(this.Formrappel.value)
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
  


get progressWidth() {
    return (this.step / 4) * 100;
  
  }
 

  errorMessage: string = '';
  setActiveRecheck():boolean{
    debugger
        /* step 1 */
    
    
        if ((this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition') && (this.selectedObjectives['Type de bien'] != 'Autre')) {

          // First validation condition: when "la rénovation ou la démolition concerne la surface totale du bien ? === Oui" and others
          if (this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
              this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
              this.selectedObjectives['Date de construction'] != 'Avant 1949') {
        
            // Validate that the necessary fields are filled
            if (!this.selectedObjectives['Adresse du bien'] ||
                !this.selectedObjectives['Code postal'] ||
                !this.selectedObjectives['Surface totale du bien'] ||
                !this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] ||
                !this.selectedObjectives['Date de construction']) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false; // Prevent further execution if validation fails
            }
        
            // Proceed with updating selectedObjectives if validation passes
            this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Date de construction': this.selectedObjectives['Date de construction'],
            };
        
            this.errorMessage = ''; // Clear error message
            return true;
          }
        else   if (this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
          this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
          this.selectedObjectives['Date de construction'] === 'Avant 1949') {
    
        // Validate that the necessary fields are filled
        if (!this.selectedObjectives['Adresse du bien'] ||
            !this.selectedObjectives['Code postal'] ||
            !this.selectedObjectives['Surface totale du bien'] ||
            !this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] ||
            !this.selectedObjectives['Date de construction']) {
          this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
          return false; // Prevent further execution if validation fails
        }
    
        // Proceed with updating selectedObjectives if validation passes
        this.selectedObjectives = {
          'Objectif': this.selectedObjectives['Objectif'],
          'Adresse du bien': this.selectedObjectives['Adresse du bien'],
          'Code postal': this.selectedObjectives['Code postal'],
          'Type de bien': this.selectedObjectives['Type de bien'],
          'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
          'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
          
          'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
          'Date de construction': this.selectedObjectives['Date de construction'],
        };
    
        this.errorMessage = ''; // Clear error message
        return true;
      }
      else   if (this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
        this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
        this.selectedObjectives['Date de construction'] === 'Avant 1949') {
  
      // Validate that the necessary fields are filled
      if (!this.selectedObjectives['Adresse du bien'] ||
          !this.selectedObjectives['Code postal'] ||
          !this.selectedObjectives['Surface totale du bien'] ||
          !this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] ||
          !this.selectedObjectives['Date de construction']||
        !this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition']) {
        this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
        return false; // Prevent further execution if validation fails
      }
  
      // Proceed with updating selectedObjectives if validation passes
      this.selectedObjectives = {
        'Objectif': this.selectedObjectives['Objectif'],
        'Adresse du bien': this.selectedObjectives['Adresse du bien'],
        'Code postal': this.selectedObjectives['Code postal'],
        'Type de bien': this.selectedObjectives['Type de bien'],
        'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
        'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
        'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
        'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
        'Date de construction': this.selectedObjectives['Date de construction'],
      };
  
      this.errorMessage = ''; // Clear error message
      return true;
    }
          // Second condition when "la rénovation ou la démolition concerne la surface totale du bien ? === Oui" and "Date de construction === Avant 1949"
          else if (this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
                   this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
                   this.selectedObjectives['Date de construction'] === 'Avant 1949') {
        
            // Validate that the necessary fields are filled
            if (!this.selectedObjectives['Nombre de prélèvements à effectuer'] ||
                !this.selectedObjectives['Adresse du bien'] ||
                !this.selectedObjectives['Code postal'] ||
                !this.selectedObjectives['Surface totale du bien'] ||
                !this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] ||
                !this.selectedObjectives['Date de construction'] ||
                !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false; // Prevent further execution if validation fails
            }
        
            // Proceed with updating selectedObjectives if validation passes
            this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
              
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Date de construction': this.selectedObjectives['Date de construction'],
              'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],
            };
        
            this.errorMessage = ''; // Clear error message
            return true;
          }
        
        
          
  
          else if (
            this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
            this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
            this.selectedObjectives['Date de construction'] === 'Avant 1949'
          ) {
            // Validate necessary fields
            if (!this.selectedObjectives['Adresse du bien'] ||
                !this.selectedObjectives['Code postal'] ||
                !this.selectedObjectives['Surface totale du bien'] ||
                !this.selectedObjectives['Date de construction']||
                !this.selectedObjectives['Nombre de prélèvements à effectuer']||
                !this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition']) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false; // Prevent further execution if validation fails
            }
          
            // Update selectedObjectives with the necessary fields
            this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
              
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
              'Date de construction': this.selectedObjectives['Date de construction'],
              'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']
            };
            
            this.errorMessage = ''; // Clear error message
            return true;
          }
          else if (
            this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
            this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
            this.selectedObjectives['Date de construction'] !== 'Avant 1949'
          ) {
            // Validate necessary fields
            if (!this.selectedObjectives['Adresse du bien'] ||
                !this.selectedObjectives['Code postal'] ||
                !this.selectedObjectives['Surface totale du bien'] ||
                !this.selectedObjectives['Date de construction']) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false; // Prevent further execution if validation fails
            }
          
            // Update selectedObjectives with the necessary fields
            this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
              
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
              'Date de construction': this.selectedObjectives['Date de construction']
            };
          
            this.errorMessage = ''; // Clear error message
            return true;
          }
          else if (
            this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
            this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
            this.selectedObjectives['Date de construction'] === 'Avant 1949'
          ) {
            // Validate necessary fields
            if (!this.selectedObjectives['Adresse du bien'] ||
                !this.selectedObjectives['Code postal'] ||
                !this.selectedObjectives['Surface totale du bien'] ||
                !this.selectedObjectives['Date de construction']) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false; // Prevent further execution if validation fails
            }
          
            // Update selectedObjectives with the necessary fields
            this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
              'Date de construction': this.selectedObjectives['Date de construction'],
              'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']
            };
          
            this.errorMessage = ''; // Clear error message
            return true;
          }
          else if (
            this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
            this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
            this.selectedObjectives['Date de construction'] !== 'Avant 1949'
          ) {
            // Validate necessary fields
            if (!this.selectedObjectives['Adresse du bien'] ||
                !this.selectedObjectives['Code postal'] ||
                !this.selectedObjectives['Surface totale du bien'] ||
                !this.selectedObjectives['Date de construction']) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false; // Prevent further execution if validation fails
            }
          
            // Update selectedObjectives with the necessary fields
            this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
              'Date de construction': this.selectedObjectives['Date de construction']
            };
          
            this.errorMessage = ''; // Clear error message
            return true;
          }
        }            
  
        if ((this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition') && (this.selectedObjectives['Type de bien'] === 'Autre')) {

          // First validation condition: when "la rénovation ou la démolition concerne la surface totale du bien ? === Oui" and others
          if (this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
              this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
              this.selectedObjectives['Date de construction'] != 'Avant 1949') {
        
            // Validate that the necessary fields are filled
            if (!this.selectedObjectives['Adresse du bien'] ||
                !this.selectedObjectives['Code postal'] ||
                !this.selectedObjectives['Surface totale du bien'] ||
                !this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] ||
                !this.selectedObjectives['Quel est le type du bien ?']||
                !this.selectedObjectives['Date de construction']) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false; // Prevent further execution if validation fails
            }
        
            // Proceed with updating selectedObjectives if validation passes
            this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Date de construction': this.selectedObjectives['Date de construction'],
            };
        
            this.errorMessage = ''; // Clear error message
            return true;
          }
        else   if (this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
          this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
          this.selectedObjectives['Date de construction'] === 'Avant 1949') {
    
        // Validate that the necessary fields are filled
        if (!this.selectedObjectives['Adresse du bien'] ||
            !this.selectedObjectives['Code postal'] ||
            !this.selectedObjectives['Surface totale du bien'] ||
            !this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] ||
            !this.selectedObjectives['Quel est le type du bien ?']||
            !this.selectedObjectives['Date de construction']) {
          this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
          return false; // Prevent further execution if validation fails
        }
    
        // Proceed with updating selectedObjectives if validation passes
        this.selectedObjectives = {
          'Objectif': this.selectedObjectives['Objectif'],
          'Adresse du bien': this.selectedObjectives['Adresse du bien'],
          'Code postal': this.selectedObjectives['Code postal'],
          'Type de bien': this.selectedObjectives['Type de bien'],
          'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
          'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
          'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
          'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
          'Date de construction': this.selectedObjectives['Date de construction'],
        };
    
        this.errorMessage = ''; // Clear error message
        return true;
      }
      else   if (this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
        this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
        this.selectedObjectives['Date de construction'] === 'Avant 1949') {
  
      // Validate that the necessary fields are filled
      if (!this.selectedObjectives['Adresse du bien'] ||
          !this.selectedObjectives['Code postal'] ||
          !this.selectedObjectives['Surface totale du bien'] ||
          !this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] ||
          !this.selectedObjectives['Date de construction']||
          !this.selectedObjectives['Quel est le type du bien ?']||
        !this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition']) {
        this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
        return false; // Prevent further execution if validation fails
      }
  
      // Proceed with updating selectedObjectives if validation passes
      this.selectedObjectives = {
        'Objectif': this.selectedObjectives['Objectif'],
        'Adresse du bien': this.selectedObjectives['Adresse du bien'],
        'Code postal': this.selectedObjectives['Code postal'],
        'Type de bien': this.selectedObjectives['Type de bien'],
        'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
        'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
        'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
        'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
        'Date de construction': this.selectedObjectives['Date de construction'],
        'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
      };
  
      this.errorMessage = ''; // Clear error message
      return true;
    }
          // Second condition when "la rénovation ou la démolition concerne la surface totale du bien ? === Oui" and "Date de construction === Avant 1949"
          else if (this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
                   this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
                   this.selectedObjectives['Date de construction'] === 'Avant 1949') {
        
            // Validate that the necessary fields are filled
            if (!this.selectedObjectives['Nombre de prélèvements à effectuer'] ||
                !this.selectedObjectives['Adresse du bien'] ||
                !this.selectedObjectives['Code postal'] ||
                !this.selectedObjectives['Surface totale du bien'] ||
                !this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] ||
                !this.selectedObjectives['Date de construction'] ||
                !this.selectedObjectives['Quel est le type du bien ?']||
                !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false; // Prevent further execution if validation fails
            }
        
            // Proceed with updating selectedObjectives if validation passes
            this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
              'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Date de construction': this.selectedObjectives['Date de construction'],
              'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],
            };
        
            this.errorMessage = ''; // Clear error message
            return true;
          }
        
        
          
  
          else if (
            this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
            this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
            this.selectedObjectives['Date de construction'] === 'Avant 1949'
          ) {
            // Validate necessary fields
            if (!this.selectedObjectives['Adresse du bien'] ||
                !this.selectedObjectives['Code postal'] ||
                !this.selectedObjectives['Quel est le type du bien ?']||
                !this.selectedObjectives['Surface totale du bien'] ||
                !this.selectedObjectives['Date de construction']||
                !this.selectedObjectives['Nombre de prélèvements à effectuer']||
                !this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition']) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false; // Prevent further execution if validation fails
            }
          
            // Update selectedObjectives with the necessary fields
            this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
              'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
              'Date de construction': this.selectedObjectives['Date de construction'],
              'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']
            };
            
            this.errorMessage = ''; // Clear error message
            return true;
          }
          else if (
            this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
            this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
            this.selectedObjectives['Date de construction'] !== 'Avant 1949'
          ) {
            // Validate necessary fields
            if (!this.selectedObjectives['Adresse du bien'] ||
                !this.selectedObjectives['Code postal'] ||
                !this.selectedObjectives['Quel est le type du bien ?']||
                !this.selectedObjectives['Surface totale du bien'] ||
                !this.selectedObjectives['Date de construction']) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false; // Prevent further execution if validation fails
            }
          
            // Update selectedObjectives with the necessary fields
            this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
              'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
              'Date de construction': this.selectedObjectives['Date de construction']
            };
          
            this.errorMessage = ''; // Clear error message
            return true;
          }
          else if (
            this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
            this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
            this.selectedObjectives['Date de construction'] === 'Avant 1949'
          ) {
            // Validate necessary fields
            if (!this.selectedObjectives['Adresse du bien'] ||
                !this.selectedObjectives['Code postal'] ||
                !this.selectedObjectives['Quel est le type du bien ?']||
                !this.selectedObjectives['Surface totale du bien'] ||
                !this.selectedObjectives['Date de construction']) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false; // Prevent further execution if validation fails
            }
          
            // Update selectedObjectives with the necessary fields
            this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
              'Date de construction': this.selectedObjectives['Date de construction'],
              'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']
            };
          
            this.errorMessage = ''; // Clear error message
            return true;
          }
          else if (
            this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
            this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
            this.selectedObjectives['Date de construction'] !== 'Avant 1949'
          ) {
            // Validate necessary fields
            if (!this.selectedObjectives['Adresse du bien'] ||
                !this.selectedObjectives['Code postal'] ||
                !this.selectedObjectives['Quel est le type du bien ?']||
                !this.selectedObjectives['Surface totale du bien'] ||
                !this.selectedObjectives['Date de construction']) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false; // Prevent further execution if validation fails
            }
          
            // Update selectedObjectives with the necessary fields
            this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
              'Date de construction': this.selectedObjectives['Date de construction']
            };
          
            this.errorMessage = ''; // Clear error message
            return true;
          }
        }       
    
       
    
        if (
          this.selectedObjectives['Objectif'] === 'Installation fibre optique' &&
          (this.selectedObjectives['Type de bien'] != 'Autre' && this.selectedObjectives['Type de bien'] != 'Immeuble collectif') &&
          this.selectedObjectives['Date de construction'] != 'Avant 1949'
        ) {
          // Validate necessary fields
          if (
            !this.selectedObjectives['Adresse du bien'] ||
            !this.selectedObjectives['Code postal'] 
        
          ) {
            this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
            return false;
          }
        
          // Update selectedObjectives with the necessary fields
          this.selectedObjectives = {
            'Objectif': this.selectedObjectives['Objectif'],
            'Adresse du bien': this.selectedObjectives['Adresse du bien'],
            'Code postal': this.selectedObjectives['Code postal'],
            'Type de bien': this.selectedObjectives['Type de bien'],
            'Date de construction': this.selectedObjectives['Date de construction'],
          };
        
          this.errorMessage = ''; // Clear error message
          return true;
        }
        
    
    
        if (
          this.selectedObjectives['Objectif'] === 'Installation fibre optique' &&
          (this.selectedObjectives['Type de bien'] != 'Autre' && this.selectedObjectives['Type de bien'] != 'Immeuble collectif') &&
          this.selectedObjectives['Date de construction'] === 'Avant 1949'
        ) {
          // Validate necessary fields
          if (
            !this.selectedObjectives['Adresse du bien'] ||
            !this.selectedObjectives['Code postal'] ||
            !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']
          ) {
            this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
            return false;
          }
        
          // Update selectedObjectives with the necessary fields
          this.selectedObjectives = {
            'Objectif': this.selectedObjectives['Objectif'],
            'Adresse du bien': this.selectedObjectives['Adresse du bien'],
            'Code postal': this.selectedObjectives['Code postal'],
            'Type de bien': this.selectedObjectives['Type de bien'],
            'Date de construction': this.selectedObjectives['Date de construction'],
            'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']
          };
        
          this.errorMessage = ''; // Clear error message
          return true;
        }
    
    
        if (
          this.selectedObjectives['Objectif'] === 'Installation fibre optique' &&
          this.selectedObjectives['Type de bien'] === 'Immeuble collectif' &&
          this.selectedObjectives['Date de construction'] === 'Avant 1949'
        ) {
          // Validate necessary fields
          if (
            !this.selectedObjectives['Adresse du bien'] ||
            !this.selectedObjectives['Code postal'] ||
            !this.selectedObjectives['Combien dimmeubles sont concernés par ce diagnostic amiante ?'] ||
            !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']
          ) {
            this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
            return false;
          }
        
          // Update selectedObjectives with the necessary fields
          this.selectedObjectives = {
            'Objectif': this.selectedObjectives['Objectif'],
            'Adresse du bien': this.selectedObjectives['Adresse du bien'],
            'Code postal': this.selectedObjectives['Code postal'],
            'Type de bien': this.selectedObjectives['Type de bien'],
            'Combien dimmeubles sont concernés par ce diagnostic amiante ?': this.selectedObjectives['Combien dimmeubles sont concernés par ce diagnostic amiante ?'],
            'Date de construction': this.selectedObjectives['Date de construction'],
            'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],
          };
        
          this.errorMessage = ''; // Clear error message
          return true;
        }
        
        if (
          this.selectedObjectives['Objectif'] === 'Installation fibre optique' &&
          this.selectedObjectives['Type de bien'] === 'Immeuble collectif' &&
          this.selectedObjectives['Date de construction'] != 'Avant 1949'
        ) {
          // Validate necessary fields
          if (
            !this.selectedObjectives['Adresse du bien'] ||
            !this.selectedObjectives['Code postal'] ||
            !this.selectedObjectives['Combien dimmeubles sont concernés par ce diagnostic amiante ?']||
          !this.selectedObjectives['Date de construction']
          ) {
            this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
            return false;
          }
        
          // Update selectedObjectives with the necessary fields
          this.selectedObjectives = {
            'Objectif': this.selectedObjectives['Objectif'],
            'Adresse du bien': this.selectedObjectives['Adresse du bien'],
            'Code postal': this.selectedObjectives['Code postal'],
            'Type de bien': this.selectedObjectives['Type de bien'],
            'Date de construction': this.selectedObjectives['Date de construction'],
          };
        
          this.errorMessage = ''; // Clear error message
          return true;
        }
    
    
        if (
          this.selectedObjectives['Objectif'] === 'Installation fibre optique' &&
          this.selectedObjectives['Type de bien'] === 'Autre' &&
          this.selectedObjectives['Date de construction'] === 'Avant 1949'
        ) {
          // Validate necessary fields
          if (
            !this.selectedObjectives['Adresse du bien'] ||
            !this.selectedObjectives['Code postal'] ||
            !this.selectedObjectives['Quel est le type du bien ?'] ||
            !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']
          ) {
            this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
            return false;
          }
        
          // Update selectedObjectives with the necessary fields
          this.selectedObjectives = {
            'Objectif': this.selectedObjectives['Objectif'],
            'Adresse du bien': this.selectedObjectives['Adresse du bien'],
            'Code postal': this.selectedObjectives['Code postal'],
            'Type de bien': this.selectedObjectives['Type de bien'],
            'Quel est le type du bien ?': this.selectedObjectives['Quel est le type du bien ?'],
            'Date de construction': this.selectedObjectives['Date de construction'],
            'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],
          };
        
          this.errorMessage = ''; // Clear error message
          return true;
        }
        
    
        if (
          this.selectedObjectives['Objectif'] === 'Installation fibre optique' &&
          this.selectedObjectives['Type de bien'] === 'Autre' &&
          this.selectedObjectives['Date de construction'] != 'Avant 1949'
        ) {
          // Validate necessary fields
          if (
            !this.selectedObjectives['Adresse du bien'] ||
            !this.selectedObjectives['Code postal'] ||
            !this.selectedObjectives['Quel est le type du bien ?'] ||
            !this.selectedObjectives['Date de construction']
          ) {
            this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
            return false;
          }
        
          // Update selectedObjectives with the necessary fields
          this.selectedObjectives = {
            'Objectif': this.selectedObjectives['Objectif'],
            'Adresse du bien': this.selectedObjectives['Adresse du bien'],
            'Code postal': this.selectedObjectives['Code postal'],
            'Type de bien': this.selectedObjectives['Type de bien'],
            'Quel est le type du bien ?': this.selectedObjectives['Quel est le type du bien ?'],
            'Date de construction': this.selectedObjectives['Date de construction'],
          };
        
          this.errorMessage = ''; // Clear error message
          return true;
        }
    
        if (this.selectedObjectives['Objectif'] === 'Amiante voirie') {
          // Validate necessary fields
          if (
            !this.selectedObjectives['Adresse du bien'] ||
            !this.selectedObjectives['Code postal'] ||
            !this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?']
          ) {
            this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
            return false;
          }
        
          // Update selectedObjectives with the necessary fields
          this.selectedObjectives = {
            'Objectif': this.selectedObjectives['Objectif'],
            'Adresse du bien': this.selectedObjectives['Adresse du bien'],
            'Code postal': this.selectedObjectives['Code postal'],
            'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
          };
        
          this.errorMessage = ''; // Clear error message
          return true;
        }
        
    
    
    
    
      if(this.selectedObjectives['Objectif']==='Autre' && this.selectedObjectives['Type de bien']!='Autre'){
    
        if (this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
          this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
          this.selectedObjectives['Date de construction'] !== 'Avant 1949') {
          
          // Validate necessary fields before updating
          if (
              !this.selectedObjectives['Objectif'] ||
              !this.selectedObjectives['Quel est le type de votre projet ?'] ||
              !this.selectedObjectives['Adresse du bien'] ||
              !this.selectedObjectives['Code postal'] ||
              !this.selectedObjectives['Type de bien'] ||
              !this.selectedObjectives['Surface totale du bien'] ||
            
              !this.selectedObjectives['Date de construction']
          ) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false;
          }
          
          // Update selectedObjectives if validation passes
          this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Date de construction': this.selectedObjectives['Date de construction'],
          };
      
          // Clear error message
          this.errorMessage = '';
          return true; // Return true if the update was successful
      }
      
      else if (
        this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
        this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
        this.selectedObjectives['Date de construction'] === 'Avant 1949'
    ) {
        // Validate necessary fields before updating
        if (
            !this.selectedObjectives['Objectif'] ||
            !this.selectedObjectives['Quel est le type de votre projet ?'] ||
            !this.selectedObjectives['Adresse du bien'] ||
            !this.selectedObjectives['Code postal'] ||
            !this.selectedObjectives['Type de bien'] ||
            !this.selectedObjectives['Surface totale du bien'] ||
            !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
            !this.selectedObjectives['Nombre de prélèvements à effectuer'] ||
            !this.selectedObjectives['Date de construction'] ||
            !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']
        ) {
            this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
            return false;
        }
    
        // Update selectedObjectives if validation passes
        this.selectedObjectives = {
            'Objectif': this.selectedObjectives['Objectif'],
            'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
            'Adresse du bien': this.selectedObjectives['Adresse du bien'],
            'Code postal': this.selectedObjectives['Code postal'],
            'Type de bien': this.selectedObjectives['Type de bien'],
            'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
            'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
            'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
            'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
            'Date de construction': this.selectedObjectives['Date de construction'],
            'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],
        };
    
        // Clear error message if validation passes
        this.errorMessage = '';
        return true; // Return true if update is successful
    }
    
      
    else if (
      this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
      this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
      this.selectedObjectives['Date de construction'] !== 'Avant 1949'
  ) {
      // Validate necessary fields before updating
      if (
          !this.selectedObjectives['Objectif'] ||
          !this.selectedObjectives['Quel est le type de votre projet ?'] ||
          !this.selectedObjectives['Adresse du bien'] ||
          !this.selectedObjectives['Code postal'] ||
          !this.selectedObjectives['Type de bien'] ||
          !this.selectedObjectives['Surface totale du bien'] ||
          !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
          !this.selectedObjectives['Nombre de prélèvements à effectuer'] ||
          !this.selectedObjectives['Date de construction']
      ) {
          this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
          return false;
      }
  
      // Update selectedObjectives if validation passes
      this.selectedObjectives = {
          'Objectif': this.selectedObjectives['Objectif'],
          'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
          'Adresse du bien': this.selectedObjectives['Adresse du bien'],
          'Code postal': this.selectedObjectives['Code postal'],
          'Type de bien': this.selectedObjectives['Type de bien'],
          'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
          'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
          'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
          'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
          'Date de construction': this.selectedObjectives['Date de construction'],
      };
  
      // Clear error message if validation passes
      this.errorMessage = '';
      return true; // Return true if update is successful
  }
  
  else if (
    this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
    this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
    this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
    // Validate necessary fields before updating
    if (
        !this.selectedObjectives['Objectif'] ||
        !this.selectedObjectives['Quel est le type de votre projet ?'] ||
        !this.selectedObjectives['Adresse du bien'] ||
        !this.selectedObjectives['Code postal'] ||
        !this.selectedObjectives['Type de bien'] ||
        !this.selectedObjectives['Surface totale du bien'] ||
        !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
        !this.selectedObjectives['Date de construction'] ||
        !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']
    ) {
        this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
        return false;
    }

    // Update selectedObjectives if validation passes
    this.selectedObjectives = {
        'Objectif': this.selectedObjectives['Objectif'],
        'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
        'Adresse du bien': this.selectedObjectives['Adresse du bien'],
        'Code postal': this.selectedObjectives['Code postal'],
        'Type de bien': this.selectedObjectives['Type de bien'],
        'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
        'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
        'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
        'Date de construction': this.selectedObjectives['Date de construction'],
        'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],
    };

    // Clear error message if validation passes
    this.errorMessage = '';
    return true; // Return true if update is successful
}

    
else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
  // Validate necessary fields before updating
  if (
      !this.selectedObjectives['Objectif'] ||
      !this.selectedObjectives['Quel est le type de votre projet ?'] ||
      !this.selectedObjectives['Adresse du bien'] ||
      !this.selectedObjectives['Code postal'] ||
      !this.selectedObjectives['Type de bien'] ||
      !this.selectedObjectives['Surface totale du bien'] ||
      !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
      !this.selectedObjectives['Date de construction'] ||
      !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] ||
      !this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
      return false;
  }

  // Update selectedObjectives if validation passes
  this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
      'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
      'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
      'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
      'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
      'Date de construction': this.selectedObjectives['Date de construction'],
      'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],
  };

  // Clear error message if validation passes
  this.errorMessage = '';
  return true; // Return true if update is successful
}

else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {
  // Validate necessary fields before updating
  if (
      !this.selectedObjectives['Objectif'] ||
      !this.selectedObjectives['Quel est le type de votre projet ?'] ||
      !this.selectedObjectives['Adresse du bien'] ||
      !this.selectedObjectives['Code postal'] ||
      !this.selectedObjectives['Type de bien'] ||
      !this.selectedObjectives['Surface totale du bien'] ||
      !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
      !this.selectedObjectives['Date de construction'] ||
      !this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
      return false;
  }

  // Update selectedObjectives if validation passes
  this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
      'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
      'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
      'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
      'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
      'Date de construction': this.selectedObjectives['Date de construction'],
  };

  // Clear error message if validation passes
  this.errorMessage = '';
  return true; // Return true if update is successful
}

else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
  // Validate necessary fields before updating
  if (
      !this.selectedObjectives['Objectif'] ||
      !this.selectedObjectives['Quel est le type de votre projet ?'] ||
      !this.selectedObjectives['Adresse du bien'] ||
      !this.selectedObjectives['Code postal'] ||
      !this.selectedObjectives['Type de bien'] ||
      !this.selectedObjectives['Surface totale du bien'] ||
      !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
      !this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'] ||
      !this.selectedObjectives['Date de construction'] ||
      !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
      return false;
  }

  // Update selectedObjectives if validation passes
  this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
      'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
      'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
      'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
      'Date de construction': this.selectedObjectives['Date de construction'],
      'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],
  };

  // Clear error message if validation passes
  this.errorMessage = '';
  return true; // Return true if update is successful
}

    
    
else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {
  // Validate necessary fields before updating
  if (
      !this.selectedObjectives['Objectif'] ||
      !this.selectedObjectives['Quel est le type de votre projet ?'] ||
      !this.selectedObjectives['Adresse du bien'] ||
      !this.selectedObjectives['Code postal'] ||
      !this.selectedObjectives['Type de bien'] ||
      !this.selectedObjectives['Surface totale du bien'] ||
      !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
      !this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'] ||
      !this.selectedObjectives['Date de construction']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
      return false;
  }

  // Update selectedObjectives if validation passes
  this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
      'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
      'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
      'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
      'Date de construction': this.selectedObjectives['Date de construction'],
  };

  // Clear error message if validation passes
  this.errorMessage = '';
  return true; // Return true if update is successful
}

    
    
      }
    
    
      if(this.selectedObjectives['Objectif']==='Autre' && this.selectedObjectives['Type de bien']==='Autre'){
    
        if (this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
          this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
          this.selectedObjectives['Date de construction'] !== 'Avant 1949') {
          
          // Validate necessary fields before updating
          if (
              !this.selectedObjectives['Objectif'] ||
              !this.selectedObjectives['Quel est le type de votre projet ?'] ||
              !this.selectedObjectives['Adresse du bien'] ||
              !this.selectedObjectives['Code postal'] ||
              !this.selectedObjectives['Type de bien'] ||
              !this.selectedObjectives['Surface totale du bien'] ||
              !this.selectedObjectives['Quel est le type du bien ?']||
              !this.selectedObjectives['Date de construction']
          ) {
              this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
              return false;
          }
          
          // Update selectedObjectives if validation passes
          this.selectedObjectives = {
              'Objectif': this.selectedObjectives['Objectif'],
              'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
              'Adresse du bien': this.selectedObjectives['Adresse du bien'],
              'Code postal': this.selectedObjectives['Code postal'],
              'Type de bien': this.selectedObjectives['Type de bien'],
              'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
              'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
              'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
              'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
              'Date de construction': this.selectedObjectives['Date de construction'],
          };
      
          // Clear error message
          this.errorMessage = '';
          return true; // Return true if the update was successful
      }
      
      else if (
        this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
        this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
        this.selectedObjectives['Date de construction'] === 'Avant 1949'
    ) {
        // Validate necessary fields before updating
        if (
            !this.selectedObjectives['Objectif'] ||
            !this.selectedObjectives['Quel est le type de votre projet ?'] ||
            !this.selectedObjectives['Adresse du bien'] ||
            !this.selectedObjectives['Code postal'] ||
            !this.selectedObjectives['Type de bien'] ||
            !this.selectedObjectives['Surface totale du bien'] ||
            !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
            !this.selectedObjectives['Nombre de prélèvements à effectuer'] ||
            !this.selectedObjectives['Date de construction'] ||
            !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']||
            !this.selectedObjectives['Quel est le type du bien ?']
        ) {
            this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
            return false;
        }
    
        // Update selectedObjectives if validation passes
        this.selectedObjectives = {
            'Objectif': this.selectedObjectives['Objectif'],
            'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
            'Adresse du bien': this.selectedObjectives['Adresse du bien'],
            'Code postal': this.selectedObjectives['Code postal'],
            'Type de bien': this.selectedObjectives['Type de bien'],
            'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
            'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
            'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
            'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
            'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
            'Date de construction': this.selectedObjectives['Date de construction'],
            'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],
        };
    
        // Clear error message if validation passes
        this.errorMessage = '';
        return true; // Return true if update is successful
    }
    
      
    else if (
      this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
      this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
      this.selectedObjectives['Date de construction'] !== 'Avant 1949'
  ) {
      // Validate necessary fields before updating
      if (
          !this.selectedObjectives['Objectif'] ||
          !this.selectedObjectives['Quel est le type de votre projet ?'] ||
          !this.selectedObjectives['Adresse du bien'] ||
          !this.selectedObjectives['Code postal'] ||
          !this.selectedObjectives['Type de bien'] ||
          !this.selectedObjectives['Surface totale du bien'] ||
          !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
          !this.selectedObjectives['Nombre de prélèvements à effectuer'] ||
          !this.selectedObjectives['Date de construction']||
          !this.selectedObjectives['Quel est le type du bien ?']
      ) {
          this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
          return false;
      }
  
      // Update selectedObjectives if validation passes
      this.selectedObjectives = {
          'Objectif': this.selectedObjectives['Objectif'],
          'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
          'Adresse du bien': this.selectedObjectives['Adresse du bien'],
          'Code postal': this.selectedObjectives['Code postal'],
          'Type de bien': this.selectedObjectives['Type de bien'],
          'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
          'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
          'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
          'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
          'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
          'Date de construction': this.selectedObjectives['Date de construction'],
      };
  
      // Clear error message if validation passes
      this.errorMessage = '';
      return true; // Return true if update is successful
  }
  
  else if (
    this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
    this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
    this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
    // Validate necessary fields before updating
    if (
        !this.selectedObjectives['Objectif'] ||
        !this.selectedObjectives['Quel est le type de votre projet ?'] ||
        !this.selectedObjectives['Adresse du bien'] ||
        !this.selectedObjectives['Code postal'] ||
        !this.selectedObjectives['Type de bien'] ||
        !this.selectedObjectives['Surface totale du bien'] ||
        !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
        !this.selectedObjectives['Date de construction'] ||
        !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']||
        !this.selectedObjectives['Quel est le type du bien ?']
    ) {
        this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
        return false;
    }

    // Update selectedObjectives if validation passes
    this.selectedObjectives = {
        'Objectif': this.selectedObjectives['Objectif'],
        'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
        'Adresse du bien': this.selectedObjectives['Adresse du bien'],
        'Code postal': this.selectedObjectives['Code postal'],
        'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
        'Type de bien': this.selectedObjectives['Type de bien'],
        'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
        'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
        'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
        'Date de construction': this.selectedObjectives['Date de construction'],
        'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],
    };

    // Clear error message if validation passes
    this.errorMessage = '';
    return true; // Return true if update is successful
}

    
else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
  // Validate necessary fields before updating
  if (
      !this.selectedObjectives['Objectif'] ||
      !this.selectedObjectives['Quel est le type de votre projet ?'] ||
      !this.selectedObjectives['Adresse du bien'] ||
      !this.selectedObjectives['Code postal'] ||
      !this.selectedObjectives['Type de bien'] ||
      !this.selectedObjectives['Surface totale du bien'] ||
      !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
      !this.selectedObjectives['Date de construction'] ||
      !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] ||
      !this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition']||
      !this.selectedObjectives['Quel est le type du bien ?']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
      return false;
  }

  // Update selectedObjectives if validation passes
  this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
      'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
      'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
      'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
      'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
      'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
      'Date de construction': this.selectedObjectives['Date de construction'],
      'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],
  };

  // Clear error message if validation passes
  this.errorMessage = '';
  return true; // Return true if update is successful
}

else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {
  // Validate necessary fields before updating
  if (
      !this.selectedObjectives['Objectif'] ||
      !this.selectedObjectives['Quel est le type de votre projet ?'] ||
      !this.selectedObjectives['Adresse du bien'] ||
      !this.selectedObjectives['Code postal'] ||
      !this.selectedObjectives['Type de bien'] ||
      !this.selectedObjectives['Surface totale du bien'] ||
      !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
      !this.selectedObjectives['Date de construction'] ||
      !this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition']||
      !this.selectedObjectives['Quel est le type du bien ?']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
      return false;
  }

  // Update selectedObjectives if validation passes
  this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
      'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
      'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
      'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
      'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
      'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
      'Date de construction': this.selectedObjectives['Date de construction'],
  };

  // Clear error message if validation passes
  this.errorMessage = '';
  return true; // Return true if update is successful
}

else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
  // Validate necessary fields before updating
  if (
      !this.selectedObjectives['Objectif'] ||
      !this.selectedObjectives['Quel est le type de votre projet ?'] ||
      !this.selectedObjectives['Adresse du bien'] ||
      !this.selectedObjectives['Code postal'] ||
      !this.selectedObjectives['Type de bien'] ||
      !this.selectedObjectives['Surface totale du bien'] ||
      !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
      !this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'] ||
      !this.selectedObjectives['Date de construction'] ||
      !this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?']||
      !this.selectedObjectives['Quel est le type du bien ?']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
      return false;
  }

  // Update selectedObjectives if validation passes
  this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
      'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
      'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
      'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
      'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
      'Date de construction': this.selectedObjectives['Date de construction'],
      'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],
  };

  // Clear error message if validation passes
  this.errorMessage = '';
  return true; // Return true if update is successful
}

    
    
else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {
  // Validate necessary fields before updating
  if (
      !this.selectedObjectives['Objectif'] ||
      !this.selectedObjectives['Quel est le type de votre projet ?'] ||
      !this.selectedObjectives['Adresse du bien'] ||
      !this.selectedObjectives['Code postal'] ||
      !this.selectedObjectives['Type de bien'] ||
      !this.selectedObjectives['Surface totale du bien'] ||
      !this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] ||
      !this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'] ||
      !this.selectedObjectives['Date de construction']||
      !this.selectedObjectives['Quel est le type du bien ?']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires avant de continuer.';
      return false;
  }

  // Update selectedObjectives if validation passes
  this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Quel est le type de votre projet ?': this.selectedObjectives['Quel est le type de votre projet ?'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
      'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
      'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
      'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
      'Date de construction': this.selectedObjectives['Date de construction'],
  };

  // Clear error message if validation passes
  this.errorMessage = '';
  return true; // Return true if update is successful
}

    
    
      }
    
    
    
     /**/
    
    
     /* step3-forms */
    
     if(this.selectedObjectives2['Type de donneur d ordre']==='particulier (propriétaire du bien)'){
      this.selectedObjectives2 = {
        'Type de donneur d ordre': this.selectedObjectives2['Type de donneur d ordre'],
    
        'Prénom': this.selectedObjectives2['Prénom'],
        'Nom': this.selectedObjectives2['Nom'],
        'Email': this.selectedObjectives2['Email'],
        'Téléphone': this.selectedObjectives2['Téléphone'],
        'Commentaire': this.selectedObjectives2['Commentaire'],
    
    
      };
    
    }
    
    if(this.selectedObjectives2['Type de donneur d ordre']==='société (propriétaire du bien)'){
      this.selectedObjectives2 = {
        'Type de donneur d ordre': this.selectedObjectives2['Type de donneur d ordre'],
        'Nom de votre société': this.selectedObjectives2['Nom de votre société'],
        'Prénom': this.selectedObjectives2['Prénom'],
        'Nom': this.selectedObjectives2['Nom'],
        'Email': this.selectedObjectives2['Email'],
        'Téléphone': this.selectedObjectives2['Téléphone'],
        'Commentaire': this.selectedObjectives2['Commentaire'],
    
    
      };
    
    }
    
    if(this.selectedObjectives2['Type de donneur d ordre']==='professionnel mandaté par le propriétaire' && this.selectedObjectives2['Votre client est un(e)'] === 'particulier'){
      this.selectedObjectives2 = {
        'Votre client est un(e)':this.selectedObjectives2['Votre client est un(e)'],
        'Type de donneur d ordre': this.selectedObjectives2['Type de donneur d ordre'],
        'Prénom': this.selectedObjectives2['Prénom'],
        'Nom': this.selectedObjectives2['Nom'],
        'Email': this.selectedObjectives2['Email'],
        'Téléphone': this.selectedObjectives2['Téléphone'],
        'Nom de votre société (intermédiaire)': this.selectedObjectives2['Nom de votre société (intermédiaire)'],
        'Prénom du client': this.selectedObjectives2['Prénom du client'],
        'Nom du client': this.selectedObjectives2['Nom du client'],
        'Email de client': this.selectedObjectives2['Email de client'],
        'Téléphone de client': this.selectedObjectives2['Téléphone de client'],
        'Commentaire': this.selectedObjectives2['Commentaire'],
    
    
      };
    
    }
    
    if(this.selectedObjectives2['Type de donneur d ordre']==='professionnel mandaté par le propriétaire' && this.selectedObjectives2['Votre client est un(e)'] === 'Société'){
      this.selectedObjectives2 = {
        'Votre client est un(e)':this.selectedObjectives2['Votre client est un(e)'],
    
        'Type de donneur d ordre': this.selectedObjectives2['Type de donneur d ordre'],
        'Prénom': this.selectedObjectives2['Prénom'],
        'Nom': this.selectedObjectives2['Nom'],
        'Email': this.selectedObjectives2['Email'],
        'Téléphone': this.selectedObjectives2['Téléphone'],
        'Nom de votre société (intermédiaire)': this.selectedObjectives2['Nom de votre société (intermédiaire)'],
    
        'Nom de votre société (client)': this.selectedObjectives2['Nom de votre société (client)'],
        'Nom du contact principal': this.selectedObjectives2['Nom du contact principal'],
        'Email de contact principal': this.selectedObjectives2['Email de contact principal'],
        'Téléphone de contact principal': this.selectedObjectives2['Téléphone de contact principal'],
        'Commentaire': this.selectedObjectives2['Commentaire'],
    
    
      };
    
    }
    /**/
    
    
      }




 
  setActive(type: string, value: string) {


  if(this.step===1){

    if((this.selectedObjectives['Objectif']==='Rénovation' || this.selectedObjectives['Objectif']==='Démolition') && (this.selectedObjectives['Type de bien']!='Autre') ){

      if(this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?']==='Oui' && this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?']==='Non je ne sais pas' && this.selectedObjectives['Date de construction'] != 'Avant 1949' ){

        this.selectedObjectives = {
          'Objectif': this.selectedObjectives['Objectif'],
          'Adresse du bien': this.selectedObjectives['Adresse du bien'],
          'Code postal': this.selectedObjectives['Code postal'],
          'Type de bien': this.selectedObjectives['Type de bien'],
          'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
          'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
          'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
          'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
          'Date de construction': this.selectedObjectives['Date de construction'],
        };


      }

      else if (
        this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
        this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
        this.selectedObjectives['Date de construction'] === 'Avant 1949'
    ) {
      this.selectedObjectives = {
        'Objectif': this.selectedObjectives['Objectif'],
        'Adresse du bien': this.selectedObjectives['Adresse du bien'],
        'Code postal': this.selectedObjectives['Code postal'],
        'Type de bien': this.selectedObjectives['Type de bien'],
        'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
        'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
        'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
        'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
        'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
        'Date de construction': this.selectedObjectives['Date de construction'],
        'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],

      };
    }
    
    else if (
      this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
      this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
      this.selectedObjectives['Date de construction'] != 'Avant 1949'
  ) {
    this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
      'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
      'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
      'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
      'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
      'Date de construction': this.selectedObjectives['Date de construction'],

    };
  }
  
  else if (
    this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
    this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
    this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
  this.selectedObjectives = {
    'Objectif': this.selectedObjectives['Objectif'],
    'Adresse du bien': this.selectedObjectives['Adresse du bien'],
    'Code postal': this.selectedObjectives['Code postal'],
    'Type de bien': this.selectedObjectives['Type de bien'],
    'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
    'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
    'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
    'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
    'Date de construction': this.selectedObjectives['Date de construction'],
    'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],


  };
}

else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
  this.selectedObjectives = {
    'Objectif': this.selectedObjectives['Objectif'],
    'Adresse du bien': this.selectedObjectives['Adresse du bien'],
    'Code postal': this.selectedObjectives['Code postal'],
    'Type de bien': this.selectedObjectives['Type de bien'],
    'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
    'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
    'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
    'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
    'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
    'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
    'Date de construction': this.selectedObjectives['Date de construction'],
    'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],


  };
}

else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {

  this.selectedObjectives = {
    'Objectif': this.selectedObjectives['Objectif'],
    'Adresse du bien': this.selectedObjectives['Adresse du bien'],
    'Code postal': this.selectedObjectives['Code postal'],
    'Type de bien': this.selectedObjectives['Type de bien'],
    'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
    'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
    'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
    'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
    'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
    'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
    'Date de construction': this.selectedObjectives['Date de construction'],


  };
  
}

else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
  this.selectedObjectives = {
    'Objectif': this.selectedObjectives['Objectif'],
    'Adresse du bien': this.selectedObjectives['Adresse du bien'],
    'Code postal': this.selectedObjectives['Code postal'],
    'Type de bien': this.selectedObjectives['Type de bien'],
    'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
    'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
    'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
    'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
    'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
    'Date de construction': this.selectedObjectives['Date de construction'],
    'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],



  };
}


else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {
  this.selectedObjectives = {
    'Objectif': this.selectedObjectives['Objectif'],
    'Adresse du bien': this.selectedObjectives['Adresse du bien'],
    'Code postal': this.selectedObjectives['Code postal'],
    'Type de bien': this.selectedObjectives['Type de bien'],
    'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
    'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
    'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
    'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
    'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
    'Date de construction': this.selectedObjectives['Date de construction'],



  };
}



    }

    if((this.selectedObjectives['Objectif']==='Rénovation' || this.selectedObjectives['Objectif']==='Démolition') && (this.selectedObjectives['Type de bien']==='Autre') ){


      if(this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?']==='Oui' && this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?']==='Non je ne sais pas' && this.selectedObjectives['Date de construction'] != 'Avant 1949' ){

        this.selectedObjectives = {
          'Objectif': this.selectedObjectives['Objectif'],
          'Adresse du bien': this.selectedObjectives['Adresse du bien'],
          'Code postal': this.selectedObjectives['Code postal'],
          'Type de bien': this.selectedObjectives['Type de bien'],
              'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

          'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
          'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
          'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
          'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
          'Date de construction': this.selectedObjectives['Date de construction'],
        };


      }

      else if (
        this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
        this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
        this.selectedObjectives['Date de construction'] === 'Avant 1949'
    ) {
      this.selectedObjectives = {
        'Objectif': this.selectedObjectives['Objectif'],
        'Adresse du bien': this.selectedObjectives['Adresse du bien'],
        'Code postal': this.selectedObjectives['Code postal'],
        'Type de bien': this.selectedObjectives['Type de bien'],
        'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

        'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
        'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
        'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
        'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
        'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
        'Date de construction': this.selectedObjectives['Date de construction'],
        'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],

      };
    }
    
    else if (
      this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
      this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
      this.selectedObjectives['Date de construction'] != 'Avant 1949'
  ) {
    this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

      'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
      'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
      'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
      'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
      'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
      'Date de construction': this.selectedObjectives['Date de construction'],

    };
  }
  
  else if (
    this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
    this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
    this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
  this.selectedObjectives = {
    'Objectif': this.selectedObjectives['Objectif'],
    'Adresse du bien': this.selectedObjectives['Adresse du bien'],
    'Code postal': this.selectedObjectives['Code postal'],
    'Type de bien': this.selectedObjectives['Type de bien'],
    'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

    'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
    'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
    'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
    'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
    'Date de construction': this.selectedObjectives['Date de construction'],
    'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],


  };
}

else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
  this.selectedObjectives = {
    'Objectif': this.selectedObjectives['Objectif'],
    'Adresse du bien': this.selectedObjectives['Adresse du bien'],
    'Code postal': this.selectedObjectives['Code postal'],
    'Type de bien': this.selectedObjectives['Type de bien'],
    'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

    'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
    'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
    'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
    'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
    'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
    'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
    'Date de construction': this.selectedObjectives['Date de construction'],
    'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],


  };
}

else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {

  this.selectedObjectives = {
    'Objectif': this.selectedObjectives['Objectif'],
    'Adresse du bien': this.selectedObjectives['Adresse du bien'],
    'Code postal': this.selectedObjectives['Code postal'],
    'Type de bien': this.selectedObjectives['Type de bien'],
    'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

    'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
    'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
    'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
    'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
    'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
    'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
    'Date de construction': this.selectedObjectives['Date de construction'],


  };
  
}

else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
  this.selectedObjectives = {
    'Objectif': this.selectedObjectives['Objectif'],
    'Adresse du bien': this.selectedObjectives['Adresse du bien'],
    'Code postal': this.selectedObjectives['Code postal'],
    'Type de bien': this.selectedObjectives['Type de bien'],
    'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

    'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
    'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
    'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
    'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
    'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
    'Date de construction': this.selectedObjectives['Date de construction'],
    'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],



  };
}


else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {
  this.selectedObjectives = {
    'Objectif': this.selectedObjectives['Objectif'],
    'Adresse du bien': this.selectedObjectives['Adresse du bien'],
    'Code postal': this.selectedObjectives['Code postal'],
    'Type de bien': this.selectedObjectives['Type de bien'],
    'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
    'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
    'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
    'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
    'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
    'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
    'Date de construction': this.selectedObjectives['Date de construction'],

  };
}


    }

    if((this.selectedObjectives['Objectif']==='Installation fibre optique') && (this.selectedObjectives['Type de bien']!='Autre' && this.selectedObjectives['Type de bien']!='Immeuble collectif') && this.selectedObjectives['Date de construction']==='Avant 1949'){



        this.selectedObjectives = {
          'Objectif': this.selectedObjectives['Objectif'],
          'Adresse du bien': this.selectedObjectives['Adresse du bien'],
          'Code postal': this.selectedObjectives['Code postal'],
          'Type de bien': this.selectedObjectives['Type de bien'],
          'Date de construction': this.selectedObjectives['Date de construction'],
          'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],

        };


      



    }


    if((this.selectedObjectives['Objectif']==='Installation fibre optique') && (this.selectedObjectives['Type de bien']!='Autre' && this.selectedObjectives['Type de bien']!='Immeuble collectif') && this.selectedObjectives['Date de construction']!='Avant 1949'){



      this.selectedObjectives = {
        'Objectif': this.selectedObjectives['Objectif'],
        'Adresse du bien': this.selectedObjectives['Adresse du bien'],
        'Code postal': this.selectedObjectives['Code postal'],
        'Type de bien': this.selectedObjectives['Type de bien'],
        'Date de construction': this.selectedObjectives['Date de construction'],

      };


    



  }


  if((this.selectedObjectives['Objectif']==='Installation fibre optique') && this.selectedObjectives['Type de bien']==='Immeuble collectif' && this.selectedObjectives['Date de construction']==='Avant 1949'){

    this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Combien dimmeubles sont concernés par ce diagnostic amiante ?':this.selectedObjectives['Combien dimmeubles sont concernés par ce diagnostic amiante ?'],
      'Date de construction': this.selectedObjectives['Date de construction'],
      'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],


    };
  }

  if((this.selectedObjectives['Objectif']==='Installation fibre optique') && this.selectedObjectives['Type de bien']==='Immeuble collectif' && this.selectedObjectives['Date de construction'] != 'Avant 1949'){

    this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Combien dimmeubles sont concernés par ce diagnostic amiante ?':this.selectedObjectives['Combien dimmeubles sont concernés par ce diagnostic amiante ?'],
      'Date de construction': this.selectedObjectives['Date de construction'],
      


    };
  }


  if((this.selectedObjectives['Objectif']==='Installation fibre optique') && this.selectedObjectives['Type de bien']==='Autre' && this.selectedObjectives['Date de construction']==='Avant 1949'){

    this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
      'Combien dimmeubles sont concernés par ce diagnostic amiante ?':this.selectedObjectives['Combien dimmeubles sont concernés par ce diagnostic amiante ?'],
      'Date de construction': this.selectedObjectives['Date de construction'],
      'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],


    };
  }

  if((this.selectedObjectives['Objectif']==='Installation fibre optique') && this.selectedObjectives['Type de bien']==='Autre' && this.selectedObjectives['Date de construction'] != 'Avant 1949'){

    this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

      'Combien dimmeubles sont concernés par ce diagnostic amiante ?':this.selectedObjectives['Combien dimmeubles sont concernés par ce diagnostic amiante ?'],
      'Date de construction': this.selectedObjectives['Date de construction'],
      


    };
  }

  if((this.selectedObjectives['Objectif']==='Amiante voirie')){
   
    this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Quel est le nombre de mètres linéaires à analyser ?':this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?']
      
      


    };

  }




  if(this.selectedObjectives['Objectif']==='Autre' && this.selectedObjectives['Type de bien']!='Autre'){

    if(this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?']==='Oui' && this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?']==='Non je ne sais pas' && this.selectedObjectives['Date de construction'] != 'Avant 1949' ){

      this.selectedObjectives = {
        'Objectif': this.selectedObjectives['Objectif'],
        'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],
        'Adresse du bien': this.selectedObjectives['Adresse du bien'],
        'Code postal': this.selectedObjectives['Code postal'],
        'Type de bien': this.selectedObjectives['Type de bien'],
        'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
        'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
        'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
        'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
        'Date de construction': this.selectedObjectives['Date de construction'],
      };


    }

    else if (
      this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
      this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
      this.selectedObjectives['Date de construction'] === 'Avant 1949'
  ) {
    this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
      'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
      'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
      'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
      'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
      'Date de construction': this.selectedObjectives['Date de construction'],
      'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],

    };
  }
  
  else if (
    this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
    this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
    this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {
  this.selectedObjectives = {
    'Objectif': this.selectedObjectives['Objectif'],
    'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

    'Adresse du bien': this.selectedObjectives['Adresse du bien'],
    'Code postal': this.selectedObjectives['Code postal'],
    'Type de bien': this.selectedObjectives['Type de bien'],
    'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
    'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
    'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
    'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
    'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
    'Date de construction': this.selectedObjectives['Date de construction'],

  };
}

else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
this.selectedObjectives = {
  'Objectif': this.selectedObjectives['Objectif'],
  'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

  'Adresse du bien': this.selectedObjectives['Adresse du bien'],
  'Code postal': this.selectedObjectives['Code postal'],
  'Type de bien': this.selectedObjectives['Type de bien'],
  'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
  'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
  'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
  'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
  'Date de construction': this.selectedObjectives['Date de construction'],
  'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],


};
}

else if (
this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
this.selectedObjectives = {
  'Objectif': this.selectedObjectives['Objectif'],
  'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

  'Adresse du bien': this.selectedObjectives['Adresse du bien'],
  'Code postal': this.selectedObjectives['Code postal'],
  'Type de bien': this.selectedObjectives['Type de bien'],
  'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
  'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
  'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
  'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
  'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
  'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
  'Date de construction': this.selectedObjectives['Date de construction'],
  'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],


};
}

else if (
this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {

this.selectedObjectives = {
  'Objectif': this.selectedObjectives['Objectif'],
  'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

  'Adresse du bien': this.selectedObjectives['Adresse du bien'],
  'Code postal': this.selectedObjectives['Code postal'],
  'Type de bien': this.selectedObjectives['Type de bien'],
  'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
  'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
  'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
  'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
  'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
  'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
  'Date de construction': this.selectedObjectives['Date de construction'],


};

}

else if (
this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
this.selectedObjectives = {
  'Objectif': this.selectedObjectives['Objectif'],
  'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

  'Adresse du bien': this.selectedObjectives['Adresse du bien'],
  'Code postal': this.selectedObjectives['Code postal'],
  'Type de bien': this.selectedObjectives['Type de bien'],
  'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
  'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
  'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
  'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
  'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
  'Date de construction': this.selectedObjectives['Date de construction'],
  'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],



};
}


else if (
this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {
this.selectedObjectives = {
  'Objectif': this.selectedObjectives['Objectif'],
  'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

  'Adresse du bien': this.selectedObjectives['Adresse du bien'],
  'Code postal': this.selectedObjectives['Code postal'],
  'Type de bien': this.selectedObjectives['Type de bien'],
  'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
  'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
  'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
  'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
  'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
  'Date de construction': this.selectedObjectives['Date de construction'],



};
}



  }


  if(this.selectedObjectives['Objectif']==='Autre' && this.selectedObjectives['Type de bien']==='Autre'){


    if(this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?']==='Oui' && this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?']==='Non je ne sais pas' && this.selectedObjectives['Date de construction'] != 'Avant 1949' ){

      this.selectedObjectives = {
        'Objectif': this.selectedObjectives['Objectif'],
        'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

        'Adresse du bien': this.selectedObjectives['Adresse du bien'],
        'Code postal': this.selectedObjectives['Code postal'],
        'Type de bien': this.selectedObjectives['Type de bien'],
            'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

        'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
        'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
        'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
        'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
        'Date de construction': this.selectedObjectives['Date de construction'],
      };


    }

    else if (
      this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
      this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
      this.selectedObjectives['Date de construction'] === 'Avant 1949'
  ) {
    this.selectedObjectives = {
      'Objectif': this.selectedObjectives['Objectif'],
      'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

      'Adresse du bien': this.selectedObjectives['Adresse du bien'],
      'Code postal': this.selectedObjectives['Code postal'],
      'Type de bien': this.selectedObjectives['Type de bien'],
      'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

      'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
      'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
      'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
      'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
      'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
      'Date de construction': this.selectedObjectives['Date de construction'],
      'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],

    };
  }
  
  else if (
    this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
    this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
    this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {
  this.selectedObjectives = {
    'Objectif': this.selectedObjectives['Objectif'],
    'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

    'Adresse du bien': this.selectedObjectives['Adresse du bien'],
    'Code postal': this.selectedObjectives['Code postal'],
    'Type de bien': this.selectedObjectives['Type de bien'],
    'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

    'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
    'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
    'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
    'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
    'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
    'Date de construction': this.selectedObjectives['Date de construction'],

  };
}

else if (
  this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] === 'Oui' &&
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
this.selectedObjectives = {
  'Objectif': this.selectedObjectives['Objectif'],
  'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

  'Adresse du bien': this.selectedObjectives['Adresse du bien'],
  'Code postal': this.selectedObjectives['Code postal'],
  'Type de bien': this.selectedObjectives['Type de bien'],
  'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

  'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
  'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
  'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
  'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
  'Date de construction': this.selectedObjectives['Date de construction'],
  'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],


};
}

else if (
this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Non je ne sais pas' &&
this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
this.selectedObjectives = {
  'Objectif': this.selectedObjectives['Objectif'],
  'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

  'Adresse du bien': this.selectedObjectives['Adresse du bien'],
  'Code postal': this.selectedObjectives['Code postal'],
  'Type de bien': this.selectedObjectives['Type de bien'],
  'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

  'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
  'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
  'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
  'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
  'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
  'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
  'Date de construction': this.selectedObjectives['Date de construction'],
  'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],


};
}

else if (
this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] !== 'Oui' &&
this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !== 'Non je ne sais pas' &&
this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {

this.selectedObjectives = {
  'Objectif': this.selectedObjectives['Objectif'],
  'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

  'Adresse du bien': this.selectedObjectives['Adresse du bien'],
  'Code postal': this.selectedObjectives['Code postal'],
  'Type de bien': this.selectedObjectives['Type de bien'],
  'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

  'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
  'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
  'Nombre de prélèvements à effectuer': this.selectedObjectives['Nombre de prélèvements à effectuer'],
  'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
  'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
  'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
  'Date de construction': this.selectedObjectives['Date de construction'],


};

}

else if (
this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
this.selectedObjectives['Date de construction'] === 'Avant 1949'
) {
this.selectedObjectives = {
  'Objectif': this.selectedObjectives['Objectif'],
  'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

  'Adresse du bien': this.selectedObjectives['Adresse du bien'],
  'Code postal': this.selectedObjectives['Code postal'],
  'Type de bien': this.selectedObjectives['Type de bien'],
  'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],

  'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
  'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
  'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
  'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
  'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
  'Date de construction': this.selectedObjectives['Date de construction'],
  'Souhaitez-vous réaliser un diagnostic plomb ?': this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'],



};
}


else if (
this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'] != 'Oui' &&
this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Non je ne sais pas' &&
this.selectedObjectives['Date de construction'] != 'Avant 1949'
) {
this.selectedObjectives = {
  'Objectif': this.selectedObjectives['Objectif'],
  'Quel est le type de votre projet ?':this.selectedObjectives['Quel est le type de votre projet ?'],

  'Adresse du bien': this.selectedObjectives['Adresse du bien'],
  'Code postal': this.selectedObjectives['Code postal'],
  'Type de bien': this.selectedObjectives['Type de bien'],
  'Quel est le type du bien ?':this.selectedObjectives['Quel est le type du bien ?'],
  'Surface totale du bien': this.selectedObjectives['Surface totale du bien'],
  'Savez-vous combien de prélèvements damiante faut-il effectuer ?': this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'],
  'Quel est le nombre de mètres linéaires à analyser ?': this.selectedObjectives['Quel est le nombre de mètres linéaires à analyser ?'],
  'la rénovation ou la démolition concerne la surface totale du bien ?': this.selectedObjectives['la rénovation ou la démolition concerne la surface totale du bien ?'],
  'Surface partielle concernée par la rénovation ou la démolition': this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
  'Date de construction': this.selectedObjectives['Date de construction'],

};
}


  }



 







    this.selectedObjectives[type] = value;

  }

  else if(this.step===3){
    this.selectedObjectives2[type] = value;

  }
  
  }



autoItems = [

    { name: 'Contrôle Amiante après Travaux', image: '/assets/image/habita.webp', Quantite: 1 },
    { name: 'Dossier Technique Amiante (DTA)', image: '/assets/image/dta.png', Quantite: 1 },
    { name: 'Contrôle Plomb après Travaux', image: '/assets/image/habitableee.webp', Quantite: 1 },
    { name: 'Contrôle Amiante des Enrobés Routiers', image: '/assets/image/CAER.webp', Quantite: 1 },
    { name: 'Plomb avant Travaux', image: '/assets/image/habitableee.webp', Quantite: 1 },
    { name: 'Amiante avant travaux', image: '/assets/image/habita.webp', Quantite: 1 },
    { name: 'Prélèvement amiante et analyse en laboratoire', image: '/assets/image/prevelement.png', Quantite: 1 },
   
];


AutoDiag() {

  /*Amiante voirie*/
  
  if (this.selectedObjectives['Objectif'] === 'Amiante voirie') {
    const diagnosticsToAdd = ['Contrôle Amiante des Enrobés Routiers', 'Prélèvement amiante et analyse en laboratoire'];
    const quantiteForSpecificItem = 4;

    this.panier = this.autoItems
      .filter(item => diagnosticsToAdd.includes(item.name))
      .map(item => {
        if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
          item.Quantite = quantiteForSpecificItem;
        }
        return item;
      });
  }
/**/

/* Installation fibre optique */

  if (this.selectedObjectives['Objectif'] === 'Installation fibre optique' && this.selectedObjectives['Date de construction'] != 'Avant 1949') {
    const diagnosticsToAdd = ['Dossier Technique Amiante (DTA)', 'Prélèvement amiante et analyse en laboratoire'];
    const quantiteForSpecificItem = 2;

    this.panier = this.autoItems
      .filter(item => diagnosticsToAdd.includes(item.name))
      .map(item => {
        if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
          item.Quantite = quantiteForSpecificItem;
        }
        return item;
      });
  }

  if (this.selectedObjectives['Objectif'] === 'Installation fibre optique' && this.selectedObjectives['Date de construction'] === 'Avant 1949' && this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] === 'Oui'  ) {
    const diagnosticsToAdd = ['Dossier Technique Amiante (DTA)', 'Prélèvement amiante et analyse en laboratoire', 'Plomb avant Travaux'];
    const quantiteForSpecificItem = 2;

    this.panier = this.autoItems
      .filter(item => diagnosticsToAdd.includes(item.name))
      .map(item => {
        if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
          item.Quantite = quantiteForSpecificItem;
        }
        return item;
      });
  }

  if (this.selectedObjectives['Objectif'] === 'Installation fibre optique' && this.selectedObjectives['Date de construction'] === 'Avant 1949' && this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] != 'Oui'  ) {
    const diagnosticsToAdd = ['Dossier Technique Amiante (DTA)', 'Prélèvement amiante et analyse en laboratoire'];
    const quantiteForSpecificItem = 2;

    this.panier = this.autoItems
      .filter(item => diagnosticsToAdd.includes(item.name))
      .map(item => {
        if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
          item.Quantite = quantiteForSpecificItem;
        }
        return item;
      });
  }

/**/


/* Objzctif=Autre */

if (
  this.selectedObjectives['Objectif'] === 'Autre' &&
  this.selectedObjectives['Date de construction'] !== 'Avant 1949' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?']==='Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire'];
  const quantiteForSpecificItem = Math.ceil(this.selectedObjectives['Surface totale du bien'] / 10);

  // Determine the quantity based on the condition
  const quantite = this.selectedObjectives['Nombre de prélèvements à effectuer'] > 0
    ? this.selectedObjectives['Nombre de prélèvements à effectuer']
    : quantiteForSpecificItem;

  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantite;
      }
      return item;
    });
}

if (
  this.selectedObjectives['Objectif'] === 'Autre' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] !='Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire'];
  const quantiteForSpecificItem = Math.ceil(this.selectedObjectives['Surface totale du bien'] / 10);

 
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantiteForSpecificItem;
      }
      return item;
    });
}


if (
  this.selectedObjectives['Objectif'] === 'Autre' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949' && 
  this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] != 'Non' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?']==='Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire', 'Plomb avant Travaux'];
  const quantiteForSpecificItem = Math.ceil(this.selectedObjectives['Surface totale du bien'] / 10);

  // Determine the quantity based on the condition
  const quantite = this.selectedObjectives['Nombre de prélèvements à effectuer'] > 0
    ? this.selectedObjectives['Nombre de prélèvements à effectuer']
    : quantiteForSpecificItem;

  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantite;
      }
      return item;
    });
}


if (
  this.selectedObjectives['Objectif'] === 'Autre' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949' && 
  this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] === 'Non' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?']!='Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire'];
  const quantiteForSpecificItem = Math.ceil(this.selectedObjectives['Surface totale du bien'] / 10);

  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantiteForSpecificItem;
      }
      return item;
    });
}


if (
  this.selectedObjectives['Objectif'] === 'Autre' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949' && 
  this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] != 'Non' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?']!='Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire', 'Plomb avant Travaux'];
  const quantiteForSpecificItem = Math.ceil(this.selectedObjectives['Surface totale du bien'] / 10);

  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantiteForSpecificItem;
      }
      return item;
    });
}


if (
  this.selectedObjectives['Objectif'] === 'Autre' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949' && 
  this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] === 'Non' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?']==='Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire'];
  const quantiteForSpecificItem = Math.ceil(this.selectedObjectives['Surface totale du bien'] / 10);
 // Determine the quantity based on the condition
 const quantite = this.selectedObjectives['Nombre de prélèvements à effectuer'] > 0
 ? this.selectedObjectives['Nombre de prélèvements à effectuer']
 : quantiteForSpecificItem;
  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantite;
      }
      return item;
    });
}

/**/


/* Rénovation - Type de bien= Local industriel */

if (
  (this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition')  &&
this.selectedObjectives['Type de bien'] === 'Local industriel' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire'];
  const quantiteForSpecificItem = 4;
  const quantite = this.selectedObjectives['Nombre de prélèvements à effectuer'] > 0
  ? this.selectedObjectives['Nombre de prélèvements à effectuer']
  : quantiteForSpecificItem;

  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantite;
      }
      return item;
    });
    
}

if (
  (this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition')  &&
this.selectedObjectives['Type de bien'] === 'Local industriel' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949' && 
  this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] != 'Non' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire', 'Plomb avant Travaux'];
  const quantiteForSpecificItem = 4;
  const quantite = this.selectedObjectives['Nombre de prélèvements à effectuer'] > 0
  ? this.selectedObjectives['Nombre de prélèvements à effectuer']
  : quantiteForSpecificItem;

  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantite;
      }
      return item;
    });
    
}

if (
  (this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition')  &&
this.selectedObjectives['Type de bien'] === 'Local industriel' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949' && 
  this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] === 'Non' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire'];
  const quantiteForSpecificItem = 4;
  const quantite = this.selectedObjectives['Nombre de prélèvements à effectuer'] > 0
  ? this.selectedObjectives['Nombre de prélèvements à effectuer']
  : quantiteForSpecificItem;

  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantite;
      }
      return item;
    });
    
}



if (
  (this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition')  &&
this.selectedObjectives['Type de bien'] === 'Local industriel' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire'];
  const quantiteForSpecificItem = 4;


  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantiteForSpecificItem;
      }
      return item;
    });
    return
}

if (
  (this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition')  &&
this.selectedObjectives['Type de bien'] === 'Local industriel' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949' && 
  this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] != 'Non' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire', 'Plomb avant Travaux'];
  const quantiteForSpecificItem = 4;
 

  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantiteForSpecificItem;
      }
      return item;
    });
    return
}


if (
  (this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition')  &&
this.selectedObjectives['Type de bien'] === 'Local industriel' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949' && 
  this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] === 'Non' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire'];
  const quantiteForSpecificItem = 4;
 

  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantiteForSpecificItem;
      }
      return item;
    });
    return
}


/**/



/* Rénovation - Type de bien= !Local industriel */

if (
  (this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition')  &&
this.selectedObjectives['Type de bien'] != 'Local industriel' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire'];
  const quantiteForSpecificItem = Math.ceil(this.selectedObjectives['Surface totale du bien'] / 10);
  const quantite = this.selectedObjectives['Nombre de prélèvements à effectuer'] > 0
  ? this.selectedObjectives['Nombre de prélèvements à effectuer']
  : quantiteForSpecificItem;

  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantite;
      }
      return item;
    });
    return
}

if (
  (this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition')  &&
this.selectedObjectives['Type de bien'] != 'Local industriel' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949' && 
  this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] != 'Non' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire', 'Plomb avant Travaux'];
  const quantiteForSpecificItem = Math.ceil(this.selectedObjectives['Surface totale du bien'] / 10);
  const quantite = this.selectedObjectives['Nombre de prélèvements à effectuer'] > 0
  ? this.selectedObjectives['Nombre de prélèvements à effectuer']
  : quantiteForSpecificItem;

  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantite;
      }
      return item;
    });
    return
}

if (
  (this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition')  &&
  this.selectedObjectives['Type de bien'] != 'Local industriel' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949' && 
  this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] === 'Non' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] === 'Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire'];
  const quantiteForSpecificItem = Math.ceil(this.selectedObjectives['Surface totale du bien'] / 10);
  const quantite = this.selectedObjectives['Nombre de prélèvements à effectuer'] > 0
  ? this.selectedObjectives['Nombre de prélèvements à effectuer']
  : quantiteForSpecificItem;

  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantite;
      }
      return item;
    });
    return
}



if (
  (this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition')  &&
  this.selectedObjectives['Type de bien'] != 'Local industriel' &&
  this.selectedObjectives['Date de construction'] != 'Avant 1949' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire'];
  const quantiteForSpecificItem = Math.ceil(this.selectedObjectives['Surface totale du bien'] / 10);


  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantiteForSpecificItem;
      }
      return item;
    });
    return
}


if (
  (this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition')  &&
  this.selectedObjectives['Type de bien'] != 'Local industriel' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949' && 
  this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] != 'Non' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire', 'Plomb avant Travaux'];
  const quantiteForSpecificItem = Math.ceil(this.selectedObjectives['Surface totale du bien'] / 10);
 

  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantiteForSpecificItem;
      }
      return item;
    });
    return
}


if (
  (this.selectedObjectives['Objectif'] === 'Rénovation' || this.selectedObjectives['Objectif'] === 'Démolition')  &&
  this.selectedObjectives['Type de bien'] != 'Local industriel' &&
  this.selectedObjectives['Date de construction'] === 'Avant 1949' && 
  this.selectedObjectives['Souhaitez-vous réaliser un diagnostic plomb ?'] === 'Non' && 
  this.selectedObjectives['Savez-vous combien de prélèvements damiante faut-il effectuer ?'] != 'Oui je sais'
) {
  const diagnosticsToAdd = ['Amiante avant travaux', 'Prélèvement amiante et analyse en laboratoire'];
  const quantiteForSpecificItem = Math.ceil(this.selectedObjectives['Surface totale du bien'] / 10);
 

  
  this.panier = this.autoItems
    .filter(item => diagnosticsToAdd.includes(item.name))
    .map(item => {
      if (item.name === 'Prélèvement amiante et analyse en laboratoire') {
        // Assign the quantity
        item.Quantite = quantiteForSpecificItem;
      }
      return item;
    });
    return
}


/**/



}




  goBack() {
    this.step--;
  }
  showError2: boolean = false;
  showError3: boolean = false;
  showError4: boolean = false;

  validateForm(): boolean {
    // Common required field for all types
    let requiredFields = ['Type de donneur d ordre'];
  
    // Get the type of "donneur d'ordre"
    const type = this.selectedObjectives2['Type de donneur d ordre'];
  
    // Add required fields based on the type of "donneur d'ordre"
    if (type === 'particulier (propriétaire du bien)') {
      requiredFields = requiredFields.concat(['Prénom', 'Nom', 'Email', 'Téléphone']);
    } else if (type === 'société (propriétaire du bien)') {
      requiredFields = requiredFields.concat(['Nom de votre société', 'Prénom', 'Nom', 'Email', 'Téléphone']);
    } else if (type === 'professionnel mandaté par le propriétaire') {
      requiredFields = requiredFields.concat(['Nom de votre société (intermédiaire)', 'Votre client est un(e)']);
  
      // Additional fields if the client type is specified
      const clientType = this.selectedObjectives2['Votre client est un(e)'];
      if (clientType === 'Société') {
        requiredFields = requiredFields.concat([
          'Nom de votre société (client)',
          'Nom du contact principal',
          'Email de contact principal',
          'Téléphone de contact principal'
        ]);        } else if (clientType === 'particulier') {
        requiredFields = requiredFields.concat(['Prénom du client', 'Nom du client', 'Email de client', 'Téléphone de client']);
      }
    }
  
    // Validate all required fields
    for (const field of requiredFields) {
      if (!this.selectedObjectives2[field] || this.selectedObjectives2[field].trim() === '') {
        this.errorMessage = `Veuillez remplir le champ: ${field}`;
        return false;
      }
    }
  
    // Clear the error message if all fields are valid
    this.errorMessage = null;
    return true;
  }
  errorFlags3 = {
    selectedPropertyType: false
  };
  errorFlags4 = {
    selectedPropertyType: false
  };
  errorFlags = {
    type_de_votre_projet:false,
    adresse_du_bien: false,
    code_postal: false,
    surface:false,
    surface_partielle_concerne:false,
    nombre_de_prelevements:false
  };
   // Validate fields based on the ngModel values
   validateSelection(): boolean {
    this.errorFlags = {
      type_de_votre_projet: !this.selectedObjectives['Quel est le type de votre projet ?'], // Checks if the field is empty
      adresse_du_bien: !this.selectedObjectives['Adresse du bien'],
      code_postal: !this.selectedObjectives['Code postal'] || !/^\d{5}$/.test(this.selectedObjectives['Code postal']), // Checks if the code postal is valid (5 digits)
      surface: !this.selectedObjectives['Surface du bien (approx. en m²)'], // Validates 'local' only if 'Type de bien' is 'Local professionnel'
      surface_partielle_concerne:!this.selectedObjectives['Surface partielle concernée par la rénovation ou la démolition'],
      nombre_de_prelevements:!this.selectedObjectives['Nombre de prélèvements à effectuer']
    };
  
    this.showError2 = Object.values(this.errorFlags).some(flag => flag); // Show error if any field is invalid
  
    return !this.showError2; // Return true if no errors
  }
  validateSelection1(): boolean {
    // Check if 'Objectif' is not selected (null, undefined, or empty string)
    this.errorFlags3.selectedPropertyType = !this.selectedObjectives['Objectif'];
  
    // Check if any error flags are set to true (we need to show the error)
    this.showError2 = Object.values(this.errorFlags3).some(flag => flag);
  
    // Return true if no errors are present
    return !this.showError2;
  }
  validateSelection2(): boolean {
    // Check if 'Objectif' is not selected (null, undefined, or empty string)
    this.errorFlags4.selectedPropertyType = !this.selectedObjectives['Type du bien'];
  
    // Check if any error flags are set to true (we need to show the error)
    this.showError2 = Object.values(this.errorFlags4).some(flag => flag);
  
    // Return true if no errors are present
    return !this.showError2;
  }
  nextStep(){
  

    if(this.step===1){
      this.AutoDiag();
        // If the selection is invalid, show the error message and stop the flow
        if (!this.validateSelection()&&!this.setActiveRecheck()) {
this.showError2=true
          return; // Stop further processing
        }
      }
      if(this.step === 2){
        if(this.panier.length === 0) {
          this.showError2 = true;
          return; // Stop further processing
        }}

    if(this.step===3){
      if(!this.validateForm()){
        
        return; // Prevent progression
      }}

    if(this.step>=4){
      return
    }
  
    this.step++;
  }


  
  isOpen: { [key: string]: boolean } = {};

  toggleAnswer(questionId: string): void {
    
    this.isOpen[questionId] = !this.isOpen[questionId];
  }

  panier: { name: string, image: string  , Quantite:number }[] = []; 

  showError = false;

  ajouterAuPanier(event: Event, name: string, image: string) {
  
    const exists = this.panier.some(p => p.name === name);
  
    if (!exists) {
      Swal.fire({
        title: name,
        text: 'Quantité',
        input: 'number', 
        inputPlaceholder: 'Entrez un nombre',
        imageUrl: image, 
        imageWidth: 200,
        imageHeight: 160, 
        confirmButtonText: 'OK',
        confirmButtonColor: '#76a319',
        showCancelButton: true,
        cancelButtonText: 'Annuler',
        inputAttributes: {
          min: '1', 
        },
        inputValidator: (value) => {
          if (!value || Number(value) < 1) {
            return 'Veuillez entrer une quantité valide';
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const Quantite = Number(result.value); 
          const item = { name, image, Quantite }; 
          this.panier.push(item);
          Swal.fire('Ajouté!', `${name} avec quantité ${Quantite} a été ajouté au panier.`, 'success');
        }
      });

         // Update showError dynamically
         this.showError = this.panier.length === 0;
    } else {
      Swal.fire({
        icon: 'info',
        title: `${name} est déjà dans le panier.`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });
    }
  }


 
  viderPanier() {
    Swal.fire({
      icon: 'warning', 
      title: 'Vider le panier',
      text: 'Êtes-vous sûr de vouloir vider le panier ?',
      showCancelButton: true, 
      confirmButtonText: 'Oui', 
      cancelButtonText: 'Non', 
      confirmButtonColor: '#d33', 
      cancelButtonColor: '#76a319'
    }).then((result) => {
      if (result.isConfirmed) {
        this.panier = [];
      } else if (result.isDismissed) {
       
      return
      }
    });

  }

  RetirerDiagnostic(DiagName: string) {

    Swal.fire({
      icon: 'warning', 
      title: 'Retirer',
      text: 'Dans le cadre de votre projet ce diagnostic est obligatoire. Êtes-vous sûr de vouloir le supprimer ?',
      showCancelButton: true, 
      confirmButtonText: 'Oui', 
      cancelButtonText: 'Non', 
     confirmButtonColor: '#d33', 
      cancelButtonColor: '#76a319'
    }).then((result) => {
      if (result.isConfirmed) {
        this.panier = this.panier.filter(diag => diag.name !== DiagName);
      } else if (result.isDismissed) {
      return
      }
    });

  }



  Modifier(stepType:any){
    if(stepType==='Votre projet'){
    this.step =1;
  }

  else if(stepType==='Panier'){
    this.step =2;

  }
  
  
  else if(stepType==='Informations personnelle'){
    this.step =3;

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
  
  
  
  const panier = this.panier.map(({ image, ...rest }) => rest);
  
  const params = {
   
    Type:'Locaux Professionnels',
    Title1:'Projet :',
    Title2:'Informations personnelle :',
    Title3:'Panier :',
  
    selectedObjectives: Object.entries(this.selectedObjectives)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n'),
  
    selectedObjectives2: Object.entries(this.selectedObjectives2)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n'),
  
     
  
      Panier: panier.map(item => 
        `- ${item.name} (Quantité: ${item.Quantite})`
      ).join('\n'),
  
  
    
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
  }}