import { createReducer, on } from '@ngrx/store'

import { searchFlights, searchFlightsSuccess } from './flights.actions'
import { IFlight } from './flights.model'

export interface FlightsState {
  flights: IFlight[]
  loading: boolean
}

const initialState: FlightsState = {
  flights: [],
  loading: false,
}

export const flightsReducer = createReducer(
  initialState,
  on(searchFlights, (state): FlightsState => ({ ...state, loading: true })),
  on(
    searchFlightsSuccess,
    (state, action): FlightsState => ({
      ...state,
      flights: action.flights,
      loading: false,
    })
  )
)
