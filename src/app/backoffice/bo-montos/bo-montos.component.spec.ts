import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoMontosComponent } from './bo-montos.component';

describe('BoMontosComponent', () => {
  let component: BoMontosComponent;
  let fixture: ComponentFixture<BoMontosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoMontosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoMontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
