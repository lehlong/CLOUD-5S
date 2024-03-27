import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionManagerIndexComponent } from './production-manager-index.component';

describe('ProductionManagerIndexComponent', () => {
  let component: ProductionManagerIndexComponent;
  let fixture: ComponentFixture<ProductionManagerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionManagerIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionManagerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
