import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable, take } from 'rxjs'
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
import { selectDate } from '../../store/settings/settings.selectors'
import { selectSearch } from '../../store/search/search.selectors'

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss'],
})
export class FlightSearchFormComponent implements OnInit {
  minDate = new Date()

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

  get type() {
    return this.searchForm.get('type')?.value
  }

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

    this.store
      .select(selectSearch)
      .pipe(take(1))
      .subscribe((search) => {
        this.searchForm.patchValue({
          type: search.type,
          routeFrom: search.route.from,
          routeTo: search.route.to,
          startDate: search.dates.start,
          endDate: search.dates.end,
          adults: search.passengers.adults,
          child: search.passengers.child,
          infant: search.passengers.infant,
        })
      })

    this.store.select(selectDate).subscribe(() => {
      this.searchForm.setControl(
        'startDate',
        new FormControl(this.searchForm.controls.startDate.value)
      )
      this.searchForm.setControl(
        'endDate',
        new FormControl(this.searchForm.controls.endDate.value)
      )
    })
  }

  compareWithRoute(o1: IAirport, o2: IAirport) {
    return o1.key === o2.key
  }

  onChangeType(value: SearchType) {
    if (value === 'ROUND_TRIP') {
      this.searchForm.controls.endDate.setValidators([Validators.required])
      this.searchForm.controls.endDate.updateValueAndValidity()
    } else if (value === 'ONE_WAY') {
      this.searchForm.controls.endDate.removeValidators([Validators.required])
      this.searchForm.controls.endDate.updateValueAndValidity()
    }
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
        end: type.value === 'ROUND_TRIP' ? endDate.value : null,
      },
      passengers: {
        adults: adults.value || 1,
        child: child.value || 0,
        infant: infant.value || 0,
      },
    }

    this.store.dispatch(changeSearch({ search }))

    const queryParams = {
      fromKey: routeFrom.value?.key,
      toKey: routeTo.value?.key,
      forwardDate: startDate.value?.toISOString(),
    } as Record<string, string | undefined>

    if (type.value === 'ROUND_TRIP') {
      queryParams['backDate'] = endDate.value?.toISOString()
    }

    this.router.navigate(['selection'], { queryParams })
  }
}
