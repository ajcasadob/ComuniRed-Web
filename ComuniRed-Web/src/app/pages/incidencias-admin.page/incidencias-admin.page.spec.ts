import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciasAdminPage } from './incidencias-admin.page';

describe('IncidenciasAdminPage', () => {
  let component: IncidenciasAdminPage;
  let fixture: ComponentFixture<IncidenciasAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenciasAdminPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenciasAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
