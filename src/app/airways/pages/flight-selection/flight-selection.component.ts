import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import {
  changeFromCurrentSlot,
  changeToCurrentSlot,
  searchFlights,
  toggleFromSlotSelected,
  toggleToSlotSelected,
} from '../../../flights/store/flights.actions'
import { ISearchFlightsArgs } from '../../../flights/store/flights.service'
import {
  selectFromCurrentSlot,
  selectFromSlotSelected,
  selectFromSlots,
  selectToCurrentSlot,
  selectToSlotSelected,
  selectToSlots,
} from '../../../flights/store/flights.selectors'
import { ISlot } from '../../../flights/store/flights.reducer'
import { selectSearchType } from '../../store/search/search.selectors'
import { SearchType } from '../../store/search/search.reducer'

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  fromCurrentSlot$: Observable<ISlot | null> = this.store.select(
    selectFromCurrentSlot
  )

  toCurrentSlot$: Observable<ISlot | null> =
    this.store.select(selectToCurrentSlot)

  fromSlots$: Observable<ISlot[]> = this.store.select(selectFromSlots)

  toSlots$: Observable<ISlot[]> = this.store.select(selectToSlots)

  fromSlotSelected$: Observable<boolean> = this.store.select(
    selectFromSlotSelected
  )

  toSlotSelected$: Observable<boolean> = this.store.select(selectToSlotSelected)

  searchType$: Observable<SearchType> = this.store.select(selectSearchType)

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const body = {
        fromKey: params['fromKey'],
        toKey: params['toKey'],
        forwardDate: params['forwardDate'],
        backDate: params['backDate'],
      } as ISearchFlightsArgs['body']

      this.store.dispatch(searchFlights({ args: { body } }))
    })
  }

  handleClickFromSlot(slot: ISlot) {
    this.store.dispatch(changeFromCurrentSlot({ slot }))
  }

  handleClickToSlot(slot: ISlot) {
    this.store.dispatch(changeToCurrentSlot({ slot }))
  }

  handleClickSelectFromSlot() {
    this.store.dispatch(toggleFromSlotSelected())
  }

  handleClickSelectToSlot() {
    this.store.dispatch(toggleToSlotSelected())
  }

  clickToContinue() {
    this.router.navigate(['booking'], {})
  }
}
