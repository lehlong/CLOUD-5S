import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationIndexComponent } from './notification-index.component';

describe('NotificationIndexComponent', () => {
  let component: NotificationIndexComponent;
  let fixture: ComponentFixture<NotificationIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
