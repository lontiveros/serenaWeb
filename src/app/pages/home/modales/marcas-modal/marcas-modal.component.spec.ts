import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasModalComponent } from './marcas-modal.component';

describe('MarcasModalComponent', () => {
  let component: MarcasModalComponent;
  let fixture: ComponentFixture<MarcasModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcasModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
