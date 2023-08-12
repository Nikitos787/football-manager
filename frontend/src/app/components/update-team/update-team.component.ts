import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TeamService} from "../../services/team.service";
import {TeamRequest, TeamResponse} from "../../models/team";

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {
  newTeam: TeamRequest = {} as TeamRequest;
  team: TeamResponse = {} as TeamResponse;
  id: number = 0;

  constructor(private teamService: TeamService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.teamService.getTeamById(this.id).subscribe(data => {
      console.log(data);
      this.team = data;
    }, error => console.log(error))
  }

  onSubmit() {
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.teamService.updateTeam(this.id, this.newTeam).subscribe(data => {
      this.router.navigateByUrl(`/teams`);
    }, error => console.log(error));
  }
}
