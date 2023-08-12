import {Component, OnInit} from '@angular/core';
import {TransferService} from "../../services/transfer.service";
import {Router} from "@angular/router";
import {TransferResponse} from "../../models/transfer";

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css']
})
export class TransferListComponent implements OnInit {
  transfers: TransferResponse[] = [];
  page: number = 0;
  size: number = 5;
  showMoreThanLessButton: boolean = true;
  currentPage: number = 0;

  constructor(private transferService: TransferService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getTransferList(this.page, this.size)
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
