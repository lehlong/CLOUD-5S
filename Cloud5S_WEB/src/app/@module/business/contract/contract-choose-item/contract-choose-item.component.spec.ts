import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContractChooseItemComponent} from './contract-choose-item.component';

describe('ContractChooseItemComponent', () => {
  let component: ContractChooseItemComponent;
  let fixture: ComponentFixture<ContractChooseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractChooseItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractChooseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
