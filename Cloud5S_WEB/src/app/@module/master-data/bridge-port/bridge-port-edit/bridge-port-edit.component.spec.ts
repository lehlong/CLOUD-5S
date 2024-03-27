import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgePortEditComponent } from './bridge-port-edit.component';

describe('BridgePortEditComponent', () => {
  let component: BridgePortEditComponent;
  let fixture: ComponentFixture<BridgePortEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridgePortEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BridgePortEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
