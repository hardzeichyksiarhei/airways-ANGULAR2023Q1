import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import { loadAirports } from '../../store/airports/airports.actions'
import { selectAirports } from '../../store/airports/airports.selectors'
import {
  selectSearchType,
  selectStartDate,
} from '../../store/search/search.selectors'
import { SearchType } from '../../store/search/search.reducer'
import {
  changeEndDate,
  changeSearchType,
  changeStartDate,
} from '../../store/search/search.actions'
import { IAirport } from '../../store/airports/airports.model'

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
    this.store.dispatch(loadAirports())
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

  onSearch() {
    if (!this.dates.valid) return

    console.log(this.dates)
  }
}
