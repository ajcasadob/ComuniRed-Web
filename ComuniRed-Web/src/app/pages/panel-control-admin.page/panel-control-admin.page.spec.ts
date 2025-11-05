import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelControlAdminPage } from './panel-control-admin.page';

describe('PanelControlAdminPage', () => {
  let component: PanelControlAdminPage;
  let fixture: ComponentFixture<PanelControlAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelControlAdminPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelControlAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
