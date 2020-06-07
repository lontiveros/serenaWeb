import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoMaterialesComponent } from './bo-materiales.component';

describe('BoMaterialesComponent', () => {
  let component: BoMaterialesComponent;
  let fixture: ComponentFixture<BoMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
