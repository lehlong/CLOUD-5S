import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PourTypeCreateComponent } from './pour-type-create.component';

describe('PourTypeCreateComponent', () => {
  let component: PourTypeCreateComponent;
  let fixture: ComponentFixture<PourTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PourTypeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PourTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
