import {Component, OnInit} from '@angular/core';
import {TransferService} from "../transfer.service";
import {Router} from "@angular/router";
import {Transfer} from "../transfer";

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css']
})
export class TransferListComponent implements OnInit{
  transfers: Transfer[] = [];
  constructor(private transferService: TransferService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.getTransferList()
  }

  private getTransferList() {
    this.transferService.getTransferList().subscribe(data => {
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
}
