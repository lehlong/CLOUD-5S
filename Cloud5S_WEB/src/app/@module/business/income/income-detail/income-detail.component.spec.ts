import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IncomeDetailComponent} from './income-detail.component';

describe('IncomeDetailComponent', () => {
  let component: IncomeDetailComponent;
  let fixture: ComponentFixture<IncomeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should Detail', () => {
    expect(component).toBeTruthy();
  });
});
