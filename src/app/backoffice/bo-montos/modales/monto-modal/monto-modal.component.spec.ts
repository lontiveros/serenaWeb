import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontoModalComponent } from './monto-modal.component';

describe('MontoModalComponent', () => {
  let component: MontoModalComponent;
  let fixture: ComponentFixture<MontoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
