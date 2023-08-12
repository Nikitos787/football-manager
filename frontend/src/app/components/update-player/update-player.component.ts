import {Component, OnInit} from '@angular/core';
import {PlayerRequest, PlayerResponse} from "../../models/player";
import {PlayerService} from "../../services/player.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.css']
})
export class UpdatePlayerComponent implements OnInit {
  newPlayer: PlayerRequest = {} as PlayerRequest;
  player: PlayerResponse
  id: number = 0;

  constructor(private playerService: PlayerService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.playerService.getPlayerById(this.id).subscribe(data => {
      console.log(data);
      this.player = data;
    }, error => console.log(error))
  }

  onSubmit() {
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.playerService.updatePlayer(this.id, this.newPlayer).subscribe(data => {
      this.router.navigateByUrl(`/players`);
    }, error => console.log(error));
  }
}
