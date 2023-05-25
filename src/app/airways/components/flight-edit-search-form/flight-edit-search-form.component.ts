import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import {
  selectEndDate,
  selectRouteFrom,
  selectRouteTo,
  selectStartDate,
  selectTotalPassengers,
} from '../../store/search/search.selectors'
import { IAirport } from '../../store/airports/airports.model'

@Component({
  selector: 'app-flight-edit-search-form',
  templateUrl: './flight-edit-search-form.component.html',
  styleUrls: ['./flight-edit-search-form.component.scss'],
})
export class FlightEditSearchFormComponent {
  constructor(private store: Store, private route: ActivatedRoute) {}

  routeFrom$: Observable<IAirport | null> = this.store.select(selectRouteFrom)

  routeTo$: Observable<IAirport | null> = this.store.select(selectRouteTo)

  startDate$: Observable<Date> = this.store.select(selectStartDate)

  endDate$: Observable<Date | null | undefined> =
    this.store.select(selectEndDate)

  passengers$: Observable<number> = this.store.select(selectTotalPassengers)
}
