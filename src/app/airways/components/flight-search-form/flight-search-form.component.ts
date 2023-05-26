import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

import { searchAirports } from '../../store/airports/airports.actions'
import { selectAirports } from '../../store/airports/airports.selectors'
import {
  IPassengers,
  SearchState,
  SearchType,
} from '../../store/search/search.reducer'
import { changeSearch } from '../../store/search/search.actions'
import { IAirport } from '../../store/airports/airports.model'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss'],
})
export class FlightSearchFormComponent implements OnInit {
  searchForm = new FormGroup({
    type: new FormControl<SearchType>('ROUND_TRIP'),

    routeFrom: new FormControl<IAirport | null>(null),
    routeTo: new FormControl<IAirport | null>(null),

    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null, [Validators.required]),

    adults: new FormControl<number>(1),
    child: new FormControl<number>(0),
    infant: new FormControl<number>(0),
  })

  airports$: Observable<IAirport[]> = this.store.select(selectAirports)

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get adults() {
    return this.searchForm.get('adults')?.value
  }

  get child() {
    return this.searchForm.get('child')?.value
  }

  get infant() {
    return this.searchForm.get('infant')?.value
  }

  get totalPassengers() {
    return (
      (this.searchForm.get('adults')?.value || 0) +
      (this.searchForm.get('child')?.value || 0) +
      (this.searchForm.get('infant')?.value || 0)
    )
  }

  ngOnInit() {
    this.store.dispatch(searchAirports())
  }

  onChangePassengers(event: { key: string; value: number }) {
    this.searchForm.patchValue({
      [event.key as keyof IPassengers]: +event.value,
    })
  }

  onSearch() {
    if (!this.searchForm.valid) return

    const {
      type,
      routeFrom,
      routeTo,
      startDate,
      endDate,
      adults,
      child,
      infant,
    } = this.searchForm.controls

    const search: Partial<SearchState> = {
      type: type.value || 'ROUND_TRIP',
      route: {
        from: routeFrom.value,
        to: routeTo.value,
      },
      dates: {
        start: startDate.value,
        end: endDate.value,
      },
      passengers: {
        adults: adults.value || 1,
        child: child.value || 0,
        infant: infant.value || 0,
      },
    }

    this.store.dispatch(changeSearch({ search }))

    this.router.navigate(['selection'], {
      queryParams: {
        fromKey: routeFrom.value?.key,
        toKey: routeTo.value?.key,
        forwardDate: startDate.value?.toISOString(),
        backDate: endDate.value?.toISOString(),
      },
    })
  }
}
