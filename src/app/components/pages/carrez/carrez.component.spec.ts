import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrezComponent } from './carrez.component';

describe('CarrezComponent', () => {
  let component: CarrezComponent;
  let fixture: ComponentFixture<CarrezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrezComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
