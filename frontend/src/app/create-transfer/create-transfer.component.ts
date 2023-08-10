import { Component, OnInit } from '@angular/core';
import { Transfer } from "../models/transfer";
import { TransferService } from "../transfer.service";
import { Router } from "@angular/router";
import { PlayerService } from "../player.service";
import { Player } from "../models/player";
import { TeamService } from "../team.service";
import { Team } from "../models/team";

@Component({
  selector: 'app-create-transfer',
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.css']
})
export class CreateTransferComponent implements OnInit {
  transfer: Transfer = new Transfer();
  players: Player[] = [];
  buyTeams: Team[] = [];
  sellTeams: Team[] = [];
  searchPlayerName: string = '';
  searchSellingTeamName: string = '';
  searchBuyingTeamName: string = '';

  constructor(
    private transferService: TransferService,
    private router: Router,
    private playerService: PlayerService,
    private teamService: TeamService
  ) {
  }

  ngOnInit(): void {
  }

  createTransfer() {
    this.transferService.createTransfer(this.transfer).subscribe(
      data => {
        console.log(data);
        this.goToTransferList();
      },
      error => console.log(error)
    );
  }

  goToTransferList() {
    this.router.navigate(['/transfers']);
  }

  onSubmit() {
    console.log(this.transfer);
    this.createTransfer();
  }

  searchForPlayer() {
    if (this.searchPlayerName.trim() !== '') {
      this.playerService.search(this.searchPlayerName).subscribe(
        data => {
          this.players = data;
          console.log(data);
        },
        error => console.log(error)
      );
    }
  }

  searchForSellingTeamTeam() {
    if (this.searchSellingTeamName.trim() !== '') {
      this.teamService.search(this.searchSellingTeamName).subscribe(
        data => {
          this.sellTeams = data;
          console.log(data);
        },
        error => console.log(error)
      );
    }
  }

  searchForBuyingTeamTeam() {
    if (this.searchBuyingTeamName.trim() !== '') {
      this.teamService.search(this.searchBuyingTeamName).subscribe(
        data => {
          this.buyTeams = data;
          console.log(data);
        },
        error => console.log(error)
      );
    }
  }
}
