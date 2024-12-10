import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniqueGlobalComponent } from './technique-global.component';

describe('TechniqueGlobalComponent', () => {
  let component: TechniqueGlobalComponent;
  let fixture: ComponentFixture<TechniqueGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechniqueGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniqueGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
