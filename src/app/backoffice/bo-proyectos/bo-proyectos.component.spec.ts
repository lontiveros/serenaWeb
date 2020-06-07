import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoProyectosComponent } from './bo-proyectos.component';

describe('BoProyectosComponent', () => {
  let component: BoProyectosComponent;
  let fixture: ComponentFixture<BoProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
