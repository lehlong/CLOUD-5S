import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutAlbumComponent } from './in-out-album.component';

describe('InOutAlbumComponent', () => {
  let component: InOutAlbumComponent;
  let fixture: ComponentFixture<InOutAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InOutAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InOutAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
