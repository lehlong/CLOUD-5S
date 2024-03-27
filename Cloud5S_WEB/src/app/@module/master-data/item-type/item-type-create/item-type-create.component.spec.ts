import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeCreateComponent } from './item-type-create.component';

describe('ItemTypeCreateComponent', () => {
  let component: ItemTypeCreateComponent;
  let fixture: ComponentFixture<ItemTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTypeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
