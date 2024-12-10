import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  Formrappel: FormGroup;

  constructor(private fb: FormBuilder) {  emailjs.init('f9AWPNj9CCvQhsYTE');}

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
    telephone: new FormControl('', [Validators.required]),
    adresse_de_bien:new FormControl('', [Validators.required]),
  });


}

// A method to validate the form (optional)
private isFormValid(): boolean {
  const { 'Prénom du client': prenom, 'Nom du client': nom, 'Email de client': email, 'Téléphone de client': telephone } = this.selectedObjectives3;

  // Simple validation checks
  return !!prenom && !!nom && !!email && !!telephone;
}
// A method to validate the form (optional)
private isFormValid1(): boolean {
  const { 'Prénom du client': adresse_de_bien, 'Nom du client': nom, 'Email de client': email, 'Téléphone de client': telephone } = this.selectedObjectives3;

  // Simple validation checks
  return !!adresse_de_bien && !!nom && !!email && !!telephone;
}
get formControls() {
  return this.Formrappel.controls;
}


  

  selectedObjective: string = '';
  selectedPropertyType: string = '';



  setPropertyType(type: string) {
    this.selectedPropertyType = type;
  }




  selectedObjectives: any = {};
  selectedObjectives2: any = {};
  selectedObjectives3: any = {};
  selectedObjectives4: any = {};


  errorMessage: string = '';

  setActiveRecheck(): boolean {
    // Parking validation
    if (this.selectedObjectives['Type de bien'] === 'Parking') {
      if (!this.selectedObjectives2['Date de construction'] || !this.selectedObjectives2['Nombre de places de parking']) {
        this.errorMessage = 'Veuillez remplir tous les champs requis pour Parking.';
        return false; // Validation failed
      }
      this.errorMessage = ''; // Clear error if conditions are met
      return true; // Validation succeeded
    }
  
    // Add similar validation logic for other cases if neede
    
      /* cave */
    
  // Cave validation
  if (this.selectedObjectives['Type de bien'] === 'Cave') {
    if (!this.selectedObjectives2['Date de construction'] || !this.selectedObjectives2['Nombre de caves']) {
      this.errorMessage = 'Veuillez remplir tous les champs requis pour Cave.';
      return false; // Validation failed
    }
    // If no issues, assign values (you may not need this, but keeping for consistency)
    this.selectedObjectives2 = {
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Nombre de caves': this.selectedObjectives2['Nombre de caves']
    };
    this.errorMessage = ''; // Clear error if conditions are met
    return true; // Validation succeeded
  }
      /**/
    
    
        /* Maison-Location */
    
        if (
          this.selectedObjectives['Type de bien'] === 'Maison' &&
          this.selectedObjectives['Objectif'] === 'Location'
        ) {
          // Check if 'Date de construction' is not selected
          if (!this.selectedObjectives2['Date de construction']|| !this.selectedObjectives2['Surface du bien (approx. en m²)']) {
            this.errorMessage = 'Veuillez remplir tous les champs requis pour une Maison en location.';
            return false; // Prevent moving forward
          }
        
          // Handle case where 'Date de construction' is not 'Aprés le 1er juillet 1997'
          if (this.selectedObjectives2['Date de construction'] !== 'Aprés le 1er juillet 1997') {
            if (
              !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
              this.selectedObjectives2['Y a-t-il une installation gaz ?'] === undefined
            ) {
              this.errorMessage = 'Veuillez remplir tous les champs requis pour une Maison avec une construction .';
              return false; // Prevent moving forward
            }
        
            this.selectedObjectives2 = {
              'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
              'Date de construction': this.selectedObjectives2['Date de construction'],
              'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
            };
            this.errorMessage = ''; // Clear error message
            return true; // Validation succeeded
          }
        
          // Handle case where 'Date de construction' is 'Aprés le 1er juillet 1997'
          if (this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997') {
            // Check if 'Le permis de construire date-t-il de moins de 15 ans ?' is not selected
            if (!this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']) {
              this.errorMessage = 'Veuillez sélectionner si le permis de construire date de moins de 15 ans.';
              return false; // Prevent moving forward
            }
        
            // Handle 'Oui' condition
            if (this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'Oui') {
              if (!this.selectedObjectives2['Surface du bien (approx. en m²)']) {
                this.errorMessage = 'Veuillez remplir la surface du bien.';
                return false; // Prevent moving forward
              }
        
              this.selectedObjectives2 = {
                'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
                'Date de construction': this.selectedObjectives2['Date de construction'],
                'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
              };
              this.errorMessage = ''; // Clear error message
              return true; // Validation succeeded
            }
        
            // Handle 'Non' condition
            if (this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !== 'Oui') {
              if (!this.selectedObjectives2['Surface du bien (approx. en m²)']) {
                this.errorMessage = 'Veuillez remplir la surface du bien.';
                return false; // Prevent moving forward
              }
        
              this.selectedObjectives2 = {
                'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
                'Date de construction': this.selectedObjectives2['Date de construction'],
                'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
              };
              this.errorMessage = ''; // Clear error message
              return true; // Validation succeeded
            }
          }
        }
        
        /**/
       
   // Maison-Vente Logic
if (
  this.selectedObjectives['Type de bien'] === 'Maison' &&
  this.selectedObjectives['Objectif'] === 'Vente'
) {
  // Validation: Check if 'Date de construction' is not selected
  if (!this.selectedObjectives2['Date de construction']|| !this.selectedObjectives2['Surface du bien (approx. en m²)']) {
    this.errorMessage = 'Veuillez remplir tous les champs requis pour une Maison en vente.';
    return false; // Prevent progression
  }

  // Case: 'Date de construction' is not 'Après le 1er juillet 1997'
  if (this.selectedObjectives2['Date de construction'] !== 'Aprés le 1er juillet 1997') {
    if (
      !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
      !this.selectedObjectives2['La maison est-elle en copropriété ?'] ||
      !this.selectedObjectives2['Assainissement'] ||
      this.selectedObjectives2['Y a-t-il une installation gaz ?'] === undefined
    ) {
      this.errorMessage = 'Veuillez remplir tous les champs requis pour une maison avec une construction.';
      return false; // Prevent progression
    }

    this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'La maison est-elle en copropriété ?': this.selectedObjectives2['La maison est-elle en copropriété ?'],
      'Assainissement': this.selectedObjectives2['Assainissement'],
      'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
    };
    this.errorMessage = ''; // Clear error
    return true; // Validation succeeded
  }

  // Case: 'Date de construction' is 'Après le 1er juillet 1997'
  if (this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997') {
    // Validation: Check if 'Le permis de construire date-t-il de moins de 15 ans ?' is not selected
    if (!this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']) {
      this.errorMessage = 'Veuillez sélectionner si le permis de construire date de moins de 15 ans.';
      return false; // Prevent progression
    }

    // Sub-case: 'Le permis de construire date-t-il de moins de 15 ans ?' is 'Non'
    if (this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !== 'oui') {
      if (
        !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
        !this.selectedObjectives2['La maison est-elle en copropriété ?'] ||
        !this.selectedObjectives2['Assainissement'] ||
        this.selectedObjectives2['Y a-t-il une installation gaz ?'] === undefined
      ) {
        this.errorMessage = 'Veuillez remplir tous les champs requis pour une maison avec un permis de construire datant de plus de 15 ans.';
        return false; // Prevent progression
      }

      this.selectedObjectives2 = {
        'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
        'Date de construction': this.selectedObjectives2['Date de construction'],
        'La maison est-elle en copropriété ?': this.selectedObjectives2['La maison est-elle en copropriété ?'],
        'Assainissement': this.selectedObjectives2['Assainissement'],
        'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
        'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
      };
      this.errorMessage = ''; // Clear error
      return true; // Validation succeeded
    }

    // Sub-case: 'Le permis de construire date-t-il de moins de 15 ans ?' is 'Oui'
    if (this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui') {
      if (
        !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
        !this.selectedObjectives2['La maison est-elle en copropriété ?'] ||
        !this.selectedObjectives2['Assainissement']
      ) {
        this.errorMessage = 'Veuillez remplir tous les champs requis pour une maison avec un permis de construire datant de moins de 15 ans.';
        return false; // Prevent progression
      }

      this.selectedObjectives2 = {
        'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
        'Date de construction': this.selectedObjectives2['Date de construction'],
        'La maison est-elle en copropriété ?': this.selectedObjectives2['La maison est-elle en copropriété ?'],
        'Assainissement': this.selectedObjectives2['Assainissement'],
        'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
      };
      this.errorMessage = ''; // Clear error
      return true; // Validation succeeded
    }
  }
}

    
          
          
    
        /**/
    
       /* Terrain Logic */
