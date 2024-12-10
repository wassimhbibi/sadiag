import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';




@Component({
  selector: 'app-Audit-énergétique',
  templateUrl: './Audit-énergétique.component.html',
  styleUrls: ['./Audit-énergétique.component.scss']
})
export class AuditénergétiqueComponent implements OnInit {

  constructor(private fb: FormBuilder) {emailjs.init('f9AWPNj9CCvQhsYTE'); }


  Formrappel: FormGroup;
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
}

  selectedObjectives2: any = {};


  setActiveRecheck() {
    /* step4-forms */
  
    const typeDonneurOrdre = this.selectedObjectives2['Type de donneur d ordre'];
    const clientType = this.selectedObjectives2['Votre client est un(e)'];
  
    // Base fields for all cases
    const baseFields = {
      'Type de donneur d ordre': typeDonneurOrdre,
      'Prénom': this.selectedObjectives2['Prénom'],
      'Nom': this.selectedObjectives2['Nom'],
      'Email': this.selectedObjectives2['Email'],
      'Téléphone': this.selectedObjectives2['Téléphone'],
      'Commentaire': this.selectedObjectives2['Commentaire']
    };
  
    // Additional fields for each case
    if (typeDonneurOrdre === 'particulier (propriétaire du bien)') {
      this.selectedObjectives2 = {
        ...baseFields
      };
    } else if (typeDonneurOrdre === 'société (propriétaire du bien)') {
      this.selectedObjectives2 = {
        ...baseFields,
        'Nom de votre société': this.selectedObjectives2['Nom de votre société']
      };
    } else if (typeDonneurOrdre === 'professionnel mandaté par le propriétaire') {
      if (clientType === 'particulier') {
        this.selectedObjectives2 = {
          ...baseFields,
          'Votre client est un(e)': clientType,
          'Nom de votre société (intermédiaire)': this.selectedObjectives2['Nom de votre société (intermédiaire)'],
          'Prénom du client': this.selectedObjectives2['Prénom du client'],
          'Nom du client': this.selectedObjectives2['Nom du client'],
          'Email de client': this.selectedObjectives2['Email de client'],
          'Téléphone de client': this.selectedObjectives2['Téléphone de client']
        };
      } else if (clientType === 'Société') {
        this.selectedObjectives2 = {
          ...baseFields,
          'Votre client est un(e)': clientType,
          'Nom de votre société (intermédiaire)': this.selectedObjectives2['Nom de votre société (intermédiaire)'],
          'Nom de votre société (client)': this.selectedObjectives2['Nom de votre société (client)'],
          'Nom du contact principal': this.selectedObjectives2['Nom du contact principal'],
          'Email de contact principal': this.selectedObjectives2['Email de contact principal'],
          'Téléphone de contact principal': this.selectedObjectives2['Téléphone de contact principal']
        };
      }
    }
  }
  

  showError2: boolean = false;
  
  showError3: boolean = false;
  showError4: boolean = false;
get formControls() {
  return this.Formrappel.controls;
}
  step=1
  get progressWidth() {
    return (this.step / 4) * 100;
  
  }
  errorMessage: string = '';
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
    adresse_du_bien: false,
    code_postal: false,
    surface:false
  };
   // Validate fields based on the ngModel values
   validateSelection(): boolean {
    this.errorFlags = {
      adresse_du_bien: !this.selectedObjectives['Adresse du bien'], // Checks if the field is empty
      code_postal: !this.selectedObjectives['Code postal'] || !/^\d{5}$/.test(this.selectedObjectives['Code postal']), // Checks if the code postal is valid (5 digits)
      surface: !this.selectedObjectives['Surface du bien (approx. en m²)'], // Validates 'local' only if 'Type de bien' is 'Local professionnel'
    };
  
    this.showError2 = Object.values(this.errorFlags).some(flag => flag); // Show error if any field is invalid
  
    return !this.showError2; // Return true if no errors
  }
  validateSelection1(): boolean {
    // Check if 'Objectif' is not selected (null, undefined, or empty string)
    this.errorFlags3.selectedPropertyType = !this.selectedObjectives['objective'];
  
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
  goBack() {

    this.step--;
   
  }
  nextStep(){
    if (this.step === 1) {
      // If the selection is invalid, show the error message and stop the flow
      if (!this.validateSelection()||!this.validateSelection1()||!this.validateSelection2()) {
        this.showError2 = true;
        return; // Stop further processing
      }
    }
 
    if(this.step===3){
      if(!this.validateForm()){
        
        return; // Prevent progression
      }
      }
      
          this.step++;
        }
  selectedItems: string[] = [];
  addToSelectedItems(item: string, stepIndex: number) {
       
     this.selectedItems[stepIndex] = item; 
    
  }
    

  options = [
    'Commerce',
    'Bureaux',
    'Hotel',
    'Atelier',
    'Entrepot',
    'Batiment industriel',
    'Autre',
  ];

  selectedObjectives: any = {};
  onSelectionChange(event: Event): void {
    debugger
    const value = (event.target as HTMLSelectElement).value;
    this.selectedObjectives.local = value;
    console.log('Selected value:', this.selectedObjectives.local);
  }


 

  isOpen: { [key: string]: boolean } = {};

  toggleAnswer(questionId: string): void {
    this.isOpen[questionId] = !this.isOpen[questionId];
    
  }

  panier: { name: string, image: string  , Quantite:number }[] = []; 

 



 

 

  selectedObjective: string = '';
  selectedPropertyType: string = '';

  setActive(type: string, value: string) {
debugger
   
if(this.step===1){
      this.selectedObjectives[type] = value;
}
    




    if(this.step===3){
      this.selectedObjectives2[type] = value;

    }


  }

  setPropertyType(type: string) {
    this.selectedPropertyType = type;
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
   
    Type:'Audit énergétique ',
    Title1:'Projet :',
    Title2:'Informations personnelle :',
    Title3:'Panier :',
  
    selectedObjectives: Object.entries(this.selectedObjectives)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n'),
  
    selectedObjectives2: Object.entries(this.selectedObjectives2)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n'),
  
     
  
    Panier: '- Audit énergétique (Quantité: 1)'
  
  
    
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