import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersByManagerComponent } from './trainers-by-manager.component';

describe('TrainersByManagerComponent', () => {
  let component: TrainersByManagerComponent;
  let fixture: ComponentFixture<TrainersByManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainersByManagerComponent]
    });
    fixture = TestBed.createComponent(TrainersByManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
