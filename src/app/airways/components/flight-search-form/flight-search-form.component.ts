import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable, take } from 'rxjs'
import { Store } from '@ngrx/store'

import { searchAirports } from '../../store/airports/airports.actions'
import { selectAirports } from '../../store/airports/airports.selectors'
import {
  selectSearchFeature,
  selectPassengers,
  selectSearchType,
} from '../../store/search/search.selectors'
import { IPassengers, SearchType } from '../../store/search/search.reducer'
import {
  changeEndDate,
  changePassengers,
  changeRouteFrom,
  changeRouteTo,
  changeSearchType,
  changeStartDate,
} from '../../store/search/search.actions'
import { IAirport } from '../../store/airports/airports.model'
import { Router } from '@angular/router'

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

  passengers: IPassengers = {
    adults: 1,
    child: 0,
    infant: 0,
  }

  airports$: Observable<IAirport[]> = this.store.select(selectAirports)

  searchType$: Observable<SearchType> = this.store.select(selectSearchType)

  passengers$: Observable<IPassengers> = this.store.select(selectPassengers)

  constructor(private store: Store, private router: Router) {}

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

  onChangePassengers(event: { key: string; value: number }) {
    this.passengers[event.key as keyof IPassengers] = +event.value
    this.store.dispatch(changePassengers({ [event.key]: +event.value }))
  }

  onSearch() {
    if (!this.dates.valid) return

    this.store
      .select(selectSearchFeature)
      .pipe(take(1))
      .subscribe(({ search }) => {
        this.router.navigate(['selection'], {
          queryParams: {
            fromKey: search.route.from?.key,
            toKey: search.route.to?.key,
            forwardDate: search.dates.start?.toISOString(),
            backDate: search.dates.end?.toISOString(),
          },
        })
      })
  }
}
