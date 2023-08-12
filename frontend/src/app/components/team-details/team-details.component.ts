import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../services/team.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TeamResponse} from "../../models/team";
import {Location} from "@angular/common";

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  team: TeamResponse = {} as TeamResponse;
  id: number = 0;

  constructor(private teamService: TeamService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.getTeam(this.id);
  }

  updateTeam(id: number) {
    this.router.navigate(['update-team', id])
  }

  deleteTeam(id: number) {
    this.teamService.deleteTeamById(id).subscribe(data => {
      console.log(data);
      this.location.back();
    }, error => console.log(error));
  }

  fireAllPlayersByTeamId(id: number) {
    this.teamService.fireAllPlayersByTeamId(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    }, error => console.log(error));
  }

  getTeam(id: number) {
    this.teamService.getTeamById(id).subscribe(data => {
      this.team = data;
      console.log(data);
    }, error => console.log(error));
  }

  getPlayerListOfTheTeam(id: number) {
    this.router.navigate(['teams', id, 'players']);
  }
}
