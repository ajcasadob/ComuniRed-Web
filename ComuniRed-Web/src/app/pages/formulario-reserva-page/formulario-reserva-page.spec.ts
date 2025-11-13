import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReservaPage } from './formulario-reserva-page';

describe('FormularioReservaPage', () => {
  let component: FormularioReservaPage;
  let fixture: ComponentFixture<FormularioReservaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioReservaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioReservaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
