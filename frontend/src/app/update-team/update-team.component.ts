import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Team } from "../models/team";
import { TeamService } from "../team.service";

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {
  team: Team = new Team();
  id: number = 0;

  constructor(private teamService: TeamService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.teamService.getTeamById(this.id).subscribe(data => {
      console.log(data);
      this.team = data;
    }, error => console.log(error))
  }

  onSubmit(){
    // @ts-ignore
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.teamService.updateTeam(this.id, this.team).subscribe(data => {
      this.router.navigateByUrl(`/teams`);
    }, error => console.log(error));
  }
}
