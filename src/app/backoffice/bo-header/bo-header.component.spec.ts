import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoHeaderComponent } from './bo-header.component';

describe('BoHeaderComponent', () => {
  let component: BoHeaderComponent;
  let fixture: ComponentFixture<BoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
