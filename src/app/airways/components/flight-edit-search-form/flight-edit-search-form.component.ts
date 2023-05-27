import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, take } from 'rxjs'

import {
  selectSearchFeature,
  selectSearchType,
  selectTotalPassengers,
} from '../../store/search/search.selectors'
import { IAirport } from '../../store/airports/airports.model'
import { selectAirports } from '../../store/airports/airports.selectors'
import { searchAirports } from '../../store/airports/airports.actions'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {
  IPassengers,
  SearchState,
  SearchType,
} from '../../store/search/search.reducer'
import { changeSearch } from '../../store/search/search.actions'

@Component({
  selector: 'app-flight-edit-search-form',
  templateUrl: './flight-edit-search-form.component.html',
  styleUrls: ['./flight-edit-search-form.component.scss'],
})
export class FlightEditSearchFormComponent implements OnInit {
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  edit = false

  airports$: Observable<IAirport[]> = this.store.select(selectAirports)

  searchType$: Observable<SearchType> = this.store.select(selectSearchType)

  editSearchForm = new FormGroup({
    routeFrom: new FormControl<IAirport | null>(null),
    routeTo: new FormControl<IAirport | null>(null),

    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null, [Validators.required]),

    adults: new FormControl<number>(1),
    child: new FormControl<number>(0),
    infant: new FormControl<number>(0),
  })

  get routeFrom() {
    return this.editSearchForm.get('routeFrom')?.value
  }

  get routeTo() {
    return this.editSearchForm.get('routeTo')?.value
  }

  get startDate() {
    return this.editSearchForm.get('startDate')?.value
  }

  get endDate() {
    return this.editSearchForm.get('endDate')?.value
  }

  get adults() {
    return this.editSearchForm.get('adults')?.value
  }

  get child() {
    return this.editSearchForm.get('child')?.value
  }

  get infant() {
    return this.editSearchForm.get('infant')?.value
  }

  get totalPassengers() {
    return (
      (this.editSearchForm.get('adults')?.value || 0) +
      (this.editSearchForm.get('child')?.value || 0) +
      (this.editSearchForm.get('infant')?.value || 0)
    )
  }

  passengers$: Observable<number> = this.store.select(selectTotalPassengers)

  ngOnInit() {
    this.store.dispatch(searchAirports())

    this.store
      .select(selectSearchFeature)
      .pipe(take(1))
      .subscribe(({ search }) => {
        this.editSearchForm.patchValue({
          routeFrom: search.route.from,
          routeTo: search.route.to,
          startDate: search.dates.start,
          endDate: search.dates.end,
          adults: search.passengers.adults,
          child: search.passengers.child,
          infant: search.passengers.infant,
        })
      })
  }

  handleClickEdit() {
    this.edit = true
  }

  handleClickSearch() {
    this.edit = false

    const { routeFrom, routeTo, startDate, endDate, adults, child, infant } =
      this.editSearchForm.controls

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        fromKey: routeFrom.value?.key,
        toKey: routeTo.value?.key,
        forwardDate: startDate.value?.toISOString(),
        backDate: endDate.value?.toISOString(),
      },
      queryParamsHandling: 'merge',
    })

    const search: Partial<SearchState> = {
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
  }

  handleClickClose() {
    this.edit = false

    this.store
      .select(selectSearchFeature)
      .pipe(take(1))
      .subscribe(({ search }) => {
        this.editSearchForm.patchValue({
          routeFrom: search.route.from,
          routeTo: search.route.to,
          startDate: search.dates.start,
          endDate: search.dates.end,
          adults: search.passengers.adults,
          child: search.passengers.child,
          infant: search.passengers.infant,
        })
      })
  }

  compareWithRoute(o1: IAirport, o2: IAirport) {
    return o1.key === o2.key
  }

  onChangeStartDate(startDate: Date) {
    this.editSearchForm.patchValue({ startDate })
  }

  onChangeEndDate(endDate: Date) {
    this.editSearchForm.patchValue({ endDate })
  }

  onChangeRouteFrom(routeFrom: IAirport) {
    this.editSearchForm.patchValue({ routeFrom })
  }

  onChangeRouteTo(routeTo: IAirport) {
    this.editSearchForm.patchValue({ routeTo })
  }

  onChangePassengers(event: { key: string; value: number }) {
    this.editSearchForm.patchValue({
      [event.key as keyof IPassengers]: +event.value,
    })
  }
}
