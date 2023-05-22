import { createReducer, on } from '@ngrx/store'

import { loadAirports, loadAirportsSuccess } from './airports.actions'
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
  on(loadAirports, (state): AirportsState => ({ ...state, loading: true })),
  on(
    loadAirportsSuccess,
    (state, action): AirportsState => ({
      ...state,
      airports: action.airports,
      loading: false,
    })
  )
)
