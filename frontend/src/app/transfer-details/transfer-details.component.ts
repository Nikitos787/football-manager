import {Component, OnInit} from '@angular/core';
import {TransferService} from "../transfer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Transfer} from "../transfer";

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.css']
})
export class TransferDetailsComponent implements OnInit {
  transfer: Transfer = new Transfer();
  id: number = 0;
  constructor(private transferService: TransferService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private location: Location,) {
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
    }, error => console.log(error))
  }
}
