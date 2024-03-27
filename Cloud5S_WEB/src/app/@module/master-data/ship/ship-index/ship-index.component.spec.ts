import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipIndexComponent } from './ship-index.component';

describe('ShipIndexComponent', () => {
  let component: ShipIndexComponent;
  let fixture: ComponentFixture<ShipIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
