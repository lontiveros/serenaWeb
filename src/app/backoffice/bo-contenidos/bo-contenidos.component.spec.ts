import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoContenidosComponent } from './bo-contenidos.component';

describe('BoContenidosComponent', () => {
  let component: BoContenidosComponent;
  let fixture: ComponentFixture<BoContenidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoContenidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoContenidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
