import { createAction, props } from '@ngrx/store'

import { IFlight } from './flights.model'
import { ISearchFlightsArgs } from './flights.service'

export const searchFlights = createAction(
  '[Airway Flights] Search Flights',
  props<{ args: ISearchFlightsArgs }>()
)

export const searchFlightsSuccess = createAction(
  '[Airway Flights] Search Flights Success',
  props<{ flights: IFlight[] }>()
)
