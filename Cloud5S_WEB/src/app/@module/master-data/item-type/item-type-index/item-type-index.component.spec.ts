import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeIndexComponent } from './item-type-index.component';

describe('ItemTypeIndexComponent', () => {
  let component: ItemTypeIndexComponent;
  let fixture: ComponentFixture<ItemTypeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTypeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTypeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
