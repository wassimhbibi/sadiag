import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeometreComponent } from './geometre.component';

describe('GeometreComponent', () => {
  let component: GeometreComponent;
  let fixture: ComponentFixture<GeometreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeometreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeometreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
