import {Component, OnInit} from '@angular/core';
import {TransferService} from "../../services/transfer.service";
import {Router} from "@angular/router";
import {PlayerService} from "../../services/player.service";
import {TeamService} from "../../services/team.service";
import {TransferRequest} from "../../models/transfer";
import {PlayerResponse} from "../../models/player";
import {TeamResponse} from "../../models/team";

@Component({
  selector: 'app-create-transfer',
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.css']
})
export class CreateTransferComponent implements OnInit {
  newTransfer: TransferRequest = {} as TransferRequest;
  players: PlayerResponse[] = [];
  buyTeams: TeamResponse[] = [];
  searchPlayerName: string = '';
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
    this.transferService.createTransfer(this.newTransfer).subscribe(
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
    console.log(this.newTransfer);
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
