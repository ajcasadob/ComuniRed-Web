import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonShared } from './button-shared';

describe('ButtonShared', () => {
  let component: ButtonShared;
  let fixture: ComponentFixture<ButtonShared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonShared]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonShared);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
