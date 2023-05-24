import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'

import { searchFlights } from '../../../flights/store/flights.actions'
import { ISearchFlightsArgs } from '../../../flights/store/flights.service'

@Component({
  selector: 'app-flight-selection',
  templateUrl: './flight-selection.component.html',
  styleUrls: ['./flight-selection.component.scss'],
})
export class FlightSelectionComponent implements OnInit {
  constructor(private store: Store, private route: ActivatedRoute) {}

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
