import {Component, OnInit} from '@angular/core';
import {Player} from "../player";
import {PlayerService} from "../player.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit{
  players: Player[] = [];
  constructor(private playerService: PlayerService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.getPlayerList();
  }

  playerDetails(id: number) {
    this.router.navigate(['player-details', id]);
  }

  private getPlayerList(){
    this.playerService.getPlayerList().subscribe(data => {
      this.players = data;
    })
  }

  createPlayer() {
    this.router.navigate(['create-player']);
  }
}

