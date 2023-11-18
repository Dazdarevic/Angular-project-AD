import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTrainersComponent } from './show-trainers.component';

describe('ShowTrainersComponent', () => {
  let component: ShowTrainersComponent;
  let fixture: ComponentFixture<ShowTrainersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTrainersComponent]
    });
    fixture = TestBed.createComponent(ShowTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
