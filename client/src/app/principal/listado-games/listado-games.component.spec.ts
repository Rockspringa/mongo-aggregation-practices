import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGamesComponent } from './listado-games.component';

describe('ListadoGamesComponent', () => {
  let component: ListadoGamesComponent;
  let fixture: ComponentFixture<ListadoGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