if (this.selectedObjectives['Type de bien'] === 'terrain') {
  // Case: No construction on the terrain
  if (this.selectedObjectives2['Construction sur le Terrain'] === 'Non') {
    // Validation: Ensure 'Surface du terrain (approx. en m²)' is filled
    if (!this.selectedObjectives2['Surface du terrain (approx. en m²)']) {
      this.errorMessage = 'Veuillez renseigner la surface du terrain.';
      return false; // Prevent progression
    }

    this.selectedObjectives2 = {
      'Surface du terrain (approx. en m²)': this.selectedObjectives2['Surface du terrain (approx. en m²)'],
      'Construction sur le Terrain': this.selectedObjectives2['Construction sur le Terrain'],
    };
    this.errorMessage = ''; // Clear error
    return true; // Validation succeeded
  }

  // Case: Construction exists and 'Type_construction' is NOT 'Autre'
  if (
    this.selectedObjectives2['Construction sur le Terrain'] === 'Oui' &&
    this.selectedObjectives2['Type_construction'] !== 'Autre'
  ) {
    // Validation: Ensure required fields for construction are filled
    if (
      !this.selectedObjectives2['Surface du terrain (approx. en m²)'] ||
      !this.selectedObjectives2['Surface de la construction (approx. en m²)'] ||
      !this.selectedObjectives2['Type_construction']
    ) {
      this.errorMessage =
        'Veuillez renseigner toutes les informations nécessaires pour une construction sur le terrain.';
      return false; // Prevent progression
    }

    this.selectedObjectives2 = {
      'Surface du terrain (approx. en m²)': this.selectedObjectives2['Surface du terrain (approx. en m²)'],
      'Construction sur le Terrain': this.selectedObjectives2['Construction sur le Terrain'],
      'Surface de la construction (approx. en m²)': this.selectedObjectives2['Surface de la construction (approx. en m²)'],
      'Type_construction': this.selectedObjectives2['Type_construction'],
    };
    this.errorMessage = ''; // Clear error
    return true; // Validation succeeded
  }

  // Case: Construction exists and 'Type_construction' is 'Autre'
  if (
    this.selectedObjectives2['Construction sur le Terrain'] === 'Oui' &&
    this.selectedObjectives2['Type_construction'] === 'Autre'
  ) {
    // Validation: Ensure required fields, including description, are filled
    if (
      !this.selectedObjectives2['Surface du terrain (approx. en m²)'] ||
      !this.selectedObjectives2['Surface de la construction (approx. en m²)'] ||
      !this.selectedObjectives2['Type_construction'] ||
      !this.selectedObjectives2['Description de la construction']
    ) {
      this.errorMessage =
        'Veuillez renseigner toutes les informations, y compris la description pour une construction de type "Autre".';
      return false; // Prevent progression
    }

    this.selectedObjectives2 = {
      'Surface du terrain (approx. en m²)': this.selectedObjectives2['Surface du terrain (approx. en m²)'],
      'Construction sur le Terrain': this.selectedObjectives2['Construction sur le Terrain'],
      'Surface de la construction (approx. en m²)': this.selectedObjectives2['Surface de la construction (approx. en m²)'],
      'Type_construction': this.selectedObjectives2['Type_construction'],
      'Description de la construction': this.selectedObjectives2['Description de la construction'],
    };
    this.errorMessage = ''; // Clear error
    return true; // Validation succeeded
  }

  // Default: No valid condition matched
  this.errorMessage = 'Veuillez remplir tous les champs requis pour Terrain.';
  return false; // Prevent progression
}

    
    
     /* Local professionnel */

/* Location Cases */
if (this.selectedObjectives['Type de bien'] === 'Local professionnel' && this.selectedObjectives['Objectif'] === 'Location') {
  // Case: Hotel
  if (this.selectedObjectives['local'] === 'Hotel') {
    if (
      !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
      !this.selectedObjectives2['Date de construction'] ||
      !this.selectedObjectives2['Nombre de chambres au total']
    ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations requises pour un hôtel.';
      return false; // Prevent progression
    }

    this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Nombre de chambres au total': this.selectedObjectives2['Nombre de chambres au total'],
    };
    this.errorMessage = ''; // Clear error
    return true; // Validation succeeded
  }

  // Case: Autre
  if (this.selectedObjectives['local'] === 'Autre') {
    if (!this.selectedObjectives2['Surface du bien (approx. en m²)'] || !this.selectedObjectives2['Date de construction']) {
      this.errorMessage = 'Veuillez renseigner toutes les informations requises pour un type "Autre".';
      return false; // Prevent progression
    }

    this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
    };
    this.errorMessage = ''; // Clear error
    return true; // Validation succeeded
  }

  // Case: Other types of locals
  if (this.selectedObjectives['local'] !== 'Autre') {
    if (!this.selectedObjectives2['Surface du bien (approx. en m²)'] || !this.selectedObjectives2['Date de construction']) {
      this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires pour ce local.';
      return false; // Prevent progression
    }

    this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
    };
    this.errorMessage = ''; // Clear error
    return true; // Validation succeeded
  }
}

/* Vente Cases */
if (this.selectedObjectives['Type de bien'] === 'Local professionnel' && this.selectedObjectives['Objectif'] === 'Vente') {
  // Case: Hotel
  if (this.selectedObjectives['local'] === 'Hotel') {
    if (
      !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
      !this.selectedObjectives2['Date de construction'] ||
      !this.selectedObjectives2['Nombre de chambres au total'] ||
      !this.selectedObjectives2['Assainissement']
    ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations requises pour un hôtel.';
      return false; // Prevent progression
    }

    this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Nombre de chambres au total': this.selectedObjectives2['Nombre de chambres au total'],
      'Assainissement': this.selectedObjectives2['Assainissement'],
    };
    this.errorMessage = ''; // Clear error
    return true; // Validation succeeded
  }

  // Case: Autre
  if (this.selectedObjectives['local'] === 'Autre') {
    if (
      !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
      !this.selectedObjectives2['Date de construction'] ||
      !this.selectedObjectives2['Assainissement']
    ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations requises pour un type "Autre".';
      return false; // Prevent progression
    }

    this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Assainissement': this.selectedObjectives2['Assainissement'],
    };
    this.errorMessage = ''; // Clear error
    return true; // Validation succeeded
  }

  // Case: Specific types (Commerce, Bureaux, Atelier, Entrepot, Batiment industriel)
  if (
    ['Commerce', 'Bureaux', 'Atelier', 'Entrepot', 'Batiment industriel'].includes(this.selectedObjectives['local'])
  ) {
    if (
      !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
      !this.selectedObjectives2['Date de construction'] ||
      !this.selectedObjectives2['Assainissement']
    ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations nécessaires pour ce type de local.';
      return false; // Prevent progression
    }

    this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Assainissement': this.selectedObjectives2['Assainissement'],
    };
    this.errorMessage = ''; // Clear error
    return true; // Validation succeeded
  }
}



            
        /**/


           /* immeuble collectif-location */
   
           if (this.selectedObjectives['Type de bien'] === 'Immeuble collectif' && 
            this.selectedObjectives['Objectif'] === 'Location' && 
            this.selectedObjectives2['Date de construction'] !== 'Aprés le 1er juillet 1997') {
            
            // Check for required fields
            if (
                !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
                !this.selectedObjectives2['Date de construction'] ||
                !this.selectedObjectives2['Nombre dappartements'] ||
                !this.selectedObjectives2['Nombre de place(s) de Parking']==null ||
                !this.selectedObjectives2['Nombre de locaux commerciaux'] ||
                !this.selectedObjectives2['cave'] ||
                !this.selectedObjectives2['Y a-t-il une installation gaz ?']
            ) {
                this.errorMessage = 'Veuillez renseigner toutes les informations requises pour l\'immeuble collectif en location.';
                return false; // Prevent progression
            }
        
            // If all required fields are present, assign values to selectedObjectives2
            this.selectedObjectives2 = {
                'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
                'Date de construction': this.selectedObjectives2['Date de construction'],
                'Nombre dappartements': this.selectedObjectives2['Nombre dappartements'],
                'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
                'Nombre de locaux commerciaux': this.selectedObjectives2['Nombre de locaux commerciaux'],
                'cave': this.selectedObjectives2['cave'],
                'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
            };
        
            this.errorMessage = ''; // Clear error message
            return true; // Validation succeeded
        }
        

        if (this.selectedObjectives['Type de bien'] === 'Immeuble collectif' && 
          this.selectedObjectives['Objectif'] === 'Location' && 
          this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && 
          this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !== 'oui') {
          
          // Check for required fields
          if (
              !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
              !this.selectedObjectives2['Date de construction'] ||
              !this.selectedObjectives2['Nombre dappartements'] ||
              !this.selectedObjectives2['Nombre de place(s) de Parking']==null ||
              !this.selectedObjectives2['Nombre de locaux commerciaux'] ||
              !this.selectedObjectives2['cave'] ||
              !this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] ||
              !this.selectedObjectives2['Y a-t-il une installation gaz ?']
          ) {
              this.errorMessage = 'Veuillez renseigner toutes les informations requises pour l\'immeuble collectif en location.';
              return false; // Prevent progression
          }
      
          // If all required fields are present, assign values to selectedObjectives2
          this.selectedObjectives2 = {
              'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
              'Date de construction': this.selectedObjectives2['Date de construction'],
              'Nombre dappartements': this.selectedObjectives2['Nombre dappartements'],
              'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
              'Nombre de locaux commerciaux': this.selectedObjectives2['Nombre de locaux commerciaux'],
              'cave': this.selectedObjectives2['cave'],
              'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
              'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
          };
      
          this.errorMessage = ''; // Clear error message
          return true; // Validation succeeded
      }
      

      if (this.selectedObjectives['Type de bien'] === 'Immeuble collectif' && 
        this.selectedObjectives['Objectif'] === 'Location' && 
        this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && 
        this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui') {
        
        // Check for required fields
        if (
            !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
            !this.selectedObjectives2['Date de construction'] ||
            !this.selectedObjectives2['Nombre dappartements'] ||
            !this.selectedObjectives2['Nombre de place(s) de Parking']==null ||
            !this.selectedObjectives2['Nombre de locaux commerciaux'] ||
            !this.selectedObjectives2['cave'] ||
            !this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']
        ) {
            this.errorMessage = 'Veuillez renseigner toutes les informations requises pour l\'immeuble collectif en location avec permis de construire datant de moins de 15 ans.';
            return false; // Prevent progression
        }
    
        // If all required fields are present, assign values to selectedObjectives2
        this.selectedObjectives2 = {
            'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
            'Date de construction': this.selectedObjectives2['Date de construction'],
            'Nombre dappartements': this.selectedObjectives2['Nombre dappartements'],
            'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
            'Nombre de locaux commerciaux': this.selectedObjectives2['Nombre de locaux commerciaux'],
            'cave': this.selectedObjectives2['cave'],
            'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
        };
    
        this.errorMessage = ''; // Clear error message
        return true; // Validation succeeded
    }
    

    /**/


     /* immeuble collectif-vente */

