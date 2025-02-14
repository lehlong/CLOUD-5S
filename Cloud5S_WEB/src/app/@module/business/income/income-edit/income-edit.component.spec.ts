import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IncomeEditComponent} from './income-edit.component';

describe('IncomeEditComponent', () => {
  let component: IncomeEditComponent;
  let fixture: ComponentFixture<IncomeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
