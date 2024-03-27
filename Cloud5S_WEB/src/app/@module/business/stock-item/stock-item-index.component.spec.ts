import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StockItemIdnexComponent} from './stock-item-index.component';

describe('StockItemIdnexComponent', () => {
  let component: StockItemIdnexComponent;
  let fixture: ComponentFixture<StockItemIdnexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockItemIdnexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockItemIdnexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
