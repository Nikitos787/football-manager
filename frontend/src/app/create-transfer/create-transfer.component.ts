import {Component, OnInit} from '@angular/core';
import {Transfer} from "../transfer";
import {TransferService} from "../transfer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-transfer',
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.css']
})
export class CreateTransferComponent implements OnInit{
  transfer: Transfer = new Transfer();
  constructor(private transferService: TransferService,
              private router: Router) {
  }
  ngOnInit(): void {
  }

  createTransfer() {
    this.transferService.createTransfer(this.transfer).subscribe(data => {
      console.log(data);
      this.goToTransferList()
    }, error => console.log(error))
  }

  goToTransferList() {
    this.router.navigate(['/transfers']);
  }

  onSubmit(){
    console.log(this.transfer);
    this.createTransfer()
  }
}
