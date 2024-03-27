import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureCommandIndexComponent } from './manufacture-command-index.component';

describe('ManufactureCommandIndexComponent', () => {
  let component: ManufactureCommandIndexComponent;
  let fixture: ComponentFixture<ManufactureCommandIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureCommandIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufactureCommandIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
