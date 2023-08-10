import { Component, OnInit } from '@angular/core';
import { TransferService } from "../transfer.service";
import { Router } from "@angular/router";
import { Transfer } from "../models/transfer";
import { Player } from "../models/player";
import { Team } from "../models/team";
import { PlayerService } from "../player.service";
import { TeamService } from "../team.service";

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css']
})
export class TransferListComponent implements OnInit{
  transfers: Transfer[] = [];
  teams: Team[] = [];
  players: Player[] = [];
  page: number = 0;
  size: number = 5;
  showMoreThanLessButton: boolean = true;
  currentPage: number = 0;

  constructor(private transferService: TransferService,
              private router: Router,
              private playerService: PlayerService,
              private teamService: TeamService) {
  }
  ngOnInit(): void {
    this.getTransferList(this.page, this.size)
    this.getPlayerList();
    this.getTeamList();
  }

  getTransferList(page: number, size: number) {
    this.transferService.getTransferList(page, size).subscribe(data => {
      this.transfers = data;
      console.log(data);
    }, error => console.log(error))
  }

  getTransferDetails(id: number) {
    this.router.navigate(['transfer-details', id]);
  }

  createTransfer() {
    this.router.navigate(['create-transfer']);
  }

  getTeamList() {
    this.teamService.getTeamList(this.page, this.size).subscribe(data => {
      this.teams = data;
      console.log(data);
    }, error => console.log(error));
  }

  getTeamName(id: number): string | undefined {
    const team = this.teams.find(team => team.id === id);
    return team ? team.name : 'Unknown'
  }

  getPlayerList() {
    this.playerService.getPlayerList(this.page, this.size).subscribe(data => {
      this.players = data;
      console.log(data);
    }, error => console.log(error))
  }

  getPlayerSecondName(id: number): string | undefined {
    const player = this.players.find(player => player.id === id);
    return player ? player.secondName : 'Unknown';
  }
  getNextPage() {
    this.currentPage = this.page
    this.page++;
    this.getTransferList(this.page, this.size)
  }

  getPreviousPage() {
    if (this.page > 0) {
      this.currentPage = this.page
      this.page--;
      this.getTransferList(this.page, this.size);
    }
  }

  toggleShowMoreThanLessButton() {
    this.showMoreThanLessButton = !this.showMoreThanLessButton;

    if (this.showMoreThanLessButton) {
      this.size += 5
    } else {
      this.size -= 5;
    }
    this.page = this.currentPage;
    this.getTransferList(this.page, this.size);
  }
}
