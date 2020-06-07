import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesModalComponent } from './materiales-modal.component';

describe('MaterialesModalComponent', () => {
  let component: MaterialesModalComponent;
  let fixture: ComponentFixture<MaterialesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
