import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyChooseItemComponent } from './notify-choose-item.component';

describe('NotifyChooseItemComponent', () => {
  let component: NotifyChooseItemComponent;
  let fixture: ComponentFixture<NotifyChooseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyChooseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifyChooseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
