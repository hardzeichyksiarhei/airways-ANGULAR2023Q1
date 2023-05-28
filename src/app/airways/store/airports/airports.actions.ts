import { createAction, props } from '@ngrx/store'

import { IAirport } from './airports.model'

export const searchAirports = createAction('[Airway Airports] Search Airports')

export const searchAirportsSuccess = createAction(
  '[Airway Airports] Search Airports Success',
  props<{ airports: IAirport[] }>()
)
