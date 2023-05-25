import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavGuestComponent } from './nav-guest.component';

describe('NavGuestComponent', () => {
  let component: NavGuestComponent;
  let fixture: ComponentFixture<NavGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavGuestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
