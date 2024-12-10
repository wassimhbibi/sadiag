import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { DigitalAgencyComponent } from './components/pages/digital-agency/digital-agency.component';
import { DigitalAgencyTwoComponent } from './components/pages/digital-agency-two/digital-agency-two.component';
import { DigitalAgencyThreeComponent } from './components/pages/digital-agency-three/digital-agency-three.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { ProjectDetailsComponent } from './components/pages/project-details/project-details.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { ServiceDetailsComponent } from './components/pages/service-details/service-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { TeamComponent } from './components/pages/team/team.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { DigitalAgencyFourComponent } from './components/pages/digital-agency-four/digital-agency-four.component';
import { BusinessStartupsComponent } from './components/pages/business-startups/business-startups.component';
import { SeoAgencyComponent } from './components/pages/seo-agency/seo-agency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DigitalAgencyComponent,
    DigitalAgencyTwoComponent,
    DigitalAgencyThreeComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    ServicesComponent,
    ServiceDetailsComponent,
    BlogComponent,
    BlogDetailsComponent,
    TeamComponent,
    TestimonialsComponent,
    AboutComponent,
    ContactComponent,
    DigitalAgencyFourComponent,
    BusinessStartupsComponent,
    SeoAgencyComponent,
    DiagAmianteComponent,
    CarrezComponent,
    TermitesComponent,
    ElecComponent,
    GazComponent,
    PlombComponent,
    MetrageComponent,
    ErpComponent,
    TechniqueGlobalComponent,
    PartieCommunesComponent,
    GeometreComponent,
    DpeComponent,
    PerformanceDPEComponent,
    AmianteavanttravauxComponent,
    AuditénergétiqueComponent,
    AmiantetravauxalgorithmeComponent,
    LocauxprofessionnelComponent,
    CopropriétéComponent,
    MiseenCoproprieteComponent,
    DemandeparticulièreComponent,
    ContactformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
