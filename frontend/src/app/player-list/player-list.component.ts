import { Component, OnInit } from '@angular/core';
import { Player } from "../models/player";
import { PlayerService } from "../player.service";
import { Router } from "@angular/router";
import { TeamService } from "../team.service";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];
  page: number = 0;
  size: number = 5;
  showMoreThanLessButton: boolean = true;
  currentPage: number = 0;

  constructor(private playerService: PlayerService,
              private router: Router,
              private teamService: TeamService) {
  }
  ngOnInit(): void {
    this.getPlayerList(this.page, this.size);
  }

  playerDetails(id: number) {
    this.router.navigate(['player-details', id]);
  }

  private getPlayerList(page: number, size: number){
    this.playerService.getPlayerList(this.page, this.size).subscribe(data => {
      this.players = data;
    })
  }

  createPlayer() {
    this.router.navigate(['create-player']);
  }

  getNextPage() {
    this.currentPage = this.page
    this.page++;
    this.getPlayerList(this.page, this.size)
  }

  getPreviousPage() {
    if (this.page > 0) {
      this.currentPage = this.page
      this.page--;
      this.getPlayerList(this.page, this.size);
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
    this.getPlayerList(this.page, this.size);
  }
}
