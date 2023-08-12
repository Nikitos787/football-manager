import {Component, OnInit} from '@angular/core';
import {TransferService} from "../../services/transfer.service";
import {ActivatedRoute} from "@angular/router";
import {TransferResponse} from "../../models/transfer";

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.css']
})
export class TransferDetailsComponent implements OnInit {
  transfer: TransferResponse = {} as TransferResponse;
  id: number = 0;

  constructor(private transferService: TransferService,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.getTransferById(this.id);
  }

  getTransferById(id: number) {
    this.transferService.getTransferById(id).subscribe(data => {
      this.transfer = data;
      console.log(data);
    }, error => console.log(error))
  }
}
