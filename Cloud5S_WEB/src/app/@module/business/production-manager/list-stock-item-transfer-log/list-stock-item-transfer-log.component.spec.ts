import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockItemTransferLogComponent } from './list-stock-item-transfer-log.component';

describe('ListStockItemTransferLogComponent', () => {
  let component: ListStockItemTransferLogComponent;
  let fixture: ComponentFixture<ListStockItemTransferLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStockItemTransferLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStockItemTransferLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
