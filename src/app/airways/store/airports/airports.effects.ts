import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY } from 'rxjs'
import { map, exhaustMap, catchError } from 'rxjs/operators'

import { loadAirports, loadAirportsSuccess } from './airports.actions'
import { AirportsService } from './airports.service'

@Injectable()
export class AirportsEffects {
  constructor(
    private actions$: Actions,
    private airportsService: AirportsService
  ) {}

  loadAirports$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAirports.type),
      exhaustMap(() =>
        this.airportsService.getAll().pipe(
          map((airports) => loadAirportsSuccess({ airports })),
          catchError(() => EMPTY)
        )
      )
    )
  })
}
