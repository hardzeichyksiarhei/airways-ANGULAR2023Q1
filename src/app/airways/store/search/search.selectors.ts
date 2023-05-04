import { createFeatureSelector, createSelector } from '@ngrx/store'

import { AirwayState } from '../types'

export const selectSearchFeature = createFeatureSelector<AirwayState>('airway')

export const selectSearchType = createSelector(
  selectSearchFeature,
  (state) => state.search.type
)
