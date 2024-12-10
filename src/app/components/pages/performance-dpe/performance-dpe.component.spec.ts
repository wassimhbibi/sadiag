import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceDPEComponent } from './performance-dpe.component';

describe('PerformanceDPEComponent', () => {
  let component: PerformanceDPEComponent;
  let fixture: ComponentFixture<PerformanceDPEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceDPEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceDPEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
