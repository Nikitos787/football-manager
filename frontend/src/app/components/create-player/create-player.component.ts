import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {Router} from "@angular/router";
import {PlayerRequest, PlayerResponse} from "../../models/player";

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {
  newPlayer: PlayerRequest = {} as PlayerRequest;
  playerResponse: PlayerResponse;

  constructor(private playerService: PlayerService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  savePlayer() {
    this.playerService.createPlayer(this.newPlayer).subscribe(data => {
        console.log(data);
        this.playerResponse = data;
        this.newPlayer = {} as PlayerRequest;
        this.gotToPlayerList();
      },
      error => console.log(error));
  }

  gotToPlayerList() {
    this.router.navigate(['/players'])
  }

  onSubmit() {
    console.log(this.newPlayer);
    this.savePlayer()
  }
}
