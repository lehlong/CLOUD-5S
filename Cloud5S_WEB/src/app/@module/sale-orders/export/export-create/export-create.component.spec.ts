import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportCreateComponent } from './export-create.component';

describe('ExportCreateComponent', () => {
  let component: ExportCreateComponent;
  let fixture: ComponentFixture<ExportCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
