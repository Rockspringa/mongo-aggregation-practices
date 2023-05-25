import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInMatchComponent } from './get-in-match.component';

describe('GetInMatchComponent', () => {
  let component: GetInMatchComponent;
  let fixture: ComponentFixture<GetInMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetInMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetInMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
