import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMemberComponent } from './my-member.component';

describe('MyMemberComponent', () => {
  let component: MyMemberComponent;
  let fixture: ComponentFixture<MyMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyMemberComponent]
    });
    fixture = TestBed.createComponent(MyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
