import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockChooseItemComponent } from './stock-choose-item.component';

describe('StockChooseItemComponent', () => {
  let component: StockChooseItemComponent;
  let fixture: ComponentFixture<StockChooseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockChooseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockChooseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
