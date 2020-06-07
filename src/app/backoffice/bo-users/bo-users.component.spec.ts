import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoUsersComponent } from './bo-users.component';

describe('BoUsersComponent', () => {
  let component: BoUsersComponent;
  let fixture: ComponentFixture<BoUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
