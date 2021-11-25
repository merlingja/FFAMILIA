import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoProductoComponent } from './editar-tipo-producto.component';

describe('EditarTipoProductoComponent', () => {
  let component: EditarTipoProductoComponent;
  let fixture: ComponentFixture<EditarTipoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTipoProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTipoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
