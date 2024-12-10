import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';




@Component({
  selector: 'app-Locaux-professionnel',
  templateUrl: './Locaux-professionnel.component.html',
  styleUrls: ['./Locaux-professionnel.component.scss']
})
export class LocauxprofessionnelComponent implements OnInit {
  constructor(private fb: FormBuilder,private fb2: FormBuilder) { 
    emailjs.init('f9AWPNj9CCvQhsYTE'); this.diagnostics.forEach(dic => {
    this.isOpen[dic.type] = false;
  });}

  Formrappel: FormGroup;
  ngOnInit() {
    this.Formrappel = this.fb.group({
      projet: new FormControl('', [Validators.required]),
      Nombre_de_chambres_au_total: new FormControl('', [Validators.required]),
      Type_de_autre_local: new FormControl('', [Validators.required]),
      adresse_du_bien:new FormControl('', [Validators.required]),
      code_postal:new FormControl('', [Validators.required,Validators.pattern('^[0-9]{5}$')]),
      surface:new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email  
      ]),
      telephone: new FormControl('', [Validators.required])

    });

    
    
  }
 

  diagnostics = [
    { type: 'DPE', image: '/assets/image/DPE.webp',description:'Le DPE sert principalement à évaluer la quantité dénergie et de gaz à effet de serre de votre logement. Vous devez faire réaliser ce diagnostic par un professionnel certifié. Vous devez intégrer le DPE au dossier de diagnostic technique (DDT) et le remettre à lacquéreur ou au locataire lorsque vous vendez ou louez votre logement.'},
    { type: 'Méterage', image: '/assets/image/habitablee.webp',description:'Le calcul de la surface habitable d’une maison ou d’un appartement fait partie des diagnostics obligatoires avant la signature d’un contrat de location.'},
    { type: 'DTA', image: '/assets/image/dta.png',description:'Le DTA est le Dossier Technique Amiante. Il est obligatoire pour les immeubles dont le permis de construire a été délivré avant le 1er juillet 1997.' },
    { type: 'Plomb (Crep)', image: '/assets/image/Plomb.webp',description:'Le constat de risque dexposition au plomb (Crep), aussi appelé diagnostic plomb, est un document qui donne des informations sur la présence de plomb dans les logements. Votre logement est concerné par ce diagnostic s il a été construit avant 1949. Le Crep doit être intégré au dossier de diagnostic technique (DDT). Le DDT doit être remis à lacquéreur ou locataire en cas de vente ou location d un logement.' },
    { type: 'Termites', image: '/assets/image/Diagnostic-termites.webp',description:"L'état relatif à la présence de termites, également appelé diagnostic termites, donne des informations sur la présence ou non d'insectes xylophages (termites : Insectes qui rongent le bois et les matériaux contenant de la cellulose en particulier) dans un logement. Ce document doit être réalisé lorsque le logement est situé dans une zone déclarée par un arrêté préfectoral. Il doit être remis au candidat acquéreur."},
    { type: 'Etat parasitaire', image: '/assets/image/etat-parasitaire.png',description:'L état relatif à la présence de termites, également appelé diagnostic termites, donne des informations sur la présence ou non d insectes xylophages (termites : Insectes qui rongent le bois et les matériaux contenant de la cellulose en particulier) dans un logement. Ce document doit être réalisé lorsque le logement est situé dans une zone déclarée par un arrêté préfectoral. Il doit être remis au candidat acquéreur.' },
    { type: 'Assainissement', image: '/assets/image/Installation-assainissement-non-collectif.webp',description:'L état relatif à la présence de termites, également appelé diagnostic termites, donne des informations sur la présence ou non d insectes xylophages (termites : Insectes qui rongent le bois et les matériaux contenant de la cellulose en particulier) dans un logement. Ce document doit être réalisé lorsque le logement est situé dans une zone déclarée par un arrêté préfectoral. Il doit être remis au candidat acquéreur.'},
    { type: 'Audit énergétique', image: '/assets/image/audit-01.webp',description:'Le constat de risque dexposition au plomb (Crep), aussi appelé diagnostic plomb, est un document qui donne des informations sur la présence de plomb dans les logements. Votre logement est concerné par ce diagnostic s il a été construit avant 1949. Le Crep doit être intégré au dossier de diagnostic technique (DDT). Le DDT doit être remis à lacquéreur ou locataire en cas de vente ou location d un logement.' },
    
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

  get formControls() {
    return this.Formrappel.controls;
  }

  step = 1;

  get progressWidth() {
    return (this.step / 3) * 100;
  }

  goBack() {
    this.step--;
  }
  validateSelection(): void {
    this.errorFlags = {
      adresse_du_bien: this.Formrappel.get('adresse_du_bien')?.invalid || false,
      code_postal: this.Formrappel.get('code_postal')?.invalid || false,
      projet: this.Formrappel.get('projet')?.invalid || false,
      surface: this.Formrappel.get('surface')?.invalid || false,
     
    };


    this.showError2 = Object.values(this.errorFlags).some(flag => flag);
  }
  validateSelection2(): void {
    this.errorFlags2 = {
   
      
      selectedPropertyType: this.selectedPropertyType.length === 0, // Check if no property type is selected
    };

    // Set showError to true if any field has errors
    this.showError = Object.values(this.errorFlags2).some(flag => flag);

  }
  // Proceed to the next step
  nextStep() {
debugger
    if(this.step===3){
      this.setActiveRecheck()
      console.log(this.Formrappel.value)

    }


    if (this.step > 4) {
      return; // Prevent moving past the last step
    }
  
    // Validate fields for the current step
    this.validateSelection();
    this.validateSelection2();
  
    // Specific validation for panier at step 2
    if (this.step === 2 && this.panier.length === 0) {
      this.showError = true; // Show error if panier is empty
      return; // Prevent progression
    }
    if(this.step===3){
      if(!this.validateForm()){
        
        return; // Prevent progression
      }
      }
    // Prevent progression if there are errors
    if (this.showError || this.showError2) {
      return;
    }
  
    // Reset panier error if resolved
    if (this.step === 1) {
      this.showError = false; // Clear panier error
    }
  
    // Reset error and proceed to the next step
    this.step++;
  }
  

  
  validateStepFields(): boolean {
    switch (this.step) {
      case 0: // Step 1: Validate these fields
        return this.checkFieldsValid(['adresse_du_bien', 'code_postal', 'diag', 'surface']);
      case 1: // Step 2: Panier validation handled in nextStep()
        return true;
      case 2: // Step 3: Validate these fields
        return this.checkFieldsValid(['typeBien', 'message', 'prenom', 'nom', 'email', 'telephone']);
      default:
        return true;
    }
  }
  
  checkFieldsValid(fields: string[]): boolean {
    let isValid = true;
    fields.forEach(field => {
      const control = this.Formrappel.get(field);
      if (control && control.invalid) {
        control.markAsTouched(); // Mark the field as touched to show validation errors
        isValid = false;
      }
    });
    return isValid;
  }
  
  
  selectedItems: string[] = [];
  
  addToSelectedItems(item: string, stepIndex: number) {
    this.selectedItems[stepIndex] = item;
  }



  isOpen: { [key: string]: boolean } = {};

  toggleAnswer(dic: any) {
    // Toggle the specific item's state
    this.isOpen[dic.type] = !this.isOpen[dic.type];
  }
  selectedObjective: { local: string } = { local: '' }; // Track the selected local type

  // Handle dropdown selection change
  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedObjective.local = target.value;
    this.clearError('projet');
  }
  
  panier: { name: string, image: string, Quantite: number }[] = [];
  // Handle changes in select element


  
  // Change selectedPropertyType to an array of strings
  selectedPropertyType: string[] = [];


  setPropertyType(type: string) {

    const diagnostic = this.diagnostics.find(d => d.type === type);
    if (!diagnostic) return;
    console.log('Selected value:', this.selectedObjectives);
    const index = this.selectedPropertyType.indexOf(type);
    if (index > -1) {
      this.selectedPropertyType.splice(index, 1); // Deselect if already selected
      this.panier = this.panier.filter(item => item.name !== type); // Remove from panier
    } else {
      this.selectedPropertyType.push(type); // Add if not selected
      this.panier.push({ name: diagnostic.type, image: diagnostic.image, Quantite: 1 }); // Add to panier with quantity 1
    }
    this.validateSelection2();
  }
  showError = false;
  showError2 = false;
  errorFlags = {
    adresse_du_bien: false,
    code_postal: false,
    projet: false,
    surface: false,

  };

  errorFlags2 = {

    selectedPropertyType: false
  };
  // Method to clear errors individually
  clearError(field: string): void {
    const control = this.Formrappel.get(field);
    if (control) {
      control.markAsPristine();
      control.markAsUntouched();
    }
  }
  errorMessage:string=''
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
  // onSubmit method to handle form submission
  onSubmit() {
    this.Formrappel.markAllAsTouched();
    if (this.Formrappel.valid) {
      // Process form data
    }
  }


  setActive(type: string, value: string) {
    if(this.step===3){
      this.selectedObjectives2[type] = value;

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
// Quantity map to track current quantities
quantityMap: { [key: string]: number } = {};
// Add or update quantity in the cart
ajouterAuPanier(event: any, name: string, image: string) {
  const exists = this.panier.some(p => p.name === name);

  if (!exists) {
    // Define price based on item name
    let price = 50; // Default price
    if (name === 'DPE' ||
      name === 'Méterage' ||
      name === 'DTA' ||
      name === 'Plomb (Crep)' ||
      name === 'Diagnostic termites'||
    name==='Termites'){
      price = 2; // Specific items have a price of 2
    
    }else if(name ==='Etat parasitaire'||name ==='Assainissement') {
      price = 181.01;
    }else{
      price = 604.00;
    }

    // Show Swal with quantity input and price displayed below the input
    Swal.fire({
      title: this.diagnostics['type'],
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
      html: `
        <p style="font-size: 20px; color: #263548;font-white:bold">Prix: ${price} € TTC</p>
      `,
      inputValidator: (value) => {
        if (!value || Number(value) < 1) {
          return 'Veuillez entrer une quantité valide';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const Quantite = Number(result.value);

        // Update the quantity in the quantity map
        this.quantityMap[name] = Quantite;

        // Add the item to the cart with price and quantity
        const item = { name, image, Quantite, price };
        this.panier.push(item);

        // Show success message with price
        Swal.fire(
          'Ajouté!',
          `${name} avec quantité ${Quantite} et prix ${price} € pour un  a été ajouté au panier.`,
          'success'
        );
      }
    });
  } else {
    Swal.fire({
      icon: 'info',
      title: `${name} est déjà dans le panier.`,
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    });
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
      }
    });
  }



  selectedObjectives2: any = {};
  selectedObjectives: any = {};

  setActiveRecheck(){
debugger




  const projet = this.Formrappel.get('projet')?.value;
 


  if(projet!="Autre" && projet!='Hôtel'){


    this.selectedObjectives={
    
      'Adresse du bien':this.Formrappel.get('adresse_du_bien')?.value,
      'Code postal':this.Formrappel.get('code_postal')?.value,
      'surface totale du bien':this.Formrappel.get('surface')?.value,
      'Type de local professionnel':this.Formrappel.get('projet')?.value,
    
    
    }
      }
     


if(projet==="Autre"){


this.selectedObjectives={

  'Adresse du bien':this.Formrappel.get('adresse_du_bien')?.value,
  'Code postal':this.Formrappel.get('code_postal')?.value,
  'surface totale du bien':this.Formrappel.get('surface')?.value,
  'Type de local professionnel':this.Formrappel.get('projet')?.value,
  'Type de autre local':this.Formrappel.get('Type_de_autre_local')?.value,

  
}
  }
 
  
  if(projet==="Hôtel"){

    
this.selectedObjectives={

  'Adresse du bien':this.Formrappel.get('adresse_du_bien')?.value,
  'Code postal':this.Formrappel.get('code_postal')?.value,
  'surface totale du bien':this.Formrappel.get('surface')?.value,
  'Type de local professionnel':this.Formrappel.get('projet')?.value,
  'Nombre de chambres au total':this.Formrappel.get('Nombre_de_chambres_au_total')?.value,

}
}


  
    

  /* step4-forms */

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


Modifier(stepType:any){
  if(stepType==='Votre projet'){
  this.step =1;
}

else if(stepType==='Ma sélection'){
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
 
  Type:'Amiante Travaux',
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