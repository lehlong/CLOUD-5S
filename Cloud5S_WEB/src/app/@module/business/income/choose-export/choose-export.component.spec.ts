import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChooseExportIncomeComponent} from './choose-export.component';

describe('ChooseExportIncomeComponent', () => {
  let component: ChooseExportIncomeComponent;
  let fixture: ComponentFixture<ChooseExportIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseExportIncomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseExportIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
