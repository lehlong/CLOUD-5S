import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseReceiptComponent } from './choose-receipt.component';

describe('ChooseReceiptComponent', () => {
  let component: ChooseReceiptComponent;
  let fixture: ComponentFixture<ChooseReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
