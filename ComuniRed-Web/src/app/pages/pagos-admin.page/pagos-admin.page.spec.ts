import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosAdminPage } from './pagos-admin.page';

describe('PagosAdminPage', () => {
  let component: PagosAdminPage;
  let fixture: ComponentFixture<PagosAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosAdminPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
