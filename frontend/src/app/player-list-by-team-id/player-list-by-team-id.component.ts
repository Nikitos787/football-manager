import { Component, OnInit } from '@angular/core';
import { Player } from "../models/player";
import { TeamService } from "../team.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Team } from "../models/team";

@Component({
  selector: 'app-player-list-by-team-id',
  templateUrl: './player-list-by-team-id.component.html',
  styleUrls: ['./player-list-by-team-id.component.css']
})
export class PlayerListByTeamIdComponent implements OnInit {
  players: Player[] = [];
  id: number = 0;
  team: Team = new Team();

  constructor(
    private teamService: TeamService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

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
