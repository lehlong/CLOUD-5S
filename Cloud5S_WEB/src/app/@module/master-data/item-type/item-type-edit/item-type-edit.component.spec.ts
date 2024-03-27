import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeEditComponent } from './item-type-edit.component';

describe('ItemTypeEditComponent', () => {
  let component: ItemTypeEditComponent;
  let fixture: ComponentFixture<ItemTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
