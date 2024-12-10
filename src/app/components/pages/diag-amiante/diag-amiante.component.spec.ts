import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagAmianteComponent } from './diag-amiante.component';

describe('DiagAmianteComponent', () => {
  let component: DiagAmianteComponent;
  let fixture: ComponentFixture<DiagAmianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagAmianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagAmianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
