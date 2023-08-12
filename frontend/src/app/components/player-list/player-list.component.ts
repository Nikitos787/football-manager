import {Component, OnInit} from '@angular/core';
import {PlayerResponse} from "../../models/player";
import {PlayerService} from "../../services/player.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: PlayerResponse[] = [];
  page: number = 0;
  size: number = 5;
  showMoreThanLessButton: boolean = true;

  constructor(private playerService: PlayerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPlayerList(this.page, this.size);
  }

  playerDetails(id: number) {
    this.router.navigate(['player-details', id]);
  }

  private getPlayerList(page: number, size: number) {
    this.playerService.getPlayerList(this.page, this.size).subscribe(data => {
      this.players = data;
    })
  }

  createPlayer() {
    this.router.navigate(['create-player']);
  }

  getNextPage() {
    this.page++;
    this.getPlayerList(this.page, this.size)
  }

  getPreviousPage() {
    if (this.page > 0) {
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
    this.getPlayerList(this.page, this.size);
  }
}
