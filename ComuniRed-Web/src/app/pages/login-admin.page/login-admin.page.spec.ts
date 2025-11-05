import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdminPage } from './login-admin.page';

describe('LoginAdminPage', () => {
  let component: LoginAdminPage;
  let fixture: ComponentFixture<LoginAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAdminPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
