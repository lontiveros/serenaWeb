import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPwComponent } from './cambio-pw.component';

describe('CambioPwComponent', () => {
  let component: CambioPwComponent;
  let fixture: ComponentFixture<CambioPwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioPwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
