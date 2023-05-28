import { createReducer, on } from '@ngrx/store'

import { searchAirports, searchAirportsSuccess } from './airports.actions'
import { IAirport } from './airports.model'

export interface AirportsState {
  airports: IAirport[]
  loading: boolean
}

const initialState: AirportsState = {
  airports: [],
  loading: false,
}

export const airportsReducer = createReducer(
  initialState,
  on(searchAirports, (state): AirportsState => ({ ...state, loading: true })),
  on(
    searchAirportsSuccess,
    (state, action): AirportsState => ({
      ...state,
      airports: action.airports,
      loading: false,
    })
  )
)
