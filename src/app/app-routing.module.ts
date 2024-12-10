import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DigitalAgencyComponent } from './components/pages/digital-agency/digital-agency.component';
import { DigitalAgencyTwoComponent } from './components/pages/digital-agency-two/digital-agency-two.component';
import { DigitalAgencyThreeComponent } from './components/pages/digital-agency-three/digital-agency-three.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { ProjectDetailsComponent } from './components/pages/project-details/project-details.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { ServiceDetailsComponent } from './components/pages/service-details/service-details.component';
import { TeamComponent } from './components/pages/team/team.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { DigitalAgencyFourComponent } from './components/pages/digital-agency-four/digital-agency-four.component';
import { BusinessStartupsComponent } from './components/pages/business-startups/business-startups.component';
import { SeoAgencyComponent } from './components/pages/seo-agency/seo-agency.component';
import { DiagAmianteComponent } from './components/pages/diag-amiante/diag-amiante.component';
import { CarrezComponent } from './components/pages/carrez/carrez.component';
import { TermitesComponent } from './components/pages/termites/termites.component';
import { ElecComponent } from './components/pages/elec/elec.component';
import { GazComponent } from './components/pages/gaz/gaz.component';
import { PlombComponent } from './components/pages/plomb/plomb.component';
import { MetrageComponent } from './components/pages/metrage/metrage.component';
import { ErpComponent } from './components/pages/erp/erp.component';
import { TechniqueGlobalComponent } from './components/pages/technique-global/technique-global.component';
import { PartieCommunesComponent } from './components/pages/partie-communes/partie-communes.component';
import { GeometreComponent } from './components/pages/geometre/geometre.component';
import { DpeComponent } from './components/pages/dpe/dpe.component';
import { PerformanceDPEComponent } from './components/pages/performance-dpe/performance-dpe.component';
import { AmianteavanttravauxComponent } from './components/pages/Amiante avant travaux/Amiante-avant-travaux.component';
import { AuditénergétiqueComponent } from './components/pages/Audit-énergétique/Audit-énergétique.component';
import { AmiantetravauxalgorithmeComponent } from './components/pages/Amiante-travaux-algorithme/Amiante-travaux-algorithme.component';
import { LocauxprofessionnelComponent } from './components/pages/Locaux-professionnel/Locaux-professionnel.component';
import { CopropriétéComponent } from './components/pages/Copropriété/Copropriété.component';
import { MiseenCoproprieteComponent } from './components/pages/miseenCopropriete/miseenCopropriete.component';
import { DemandeparticulièreComponent } from './components/pages/Demande particulière/Demande particulière.component';
import { ContactformComponent } from './components/pages/contactform/contactform.component';

const routes: Routes = [
    { path: '', component: DigitalAgencyTwoComponent },
    { path: 'digital-agency-demo-2', component: DigitalAgencyComponent },
    { path: 'digital-agency-demo-3', component: DigitalAgencyThreeComponent },
    { path: 'digital-agency-demo-4', component: DigitalAgencyFourComponent },
    { path: 'business-startups', component: BusinessStartupsComponent },
    { path: 'faq', component: SeoAgencyComponent },
    { path: 'professionnels', component: AboutComponent },
    { path: 'rappelez-moi', component: ProjectsComponent },
    { path: 'contactez-nous', component: ContactformComponent },
    { path: 'project-details', component: ProjectDetailsComponent },
    { path: 'devis-gratuit', component: ServicesComponent },
    { path: 'une-question', component: ServiceDetailsComponent },
    { path: 'audit-energetique', component: TeamComponent },
    { path: 'testimonials', component: TestimonialsComponent },
    { path: 'diagnostics-immobiliers-obligatoires', component: BlogComponent },
    { path: 'vente-et-location', component: BlogDetailsComponent },
    { path: 'contact', component: ContactComponent },
    {path: 'amiante' , component:DiagAmianteComponent},
    {path: 'carrez' , component:CarrezComponent},
    {path:'termites' , component:TermitesComponent},
    {path:'électricité', component:ElecComponent},
    {path: 'gaz' , component:GazComponent},
    {path: 'plomb' , component:PlombComponent},
    {path:'metrage' , component:MetrageComponent},
    {path:'erp' , component:ErpComponent},
    {path:'techniqueGlobal' , component:TechniqueGlobalComponent},
    {path: 'partiesCommunes' , component:PartieCommunesComponent},
    {path:'geometre' , component:GeometreComponent},
    {path: 'dpe' , component:DpeComponent},
    {path: 'PerformanceDPE' , component:PerformanceDPEComponent},
    {path: 'amiante-avant-travaux' , component:AmianteavanttravauxComponent},
    {path: 'Audit-énergétique' , component:AuditénergétiqueComponent},
    {path: 'amiante-travaux-algorithme' , component:AmiantetravauxalgorithmeComponent},
    {path: 'locaux-professionnel' , component:LocauxprofessionnelComponent},
    {path: 'Copropriete' , component:CopropriétéComponent},
    {path: 'miseenCopropriete' , component:MiseenCoproprieteComponent},
    {path: 'Demandeparticulière' , component:DemandeparticulièreComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
