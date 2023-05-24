import { createFeatureSelector, createSelector } from '@ngrx/store'

import { AirwayState } from '../types'

export const selectSearchFeature = createFeatureSelector<AirwayState>('airway')

export const selectSearchType = createSelector(
  selectSearchFeature,
  (state) => state.search.type
)

export const selectStartDate = createSelector(
  selectSearchFeature,
  (state) => state.search.dates.start
)

export const selectEndDate = createSelector(
  selectSearchFeature,
  (state) => state.search.dates.end
)

export const selectPassengers = createSelector(
  selectSearchFeature,
  (state) => state.search.passengers
)

export const selectRouteFrom = createSelector(
  selectSearchFeature,
  (state) => state.search.route.from
)

export const selectRouteTo = createSelector(
  selectSearchFeature,
  (state) => state.search.route.to
)
