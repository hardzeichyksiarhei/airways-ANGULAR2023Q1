import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY } from 'rxjs'
import { map, exhaustMap, catchError } from 'rxjs/operators'

import { searchFlights, searchFlightsSuccess } from './flights.actions'
import { FlightsService, ISearchFlightsArgs } from './flights.service'

@Injectable()
export class FlightsEffects {
  constructor(
    private actions$: Actions,
    private flightsService: FlightsService
  ) {}

  searchFlights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchFlights.type),
      exhaustMap((action: { args: ISearchFlightsArgs }) =>
        this.flightsService.search(action.args).pipe(
          map((flights) => searchFlightsSuccess({ flights })),
          catchError(() => EMPTY)
        )
      )
    )
  })
}
