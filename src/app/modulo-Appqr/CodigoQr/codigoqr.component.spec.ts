import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoQrComponent } from './codigoqr.component';

describe('CodigoQrComponent', () => {
  let component: CodigoQrComponent;
  let fixture: ComponentFixture<CodigoQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodigoQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
