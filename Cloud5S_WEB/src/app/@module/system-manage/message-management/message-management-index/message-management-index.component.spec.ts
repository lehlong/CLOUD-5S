import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageManagementIndexComponent } from './message-management-index.component';

describe('MessageManagementIndexComponent', () => {
  let component: MessageManagementIndexComponent;
  let fixture: ComponentFixture<MessageManagementIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageManagementIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageManagementIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
