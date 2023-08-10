import { Component, OnInit } from '@angular/core';
import { TransferService } from "../transfer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Transfer } from "../models/transfer";
import { Team } from "../models/team";
import { Player } from "../models/player";
import { TeamService } from "../team.service";
import { PlayerService } from "../player.service";
import { forkJoin } from "rxjs";

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.css']
})
export class TransferDetailsComponent implements OnInit {
  transfer: Transfer = new Transfer();
  id: number = 0;
  sellingTeam: Team = new Team();
  buyingTeam: Team = new Team();
  player: Player = new Player();

  constructor(private transferService: TransferService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private location: Location,
              private teamService: TeamService,
              private playerService: PlayerService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.getTransferById(this.id);
  }

  getTransferById(id: number) {
    this.transferService.getTransferById(id).subscribe(data => {
      this.transfer = data;
      console.log(data);
      this.fetchPlayerAndTeamNames();
    }, error => console.log(error))
  }

  fetchPlayerAndTeamNames() {
    // Use forkJoin to fetch player and team names together
    forkJoin([
      this.playerService.getPlayerById(<number>this.transfer.playerId),
      this.teamService.getTeamById(<number>this.transfer.sellingTeamId),
      this.teamService.getTeamById(<number>this.transfer.buyingTeamId),
    ]).subscribe(
      ([playerData, sellingTeamData, buyingTeamData]) => {
        this.player = playerData;
        this.sellingTeam = sellingTeamData;
        this.buyingTeam = buyingTeamData

        console.log('Player:', playerData);
        console.log('SellingTeam:', sellingTeamData);
        console.log('BuyingTeam:', buyingTeamData);
      },
      (error) => console.log(error)
    );
  }
}
