import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'

import { ISlot } from '../../../flights/store/flights.reducer'
import {
  selectFromCurrentSlot,
  selectToCurrentSlot,
} from '../../../flights/store/flights.selectors'
import {
  selectAdultList,
  selectChildList,
  selectInfantList,
  selectPassengersList,
} from '../../store/passengers/passengers.selectors'
import { PassengerCard } from '../../store/passengers/passengers.reducer'
import { BuyConfirmDialogComponent } from '../../components/buy-confirm-dialog/buy-confirm-dialog.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router
  ) {}

  fromCurrentSlot$: Observable<ISlot | null> = this.store.select(
    selectFromCurrentSlot
  )

  toCurrentSlot$: Observable<ISlot | null> =
    this.store.select(selectToCurrentSlot)

  passengers$: Observable<PassengerCard[]> =
    this.store.select(selectPassengersList)

  adults$: Observable<PassengerCard[]> = this.store.select(selectAdultList)

  childs$: Observable<PassengerCard[]> = this.store.select(selectChildList)

  infants$: Observable<PassengerCard[]> = this.store.select(selectInfantList)

  ngOnInit(): void {
    this.passengers$.subscribe((passengers) => {
      if (passengers.length === 0) this.router.navigateByUrl('/')
    })
  }

  onClickBack() {
    this.router.navigateByUrl('/booking')
  }

  onClickAddToCart() {}

  onClickBuyNow() {
    this.dialog.open(BuyConfirmDialogComponent, {
      width: '500px',
      disableClose: true,
    })
  }
}
