import {Component, OnInit} from '@angular/core';
import {PlayerResponse} from "../../models/player";
import {TeamService} from "../../services/team.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TeamResponse} from "../../models/team";

@Component({
  selector: 'app-player-list-by-team-id',
  templateUrl: './player-list-by-team-id.component.html',
  styleUrls: ['./player-list-by-team-id.component.css']
})
export class PlayerListByTeamIdComponent implements OnInit {
  players: PlayerResponse[] = [];
  id: number = 0;
  team: TeamResponse = {} as TeamResponse;

  constructor(
    private teamService: TeamService,
    private activeRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.getTeamAndPlayerListByTeamId(this.id);
  }

  getTeamAndPlayerListByTeamId(id: number) {
    this.teamService.getTeamById(id).subscribe(
      teamData => {
        this.team = teamData;
        console.log('Team:', this.team);
        this.getPlayerListByTeamId(id);
      },
      error => console.log(error)
    );
  }

  getPlayerListByTeamId(id: number) {
    this.teamService.getPlayerListByTeamId(id).subscribe(
      data => {
        this.players = data;
        console.log(data);
      },
      error => console.log(error)
    );
  }

  getPlayerDetails(id: number) {
    this.router.navigate(['player-details', id]);
  }
}
