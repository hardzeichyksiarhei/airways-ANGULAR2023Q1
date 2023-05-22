import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY } from 'rxjs'
import { map, exhaustMap, catchError } from 'rxjs/operators'

import { searchAirports, searchAirportsSuccess } from './airports.actions'
import { AirportsService } from './airports.service'

@Injectable()
export class AirportsEffects {
  constructor(
    private actions$: Actions,
    private airportsService: AirportsService
  ) {}

  searchAirports$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchAirports.type),
      exhaustMap(() =>
        this.airportsService.search().pipe(
          map((airports) => searchAirportsSuccess({ airports })),
          catchError(() => EMPTY)
        )
      )
    )
  })
}
