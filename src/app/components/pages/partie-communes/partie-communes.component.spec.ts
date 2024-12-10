import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieCommunesComponent } from './partie-communes.component';

describe('PartieCommunesComponent', () => {
  let component: PartieCommunesComponent;
  let fixture: ComponentFixture<PartieCommunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartieCommunesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieCommunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
