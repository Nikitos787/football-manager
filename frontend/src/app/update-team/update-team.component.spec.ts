import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeamComponent } from './update-team.component';

describe('UpdateTeamComponent', () => {
  let component: UpdateTeamComponent;
  let fixture: ComponentFixture<UpdateTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTeamComponent]
    });
    fixture = TestBed.createComponent(UpdateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
