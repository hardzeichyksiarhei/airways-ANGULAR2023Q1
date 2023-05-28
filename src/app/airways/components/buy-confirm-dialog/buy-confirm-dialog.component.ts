import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-buy-confirm-dialog',
  templateUrl: './buy-confirm-dialog.component.html',
  styleUrls: ['./buy-confirm-dialog.component.scss'],
})
export class BuyConfirmDialogComponent {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<BuyConfirmDialogComponent>
  ) {}

  onClickOk(): void {
    this.dialogRef.close()

    this.router.navigateByUrl('/')
  }
}
