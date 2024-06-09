import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieUserComponent } from './movie-user.component';

describe('MovieUserComponent', () => {
  let component: MovieUserComponent;
  let fixture: ComponentFixture<MovieUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