if (this.selectedObjectives['Type de bien'] === 'Immeuble collectif' && 
  this.selectedObjectives['Objectif'] === 'Vente' && 
  this.selectedObjectives2['Date de construction'] != 'Aprés le 1er juillet 1997') {

  // Check if required fields are filled out
  if (
      !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
      !this.selectedObjectives2['Date de construction'] ||
      !this.selectedObjectives2['Nombre dappartements'] ||
      !this.selectedObjectives2['Nombre de place(s) de Parking']==null ||
      !this.selectedObjectives2['Nombre de locaux commerciaux'] ||
      !this.selectedObjectives2['cave'] ||
      !this.selectedObjectives2['Y a-t-il une installation gaz ?'] ||
      !this.selectedObjectives2['Assainissement'] ||
      !this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations requises pour l\'immeuble collectif en vente .';
      return false; // Prevent progression
  }

  // Assign values to selectedObjectives2 if validation passed
  this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Nombre dappartements': this.selectedObjectives2['Nombre dappartements'],
      'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
      'Nombre de locaux commerciaux': this.selectedObjectives2['Nombre de locaux commerciaux'],
      'cave': this.selectedObjectives2['cave'],
      'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
      'Assainissement': this.selectedObjectives2['Assainissement'],
      'Un dossier unique ou un par appartement/local commercial ?': this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'],
  };

  this.errorMessage = ''; // Clear error message
  return true; // Validation succeeded
}

if (this.selectedObjectives['Type de bien'] === 'Immeuble collectif' && 
  this.selectedObjectives['Objectif'] === 'Vente' && 
  this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && 
  this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui') {

  // Check if required fields are filled out
  if (
      !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
      !this.selectedObjectives2['Date de construction'] ||
      !this.selectedObjectives2['Nombre dappartements'] ||
      !this.selectedObjectives2['Nombre de place(s) de Parking']==null ||
      !this.selectedObjectives2['Nombre de locaux commerciaux'] ||
      !this.selectedObjectives2['cave'] ||
      !this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] ||
      !this.selectedObjectives2['Y a-t-il une installation gaz ?'] ||
      !this.selectedObjectives2['Assainissement'] ||
      !this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations requises pour l\'immeuble collectif en vente après le 1er juillet 1997 avec permis de construire datant de plus de 15 ans.';
      return false; // Prevent progression
  }

  // Assign values to selectedObjectives2 if validation passed
  this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Nombre dappartements': this.selectedObjectives2['Nombre dappartements'],
      'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
      'Nombre de locaux commerciaux': this.selectedObjectives2['Nombre de locaux commerciaux'],
      'cave': this.selectedObjectives2['cave'],
      'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
      'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
      'Assainissement': this.selectedObjectives2['Assainissement'],
      'Un dossier unique ou un par appartement/local commercial ?': this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'],
  };

  this.errorMessage = ''; // Clear error message
  return true; // Validation succeeded
}

if (this.selectedObjectives['Type de bien'] === 'Immeuble collectif' && 
  this.selectedObjectives['Objectif'] === 'Vente' && 
  this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && 
  this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui') {

  // Check if required fields are filled out
  if (
      !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
      !this.selectedObjectives2['Date de construction'] ||
      !this.selectedObjectives2['Nombre dappartements'] ||
      !this.selectedObjectives2['Nombre de place(s) de Parking']==null ||
      !this.selectedObjectives2['Nombre de locaux commerciaux'] ||
      !this.selectedObjectives2['cave'] ||
      !this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] ||
      !this.selectedObjectives2['Assainissement'] ||
      !this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations requises pour l\'immeuble collectif en vente après le 1er juillet 1997 avec permis de construire datant de moins de 15 ans.';
      return false; // Prevent progression
  }

  // Assign values to selectedObjectives2 if validation passed
  this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Nombre dappartements': this.selectedObjectives2['Nombre dappartements'],
      'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
      'Nombre de locaux commerciaux': this.selectedObjectives2['Nombre de locaux commerciaux'],
      'cave': this.selectedObjectives2['cave'],
      'Assainissement': this.selectedObjectives2['Assainissement'],
      'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
      'Un dossier unique ou un par appartement/local commercial ?': this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'],
  };

  this.errorMessage = ''; // Clear error message
  return true; // Validation succeeded
}

  
  
      /**/


        /* Appartement-Vente */
   
        if (this.selectedObjectives['Type de bien'] === 'Appartement' && 
          this.selectedObjectives['Objectif'] === 'Vente' && 
          this.selectedObjectives2['Date de construction'] != 'Aprés le 1er juillet 1997') {
      
          // Check if required fields are filled out
          if (
              !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
              !this.selectedObjectives2['Date de construction'] ||
              !this.selectedObjectives2['Nombre de place(s) de Parking']==null ||
              !this.selectedObjectives2['cave'] ||
              !this.selectedObjectives2['Y a-t-il une installation gaz ?'] ||
              !this.selectedObjectives2['Assainissement']
          ) {
              this.errorMessage = 'Veuillez renseigner toutes les informations requises pour l\'appartement en vente .';
              return false; // Prevent progression
          }
      
          // Assign values to selectedObjectives2 if validation passed
          this.selectedObjectives2 = {
              'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
              'Date de construction': this.selectedObjectives2['Date de construction'],
              'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
              'cave': this.selectedObjectives2['cave'],
              'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
              'Assainissement': this.selectedObjectives2['Assainissement'],
          };
      
          this.errorMessage = ''; // Clear error message
          return true; // Validation succeeded
      }
      
      if (this.selectedObjectives['Type de bien'] === 'Appartement' && 
          this.selectedObjectives['Objectif'] === 'Vente' && 
          this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && 
          this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui') {
      
          // Check if required fields are filled out
          if (
              !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
              !this.selectedObjectives2['Date de construction'] ||
              !this.selectedObjectives2['Nombre de place(s) de Parking']==null ||
              !this.selectedObjectives2['cave'] ||
              !this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] ||
              !this.selectedObjectives2['Y a-t-il une installation gaz ?'] ||
              !this.selectedObjectives2['Assainissement']
          ) {
              this.errorMessage = 'Veuillez renseigner toutes les informations requises pour l\'appartement en vente après le 1er juillet 1997 avec permis de construire datant de plus de 15 ans.';
              return false; // Prevent progression
          }
      
          // Assign values to selectedObjectives2 if validation passed
          this.selectedObjectives2 = {
              'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
              'Date de construction': this.selectedObjectives2['Date de construction'],
              'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
              'cave': this.selectedObjectives2['cave'],
              'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
              'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
              'Assainissement': this.selectedObjectives2['Assainissement'],
          };
      
          this.errorMessage = ''; // Clear error message
          return true; // Validation succeeded
      }
      
      if (this.selectedObjectives['Type de bien'] === 'Appartement' && 
          this.selectedObjectives['Objectif'] === 'Vente' && 
          this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && 
          this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui') {
      
          // Check if required fields are filled out
          if (
              !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
              !this.selectedObjectives2['Date de construction'] ||
              !this.selectedObjectives2['Nombre de place(s) de Parking']==null ||
              !this.selectedObjectives2['cave'] ||
              !this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] ||
              !this.selectedObjectives2['Assainissement']
          ) {
              this.errorMessage = 'Veuillez renseigner toutes les informations requises pour l\'appartement en vente après le 1er juillet 1997 avec permis de construire datant de moins de 15 ans.';
              return false; // Prevent progression
          }
      
          // Assign values to selectedObjectives2 if validation passed
          this.selectedObjectives2 = {
              'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
              'Date de construction': this.selectedObjectives2['Date de construction'],
              'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
              'cave': this.selectedObjectives2['cave'],
              'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
              'Assainissement': this.selectedObjectives2['Assainissement'],
          };
      
          this.errorMessage = ''; // Clear error message
          return true; // Validation succeeded
      }
      
    
        /**/
   
        /* Appartement-Location */

if (this.selectedObjectives['Type de bien'] === 'Appartement' && 
  this.selectedObjectives['Objectif'] === 'Location' && 
  this.selectedObjectives2['Date de construction'] != 'Aprés le 1er juillet 1997') {

  // Check if required fields are filled out
  if (
      !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
      !this.selectedObjectives2['Date de construction'] ||
      !this.selectedObjectives2['Nombre de place(s) de Parking']==null ||
      !this.selectedObjectives2['cave'] ||
      !this.selectedObjectives2['Y a-t-il une installation gaz ?']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations requises pour l\'appartement en location.';
      return false; // Prevent progression
  }

  // Assign values to selectedObjectives2 if validation passed
  this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
      'cave': this.selectedObjectives2['cave'],
      'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
  };

  this.errorMessage = ''; // Clear error message
  return true; // Validation succeeded
}

if (this.selectedObjectives['Type de bien'] === 'Appartement' && 
  this.selectedObjectives['Objectif'] === 'Location' && 
  this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && 
  this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui') {

  // Check if required fields are filled out
  if (
      !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
      !this.selectedObjectives2['Date de construction'] ||
      !this.selectedObjectives2['Nombre de place(s) de Parking']==null ||
      !this.selectedObjectives2['cave'] ||
      !this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] ||
      !this.selectedObjectives2['Y a-t-il une installation gaz ?']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations requises pour l\'appartement en location après le 1er juillet 1997 avec permis de construire datant de plus de 15 ans.';
      return false; // Prevent progression
  }

  // Assign values to selectedObjectives2 if validation passed
  this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
      'cave': this.selectedObjectives2['cave'],
      'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
      'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
  };

  this.errorMessage = ''; // Clear error message
  return true; // Validation succeeded
}

if (this.selectedObjectives['Type de bien'] === 'Appartement' && 
  this.selectedObjectives['Objectif'] === 'Location' && 
  this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && 
  this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui') {

  // Check if required fields are filled out
  if (
      !this.selectedObjectives2['Surface du bien (approx. en m²)'] ||
      !this.selectedObjectives2['Date de construction'] ||
      !this.selectedObjectives2['Nombre de place(s) de Parking']==null ||
      !this.selectedObjectives2['cave'] ||
      !this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']
  ) {
      this.errorMessage = 'Veuillez renseigner toutes les informations requises pour l\'appartement en location après le 1er juillet 1997 avec permis de construire datant de moins de 15 ans.';
      return false; // Prevent progression
  }

  // Assign values to selectedObjectives2 if validation passed
  this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
      'cave': this.selectedObjectives2['cave'],
      'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
  };

  this.errorMessage = ''; // Clear error message
  return true; // Validation succeeded
}

    
        /**/

