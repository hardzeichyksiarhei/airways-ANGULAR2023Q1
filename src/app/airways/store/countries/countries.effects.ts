import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY } from 'rxjs'
import { map, exhaustMap, catchError } from 'rxjs/operators'

import { loadCountries, loadCountriesSuccess } from './countries.actions'
import { CountriesService } from './countries.service'

@Injectable()
export class CountriesEffects {
  constructor(
    private actions$: Actions,
    private countriesService: CountriesService
  ) {}

  loadCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCountries.type),
      exhaustMap(() =>
        this.countriesService.getAll().pipe(
          map((countries) => loadCountriesSuccess({ countries })),
          catchError(() => EMPTY)
        )
      )
    )
  })
}
