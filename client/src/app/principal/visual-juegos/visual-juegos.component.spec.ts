import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualJuegosComponent } from './visual-juegos.component';

describe('VisualJuegosComponent', () => {
  let component: VisualJuegosComponent;
  let fixture: ComponentFixture<VisualJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualJuegosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