/* step4-forms */
if (
  this.selectedObjectives3['Type de donneur d ordre'] === 'particulier (propriétaire du bien)'
) {
  // Check if required fields are filled out
  if (
    !this.selectedObjectives3['Prénom'] ||
    !this.selectedObjectives3['Nom'] ||
    !this.selectedObjectives3['Email'] ||
    !this.selectedObjectives3['Téléphone'] ||
    !this.selectedObjectives3['Commentaire']
  ) {
    this.errorMessage = 'Veuillez renseigner toutes les informations requises pour le donneur d\'ordre particulier.';
    return false; // Prevent progression
  }

  // Assign values to selectedObjectives3 if validation passed
  this.selectedObjectives3 = {
    'Prénom': this.selectedObjectives3['Prénom'],
    'Nom': this.selectedObjectives3['Nom'],
    'Email': this.selectedObjectives3['Email'],
    'Téléphone': this.selectedObjectives3['Téléphone'],
    'Commentaire': this.selectedObjectives3['Commentaire'],
  };

  this.errorMessage = ''; // Clear error message
  return true; // Validation succeeded
}

if (
  this.selectedObjectives3['Type de donneur d ordre'] === 'société (propriétaire du bien)'
) {
  // Check if required fields are filled out
  if (
    !this.selectedObjectives3['Nom de votre société'] ||
    !this.selectedObjectives3['Prénom'] ||
    !this.selectedObjectives3['Nom'] ||
    !this.selectedObjectives3['Email'] ||
    !this.selectedObjectives3['Téléphone'] ||
    !this.selectedObjectives3['Commentaire']
  ) {
    this.errorMessage = 'Veuillez renseigner toutes les informations requises pour la société propriétaire.';
    return false; // Prevent progression
  }

  // Assign values to selectedObjectives3 if validation passed
  this.selectedObjectives3 = {
    'Nom de votre société': this.selectedObjectives3['Nom de votre société'],
    'Prénom': this.selectedObjectives3['Prénom'],
    'Nom': this.selectedObjectives3['Nom'],
    'Email': this.selectedObjectives3['Email'],
    'Téléphone': this.selectedObjectives3['Téléphone'],
    'Commentaire': this.selectedObjectives3['Commentaire'],
  };

  this.errorMessage = ''; // Clear error message
  return true; // Validation succeeded
}

if (
  this.selectedObjectives3['Type de donneur d ordre'] === 'professionnel mandaté par le propriétaire' &&
  this.selectedObjectives3['Votre client est un(e)'] === 'particulier'
) {
  // Check if required fields are filled out
  if (
    !this.selectedObjectives3['Nom de votre société (intermédiaire)'] ||
    !this.selectedObjectives3['Prénom du client'] ||
    !this.selectedObjectives3['Nom du client'] ||
    !this.selectedObjectives3['Email de client'] ||
    !this.selectedObjectives3['Téléphone de client'] ||
    !this.selectedObjectives3['Commentaire']
  ) {
    this.errorMessage = 'Veuillez renseigner toutes les informations requises pour le professionnel mandaté par le propriétaire et le particulier.';
    return false; // Prevent progression
  }

  // Assign values to selectedObjectives3 if validation passed
  this.selectedObjectives3 = {
    'Nom de votre société (intermédiaire)': this.selectedObjectives3['Nom de votre société (intermédiaire)'],
    'Prénom du client': this.selectedObjectives3['Prénom du client'],
    'Nom du client': this.selectedObjectives3['Nom du client'],
    'Email de client': this.selectedObjectives3['Email de client'],
    'Téléphone de client': this.selectedObjectives3['Téléphone de client'],
    'Commentaire': this.selectedObjectives3['Commentaire'],
  };

  this.errorMessage = ''; // Clear error message
  return true; // Validation succeeded
}

if (
  this.selectedObjectives3['Type de donneur d ordre'] === 'professionnel mandaté par le propriétaire' &&
  this.selectedObjectives3['Votre client est un(e)'] === 'Société'
) {
  // Check if required fields are filled out
  if (
    !this.selectedObjectives3['Nom de votre société (client)'] ||
    !this.selectedObjectives3['Nom du contact principal'] ||
    !this.selectedObjectives3['Email de contact principal'] ||
    !this.selectedObjectives3['Téléphone de contact principal'] ||
    !this.selectedObjectives3['Commentaire']
  ) {
    this.errorMessage = 'Veuillez renseigner toutes les informations requises pour le professionnel mandaté par le propriétaire et la société.';
    return false; // Prevent progression
  }

  // Assign values to selectedObjectives3 if validation passed
  this.selectedObjectives3 = {
    'Nom de votre société (client)': this.selectedObjectives3['Nom de votre société (client)'],
    'Nom du contact principal': this.selectedObjectives3['Nom du contact principal'],
    'Email de contact principal': this.selectedObjectives3['Email de contact principal'],
    'Téléphone de contact principal': this.selectedObjectives3['Téléphone de contact principal'],
    'Commentaire': this.selectedObjectives3['Commentaire'],
  };

  this.errorMessage = ''; // Clear error message
  return true; // Validation succeeded
}}

    
    
    
    
    
    
    isFieldTouched: { [key: string]: boolean } = {};

    onTouched(field: string): void {
      this.isFieldTouched[field] = true; // Mark the field as touched when the user clicks outside
    }

  setActive(type: string, value: string) {


    if(this.step===1){

      if(value ==='Location'){

        delete this.selectedObjectives2['Assainissement'];

      }
      
      if(value ==='Maison'){

        delete this.selectedObjectives2['Nombre de places de parking'];
        delete this.selectedObjectives2['cave'];

     
      }

      if(value=== 'Location'){
        delete this.selectedObjectives2['La maison est-elle en copropriété ?']
      }

        
      if(this.selectedObjectives['Type de bien'] !='Local professionnel'){
      
          delete this.selectedObjectives['local'];

      }
    
      if (value !== 'Local professionnel') {
        delete this.selectedObjectives['Autre local professionnel'];

      }
      
      if (type !== 'Local professionnel' && this.selectedObjectives['local'] !== 'Autre') {
        delete this.selectedObjectives['local'];

      }

    this.selectedObjectives[type] = value;
      
  }



else if (this.step ===2){

  /* parking */

  if (this.selectedObjectives['Type de bien'] === 'Parking') {
    this.selectedObjectives2 = {
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Nombre de places de parking': this.selectedObjectives2['Nombre de places de parking']
    };
  }
  /**/


  /* cave */

  if (this.selectedObjectives['Type de bien'] === 'Cave') {
    this.selectedObjectives2 = {
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Nombre de caves': this.selectedObjectives2['Nombre de caves']
    };
  }
  /**/


    /* Maison-Location */

  if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] !='Aprés le 1er juillet 1997' ) {
    this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],


        };

    

     
     
  }
  
  if (this.selectedObjectives['Type de bien'] === 'Maison'  && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] ==='Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']==='Oui'){
    this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],



        };

      

  }
  if (this.selectedObjectives['Type de bien'] === 'Maison'  && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] ==='Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']!='Oui'){
    this.selectedObjectives2 = {
      'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
      'Date de construction': this.selectedObjectives2['Date de construction'],
      'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],



        };

      

  }
    /**/


        /* Maison-Vente */
        if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] !='Aprés le 1er juillet 1997' ) {
          this.selectedObjectives2 = {
            'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
            'Date de construction': this.selectedObjectives2['Date de construction'],
            'La maison est-elle en copropriété ?': this.selectedObjectives2['La maison est-elle en copropriété ?'],
            'Assainissement': this.selectedObjectives2['Assainissement'],
            'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],


      
      
              };
      
          
      
           
           
        }


        if (this.selectedObjectives['Type de bien'] === 'Maison'  && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] ==='Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']!='oui'){
          this.selectedObjectives2 = {
            'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
            'Date de construction': this.selectedObjectives2['Date de construction'],
            'La maison est-elle en copropriété ?': this.selectedObjectives2['La maison est-elle en copropriété ?'],
            'Assainissement': this.selectedObjectives2['Assainissement'],
            'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],

            'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],

      
      
      
              };
      
            
      
        }


        if (this.selectedObjectives['Type de bien'] === 'Maison'  && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] ==='Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']==='oui'){
          this.selectedObjectives2 = {
            'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
            'Date de construction': this.selectedObjectives2['Date de construction'],
            'La maison est-elle en copropriété ?': this.selectedObjectives2['La maison est-elle en copropriété ?'],
            'Assainissement': this.selectedObjectives2['Assainissement'],
            'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],

      
      
      
              };
      
            
      
        }

      
      

    /**/

    /* Terrain */
    if (this.selectedObjectives['Type de bien'] === 'terrain' && this.selectedObjectives2['Construction sur le Terrain']==='Non') {

      this.selectedObjectives2 = {
        'Surface du terrain (approx. en m²)': this.selectedObjectives2['Surface du terrain (approx. en m²)'],
        'Construction sur le Terrain': this.selectedObjectives2['Construction sur le Terrain'],
          };
  
    }

    if (this.selectedObjectives['Type de bien'] === 'terrain'   && this.selectedObjectives2['Construction sur le Terrain']==='Oui'&& this.selectedObjectives2['Type_construction'] !='Autre' ) {
      
      this.selectedObjectives2 = {
        'Surface du terrain (approx. en m²)': this.selectedObjectives2['Surface du terrain (approx. en m²)'],
        'Construction sur le Terrain': this.selectedObjectives2['Construction sur le Terrain'],
        'Surface de la construction (approx. en m²)': this.selectedObjectives2['Surface de la construction (approx. en m²)'],
        'Type_construction': this.selectedObjectives2['Type_construction'],

          };
    }

    if (this.selectedObjectives['Type de bien'] === 'terrain' && this.selectedObjectives2['Construction sur le Terrain']==='Oui' && this.selectedObjectives2['Construction sur le Terrain']==='Oui' && this.selectedObjectives2['Type_construction']==='Autre') {
     
      this.selectedObjectives2 = {
        'Surface du terrain (approx. en m²)': this.selectedObjectives2['Surface du terrain (approx. en m²)'],
        'Construction sur le Terrain': this.selectedObjectives2['Construction sur le Terrain'],
        'Surface de la construction (approx. en m²)': this.selectedObjectives2['Surface de la construction (approx. en m²)'],
        'Type_construction': this.selectedObjectives2['Type_construction'],
        'Description de la construction': this.selectedObjectives2['Description de la construction'],

        

          };
    }

    /**/


    /* Local pro */
    if (this.selectedObjectives['Type de bien'] === 'Local professionnel' && this.selectedObjectives['Objectif']==='Location'  && this.selectedObjectives['local']==='Hotel') {
      this.selectedObjectives2 = {
        'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
        'Date de construction': this.selectedObjectives2['Date de construction'],
        'Nombre de chambres au total': this.selectedObjectives2['Nombre de chambres au total'],


        

          };


    }

    if (this.selectedObjectives['Type de bien'] === 'Local professionnel' && this.selectedObjectives['Objectif']==='Location'  && this.selectedObjectives['local']==='Autre') {
      this.selectedObjectives2 = {
        'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
        'Date de construction': this.selectedObjectives2['Date de construction'],

       

        

          };

    }

  

