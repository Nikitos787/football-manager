import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TeamService} from "../../services/team.service";
import {TeamRequest} from "../../models/team";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  newTeam: TeamRequest;

  constructor(private teamService: TeamService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  savePlayer() {
    this.teamService.createTeam(this.newTeam).subscribe(data => {
        console.log(data);
        this.goToTeamList();
      },
      error => console.log(error));
  }

  goToTeamList() {
    this.router.navigate(['/teams'])
  }

  onSubmit() {
    console.log(this.newTeam);
    this.savePlayer()
  }
}
