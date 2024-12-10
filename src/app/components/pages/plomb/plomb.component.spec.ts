import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlombComponent } from './plomb.component';

describe('PlombComponent', () => {
  let component: PlombComponent;
  let fixture: ComponentFixture<PlombComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlombComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlombComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
