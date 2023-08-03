import {Component, OnInit} from '@angular/core';
import {Team} from "../team";
import {Router} from "@angular/router";
import {TeamService} from "../team.service";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];
  constructor(private router: Router,
              private teamService: TeamService) {

  }

  ngOnInit(): void {
    this.getTeamList()
  }

  teamDetails(id: number) {
    this.router.navigate(['team-details', id])
  }

  createTeam() {
    this.router.navigate(['create-team'])
  }

  private getTeamList(){
    this.teamService.getTeamList().subscribe(data => {
      this.teams = data;
    })
  }
}
