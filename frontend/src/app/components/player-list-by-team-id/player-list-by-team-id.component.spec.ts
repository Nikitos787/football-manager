import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayerListByTeamIdComponent} from './player-list-by-team-id.component';

describe('PlayerListByTeamIdComponent', () => {
  let component: PlayerListByTeamIdComponent;
  let fixture: ComponentFixture<PlayerListByTeamIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerListByTeamIdComponent]
    });
    fixture = TestBed.createComponent(PlayerListByTeamIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
