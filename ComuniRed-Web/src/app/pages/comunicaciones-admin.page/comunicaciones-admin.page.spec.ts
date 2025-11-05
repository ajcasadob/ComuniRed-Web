import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicacionesAdminPage } from './comunicaciones-admin.page';

describe('ComunicacionesAdminPage', () => {
  let component: ComunicacionesAdminPage;
  let fixture: ComponentFixture<ComunicacionesAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicacionesAdminPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicacionesAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
