import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStockWoodComponent } from './data-stock-wood.component';

describe('DataStockWoodComponent', () => {
  let component: DataStockWoodComponent;
  let fixture: ComponentFixture<DataStockWoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataStockWoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataStockWoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