/* local pro-vente */


if (this.selectedObjectives['Type de bien'] === 'Local professionnel' && this.selectedObjectives['Objectif']==='Vente'  && this.selectedObjectives['local']==='Hotel') {
  this.selectedObjectives2 = {
    'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
    'Date de construction': this.selectedObjectives2['Date de construction'],
    'Nombre de chambres au total': this.selectedObjectives2['Nombre de chambres au total'],
    'Assainissement': this.selectedObjectives2['Assainissement'],

    
   

    

      };
      

}
    if (this.selectedObjectives['Type de bien'] === 'Local professionnel' && this.selectedObjectives['Objectif']==='Vente'  &&  this.selectedObjectives['local'] === 'Autre') {
      this.selectedObjectives2 = {
        'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
        'Date de construction': this.selectedObjectives2['Date de construction'],
        'Assainissement': this.selectedObjectives2['Assainissement'],


        

          };

    }


  


    if (this.selectedObjectives['Type de bien'] === 'Local professionnel' && this.selectedObjectives['Objectif'] === 'Vente' && (this.selectedObjectives['local'] === 'Commerce' || this.selectedObjectives['local'] === 'Bureaux' || this.selectedObjectives['local'] === 'Atelier' || this.selectedObjectives['local'] === 'Entrepot' || this.selectedObjectives['local'] === 'Batiment industriel' )) {
      this.selectedObjectives2 = {
        'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
        'Date de construction': this.selectedObjectives2['Date de construction'],
        'Assainissement': this.selectedObjectives2['Assainissement'],


        

          };

    }

    /**/

    /* immeuble collectif-location */
   
    if (this.selectedObjectives['Type de bien'] === 'Immeuble collectif' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] != 'Aprés le 1er juillet 1997') {
      
      this.selectedObjectives2 = {
        'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
        'Date de construction': this.selectedObjectives2['Date de construction'],
        'Nombre dappartements': this.selectedObjectives2['Nombre dappartements'],
        'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
        'Nombre de locaux commerciaux': this.selectedObjectives2['Nombre de locaux commerciaux'],
        'cave': this.selectedObjectives2['cave'],
        'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],


        

          };
    }

    if (this.selectedObjectives['Type de bien'] === 'Immeuble collectif' && this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !='oui') {
      
      this.selectedObjectives2 = {
        'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
        'Date de construction': this.selectedObjectives2['Date de construction'],
        'Nombre dappartements': this.selectedObjectives2['Nombre dappartements'],
        'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],

        'Nombre de locaux commerciaux': this.selectedObjectives2['Nombre de locaux commerciaux'],
        'cave': this.selectedObjectives2['cave'],
        'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
        'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],




        

          };
    }

    if (this.selectedObjectives['Type de bien'] === 'Immeuble collectif' && this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] ==='oui') {
      
      this.selectedObjectives2 = {
        'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
        'Date de construction': this.selectedObjectives2['Date de construction'],
        'Nombre dappartements': this.selectedObjectives2['Nombre dappartements'],
        'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],

        'Nombre de locaux commerciaux': this.selectedObjectives2['Nombre de locaux commerciaux'],
        'cave': this.selectedObjectives2['cave'],
        'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],




        

          };
    }


    /**/


     /* immeuble collectif-vente */
   
     if (this.selectedObjectives['Type de bien'] === 'Immeuble collectif' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] != 'Aprés le 1er juillet 1997') {
      
      this.selectedObjectives2 = {
        'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
        'Date de construction': this.selectedObjectives2['Date de construction'],
        'Nombre dappartements': this.selectedObjectives2['Nombre dappartements'],
        'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
        'Nombre de locaux commerciaux': this.selectedObjectives2['Nombre de locaux commerciaux'],
        'cave': this.selectedObjectives2['cave'],
        'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
        'Assainissement': this.selectedObjectives2['Assainissement'],

        'Un dossier unique ou un par appartement/local commercial ?': this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'],


        

          };
    }

    if (this.selectedObjectives['Type de bien'] === 'Immeuble collectif' && this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !='oui') {
      
      this.selectedObjectives2 = {
        'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
        'Date de construction': this.selectedObjectives2['Date de construction'],
        'Nombre dappartements': this.selectedObjectives2['Nombre dappartements'],
        'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],

        'Nombre de locaux commerciaux': this.selectedObjectives2['Nombre de locaux commerciaux'],
        'cave': this.selectedObjectives2['cave'],
        'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
        'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
        'Assainissement': this.selectedObjectives2['Assainissement'],

        'Un dossier unique ou un par appartement/local commercial ?': this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'],





        

          };
    }

    if (this.selectedObjectives['Type de bien'] === 'Immeuble collectif' && this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] ==='oui') {
      
      this.selectedObjectives2 = {
        'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
        'Date de construction': this.selectedObjectives2['Date de construction'],
        'Nombre dappartements': this.selectedObjectives2['Nombre dappartements'],
        'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],

        'Nombre de locaux commerciaux': this.selectedObjectives2['Nombre de locaux commerciaux'],
        'cave': this.selectedObjectives2['cave'],
        'Assainissement': this.selectedObjectives2['Assainissement'],

        'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],
        'Un dossier unique ou un par appartement/local commercial ?': this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'],





        

          };
    }


    /**/


      /* Appartement-Vente */
   
      if (this.selectedObjectives['Type de bien'] === 'Appartement' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] != 'Aprés le 1er juillet 1997') {
      
        this.selectedObjectives2 = {
          'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
          'Date de construction': this.selectedObjectives2['Date de construction'],
          'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
          'cave': this.selectedObjectives2['cave'],
          'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
          'Assainissement': this.selectedObjectives2['Assainissement'],
  
  
  
          
  
            };
      }
  
      if (this.selectedObjectives['Type de bien'] === 'Appartement' && this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !='oui') {
        
        this.selectedObjectives2 = {
          'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
          'Date de construction': this.selectedObjectives2['Date de construction'],
          'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
          'cave': this.selectedObjectives2['cave'],
          'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
          'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],

          'Assainissement': this.selectedObjectives2['Assainissement'],
  
  
  
  
  
          
  
            };
      }
  
      if (this.selectedObjectives['Type de bien'] === 'Appartement' && this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] ==='oui') {
        
        this.selectedObjectives2 = {
          'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
          'Date de construction': this.selectedObjectives2['Date de construction'],
          'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
          'cave': this.selectedObjectives2['cave'],
          'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],

          'Assainissement': this.selectedObjectives2['Assainissement'],
  
  
  
  
  
  
          
  
            };
      }
  
  
      /**/


       /* Appartement-Location */
   
       if (this.selectedObjectives['Type de bien'] === 'Appartement' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] != 'Aprés le 1er juillet 1997') {
      
        this.selectedObjectives2 = {
          'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
          'Date de construction': this.selectedObjectives2['Date de construction'],
          'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
          'cave': this.selectedObjectives2['cave'],
          'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
  
            };
      }
  
      if (this.selectedObjectives['Type de bien'] === 'Appartement' && this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !='oui') {
        
        this.selectedObjectives2 = {
          'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
          'Date de construction': this.selectedObjectives2['Date de construction'],
          'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
          'cave': this.selectedObjectives2['cave'],
          'Y a-t-il une installation gaz ?': this.selectedObjectives2['Y a-t-il une installation gaz ?'],
          'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],

  
            };
      }
  
      if (this.selectedObjectives['Type de bien'] === 'Appartement' && this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] ==='oui') {
        
        this.selectedObjectives2 = {
          'Surface du bien (approx. en m²)': this.selectedObjectives2['Surface du bien (approx. en m²)'],
          'Date de construction': this.selectedObjectives2['Date de construction'],
          'Nombre de place(s) de Parking': this.selectedObjectives2['Nombre de place(s) de Parking'],
          'cave': this.selectedObjectives2['cave'],
          'Le permis de construire date-t-il de moins de 15 ans ?': this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'],

  
  
  
  
  
  
          
  
            };
      }
  
  
      /**/



  this.selectedObjectives2[type] = value;
}


else if (this.step ===3){
  this.selectedObjectives3[type] = value;
}

else if (this.step ===4){

  




  this.selectedObjectives3[type] = value;
}


else if (this.step ===5){
 
  this.selectedObjectives4[type] = value;
}


else{

  return

}


  }

   autoItems = [
    { name: 'Risques et pollutions (ERP)', image: '/assets/image/ERP.webp', Quantite: 1 },
    { name: 'Amiante', image: '/assets/image/habita.webp', Quantite: 1 },
    { name: 'Métrage (Loi Carrez)', image: '/assets/image/habitablee.webp', Quantite: 1 },
    { name: 'Métrage (Loi Boutin)', image: '/assets/image/habitablee.webp', Quantite: 1 },
    { name: 'Installation électricité', image: '/assets/image/h.webp', Quantite: 1 },

    { name: 'Installation gaz', image: '/assets/image/habitableee (2).webp', Quantite: 1 },
    { name: 'Diagnostic termites', image: '/assets/image/gg.webp', Quantite: 1 },
    { name: 'Plomb (Crep)', image: '/assets/image/habitableee.webp', Quantite: 1 },
    
    { name: 'Performance énergétique (DPE)', image: '/assets/image/DPE.webp', Quantite: 1 },
    { name: 'Supplément Parking', image: '/assets/image/park.png', Quantite: 1 },
    { name: 'Diagnostic Technique Global (DTG)', image: '/assets/image/27c32540-74b0-11ed-8e6c-09ead3a7d4d7.webp', Quantite: 1 },
    
    { name: 'Dossier Technique Amiante (DTA)', image: '/assets/image/dta.png', Quantite: 1 },
    
    { name: 'Plomb Parties Communes', image: '/assets/image/habitableee.webp', Quantite: 1 },
    { name: 'Termites Parties Communes', image: '/assets/image/gg.webp', Quantite: 1 },
    { name: 'Assainissement', image: '/assets/image/assainissement.webp', Quantite: 1 },



  ];



