import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountEditComponent } from './bank-account-edit.component';

describe('BankAccountEditComponent', () => {
  let component: BankAccountEditComponent;
  let fixture: ComponentFixture<BankAccountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
