import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { searchFlights } from '../../../flights/store/flights.actions'
import { ISearchFlightsArgs } from '../../../flights/store/flights.service'
import {
  selectFromFlight,
  selectToFlight,
} from '../../../flights/store/flights.selectors'
import { IFlight } from '../../../flights/store/flights.model'

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit {
  constructor(private store: Store, private route: ActivatedRoute) {}

  fromFlight$: Observable<IFlight | null> = this.store.select(selectFromFlight)

  toFlight$: Observable<IFlight | null> = this.store.select(selectToFlight)

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
}