// Déclarez le tableau `autoItems` comme vous l'avez défini.


AutoDiag() {

  /* parking-location */
  
  if ( this.selectedObjectives['Type de bien'] === 'Parking' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] === 'Avant le 1er juillet 1997' ) {

    const diagnosticsToAdd = ['Risques et pollutions (ERP)', 'Amiante'];

    const quantite = this.selectedObjectives2['Nombre de places de parking'];

   
    this.panier = this.autoItems
      .filter(item => diagnosticsToAdd.includes(item.name))
      .map(item => ({
        ...item, // Copie de l'objet existant
        Quantite: quantite 
      }));  
    }

  else if ( this.selectedObjectives['Type de bien'] === 'Parking' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'){
    const diagnosticsToAdd = ['Risques et pollutions (ERP)'];

    const quantite = this.selectedObjectives2['Nombre de places de parking'];

   
    this.panier = this.autoItems
      .filter(item => diagnosticsToAdd.includes(item.name))
      .map(item => ({
        ...item, // Copie de l'objet existant
        Quantite: quantite 
      }));  
      }

  /**/


   /* parking-vente */
  
   else if ( this.selectedObjectives['Type de bien'] === 'Parking' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Avant le 1er juillet 1997' ) {

    const diagnosticsToAdd = ['Risques et pollutions (ERP)', 'Amiante','Assainissement'];

    const quantite = this.selectedObjectives2['Nombre de places de parking'];

   
    this.panier = this.autoItems
      .filter(item => diagnosticsToAdd.includes(item.name))
      .map(item => ({
        ...item, // Copie de l'objet existant
        Quantite: quantite 
      }));      
  }

  else if ( this.selectedObjectives['Type de bien'] === 'Parking' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'){
    const diagnosticsToAdd = ['Risques et pollutions (ERP)','Assainissement'];

    const quantite = this.selectedObjectives2['Nombre de places de parking'];

   
    this.panier = this.autoItems
      .filter(item => diagnosticsToAdd.includes(item.name))
      .map(item => ({
        ...item, // Copie de l'objet existant
        Quantite: quantite 
      }));      
  }

  /**/


   /* cave-location */
  
   else if ( this.selectedObjectives['Type de bien'] === 'Cave' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] === 'Avant le 1er juillet 1997' ) {

    const diagnosticsToAdd = ['Risques et pollutions (ERP)', 'Amiante'];

    const quantite = this.selectedObjectives2['Nombre de caves'];

   
    this.panier = this.autoItems
      .filter(item => diagnosticsToAdd.includes(item.name))
      .map(item => ({
        ...item, // Copie de l'objet existant
        Quantite: quantite 
      }));
  
  }

  else if ( this.selectedObjectives['Type de bien'] === 'Cave' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'){
    const diagnosticsToAdd = ['Risques et pollutions (ERP)'];


    const quantite = this.selectedObjectives2['Nombre de caves'];

   
    this.panier = this.autoItems
      .filter(item => diagnosticsToAdd.includes(item.name))
      .map(item => ({
        ...item, // Copie de l'objet existant
        Quantite: quantite 
      }));
  
  }

  /**/


   /* cave-vente */
  
   else if ( this.selectedObjectives['Type de bien'] === 'Cave' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Avant le 1er juillet 1997' ) {

    const diagnosticsToAdd = ['Risques et pollutions (ERP)', 'Amiante' , 'Diagnostic termites'];

    const quantite = this.selectedObjectives2['Nombre de caves'];

   
    this.panier = this.autoItems
      .filter(item => diagnosticsToAdd.includes(item.name))
      .map(item => ({
        ...item, // Copie de l'objet existant
        Quantite: quantite 
      }));
    }

  else if ( this.selectedObjectives['Type de bien'] === 'Cave' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'){
    const diagnosticsToAdd = ['Risques et pollutions (ERP)','Diagnostic termites'];

    const quantite = this.selectedObjectives2['Nombre de caves'];

   
    this.panier = this.autoItems
      .filter(item => diagnosticsToAdd.includes(item.name))
      .map(item => ({
        ...item, // Copie de l'objet existant
        Quantite: quantite 
      }));
    }

  /**/


  /* Maison-Location */
  
  else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] === 'Avant 1949' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'Pas dinstallation'){

    const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Métrage (Loi Boutin)','Installation électricité','Plomb (Crep)' , 'Performance énergétique (DPE)'];

    this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

  else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] === 'Avant 1949' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui'){
    const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Métrage (Loi Boutin)','Installation électricité', 'Installation gaz','Plomb (Crep)' , 'Performance énergétique (DPE)'];

    this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'Pas dinstallation'){

      const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Métrage (Loi Boutin)','Installation électricité' , 'Performance énergétique (DPE)'];
  
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
      }
  
    else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui'){
      const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Métrage (Loi Boutin)','Installation électricité', 'Installation gaz' , 'Performance énergétique (DPE)'];
  
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
      }

      else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui'){
        const diagnosticsToAdd = ['Risques et pollutions (ERP)','Métrage (Loi Boutin)', 'Performance énergétique (DPE)'];
    
        this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
        }

        else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui'){
          const diagnosticsToAdd = ['Risques et pollutions (ERP)','Métrage (Loi Boutin)', 'Performance énergétique (DPE)','Installation électricité','Installation gaz'];
      
          this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
          }

          else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Location' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'Pas dinstallation'){
            const diagnosticsToAdd = ['Risques et pollutions (ERP)','Métrage (Loi Boutin)', 'Performance énergétique (DPE)','Installation électricité'];
        
            this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
            }
  

  /**/


    /* Maison-Vente */

    else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Avant 1949' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'Pas dinstallation' && this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' && this.selectedObjectives2['Assainissement'] != 'oui'){

      const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Installation électricité','Plomb (Crep)' , 'Performance énergétique (DPE)','Diagnostic termites'];
  
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
      }

      else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Avant 1949' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' && this.selectedObjectives2['Assainissement'] != 'oui'){

        const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Installation électricité','Plomb (Crep)' , 'Performance énergétique (DPE)','Diagnostic termites','Installation gaz'];
    
        this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
        }

      

          else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Avant 1949' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'Pas dinstallation' && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] != 'oui'){

            const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Installation électricité','Plomb (Crep)' , 'Performance énergétique (DPE)','Diagnostic termites','Métrage (Loi Carrez)'];
        
            this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
            }

            else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Avant 1949' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'Pas dinstallation' && this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' && this.selectedObjectives2['Assainissement'] === 'oui'){

              const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Installation électricité','Plomb (Crep)' , 'Performance énergétique (DPE)','Diagnostic termites' ,'Assainissement'];
          
              this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
              }

              else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Avant 1949' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'Pas dinstallation' && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] === 'oui'){

                const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Installation électricité','Plomb (Crep)' , 'Performance énergétique (DPE)','Diagnostic termites' ,'Assainissement' ,'Métrage (Loi Carrez)'];
            
                this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                }

                else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Avant 1949' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] === 'oui'){

                  const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Installation électricité','Plomb (Crep)' , 'Performance énergétique (DPE)','Diagnostic termites' ,'Assainissement' ,'Métrage (Loi Carrez)' ,'Installation gaz'];
              
                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                  }

                  else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' &&  this.selectedObjectives2['Date de construction'] === 'Avant 1949' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] != 'oui')   {
                    const diagnosticsToAdd = ['Risques et pollutions (ERP)', 'Amiante', 'Installation électricité', 'Plomb (Crep)', 'Performance énergétique (DPE)', 'Diagnostic termites', 'Métrage (Loi Carrez)', 'Installation gaz'];
                    this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                  }

                  else if (
                    this.selectedObjectives['Type de bien'] === 'Maison' &&
                    this.selectedObjectives['Objectif'] === 'Vente' &&
                    this.selectedObjectives2['Date de construction'] === 'Avant 1949' &&
                    this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' &&
                    this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' &&
                    this.selectedObjectives2['Assainissement'] === 'oui'
                  ) {
                    const diagnosticsToAdd = ['Risques et pollutions (ERP)', 'Amiante', 'Installation électricité', 'Plomb (Crep)', 'Performance énergétique (DPE)', 'Diagnostic termites', 'Installation gaz', 'Assainissement'];
                    this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                  }






                  else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'Pas dinstallation' && this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' && this.selectedObjectives2['Assainissement'] != 'oui'){

                    const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Installation électricité' , 'Performance énergétique (DPE)','Diagnostic termites'];
                
                    this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                    }
              
                    else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' && this.selectedObjectives2['Assainissement'] != 'oui'){
              
                      const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Installation électricité' , 'Performance énergétique (DPE)','Diagnostic termites','Installation gaz'];
                  
                      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                      }
              
                    
              
                        else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'Pas dinstallation' && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] != 'oui'){
              
                          const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Installation électricité' , 'Performance énergétique (DPE)','Diagnostic termites','Métrage (Loi Carrez)'];
                      
                          this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                          }
              
                          else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'Pas dinstallation' && this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' && this.selectedObjectives2['Assainissement'] === 'oui'){
              
                            const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Installation électricité' , 'Performance énergétique (DPE)','Diagnostic termites' ,'Assainissement'];
                        
                            this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                            }
              
                            else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'Pas dinstallation' && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] === 'oui'){
              
                              const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Installation électricité' , 'Performance énergétique (DPE)','Diagnostic termites' ,'Assainissement' ,'Métrage (Loi Carrez)'];
                          
                              this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                              }
              
                              else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] === 'oui'){
              
                                const diagnosticsToAdd = ['Risques et pollutions (ERP)','Amiante','Installation électricité' , 'Performance énergétique (DPE)','Diagnostic termites' ,'Assainissement' ,'Métrage (Loi Carrez)' ,'Installation gaz'];
                            
                                this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }
              
                                else if ( this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' &&  this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] != 'oui')   {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)', 'Amiante', 'Installation électricité', 'Performance énergétique (DPE)', 'Diagnostic termites', 'Métrage (Loi Carrez)', 'Installation gaz'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }
              
                                else if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' && this.selectedObjectives2['Assainissement'] === 'oui') {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)', 'Amiante', 'Installation électricité', 'Performance énergétique (DPE)', 'Diagnostic termites', 'Installation gaz', 'Assainissement'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }




                                else if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']==='oui'  && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] === 'oui') {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)', 'Métrage (Loi Carrez)' , 'Performance énergétique (DPE)', 'Diagnostic termites', 'Assainissement'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }

                                else if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']==='oui'  && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] !='oui') {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)', 'Métrage (Loi Carrez)' , 'Performance énergétique (DPE)', 'Diagnostic termites'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }

                                else if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']==='oui'  && this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' && this.selectedObjectives2['Assainissement'] ==='oui') {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Performance énergétique (DPE)', 'Diagnostic termites' , 'Assainissement'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }

                                else if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']==='oui'  && this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' && this.selectedObjectives2['Assainissement'] !='oui') {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Performance énergétique (DPE)', 'Diagnostic termites'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }


                                else if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !='oui'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui'  && this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' && this.selectedObjectives2['Assainissement'] !='oui') {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Performance énergétique (DPE)', 'Installation électricité' , 'Diagnostic termites'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }

                                else if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !='oui'   && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui'  && this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' && this.selectedObjectives2['Assainissement'] !='oui') {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Performance énergétique (DPE)', 'Installation électricité' , 'Diagnostic termites','Installation gaz'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }

                                else if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !='oui'   && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui'  && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] !='oui') {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Performance énergétique (DPE)', 'Installation électricité' , 'Diagnostic termites','Installation gaz' ,'Métrage (Loi Carrez)'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }

                                else if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !='oui'   && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui'  && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] ==='oui') {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Performance énergétique (DPE)', 'Installation électricité' , 'Diagnostic termites','Installation gaz' ,'Métrage (Loi Carrez)','Assainissement'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }

                                else if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !='oui'   && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui'  && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] !='oui') {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Performance énergétique (DPE)', 'Installation électricité' , 'Diagnostic termites' ,'Métrage (Loi Carrez)'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }

                                else if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !='oui'   && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui'  && this.selectedObjectives2['La maison est-elle en copropriété ?'] != 'oui' && this.selectedObjectives2['Assainissement'] ==='oui') {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Performance énergétique (DPE)', 'Installation électricité' , 'Diagnostic termites' ,'Métrage (Loi Carrez)','Assainissement'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }

                                else if (this.selectedObjectives['Type de bien'] === 'Maison' && this.selectedObjectives['Objectif'] === 'Vente' && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] !='oui'   && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui'  && this.selectedObjectives2['La maison est-elle en copropriété ?'] === 'oui' && this.selectedObjectives2['Assainissement'] ==='oui') {
                                  const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Performance énergétique (DPE)', 'Installation électricité' , 'Diagnostic termites' ,'Métrage (Loi Carrez)','Assainissement'];
                                  this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
                                }


    /**/


    /* Terrain */
    else if (this.selectedObjectives['Type de bien'] === 'terrain'  && this.selectedObjectives2['Construction sur le Terrain'] === 'Non') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Type de bien'] === 'terrain'  && this.selectedObjectives2['Construction sur le Terrain'] === 'Oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)','Diagnostic termites'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    /* Immeuble collectif - location*/
    
    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Date de construction'] === 'Avant 1949' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante' , 'Métrage (Loi Boutin)' , 'Installation électricité' , 'Plomb (Crep)' , 'Performance énergétique (DPE)' , 'Supplément Parking' , 'Dossier Technique Amiante (DTA)'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Date de construction'] === 'Avant 1949' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante' , 'Métrage (Loi Boutin)' , 'Installation électricité' , 'Plomb (Crep)' , 'Performance énergétique (DPE)' , 'Supplément Parking' , 'Dossier Technique Amiante (DTA)','Installation gaz'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante' , 'Métrage (Loi Boutin)' , 'Installation électricité' , 'Performance énergétique (DPE)' , 'Supplément Parking' , 'Dossier Technique Amiante (DTA)','Installation gaz'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante' , 'Métrage (Loi Boutin)' , 'Installation électricité' , 'Performance énergétique (DPE)' , 'Supplément Parking' , 'Dossier Technique Amiante (DTA)'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Boutin)' , 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Boutin)' , 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Boutin)' , 'Performance énergétique (DPE)' , 'Supplément Parking','Installation gaz'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Boutin)' , 'Performance énergétique (DPE)' , 'Supplément Parking','Installation gaz'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997' && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Boutin)' , 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }


    /*  */


    /* Immeuble collectif - Vente*/

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'] === 'Un seul dossier' && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' ,'Amiante' , 'Métrage (Loi Carrez)' , 'Performance énergétique (DPE)' , 'Assainissement','Installation électricité','Installation gaz','Diagnostic termites','Plomb (Crep)' ,'Performance énergétique (DPE)','Supplément Parking','Dossier Technique Amiante (DTA)' , 'Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'] === 'Un seul dossier' && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui' && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' ,'Amiante' , 'Métrage (Loi Carrez)' , 'Performance énergétique (DPE)' , 'Assainissement','Installation électricité','Diagnostic termites','Plomb (Crep)' ,'Performance énergétique (DPE)','Supplément Parking','Dossier Technique Amiante (DTA)' , 'Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'] === 'Un seul dossier' && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' ,'Amiante' , 'Métrage (Loi Carrez)' , 'Performance énergétique (DPE)' ,'Installation électricité','Diagnostic termites','Plomb (Crep)' ,'Installation gaz','Performance énergétique (DPE)','Supplément Parking','Dossier Technique Amiante (DTA)' , 'Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }
    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'] === 'Un seul dossier' && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui' && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' ,'Amiante' , 'Métrage (Loi Carrez)' , 'Performance énergétique (DPE)' ,'Installation électricité','Diagnostic termites','Plomb (Crep)' ,'Performance énergétique (DPE)','Supplément Parking','Dossier Technique Amiante (DTA)' , 'Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }



    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'] != 'Un seul dossier' && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' ,'Amiante' , 'Métrage (Loi Carrez)' , 'Assainissement' , 'Installation électricité','Installation gaz','Diagnostic termites','Plomb (Crep)','Performance énergétique (DPE)' ,'Supplément Parking','Dossier Technique Amiante (DTA)' , 'Plomb Parties Communes','Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }
    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'] != 'Un seul dossier' && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui' && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' ,'Amiante' , 'Métrage (Loi Carrez)' , 'Assainissement' , 'Installation électricité','Diagnostic termites','Plomb (Crep)','Performance énergétique (DPE)' ,'Supplément Parking','Dossier Technique Amiante (DTA)' , 'Plomb Parties Communes','Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }
    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'] != 'Un seul dossier' && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' ,'Amiante' , 'Métrage (Loi Carrez)'  , 'Installation électricité','Installation gaz','Diagnostic termites','Plomb (Crep)','Performance énergétique (DPE)' ,'Supplément Parking','Dossier Technique Amiante (DTA)' , 'Plomb Parties Communes','Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }
    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Un dossier unique ou un par appartement/local commercial ?'] != 'Un seul dossier' && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui' && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' ,'Amiante' , 'Métrage (Loi Carrez)'  , 'Installation électricité','Diagnostic termites','Plomb (Crep)','Performance énergétique (DPE)' ,'Supplément Parking','Dossier Technique Amiante (DTA)' , 'Plomb Parties Communes','Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }



    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'   && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' ,'Amiante' , 'Métrage (Loi Carrez)'  , 'Assainissement','Installation électricité','Installation gaz','Diagnostic termites' ,'Performance énergétique (DPE)','Supplément Parking' , 'Dossier Technique Amiante (DTA)','Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'  && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' ,'Amiante' , 'Métrage (Loi Carrez)' ,'Installation électricité','Installation gaz','Diagnostic termites' ,'Performance énergétique (DPE)','Supplément Parking' , 'Dossier Technique Amiante (DTA)','Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'   && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui' && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' ,'Amiante' , 'Métrage (Loi Carrez)'  , 'Assainissement','Installation électricité','Diagnostic termites' ,'Performance énergétique (DPE)','Supplément Parking' , 'Dossier Technique Amiante (DTA)','Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    
    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'   && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui' && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' ,'Amiante' , 'Métrage (Loi Carrez)'  ,'Installation électricité','Diagnostic termites' ,'Performance énergétique (DPE)','Supplément Parking' , 'Dossier Technique Amiante (DTA)','Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui' && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)'  ,'Assainissement','Diagnostic termites' ,'Performance énergétique (DPE)','Supplément Parking' ,'Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui' && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)' ,'Diagnostic termites' ,'Performance énergétique (DPE)','Supplément Parking' ,'Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)','Assainissement' ,'Installation électricité' ,'Installation gaz','Diagnostic termites' ,'Supplément Parking','Performance énergétique (DPE)','Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui' && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)','Installation électricité' ,'Installation gaz','Diagnostic termites' ,'Supplément Parking','Performance énergétique (DPE)','Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui' && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)','Assainissement' ,'Installation électricité' ,'Diagnostic termites' ,'Supplément Parking','Performance énergétique (DPE)','Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Immeuble collectif'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui' && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)' ,'Installation électricité' ,'Diagnostic termites' ,'Supplément Parking','Performance énergétique (DPE)','Termites Parties Communes'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    /**/



    /* local pro -location */

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Local professionnel'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)' ,'Performance énergétique (DPE)'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Local professionnel'   && this.selectedObjectives2['Date de construction'] != 'Aprés le 1er juillet 1997') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Carrez)' ,'Performance énergétique (DPE)'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }



    /**/


     /* local pro -Vente */

     else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Local professionnel'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)' ,'Assainissement' ,'Diagnostic termites' ,'Performance énergétique (DPE)'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Local professionnel'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)' ,'Diagnostic termites' ,'Performance énergétique (DPE)'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Local professionnel'   && this.selectedObjectives2['Date de construction'] != 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Carrez)' , 'Assainissement' , 'Diagnostic termites', 'Performance énergétique (DPE)'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Local professionnel'   && this.selectedObjectives2['Date de construction'] != 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Carrez)'  , 'Diagnostic termites', 'Performance énergétique (DPE)'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }



    /**/



    /* Appartement - location  */

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Boutin)' ,'Installation électricité' ,'Installation gaz' ,'Plomb (Crep)' , 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Boutin)' ,'Installation électricité' ,'Plomb (Crep)' , 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Boutin)' ,'Installation électricité' ,'Installation gaz', 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?']==='oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Boutin)'  , 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Boutin)'  , 'Installation électricité' , 'Installation gaz' , 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Location'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Boutin)'  , 'Installation électricité' , 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    /**/


    /* Appartement - Vente  */

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui'  && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Carrez)' ,'Assainissement' ,'Installation gaz' ,'Installation électricité' , 'Installation gaz' , 'Diagnostic termites' , 'Plomb (Crep)' , 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui'  && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Carrez)' ,'Assainissement'  ,'Installation électricité' , 'Diagnostic termites' , 'Plomb (Crep)' , 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui'  && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Carrez)'  ,'Installation gaz' ,'Installation électricité' , 'Installation gaz', 'Diagnostic termites' , 'Plomb (Crep)' , 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Avant 1949'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui'  && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Carrez)'  ,'Installation électricité', 'Diagnostic termites' , 'Plomb (Crep)' , 'Performance énergétique (DPE)' , 'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }



    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui'  && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Carrez)' ,'Assainissement' ,'Installation électricité', 'Installation gaz' ,  'Diagnostic termites' , 'Performance énergétique (DPE)' ,'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui'  && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Carrez)' ,'Assainissement' ,'Installation électricité' ,  'Diagnostic termites' , 'Performance énergétique (DPE)' ,'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'De 1949 au 1er Juillet 1997'  && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui'  && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Amiante', 'Métrage (Loi Carrez)' ,'Installation gaz'  ,'Installation électricité' ,  'Diagnostic termites' , 'Performance énergétique (DPE)' ,'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }



    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui'  && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)' ,'Assainissement'  ,'Diagnostic termites' , 'Performance énergétique (DPE)' ,'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }
    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] === 'oui'  && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)' ,'Diagnostic termites' , 'Performance énergétique (DPE)' ,'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }
    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui'  && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)' ,'Assainissement' , 'Installation électricité', 'Installation gaz' , 'Diagnostic termites' , 'Performance énergétique (DPE)' ,'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui'  && this.selectedObjectives2['Assainissement'] === 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)' ,'Assainissement' , 'Installation électricité' , 'Diagnostic termites' , 'Performance énergétique (DPE)' ,'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] === 'oui'  && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)' ,'Assainissement' , 'Installation électricité' , 'Installation gaz' , 'Diagnostic termites' , 'Performance énergétique (DPE)' ,'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }

    else if (this.selectedObjectives['Objectif'] === 'Vente'  && this.selectedObjectives['Type de bien'] === 'Appartement'   && this.selectedObjectives2['Date de construction'] === 'Aprés le 1er juillet 1997'  && this.selectedObjectives2['Le permis de construire date-t-il de moins de 15 ans ?'] != 'oui' && this.selectedObjectives2['Y a-t-il une installation gaz ?'] != 'oui'  && this.selectedObjectives2['Assainissement'] != 'oui') {
      const diagnosticsToAdd = ['Risques et pollutions (ERP)' , 'Métrage (Loi Carrez)' ,'Installation électricité' ,  'Diagnostic termites' , 'Performance énergétique (DPE)' ,'Supplément Parking'];
      this.panier = this.autoItems.filter(item => diagnosticsToAdd.includes(item.name));
    }


    /**/


}




