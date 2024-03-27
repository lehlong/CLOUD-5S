import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipCreateComponent } from './ship-create.component';

describe('ShipCreateComponent', () => {
  let component: ShipCreateComponent;
  let fixture: ComponentFixture<ShipCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
