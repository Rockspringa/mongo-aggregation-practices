import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInicioComponent } from './game-inicio.component';

describe('GameInicioComponent', () => {
  let component: GameInicioComponent;
  let fixture: ComponentFixture<GameInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameInicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
