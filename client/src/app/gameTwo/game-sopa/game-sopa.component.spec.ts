import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSopaComponent } from './game-sopa.component';

describe('GameSopaComponent', () => {
  let component: GameSopaComponent;
  let fixture: ComponentFixture<GameSopaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSopaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSopaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
