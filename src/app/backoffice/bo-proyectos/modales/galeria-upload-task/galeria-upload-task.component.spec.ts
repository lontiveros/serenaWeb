import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaUploadTaskComponent } from './galeria-upload-task.component';

describe('GaleriaUploadTaskComponent', () => {
  let component: GaleriaUploadTaskComponent;
  let fixture: ComponentFixture<GaleriaUploadTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriaUploadTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaUploadTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
