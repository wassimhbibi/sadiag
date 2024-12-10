import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermitesComponent } from './termites.component';

describe('TermitesComponent', () => {
  let component: TermitesComponent;
  let fixture: ComponentFixture<TermitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
