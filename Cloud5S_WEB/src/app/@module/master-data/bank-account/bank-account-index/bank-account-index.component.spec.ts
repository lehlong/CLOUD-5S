import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountIndexComponent } from './bank-account-index.component';

describe('BankAccountIndexComponent', () => {
  let component: BankAccountIndexComponent;
  let fixture: ComponentFixture<BankAccountIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
