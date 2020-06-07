import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoHomeComponent } from './bo-home.component';

describe('BoHomeComponent', () => {
  let component: BoHomeComponent;
  let fixture: ComponentFixture<BoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
