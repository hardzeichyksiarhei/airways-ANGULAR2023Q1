import { createFeatureSelector, createSelector } from '@ngrx/store'

import { AirwayState } from '../types'

export const selectAirportsFeature =
  createFeatureSelector<AirwayState>('airway')

export const selectAirports = createSelector(
  selectAirportsFeature,
  (state) => state.airports.airports
)
