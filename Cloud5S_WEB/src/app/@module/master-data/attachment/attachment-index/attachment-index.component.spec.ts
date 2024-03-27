import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentIndexComponent } from './attachment-index.component';

describe('AttachmentIndexComponent', () => {
  let component: AttachmentIndexComponent;
  let fixture: ComponentFixture<AttachmentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
