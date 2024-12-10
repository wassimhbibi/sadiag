import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmianteavanttravauxComponent } from './Amiante-avant-travaux.component';

describe('PartieCommunesComponent', () => {
  let component: AmianteavanttravauxComponent;
  let fixture: ComponentFixture<AmianteavanttravauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmianteavanttravauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmianteavanttravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
