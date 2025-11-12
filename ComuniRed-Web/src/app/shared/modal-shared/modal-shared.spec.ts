import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShared } from './modal-shared';

describe('ModalShared', () => {
  let component: ModalShared;
  let fixture: ComponentFixture<ModalShared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalShared]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalShared);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
