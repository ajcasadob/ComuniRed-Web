import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicacionForm } from './comunicacion-form';

describe('ComunicacionForm', () => {
  let component: ComunicacionForm;
  let fixture: ComponentFixture<ComunicacionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicacionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicacionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
