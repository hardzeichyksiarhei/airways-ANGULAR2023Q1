import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable, take } from 'rxjs'
import { Store } from '@ngrx/store'

import { searchAirports } from '../../store/airports/airports.actions'
import { selectAirports } from '../../store/airports/airports.selectors'
import {
  selectSearchFeature,
  selectSearchType,
  selectStartDate,
} from '../../store/search/search.selectors'
import { SearchType } from '../../store/search/search.reducer'
import {
  changeEndDate,
  changeRouteFrom,
  changeRouteTo,
  changeSearchType,
  changeStartDate,
} from '../../store/search/search.actions'
import { IAirport } from '../../store/airports/airports.model'
// import { searchFlights } from 'src/app/flights/store/flights.actions'

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss'],
})
export class FlightSearchFormComponent implements OnInit {
  dates = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  })

  airports$: Observable<IAirport[]> = this.store.select(selectAirports)

  searchType$: Observable<SearchType> = this.store.select(selectSearchType)

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(searchAirports())
  }

  onChangeSearchType(searchType: SearchType) {
    this.store.dispatch(changeSearchType({ searchType }))
  }

  onChangeStartDate(startDate: Date) {
    this.store.dispatch(changeStartDate({ startDate }))
  }

  onChangeEndDate(endDate: Date) {
    this.store.dispatch(changeEndDate({ endDate }))
  }

  onChangeRouteFrom(from: IAirport) {
    this.store.dispatch(changeRouteFrom({ from }))
  }

  onChangeRouteTo(to: IAirport) {
    this.store.dispatch(changeRouteTo({ to }))
  }

  onSearch() {
    if (!this.dates.valid) return

    this.store
      .select(selectSearchFeature)
      .pipe(take(1))
      .subscribe(({ search }) => {
        console.log(search)
      })

    // this.store.dispatch(
    //   searchFlights({
    //     args: { body: {} },
    //   })
    // )
  }
}
