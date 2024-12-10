import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';



@Component({
  selector: 'app-miseenCopropriete',
  templateUrl: './miseenCopropriete.component.html',
  styleUrls: ['./miseenCopropriete.component.scss']
})
export class MiseenCoproprieteComponent implements OnInit {

  constructor(private fb: FormBuilder) { 
    emailjs.init('f9AWPNj9CCvQhsYTE');}

  ngOnInit() {
    this.Formrappel = this.fb.group({
      projet: new FormControl('', [Validators.required]),
      typeBien: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      socite_inter:new FormControl('', [Validators.required]),
      nom_societe: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      adresse_du_bien:new FormControl('', [Validators.required]),
      code_postal:new FormControl('', [Validators.required,Validators.pattern('^[0-9]{5}$')]),
      diag:new FormControl('', [Validators.required]),
      surface:new FormControl('', [Validators.required]),
      locaux_commerciaux:new FormControl('', [Validators.required]),
      nombre_batiment:new FormControl('', [Validators.required]),
      total_appartements:new FormControl('', [Validators.required]),
      nombre_de_cages:new FormControl('', [Validators.required]),
    });
  }
  
  Formrappel: FormGroup;

  showError = false;
  diagnostics = [
    { type:  'Plan de Géomètre',image: "/assets/image/plan-geometre.webp",description:'Le plan de géométrie est une représentation graphique détaillée de l immeuble, indiquant les différentes parties communes et privatives. Il inclut également le calcul des tantièmes, qui sont des proportions utilisées pour déterminer la quote-part de chaque copropriétaire dans les charges et décisions.'},
    { type: 'Diagnostic Technique Global (DTG)', image: '/assets/image/dtg.webp',description:'Le Diagnostic Technique Global est une compilation d informations sur létat technique de l immeuble. Il comprend des diagnostics sur les parties communes, létat des équipements, les éventuels travaux à prévoir, et d autres éléments contribuant à une vision globale de la situation technique de la copropriété.' },
    
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
step = 1;

  get progressWidth() {
    return (this.step / 4) * 100;
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
  goBack() {
    this.step--;
  }

  
  // Proceed to the next step
  nextStep(): void {
    if(this.step===1){
    if (!this.validateSelection()) {
      this.showError2 = true;
      return; // Stop further processing
    }}
    if(this.step===1 || this.step===3){
      this.setActiveRecheck()
    }
    // Prevent moving past the last step
    if (this.step >= 4) {
      return;
    }
  
    // Perform validation for the current step
    if (!this.validateSelection()) {
      return; // Stop here if validation fails
    }
  
    // If moving to step 2, update the panier
    if (this.step + 1 === 2) {
      this.panier = [
        { name: 'Plan de Géomètre', image: "/assets/image/plan-geometre.webp", Quantite: 1 },
      ];
      
    }
    if(this.step===3){
      if(!this.validateForm()){
        
        return; // Prevent progression
      }
      }
    // Proceed to the next step
    this.step++;

  }
  
  
    // Method to clear errors individually
    clearError(field: string): void {
      const control = this.Formrappel.get(field);
      if (control) {
        control.markAsPristine();
        control.markAsUntouched();
      }
    }
    // onSubmit method to handle form submission
    onSubmit() {
      this.Formrappel.markAllAsTouched();
      if (this.Formrappel.valid) {
        // Process form data
      }
    }
  showError2 = false;
  errorFlags = {
    adresse_du_bien: false,
    code_postal: false,
    surface: false,
    locaux_commerciaux:false,
    total_appartements:false,
  };
  errorFlags2 = {
    selectedPropertyType: false
  };
  errorFlags3 = {

    nombre_de_cages: false,
    selectedPropertyType:false
  };
  validateSelection(): boolean {
    this.errorFlags = {
      adresse_du_bien: this.Formrappel.get('adresse_du_bien')?.invalid || false,
      code_postal: this.Formrappel.get('code_postal')?.invalid || false,
      surface: this.Formrappel.get('surface')?.invalid || false,
      locaux_commerciaux: this.Formrappel.get('locaux_commerciaux')?.invalid || false,
      total_appartements: this.Formrappel.get('total_appartements')?.invalid || false,
    };
    this.showError2 = Object.values(this.errorFlags).some(flag => flag);
    return !this.showError2; // Return true if no errors
  }
  validateSelection3(): boolean {
    this.errorFlags3 = {
     
      nombre_de_cages: this.Formrappel.get('nombre_de_cages')?.invalid || false,
      selectedPropertyType: this.selectedObjectivee.length === 0,
    };
    this.showError2 = Object.values(this.errorFlags3).some(flag => flag);
    return !this.showError2; // Return true if no errors
  }
  validateSelection2(): void {
    this.errorFlags2 = {
   
      
      selectedPropertyType: this.selectedObjective.length === 0, // Check if no property type is selected
    };

    // Set showError to true if any field has errors
    this.showError = Object.values(this.errorFlags2).some(flag => flag);

  }

  validateStepFields(): boolean {
    switch (this.step) {
      case 0: // Step 1: Validate these fields
        return this.checkFieldsValid(['adresse_du_bien', 'code_postal', 'diag', 'surface','locaux_commerciaux','nombre_batiment','total_appartements']);
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
  
  selectedObjective: string = '';
  selectedObjectivee :string = '';
  selectedPropertyType: string = '';

  get formControls() {
    return this.Formrappel.controls;
  }
  setActivee(type: string, value: string) {

    if(this.step===1){
      this.selectedObjectives[type] = value;

    }

    if(this.step===3){
      this.selectedObjectives2[type] = value;

    }


  }
 // Mapping the objective name to the respective name, image, and quantity
 setActive(type: string, value: string): void {
  console.log('setActive called with type:', type, 'and value:', value); // Debugging log

  // Check if moving to step 2
  if (value === 'step2') {
    console.log('Moving to step 2, updating panier...'); // Debugging log

    // Update the panier with predefined items for step 2
    this.panier = [
      { name: 'Plomb Parties Communes', image: "/assets/image/Plomb.webp", Quantite: 1 },
    ];

    console.log('Panier updated:', this.panier); // Debugging log
  } else {
    console.log('Not moving to step 2, clearing panier...'); // Debugging log
    // Optional: Clear panier when moving to other steps
    this.panier = [];
  }
}



setActives(objectives: string): void {
  
  if (this.selectedObjectivee !== objectives) {
    // Clear the panier only if a new objective is selected
    this.panier = [];
  }

  this.selectedObjectivee = objectives;



}
  setPropertyType(type: string) {
    this.selectedPropertyType = type;
  }
  selectedObjectives: any = {};
  selectedObjectives2: any = {};


  onSelectionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedObjectives.local = value;
;
    console.log('Selected value:', this.selectedObjectives.local);
  }

  isOpen: { [key: string]: boolean } = {};

  toggleAnswer(dic: any) {
    // Toggle the specific item's state
    this.isOpen[dic.type] = !this.isOpen[dic.type];
  }
  panier: { name: string, image: string, Quantite: number }[] = [];
// Quantity map to track current quantities
quantityMap: { [key: string]: number } = {};
// Add or update quantity in the cart
ajouterAuPanier(event: any, name: string, image: string) {
  const exists = this.panier.some(p => p.name === name);

  if (!exists) {
    let price = 50; // Default price
    if (
      ['DTA', 'Termites Parties Communes'].includes(name)
    ) {
      price = 240;
    } else if (['Plomb Parties Communes'].includes(name)) {
      price = 288;}
      else if (['DPE collectif'].includes(name)) { 
        price = 550;
    } else {
      price = 7280;
    }

    Swal.fire({
      title: name, // Display the item's name
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
        <p style="font-size: 20px; color: #263548; font-weight: bold">Prix: ${price} € TTC</p>
      `,
      inputValidator: (value) => {
        if (!value || Number(value) < 1) {
          return 'Veuillez entrer une quantité valide';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const Quantite = Number(result.value);
        const item = { name, image, Quantite, price };
        this.panier.push(item);

        // Update showError dynamically
        this.showError = this.panier.length === 0;

        Swal.fire(
          'Ajouté!',
          `${name} avec quantité ${Quantite} et prix ${price} € a été ajouté au panier.`,
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
    text: 'Dans le cadre de votre projet, ce diagnostic est obligatoire. Êtes-vous sûr de vouloir le supprimer ?',
    showCancelButton: true,
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#76a319',
  }).then((result) => {
    if (result.isConfirmed) {
      this.panier = this.panier.filter(diag => diag.name !== DiagName);

      // Update showError dynamically
      this.showError = this.panier.length === 0;
    }
  });
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
    cancelButtonColor: '#76a319',
  }).then((result) => {
    if (result.isConfirmed) {
      this.panier = [];

      // Update showError dynamically
      this.showError = true;
    }
  });
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


setActiveRecheck(){
 
  
  if(this.step===1){

    this.selectedObjectives={
  
      'Adresse du bien ':this.Formrappel.get('adresse_du_bien')?.value,
      'Code postal':this.Formrappel.get('code_postal')?.value,
      'Surface approximative totale':this.Formrappel.get('surface')?.value,
      'Nombre total de niveaux (sous-sol et combles inclus)':this.Formrappel.get('locaux_commerciaux')?.value,
      'Nombre total des appartements':this.Formrappel.get('total_appartements')?.value,
  
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
   
    Type:'Mise En Copropriété',
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
       
      })}}