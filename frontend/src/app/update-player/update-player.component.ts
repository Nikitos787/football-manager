import { Component, OnInit } from '@angular/core';
import { Player } from "../models/player";
import { PlayerService } from "../player.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.css']
})
export class UpdatePlayerComponent implements OnInit {
  player: Player = new Player;
  id: number = 0;

  constructor(private playerService: PlayerService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.playerService.getPlayerById(this.id).subscribe(data => {
      console.log(data);
      this.player = data;
    }, error => console.log(error))
  }

  onSubmit(){
    // @ts-ignore
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.playerService.updatePlayer(this.id, this.player).subscribe(data => {
      this.router.navigateByUrl(`/players`);
    }, error => console.log(error));
  }
}
