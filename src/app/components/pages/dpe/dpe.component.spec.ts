import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpeComponent } from './dpe.component';

describe('DpeComponent', () => {
  let component: DpeComponent;
  let fixture: ComponentFixture<DpeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
