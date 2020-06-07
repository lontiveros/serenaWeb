import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoModalComponent } from './proyecto-modal.component';

describe('ProyectoModalComponent', () => {
  let component: ProyectoModalComponent;
  let fixture: ComponentFixture<ProyectoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
