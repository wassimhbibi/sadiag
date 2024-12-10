import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetrageComponent } from './metrage.component';

describe('MetrageComponent', () => {
  let component: MetrageComponent;
  let fixture: ComponentFixture<MetrageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetrageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
