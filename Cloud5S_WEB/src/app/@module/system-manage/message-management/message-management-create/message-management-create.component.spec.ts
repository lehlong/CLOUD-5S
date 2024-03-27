import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageManagementCreateComponent } from './message-management-create.component';

describe('MessageManagementCreateComponent', () => {
  let component: MessageManagementCreateComponent;
  let fixture: ComponentFixture<MessageManagementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageManagementCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
