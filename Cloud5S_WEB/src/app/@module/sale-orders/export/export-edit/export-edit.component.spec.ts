import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportEditComponent } from './export-edit.component';

describe('ExportEditComponent', () => {
  let component: ExportEditComponent;
  let fixture: ComponentFixture<ExportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
