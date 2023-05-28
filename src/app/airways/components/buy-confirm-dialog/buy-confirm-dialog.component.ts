import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'

import { clearSearch } from '../../store/search/search.actions'
import { clearPassengers } from '../../store/passengers/passengers.actions'
import { clearFlights } from '../../../flights/store/flights.actions'

@Component({
  selector: 'app-buy-confirm-dialog',
  templateUrl: './buy-confirm-dialog.component.html',
  styleUrls: ['./buy-confirm-dialog.component.scss'],
})
export class BuyConfirmDialogComponent {
  constructor(
    private router: Router,
    private store: Store,
    public dialogRef: MatDialogRef<BuyConfirmDialogComponent>
  ) {}

  onClickOk(): void {
    this.dialogRef.close()

    this.store.dispatch(clearSearch())
    this.store.dispatch(clearPassengers())
    this.store.dispatch(clearFlights())

    this.router.navigateByUrl('/')
  }
}
