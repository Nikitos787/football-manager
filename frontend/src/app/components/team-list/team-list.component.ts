import {Component, OnInit} from '@angular/core';
import {TeamResponse} from "../../models/team";
import {Router} from "@angular/router";
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: TeamResponse[] = [];
  page: number = 0;
  size: number = 5;
  currentPage: number = 0;
  showMoreThanLessButton: boolean = true;

  constructor(private router: Router,
              private teamService: TeamService) {

  }

  ngOnInit(): void {
    this.getTeamList(this.page, this.size)
  }

  teamDetails(id: number) {
    this.router.navigate(['team-details', id])
  }

  createTeam() {
    this.router.navigate(['create-team'])
  }

  private getTeamList(page: number, size: number) {
    this.teamService.getTeamList(page, size).subscribe(data => {
      this.teams = data;
    })
  }

  getNextPage() {
    this.currentPage = this.page
    this.page++;
    this.getTeamList(this.page, this.size)
  }

  getPreviousPage() {
    if (this.page > 0) {
      this.currentPage = this.page
      this.page--;
      this.getTeamList(this.page, this.size);
    }
  }

  toggleShowMoreThanLessButton() {
    this.showMoreThanLessButton = !this.showMoreThanLessButton;

    if (this.showMoreThanLessButton) {
      this.size += 5
    } else {
      this.size -= 5;
    }
    this.page = this.currentPage;
    this.getTeamList(this.page, this.size);
  }
}
