import {Component, OnInit} from '@angular/core';
import {PlayerResponse} from "../../models/player";
import {ActivatedRoute, Router} from "@angular/router";
import {PlayerService} from "../../services/player.service";
import {Location} from "@angular/common";
import {TeamService} from "../../services/team.service";
import {TransferService} from "../../services/transfer.service";
import {TeamResponse} from "../../models/team";

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {
  id: number = 0;
  player: PlayerResponse = {} as PlayerResponse;
  teams: TeamResponse[] = [];
  selectedTeamId: number = 0;
  price: number = 0;
  showPriceField: boolean = false;
  team: TeamResponse;
  searchTeamName: string = '';

  constructor(private activeRoute: ActivatedRoute,
              private playerService: PlayerService,
              private router: Router,
              private location: Location,
              private teamService: TeamService,
              private transferService: TransferService) {
  }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.getPlayer(this.id);

  }

  updatePlayer(id: number) {
    this.router.navigate(['update-player', id])
  }

  deletePlayer(id: number) {
    this.playerService.deletePlayerById(id).subscribe(data => {
      console.log(data);
      this.location.back();
    }, error => console.log(error));
  }

  firePlayer(id: number) {
    this.playerService.firePlayerById(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    }, error => console.log(error));
  }

  getPlayer(id: number) {
    this.playerService.getPlayerById(id).subscribe(data => {
      this.player = data;
      console.log(data);
    }, error => console.log(error));
  }

  hirePlayerToTeam(playerId: number, teamId: number) {
    this.playerService.hirePlayerToTeam(playerId, teamId).subscribe(data => {
      console.log(data);
      window.location.reload()
    }, error => console.log(error));
  }

  goToTeamDetails(id: number) {
    this.router.navigate(['team-details', id]);
  }

  getTeamByName(name: string) {
    this.teamService.search(name).subscribe(data => {
      this.teams = data;
      console.log(data);
    }, error => console.log(error));
  }

  calculateTransferFee(id: number) {
    this.transferService.calculatePrice(id).subscribe(data => {
      this.price = data;
      console.log(data);
    }, error => console.log(error));
  }

  togglePriceField() {
    this.showPriceField = !this.showPriceField;
    if (this.showPriceField) {
      this.calculateTransferFee(this.id);
    }
  }
}
