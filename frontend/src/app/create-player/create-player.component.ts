import { Component, OnInit } from '@angular/core';
import { Player } from "../models/player";
import { PlayerService } from "../player.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {
  player: Player = new Player();
  constructor(private playerService: PlayerService,
              private router: Router) { }
  ngOnInit(): void {
  }

  savePlayer() {
    this.playerService.createPlayer(this.player).subscribe(data => {
      console.log(data);
      this.gotToPlayerList();
    },
      error => console.log(error));
  }

  gotToPlayerList() {
    this.router.navigate(['/players'])
  }
  onSubmit(){
    console.log(this.player);
    this.savePlayer()
  }
}
