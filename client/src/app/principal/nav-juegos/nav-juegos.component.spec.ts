import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavJuegosComponent } from './nav-juegos.component';

describe('NavJuegosComponent', () => {
  let component: NavJuegosComponent;
  let fixture: ComponentFixture<NavJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavJuegosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
