import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaGridComponent } from './galeria-grid.component';

describe('GaleriaGridComponent', () => {
  let component: GaleriaGridComponent;
  let fixture: ComponentFixture<GaleriaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriaGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
