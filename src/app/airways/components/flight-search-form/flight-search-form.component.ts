import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import { loadCountries } from '../../store/countries/countries.actions'
import { selectCountries } from '../../store/countries/countries.selectors'
import { selectSearchType } from '../../store/search/search.selectors'
import { SearchType } from '../../store/search/search.reducer'
import { changeSearchType } from '../../store/search/search.actions'

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss'],
})
export class FlightSearchFormComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  })

  countries$: Observable<any[]> = this.store.select(selectCountries)

  searchType$: Observable<SearchType> = this.store.select(selectSearchType)

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadCountries())
  }

  onChangeSearchType(searchType: SearchType) {
    this.store.dispatch(changeSearchType({ searchType }))
  }
}
