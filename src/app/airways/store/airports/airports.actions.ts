import { createAction, props } from '@ngrx/store'

import { IAirport } from './airports.model'

export const loadAirports = createAction('[Airway Airports] Load Airports')

export const loadAirportsSuccess = createAction(
  '[Airway Airports] Load Airports Success',
  props<{ airports: IAirport[] }>()
)