step=1
get progressWidth() {
    return (this.step / 5) * 100;
  
  }



 

   requiredFields = [
    'Objectif',
    'Adresse du bien',
    'Commune (code postal)',
    'Type de bien'
  ];
  showMessage = false;

  isNextButtonDisabled(): boolean {
   
    for (const field of this.requiredFields) {
      if (!this.selectedObjectives[field]) {
        return true; 
      }
    }

   
    if (this.selectedObjectives['Type de bien'] !== 'Local professionnel') {
      return false;
    }

   
    if (!this.selectedObjectives['local']) {
      return true; 
    }

  
    if (this.selectedObjectives['local'] === 'Autre' && !this.selectedObjectives['Autre local professionnel']) {
      return true; 
    }

    return false;
  }



  showError2: boolean = false;
  
  showError3: boolean = false;
  goBack() {
    this.step--;
  }

  errorFlags3 = {
    selectedPropertyType: false
  };
  errorFlags4 = {
    selectedPropertyType: false
  };
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
    this.errorFlags3.selectedPropertyType = !this.selectedObjectives['Type de bien'];
  
    // Check if any error flags are set to true (we need to show the error)
    this.showError2 = Object.values(this.errorFlags3).some(flag => flag);
  
    // Return true if no errors are present
    return !this.showError2;
  }
  errorFlags = {
    adresse_du_bien: false,
    code_postal: false,
    local:false
  };
  errorFlags2 = {
    surfaceDuBien: false,
    nombreParking: false,
  };

  validateForm(): boolean {
    // Common required field for all types
    let requiredFields = ['Type de donneur d ordre'];
  
    // Get the type of "donneur d'ordre"
    const type = this.selectedObjectives3['Type de donneur d ordre'];
  
    // Add required fields based on the type of "donneur d'ordre"
    if (type === 'particulier (propriétaire du bien)') {
      requiredFields = requiredFields.concat(['Prénom', 'Nom', 'Email', 'Téléphone']);
    } else if (type === 'société (propriétaire du bien)') {
      requiredFields = requiredFields.concat(['Nom de votre société', 'Prénom', 'Nom', 'Email', 'Téléphone']);
    } else if (type === 'professionnel mandaté par le propriétaire') {
      requiredFields = requiredFields.concat(['Nom de votre société (intermédiaire)', 'Votre client est un(e)']);
  
      // Additional fields if the client type is specified
      const clientType = this.selectedObjectives3['Votre client est un(e)'];
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
      if (!this.selectedObjectives3[field] || this.selectedObjectives3[field].trim() === '') {
        this.errorMessage = `Veuillez remplir le champ: ${field}`;
        return false;
      }
    }
  
    // Clear the error message if all fields are valid
    this.errorMessage = null;
    return true;
  }
  
  
  
  // Validate fields based on the ngModel values
  validateSelection(): boolean {
    this.errorFlags = {
      adresse_du_bien: !this.selectedObjectives['Adresse du bien'], // Checks if the field is empty
      code_postal: !this.selectedObjectives['Commune (code postal)'] || !/^\d{5}$/.test(this.selectedObjectives['Commune (code postal)']), // Checks if the code postal is valid (5 digits)
      local: this.selectedObjectives['Type de bien'] === 'Local professionnel' && !this.selectedObjectives['local'] // Validates 'local' only if 'Type de bien' is 'Local professionnel'
    };
  
    this.showError2 = Object.values(this.errorFlags).some(flag => flag); // Show error if any field is invalid
  
    return !this.showError2; // Return true if no errors
  }
  

  errorFlags5 = {
    prenom: false,
    nom:false,
    email:false,
    telephone:false
  };


  /**
   * Proceed to the next step after validation
   */
  @ViewChild('form', { static: false }) form: NgForm; // Reference to the form
  showError = false; 
  nextStep(): void {
    if (this.step === 1) {
      // If the selection is invalid, show the error message and stop the flow
      if (!this.validateSelection() || !this.validateSelection1()||!this.validateSelection2()) {
        this.showError2 = true;
        return; // Stop further processing
      }
    }
    if (this.step === 2) {
      this.AutoDiag();
      if (!this.setActiveRecheck()) {

        return;
      } 
    
     
}
    if(this.step === 3){
if(this.panier.length === 0) {
  this.showError2 = true;
  return; // Stop further processing
}}
  

if(this.step===4){
if(!this.validateForm()){
  
  return; // Prevent progression
}
}
    if(this.step>=5){
      return
    }
    this.step++;
  }


  optionsTypeConstruction = [
    'Garage',
    'Cabanon',
    'Abris de jardin',
    'Atelier',
    'Batisse',
    'Autre',
  ];


  options = [
    'Commerce',
    'Bureaux',
    'Hotel',
    'Atelier',
    'Entrepot',
    'Batiment industriel',
    'Autre',
  ];


  onSelectionChange(event: Event): void {
    
    const value = (event.target as HTMLSelectElement).value;
 
    this.selectedObjectives.local = value;
    if (this.selectedObjectives['local'] !== 'Autre') {
      delete this.selectedObjectives['Autre local professionnel'];
    }
    console.log('Selected value:', this.selectedObjectives.local);
  }


  
  onSelectionChange2(event: Event): void {

    const value = (event.target as HTMLSelectElement).value;
   
    this.selectedObjectives2.Type_construction = value;
    console.log('Selected value:', this.selectedObjectives2.Type_construction);
  }



 

  isOpen: { [key: string]: boolean } = {};

  toggleAnswer(questionId: string): void {
    
    this.isOpen[questionId] = !this.isOpen[questionId];
  }

  panier: { name: string, image: string  , Quantite:number }[] = []; 

 

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
      this.showError = true;
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

  else if(stepType==='Votre bien'){
    this.step =2;

  }
  
  else if (stepType==='Ma sélection'){
    this.step =3;
  }
 
  else if(stepType==='Informations personnelle'){
    this.step =4;

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
  
    Type:'Diagnostics Vente & Location',
     Title1:'Projet :',
    Title2:'Bien :',
    Title3:'Panier :',
    Title4:'Informations personnelle :',
  
   
    selectedObjectives: Object.entries(this.selectedObjectives)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n'),
  
    selectedObjectives2: Object.entries(this.selectedObjectives2)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n'),
  
      selectedObjectives3: Object.entries(this.selectedObjectives3)
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
  }
}